/**
 * In-memory session store for the portfolio assistant.
 * Sessions are opaque string IDs stored in HttpOnly cookies.
 * State is ephemeral — resets on server restart, as intended.
 */

import type { AssistantStateType } from './graph'

export interface SessionData {
  id: string
  createdAt: number
  lastUsedAt: number
  conversationState: Partial<AssistantStateType>
}

// In-memory session map — server-side only
const sessions = new Map<string, SessionData>()

const SESSION_TTL_MS = 60 * 60 * 1000 // 1 hour

function generateId(): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function createSession(): SessionData {
  const id = generateId()
  const now = Date.now()
  const session: SessionData = {
    id,
    createdAt: now,
    lastUsedAt: now,
    conversationState: {},
  }
  sessions.set(id, session)
  return session
}

export function getSession(id: string): SessionData | null {
  const session = sessions.get(id)
  if (!session) return null

  // Expire stale sessions
  if (Date.now() - session.lastUsedAt > SESSION_TTL_MS) {
    sessions.delete(id)
    return null
  }

  session.lastUsedAt = Date.now()
  return session
}

export function deleteSession(id: string): void {
  sessions.delete(id)
}

export function updateSessionState(
  id: string,
  state: Partial<AssistantStateType>,
): SessionData | null {
  const session = sessions.get(id)
  if (!session) return null

  session.conversationState = state
  session.lastUsedAt = Date.now()
  return session
}

export const SESSION_COOKIE = 'nwalker_assistant_session'

export function sessionCookieOptions(maxAge = 3600) {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  }
}
