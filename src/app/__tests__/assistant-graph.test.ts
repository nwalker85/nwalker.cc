/**
 * Assistant graph and corpus tests.
 * Run in node environment since LangGraph doesn't need DOM.
 *
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { retrieveChunks } from '@/lib/assistant/corpus'
import { getAssistantGraph } from '@/lib/assistant/graph'

describe('corpus retrieval', () => {
  it('hits for "Runestack" query', () => {
    const results = retrieveChunks('What is Runestack?')
    expect(results.length).toBeGreaterThan(0)
    const ids = results.map((r) => r.id)
    const hasRunestack = ids.some((id) => id.startsWith('runestack'))
    expect(hasRunestack).toBe(true)
  })

  it('hits for "control plane" query', () => {
    const results = retrieveChunks('How does the control plane work?')
    expect(results.length).toBeGreaterThan(0)
    const hasControlPlane = results.some(
      (r) => r.text.toLowerCase().includes('control plane') || r.topic === 'architecture',
    )
    expect(hasControlPlane).toBe(true)
  })

  it('returns scored results sorted descending', () => {
    const results = retrieveChunks('Nathan Walker architecture control plane')
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score)
    }
  })

  it('returns empty array when no match', () => {
    const results = retrieveChunks('xyzzy froobnitz quux')
    expect(results).toHaveLength(0)
  })
})

describe('LangGraph graph.invoke — Runestack question', () => {
  it('cites sources and emits retrieve+answer events', async () => {
    const graph = getAssistantGraph()
    const result = await graph.invoke({
      input: 'What is Runestack?',
      messages: [],
      retrieved: [],
      events: [],
      sources: [],
      intent: 'answer',
      handoffPhase: null,
      handoffData: {},
      answer: '',
    })

    // Must cite sources
    expect(result.sources).toBeDefined()
    expect(result.sources.length).toBeGreaterThan(0)

    // Must emit retrieve and answer events
    const nodeNames = result.events.map((e: { node: string }) => e.node)
    expect(nodeNames).toContain('retrieve')
    expect(nodeNames).toContain('answer')

    // Must not impersonate Nathan
    expect(result.answer).not.toMatch(/I am Nathan Walker/i)
    expect(result.answer).not.toMatch(/^Nathan Walker:/i)

    // Must use AI assistant voice
    expect(result.answer).toMatch(/I am an AI assistant/i)
  })

  it('answer references Runestack corpus content', async () => {
    const graph = getAssistantGraph()
    const result = await graph.invoke({
      input: 'What is Runestack?',
      messages: [],
      retrieved: [],
      events: [],
      sources: [],
      intent: 'answer',
      handoffPhase: null,
      handoffData: {},
      answer: '',
    })

    const hasRunestackContent =
      result.answer.toLowerCase().includes('runestack') ||
      result.sources.some((s: string) => s.startsWith('runestack'))
    expect(hasRunestackContent).toBe(true)
  })
})

describe('LangGraph graph.invoke — meeting intent → handoff', () => {
  it('routes meeting intent to handoff, not answer', async () => {
    const graph = getAssistantGraph()
    const result = await graph.invoke({
      input: "I'd like to schedule a meeting.",
      messages: [],
      retrieved: [],
      events: [],
      sources: [],
      intent: 'answer',
      handoffPhase: null,
      handoffData: {},
      answer: '',
    })

    expect(result.intent).toBe('handoff')
    const nodeNames = result.events.map((e: { node: string }) => e.node)
    expect(nodeNames).toContain('handoff')
    expect(nodeNames).not.toContain('answer')
  })

  it('handoff prompt asks for name without claiming to book the meeting', async () => {
    const graph = getAssistantGraph()
    const result = await graph.invoke({
      input: 'I want to book a call with Nathan.',
      messages: [],
      retrieved: [],
      events: [],
      sources: [],
      intent: 'answer',
      handoffPhase: null,
      handoffData: {},
      answer: '',
    })

    expect(result.intent).toBe('handoff')
    expect(result.answer).toMatch(/name/i)
    expect(result.answer).not.toMatch(/your meeting (is|has been) booked/i)
    expect(result.answer).not.toMatch(/cal\.com/i)
  })

  it('does not treat a demo question as a meeting handoff', async () => {
    const graph = getAssistantGraph()
    const result = await graph.invoke({
      input: 'What is this demo?',
      messages: [],
      retrieved: [],
      events: [],
      sources: [],
      intent: 'answer',
      handoffPhase: null,
      handoffData: {},
      answer: '',
    })

    expect(result.intent).toBe('answer')
    const nodeNames = result.events.map((e: { node: string }) => e.node)
    expect(nodeNames).toContain('answer')
    expect(nodeNames).not.toContain('handoff')
  })

  it('continues collecting name after the first meeting turn', async () => {
    const graph = getAssistantGraph()
    const first = await graph.invoke({
      input: "I'd like to schedule a meeting.",
      messages: [],
      retrieved: [],
      events: [],
      sources: [],
      intent: 'answer',
      handoffPhase: null,
      handoffData: {},
      answer: '',
    })

    const second = await graph.invoke({
      input: 'Alex Rivera',
      messages: first.messages,
      retrieved: [],
      events: [],
      sources: [],
      intent: 'answer',
      handoffPhase: first.handoffPhase,
      handoffData: first.handoffData,
      answer: '',
    })

    expect(second.intent).toBe('handoff')
    expect(second.handoffData.name).toBe('Alex Rivera')
    expect(second.answer).toMatch(/email/i)
  })
})
