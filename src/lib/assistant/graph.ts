/**
 * LangGraph.js StateGraph for the portfolio assistant.
 * Server-only. No secrets in the browser.
 *
 * Nodes: retrieve → route → answer | handoff
 * Extractive mode: works without any LLM API key.
 */

import { Annotation, StateGraph, END, START } from '@langchain/langgraph'
import { retrieveChunks, type CorpusChunk } from './corpus'

// ── State ──────────────────────────────────────────────────────────────────

export interface GraphEvent {
  node: string
  ts: string
  summary: string
}

const AssistantState = Annotation.Root({
  input: Annotation<string>,
  messages: Annotation<Array<{ role: 'user' | 'assistant'; content: string }>>({
    reducer: (x, y) => [...(x ?? []), ...(Array.isArray(y) ? y : [y])],
    default: () => [],
  }),
  retrieved: Annotation<Array<CorpusChunk & { score: number }>>({
    reducer: (_x, y) => y,
    default: () => [],
  }),
  events: Annotation<GraphEvent[]>({
    reducer: (x, y) => [...(x ?? []), ...(Array.isArray(y) ? y : [y])],
    default: () => [],
  }),
  sources: Annotation<string[]>({
    reducer: (_x, y) => y,
    default: () => [],
  }),
  intent: Annotation<'answer' | 'handoff'>({
    reducer: (_x, y) => y,
    default: () => 'answer',
  }),
  answer: Annotation<string>({
    reducer: (_x, y) => y,
    default: () => '',
  }),
  handoffPhase: Annotation<'collecting' | 'confirming' | 'done' | null>({
    reducer: (_x, y) => y,
    default: () => null,
  }),
  handoffData: Annotation<{
    name?: string
    email?: string
    company?: string
    role?: string
    reason?: string
  }>({
    reducer: (x, y) => ({ ...(x ?? {}), ...(y ?? {}) }),
    default: () => ({}),
  }),
})

type AssistantStateType = typeof AssistantState.State

// ── Intent detection ───────────────────────────────────────────────────────

const HANDOFF_PATTERNS = [
  /\b(schedule|book a|booking|calendar|set up a (call|meeting)|arrange a (call|meeting))\b/i,
  /\b(meeting request|intro call|discovery call)\b/i,
  /\b(work together|hire|consulting|advisory)\b/i,
]

function detectIntent(input: string): 'answer' | 'handoff' {
  for (const pattern of HANDOFF_PATTERNS) {
    if (pattern.test(input)) return 'handoff'
  }
  return 'answer'
}

// ── Nodes ──────────────────────────────────────────────────────────────────

async function retrieveNode(state: AssistantStateType): Promise<Partial<AssistantStateType>> {
  const ts = new Date().toISOString()
  const chunks = retrieveChunks(state.input, 3)
  const sources = chunks.map((c) => c.id)

  return {
    retrieved: chunks,
    sources,
    events: [
      {
        node: 'retrieve',
        ts,
        summary: `Retrieved ${chunks.length} chunk(s): ${chunks.map((c) => c.id).join(', ') || 'none'}`,
      },
    ],
  }
}

async function routeNode(state: AssistantStateType): Promise<Partial<AssistantStateType>> {
  const ts = new Date().toISOString()
  const inHandoff = state.handoffPhase === 'collecting' || state.handoffPhase === 'confirming'
  const intent = inHandoff ? 'handoff' : detectIntent(state.input)

  return {
    intent,
    events: [
      {
        node: 'route',
        ts,
        summary: inHandoff ? `Intent: handoff (continuing ${state.handoffPhase})` : `Intent: ${intent}`,
      },
    ],
  }
}

async function respondNode(state: AssistantStateType): Promise<Partial<AssistantStateType>> {
  const ts = new Date().toISOString()
  const chunks = state.retrieved

  let answer: string

  if (chunks.length === 0) {
    answer =
      'I am an AI assistant for Nathan Walker\'s public portfolio. The available public context does not cover that question. That question needs Nathan directly — use the contact form at /#contact.'
  } else {
    const body = chunks
      .slice(0, 2)
      .map((c) => c.text)
      .join('\n\n')
    const uncertain = chunks[0].score < 3
    answer = `I am an AI assistant for Nathan Walker's public portfolio. The available public context says:\n\n${body}${
      uncertain
        ? '\n\nThat mapping is inferred from public pages; details may need Nathan directly.'
        : ''
    }`
  }

  return {
    answer,
    messages: [
      { role: 'user', content: state.input },
      { role: 'assistant', content: answer },
    ],
    events: [
      {
        node: 'answer',
        ts,
        summary: `Generated extractive answer (${chunks.length} source(s))`,
      },
    ],
  }
}

