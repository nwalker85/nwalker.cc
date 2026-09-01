'use client'

/**
 * /assistant/app — full-screen assistant overlay.
 * Client component. Gates on AI disclosure + intent before first invoke.
 * Shows: chat, activity (graph trace), tools, health, session, sources panels.
 * Voice controls visible but disabled per brief.
 */

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface GraphEvent {
  node: string
  ts: string
  summary: string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface HealthStatus {
  ok: boolean
  corpusSize: number
  modelMode: string
  message: string
}

type Panel = 'activity' | 'tools' | 'sources' | 'health' | 'session'

export default function AssistantApp() {
  const [gateAccepted, setGateAccepted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [events, setEvents] = useState<GraphEvent[]>([])
  const [sources, setSources] = useState<string[]>([])
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activePanel, setActivePanel] = useState<Panel>('activity')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Fetch health on mount
  useEffect(() => {
    fetch('/api/assistant/health')
      .then((r) => r.json())
      .then((d: HealthStatus) => setHealth(d))
      .catch(() => setHealth(null))
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = useCallback(async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setError(null)
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)

    try {
      const res = await fetch('/api/assistant/invoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError((data as { error?: string }).error ?? 'Unknown error')
        setMessages((prev) => prev.slice(0, -1))
        return
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: (data as { answer: string }).answer },
      ])
      setEvents((prev) => [...prev, ...((data as { events?: GraphEvent[] }).events ?? [])])
      setSources((data as { sources?: string[] }).sources ?? [])
      setSessionId((data as { sessionId?: string }).sessionId ?? null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
      setMessages((prev) => prev.slice(0, -1))
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }, [input, loading])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleClearSession = async () => {
    await fetch('/api/assistant/session', { method: 'DELETE' })
    setMessages([])
    setEvents([])
    setSources([])
    setSessionId(null)
    setError(null)
  }

  // ── Gate ─────────────────────────────────────────────────────────────────

  if (!gateAccepted) {
    return (
      <div className="fixed inset-0 z-[60] bg-[var(--background)] flex items-center justify-center px-8">
        <div className="max-w-[480px] w-full">
          <p className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-6">
            AI Disclosure
          </p>
          <h1 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight mb-4">
            Nathan Walker Assistant
          </h1>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-4">
            I am an AI assistant for Nathan Walker&apos;s public portfolio. I answer only from a
            curated public corpus — identity, philosophy, architecture, Runestack, enterprise
            context, and definitions.
          </p>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-6">
            I cannot access private systems or speak on Nathan&apos;s behalf. I will tell you when I
            do not have an answer.
          </p>
          <div className="space-y-3 mb-8">
            <p className="text-[var(--text-muted)] text-sm font-medium">What is your intent?</p>
            {[
              "Learn about Nathan Walker's work",
              'Explore Runestack or architecture approach',
              'Request a meeting or conversation',
            ].map((intent) => (
              <button
                key={intent}
                onClick={() => setGateAccepted(true)}
                className="w-full text-left border border-[var(--edge)] rounded px-4 py-3 text-[var(--text-secondary)] text-sm hover:border-[var(--primary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                {intent}
              </button>
            ))}
          </div>
          <Link
            href="/assistant"
            className="text-[var(--text-muted)] text-sm hover:text-[var(--text-secondary)] transition-colors"
          >
            ← Back to assistant overview
          </Link>
        </div>
      </div>
    )
  }

  // ── Main app ──────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-[60] bg-[var(--background)] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--edge)] shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-[var(--text-primary)] text-base font-semibold">
            Nathan Walker Assistant
          </h1>
          {health && (
            <span
              className={`text-xs px-2 py-0.5 rounded font-mono ${
                health.ok ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
              }`}
            >
              {health.ok ? health.modelMode : 'offline'}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {/* Voice controls — visible but disabled per brief */}
          <button
            disabled
            title="Voice input is not available"
            aria-label="Voice input (disabled)"
            className="text-[var(--text-muted)] opacity-40 cursor-not-allowed"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
          <Link
            href="/"
            className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors text-sm"
          >
            Exit ×
          </Link>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Chat */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-[var(--text-muted)] text-sm text-center mt-12">
                <p className="mb-2">Ask anything about Nathan Walker&apos;s public portfolio.</p>
                <p className="font-mono text-xs">
                  Try: &ldquo;What is Runestack?&rdquo; or &ldquo;I&apos;d like to schedule a
                  call.&rdquo;
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[var(--primary)] text-[var(--background)]'
                      : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--edge)]'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[var(--surface)] border border-[var(--edge)] rounded px-4 py-3 text-[var(--text-muted)] text-sm">
                  <span className="animate-pulse">Running graph…</span>
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-start">
                <div className="bg-red-900/20 border border-red-500/30 rounded px-4 py-3 text-red-400 text-sm">
                  {error}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[var(--edge)] px-6 py-4 shrink-0">
            <div className="flex gap-3 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question or type 'I'd like to schedule a call'…"
                rows={2}
                className="flex-1 bg-[var(--surface)] border border-[var(--edge)] rounded px-4 py-3 text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] resize-none focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-[var(--primary)] text-[var(--background)] px-4 py-3 rounded text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer"
              >
                Send
              </button>
            </div>
            <p className="text-[var(--text-muted)] text-xs mt-2">
              Enter to send · Shift+Enter for newline · Answers from public corpus only
            </p>
          </div>
        </div>

        {/* Side panels */}
        <div className="w-72 border-l border-[var(--edge)] flex-col shrink-0 hidden lg:flex">
          {/* Panel tabs */}
          <div className="flex border-b border-[var(--edge)] shrink-0 overflow-x-auto">
            {(['activity', 'tools', 'sources', 'health', 'session'] as Panel[]).map((p) => (
              <button
                key={p}
                onClick={() => setActivePanel(p)}
                className={`px-3 py-2.5 text-xs font-medium shrink-0 capitalize transition-colors cursor-pointer ${
                  activePanel === p
                    ? 'text-[var(--text-primary)] border-b border-[var(--primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activePanel === 'activity' && (
              <div className="space-y-3">
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest">
                  Graph Trace
                </p>
                {events.length === 0 ? (
                  <p className="text-[var(--text-muted)] text-xs">No events yet. Send a message.</p>
                ) : (
                  events.map((ev, i) => (
                    <div key={i} className="border border-[var(--edge)] rounded p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[var(--primary)] text-xs">{ev.node}</span>
                        <span className="text-[var(--text-muted)] text-[10px]">
                          {new Date(ev.ts).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-[var(--text-secondary)] text-xs leading-relaxed">
                        {ev.summary}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}

            {activePanel === 'tools' && (
              <div className="space-y-3">
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest">
                  Graph Nodes
                </p>
                {[
                  { name: 'retrieve', desc: 'Keyword overlap over the public corpus' },
                  { name: 'route', desc: 'Answer vs meeting-handoff intent' },
                  { name: 'respond', desc: 'Extractive grounded answer' },
                  { name: 'handoff', desc: 'Collect meeting context; does not book' },
                ].map((tool) => (
                  <div key={tool.name} className="border border-[var(--edge)] rounded p-2">
                    <span className="font-mono text-[var(--primary)] text-xs">{tool.name}</span>
                    <p className="text-[var(--text-secondary)] text-xs leading-relaxed mt-1">
                      {tool.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activePanel === 'sources' && (
              <div className="space-y-3">
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest">
                  Last Response Sources
                </p>
                {sources.length === 0 ? (
                  <p className="text-[var(--text-muted)] text-xs">No sources yet.</p>
                ) : (
                  sources.map((s) => (
                    <div
                      key={s}
                      className="font-mono text-xs text-[var(--text-secondary)] border border-[var(--edge)] rounded px-2 py-1"
                    >
                      {s}
                    </div>
                  ))
                )}
              </div>
            )}

            {activePanel === 'health' && (
              <div className="space-y-3">
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest">
                  System Health
                </p>
                {health ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--text-muted)]">Status</span>
                      <span className={health.ok ? 'text-green-400' : 'text-red-400'}>
                        {health.ok ? 'online' : 'offline'}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--text-muted)]">Model mode</span>
                      <span className="font-mono text-[var(--text-secondary)]">
                        {health.modelMode}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--text-muted)]">Corpus chunks</span>
                      <span className="font-mono text-[var(--text-secondary)]">
                        {health.corpusSize}
                      </span>
                    </div>
                    <div className="text-[var(--text-muted)] text-xs mt-2">{health.message}</div>
                  </div>
                ) : (
                  <p className="text-[var(--text-muted)] text-xs">Health check pending…</p>
                )}
              </div>
            )}

            {activePanel === 'session' && (
              <div className="space-y-3">
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest">
                  Session
                </p>
                {sessionId ? (
                  <div className="space-y-2">
                    <p className="font-mono text-[var(--text-muted)] text-[10px] break-all">
                      {sessionId}
                    </p>
                    <p className="text-[var(--text-secondary)] text-xs">
                      {messages.length} message(s) in this session
                    </p>
                  </div>
                ) : (
                  <p className="text-[var(--text-muted)] text-xs">No active session.</p>
                )}
                <button
                  onClick={handleClearSession}
                  className="text-[var(--text-muted)] text-xs hover:text-red-400 transition-colors cursor-pointer"
                >
                  Clear session →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
