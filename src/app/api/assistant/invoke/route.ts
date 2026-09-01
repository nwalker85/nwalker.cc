/**
 * POST /api/assistant/invoke
 * Runs the assistant graph for one turn and returns the response.
 */

import { NextRequest, NextResponse } from 'next/server'
import { cookies, headers } from 'next/headers'
import { getAssistantGraph } from '@/lib/assistant/graph'
import {
  createSession,
  getSession,
  updateSessionState,
  SESSION_COOKIE,
  sessionCookieOptions,
} from '@/lib/assistant/session'
import { checkRateLimit } from '@/lib/assistant/ratelimit'
import { z } from 'zod'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const InvokeBody = z.object({
  message: z.string().min(1).max(2000),
})

export async function POST(req: NextRequest) {
  // Rate limiting
  const headerStore = await headers()
  const ip =
    headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headerStore.get('x-real-ip') ??
    'unknown'
  const { allowed, remaining } = checkRateLimit(ip)

  if (!allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please wait before sending another message.' },
      { status: 429 },
    )
  }

  // Parse body
  let body: z.infer<typeof InvokeBody>
  try {
    const raw = await req.json()
    body = InvokeBody.parse(raw)
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  // Session resolution
  const cookieStore = await cookies()
  const existingSessionId = cookieStore.get(SESSION_COOKIE)?.value
  let session = existingSessionId ? getSession(existingSessionId) : null

  if (!session) {
    session = createSession()
  }

  // Build graph input from session state
  const prevState = session.conversationState ?? {}
  const graphInput = {
    input: body.message,
    messages: prevState.messages ?? [],
    retrieved: [],
    events: [],
    sources: [],
    intent: prevState.handoffPhase ? ('handoff' as const) : ('answer' as const),
    handoffPhase: prevState.handoffPhase ?? null,
    handoffData: prevState.handoffData ?? {},
    answer: '',
  }

  // Run the graph
  let result
  try {
    const graph = getAssistantGraph()
    result = await graph.invoke(graphInput)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Graph invocation failed' },
      { status: 500 },
    )
  }

  // Persist state for next turn
  updateSessionState(session.id, {
    messages: result.messages ?? [],
    handoffPhase: result.handoffPhase ?? null,
    handoffData: result.handoffData ?? {},
  })

  const response = NextResponse.json({
    answer: result.answer,
    events: result.events ?? [],
    sources: result.sources ?? [],
    intent: result.intent,
    handoffPhase: result.handoffPhase,
    sessionId: session.id,
    remaining,
  })

  // Set session cookie
  response.cookies.set(SESSION_COOKIE, session.id, sessionCookieOptions())

  return response
}
