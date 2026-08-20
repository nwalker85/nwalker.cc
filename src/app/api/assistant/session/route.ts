/**
 * GET  /api/assistant/session — get or create session
 * DELETE /api/assistant/session — clear session
 */

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createSession, getSession, deleteSession, SESSION_COOKIE, sessionCookieOptions } from '@/lib/assistant/session'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const cookieStore = await cookies()
  const existingId = cookieStore.get(SESSION_COOKIE)?.value
  let session = existingId ? getSession(existingId) : null

  if (!session) {
    session = createSession()
  }

  const response = NextResponse.json({
    sessionId: session.id,
    createdAt: session.createdAt,
    lastUsedAt: session.lastUsedAt,
  })

  response.cookies.set(SESSION_COOKIE, session.id, sessionCookieOptions())

  return response
}

export async function DELETE() {
  const cookieStore = await cookies()
  const existingId = cookieStore.get(SESSION_COOKIE)?.value

  if (existingId) {
    deleteSession(existingId)
  }

  const response = NextResponse.json({ cleared: true })
  response.cookies.set(SESSION_COOKIE, '', sessionCookieOptions(0))

  return response
}