function buildHandoffAnswer(
  phase: 'collecting' | 'confirming' | 'done' | null,
  data: AssistantStateType['handoffData'],
): string {
  const missing = (['name', 'email', 'company', 'role', 'reason'] as const).filter((k) => !data[k])

  if (missing.length > 0) {
    const next = missing[0]
    const prompts: Record<string, string> = {
      name: "I'd be happy to pass along a meeting request to Nathan. What is your name?",
      email: 'What email address should Nathan use to reach you?',
      company: 'What company or organization are you with?',
      role: 'What is your role or title?',
      reason: 'What would you like to discuss with Nathan?',
    }
    return prompts[next] ?? 'Please provide the next piece of information.'
  }

  if (phase === 'confirming') {
    return (
      `Here is your meeting request summary:\n\n` +
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Company: ${data.company}\n` +
      `Role: ${data.role}\n` +
      `Reason: ${data.reason}\n\n` +
      `Please confirm by typing "confirm" or "yes" to submit, or "cancel" to start over.`
    )
  }

  if (phase === 'done') {
    return (
      `Your request has been noted. I am an AI assistant and cannot book meetings directly — Nathan will receive this summary via the contact form. ` +
      `To ensure delivery, please also submit directly at nwalker.cc/#contact. Nathan reviews requests personally.`
    )
  }

  return "Let's get your meeting request set up. What is your name?"
}

async function handoffNode(state: AssistantStateType): Promise<Partial<AssistantStateType>> {
  const ts = new Date().toISOString()
  const input = state.input.trim().toLowerCase()
  let { handoffPhase, handoffData } = state

  if (!handoffPhase) {
    const answer = buildHandoffAnswer('collecting', {})
    return {
      handoffPhase: 'collecting',
      handoffData,
      answer,
      messages: [
        { role: 'user', content: state.input },
        { role: 'assistant', content: answer },
      ],
      events: [{ node: 'handoff', ts, summary: 'Handoff started — collecting name' }],
    }
  }

  // Detect confirmation
  if (handoffPhase === 'confirming' && (input === 'confirm' || input === 'yes')) {
    const answer = buildHandoffAnswer('done', handoffData)
    return {
      handoffPhase: 'done',
      answer,
      messages: [
        { role: 'user', content: state.input },
        { role: 'assistant', content: answer },
      ],
      events: [{ node: 'handoff', ts, summary: 'Meeting request confirmed and summarized' }],
    }
  }

  if (handoffPhase === 'confirming' && (input === 'cancel' || input === 'no')) {
    handoffPhase = 'collecting'
    handoffData = {}
  }

  // Collect missing fields by reading the input as the answer to the last question
  const missingBefore = (['name', 'email', 'company', 'role', 'reason'] as const).filter(
    (k) => !handoffData[k],
  )

  if (missingBefore.length > 0 && handoffPhase === 'collecting') {
    const fieldBeingFilled = missingBefore[0]
    handoffData = { ...handoffData, [fieldBeingFilled]: state.input.trim() }
  }

  const missingAfter = (['name', 'email', 'company', 'role', 'reason'] as const).filter(
    (k) => !handoffData[k],
  )

  if (missingAfter.length === 0 && handoffPhase !== 'confirming' && handoffPhase !== 'done') {
    handoffPhase = 'confirming'
  }

  if (!handoffPhase) {
    handoffPhase = 'collecting'
  }

  const answer = buildHandoffAnswer(handoffPhase, handoffData)

  return {
    handoffPhase,
    handoffData,
    answer,
    messages: [
      { role: 'user', content: state.input },
      { role: 'assistant', content: answer },
    ],
    events: [
      {
        node: 'handoff',
        ts,
        summary: `Handoff phase: ${handoffPhase}, fields collected: ${Object.keys(handoffData).join(', ') || 'none'}`,
      },
    ],
  }
}

// ── Routing ────────────────────────────────────────────────────────────────

function routeAfterRouteNode(state: AssistantStateType): 'respond' | 'handoff' {
  return state.intent === 'handoff' ? 'handoff' : 'respond'
}

// ── Graph compilation ──────────────────────────────────────────────────────

function buildGraph() {
  const graph = new StateGraph(AssistantState)
    .addNode('retrieve', retrieveNode)
    .addNode('route', routeNode)
    .addNode('respond', respondNode)
    .addNode('handoff', handoffNode)
    .addEdge(START, 'retrieve')
    .addEdge('retrieve', 'route')
    .addConditionalEdges('route', routeAfterRouteNode, {
      respond: 'respond',
      handoff: 'handoff',
    })
    .addEdge('respond', END)
    .addEdge('handoff', END)

  return graph.compile()
}

// Singleton compiled graph — safe for server-side module caching.
let _graph: ReturnType<typeof buildGraph> | null = null

export function getAssistantGraph() {
  if (!_graph) {
    _graph = buildGraph()
  }
  return _graph
}

export type { AssistantStateType }
