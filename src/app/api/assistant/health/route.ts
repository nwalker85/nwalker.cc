/**
 * GET /api/assistant/health
 * Returns graph compilation status, corpus size, and model mode.
 */

import { NextResponse } from 'next/server'
import { getAssistantHealth } from '@/lib/assistant/health'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const health = getAssistantHealth()
    return NextResponse.json(health, { status: health.ok ? 200 : 500 })
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        corpusSize: 0,
        modelMode: 'extractive',
        message: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
