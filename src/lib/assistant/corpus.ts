/**
 * Public corpus fixture for the portfolio assistant.
 * Contains only publicly disclosed information from nwalker.cc.
 * No Ravenhelm internal data, no secrets, no private architecture.
 */

export interface CorpusChunk {
  id: string
  topic: string
  keywords: string[]
  text: string
}

export const CORPUS: CorpusChunk[] = [
  // ── Identity ──────────────────────────────────────────────────────────────
  {
    id: 'identity-1',
    topic: 'identity',
    keywords: ['nathan walker', 'who is', 'about', 'nwalker', 'background', 'bio', 'introduction'],
    text: 'Nathan Walker is an AI governance and enterprise platform architect based in the United States. He specializes in building AI systems that operate under real-world constraint — systems that are auditable, delegatable, and designed to survive review.',
  },
  {
    id: 'identity-2',
    topic: 'identity',
    keywords: ['nathan walker', 'experience', 'career', 'work', 'architect', 'engineer', 'builder'],
    text: 'Nathan Walker builds AI-native platforms and enterprise architecture with a focus on accountability, auditability, and governance. His work spans control planes, agentic systems, voice AI, and enterprise tooling.',
  },
  {
    id: 'identity-3',
    topic: 'identity',
    keywords: ['contact', 'meeting', 'reach', 'email', 'hire', 'work together', 'engage'],
    text: 'To reach Nathan Walker directly, use the contact form at nwalker.cc/#contact or submit a meeting request. Nathan is selectively available for consulting, architecture advisory, and strategic engineering work.',
  },

  // ── Philosophy ────────────────────────────────────────────────────────────
  {
    id: 'philosophy-1',
    topic: 'philosophy',
    keywords: ['philosophy', 'ai', 'cost', 'building', 'wrong', 'thesis', 'belief', 'principle'],
    text: 'AI eliminated the cost of building. It did not eliminate the cost of being wrong. The leverage that AI provides is real, but it amplifies both the quality and the failures of the decisions made above it.',
  },
  {
    id: 'philosophy-2',
    topic: 'philosophy',
    keywords: ['governance', 'accountable', 'accountability', 'mandatory', 'fragility', 'permission', 'auditability'],
    text: 'If AI makes building cheap, governance becomes mandatory. Authority without accountability is permission. Permission without auditability is fragility. These are not rhetorical statements — they are engineering constraints.',
  },
  {
    id: 'philosophy-3',
    topic: 'philosophy',
    keywords: ['judgment', 'gap', 'durable', 'systems', 'correctness', 'durability', 'decision'],
    text: 'Correct systems are not the same as durable systems. Judgment determines durability. The Judgment Gap is the space between what a system can do and what it should do — filling that gap is the work of architecture, not automation.',
  },
  {
    id: 'philosophy-4',
    topic: 'philosophy',
    keywords: ['systems', 'fail safely', 'scale', 'survive', 'audit', 'intentionally', 'architect'],
    text: 'Systems should fail safely. They should scale intentionally. They should survive audit. These are not optional properties; they are the bar for production-grade AI systems.',
  },
  {
    id: 'philosophy-5',
    topic: 'philosophy',
    keywords: ['scar', 'scars', 'experience', 'hard', 'learned', 'decisions', 'survive'],
    text: 'The decisions that matter in AI systems do not appear in the prompt. They appear in the scars — the constraints learned from production failures, regulatory reviews, and systems that had to be rebuilt because the original did not hold.',
  },

  // ── Architecture ──────────────────────────────────────────────────────────
  {
    id: 'architecture-1',
    topic: 'architecture',
    keywords: ['architecture', 'platform', 'control plane', 'agentic', 'systems', 'design', 'infrastructure'],
    text: 'Nathan Walker designs multi-layer platform architectures with a deterministic control plane at the center. The control plane enforces authority, routes work, and maintains audit trails independently of the AI agents that run on top of it.',
  },
  {
    id: 'architecture-2',
    topic: 'architecture',
    keywords: ['event', 'event-first', 'events', 'immutable', 'audit', 'log', 'trace'],
    text: 'Event-first architecture treats every state mutation as an immutable, signed event. This enables full audit replay, forensic tracing, and externally verifiable audit without relying on the AI agent to self-report.',
  },
  {
    id: 'architecture-3',
    topic: 'architecture',
    keywords: ['delegation', 'authority', 'chain', 'cryptographic', 'boundary', 'security'],
    text: 'Cryptographic delegation chains bind each AI action to a specific authority grant. The chain is verifiable without trusting the agent: who granted, what scope, when, and under what conditions the grant expires.',
  },
  {
    id: 'architecture-4',
    topic: 'architecture',
    keywords: ['mutation', 'containment', 'side effect', 'bounded', 'scope', 'limit'],
    text: 'Mutation containment limits the blast radius of AI decisions. Every action has a declared scope; actions outside scope are rejected at the control plane boundary, not by the AI itself.',
  },
  {
    id: 'architecture-5',
    topic: 'architecture',
    keywords: ['langgraph', 'langchain', 'graph', 'stateful', 'nodes', 'workflow', 'agent'],
    text: 'This portfolio assistant is a LangGraph.js StateGraph: retrieve, route, then answer or handoff. The runtime is inspectable — each node emits a trace event in the Activity panel.',
  },

  // ── Runestack ─────────────────────────────────────────────────────────────
  {
    id: 'runestack-1',
    topic: 'runestack',
    keywords: ['runestack', 'what is runestack', 'runestack platform', 'product', 'platform'],
    text: 'Runestack is the accountability layer for AI agents. It provides delegation chains, authority management, and verification primitives for production AI systems. Runestack makes it possible to answer: who authorized this action, and can you prove it?',
  },
  {
    id: 'runestack-2',
    topic: 'runestack',
    keywords: ['runestack', 'control plane', 'agents', 'enterprise', 'production', 'governance'],
    text: 'Runestack is designed for enterprise AI deployments where governance is not optional. It sits between AI models and production systems, enforcing authority scopes and generating externally verifiable audit trails.',
  },
  {
    id: 'runestack-3',
    topic: 'runestack',
    keywords: ['runestack', 'primitives', 'building blocks', 'ai systems', 'accountability'],
    text: 'Runestack primitives include: authority grants (who can do what), delegation chains (chains of granted authority), mutation scopes (what can be changed), and audit events (immutable record of what happened).',
  },

  // ── Enterprise Metrics ────────────────────────────────────────────────────
  {
    id: 'enterprise-1',
    topic: 'enterprise',
    keywords: ['enterprise', 'work', 'commercial', 'proof', 'results', 'impact', 'shipped'],
    text: 'Enterprise work includes AI-native platform deployments, voice AI systems under regulatory constraint, and governance tooling for organizations operating under HIPAA, SOC 2, and similar compliance frameworks.',
  },
  {
    id: 'enterprise-2',
    topic: 'enterprise',
    keywords: ['healthcare', 'voice', 'ai', 'patient', 'scheduling', 'hipaa', 'clinical'],
    text: 'Healthcare voice AI work covers patient access automation, scheduling recovery, prior authorization workflows, and collections under HIPAA constraint. These systems require bounded definitions and architecture patterns that preserve clinical safety.',
  },
  {
    id: 'enterprise-3',
    topic: 'enterprise',
    keywords: ['enterprise', 'platform', 'architecture', 'production', 'scale', 'deployment'],
    text: 'Production enterprise platforms require audit-first design: every decision logged, every authority grant traceable, every failure recoverable without data loss. The architecture must survive a forensic review of any event in its history.',
  },

  // ── Definitions ───────────────────────────────────────────────────────────
  {
    id: 'definitions-1',
    topic: 'definitions',
    keywords: ['definition', 'accountable ai', 'what is', 'term', 'meaning', 'define'],
    text: 'Accountable AI: AI systems that operate with externally verifiable authority grants, immutable audit trails, and bounded mutation scopes. Accountability is an architectural property, not a policy — it is enforced by the control plane, not by the model.',
  },
  {
    id: 'definitions-2',
    topic: 'definitions',
    keywords: ['control plane', 'definition', 'what is', 'meaning'],
    text: 'Control Plane: The infrastructure layer that enforces authority, routes work, and maintains audit state for AI agents. The control plane is independent of the AI models it supervises — it does not trust model outputs for security-critical decisions.',
  },
  {
    id: 'definitions-3',
    topic: 'definitions',
    keywords: ['agentic', 'agent', 'autonomous', 'definition', 'what is', 'meaning'],
    text: 'Agentic System: An AI system that autonomously takes actions with real-world side effects. Agentic systems require explicit delegation, scope limiting, and externally verifiable audit — not because they are inherently unsafe, but because they operate at leverage.',
  },
  {
    id: 'definitions-4',
    topic: 'definitions',
    keywords: ['auditability', 'audit', 'trace', 'verifiable', 'external', 'definition'],
    text: 'Auditability: The property of a system that allows any action to be traced to its cause, its authority grant, and its outcome — without relying on self-reporting by the AI. External auditability means a third party can verify the audit log without access to the model.',
  },

  // ── Assistant Demo ────────────────────────────────────────────────────────
  {
    id: 'assistant-1',
    topic: 'assistant',
    keywords: ['assistant', 'demo', 'langgraph', 'this assistant', 'how does this work', 'built with'],
    text: 'This portfolio assistant is built with LangGraph.js running as a StateGraph on Next.js Route Handlers. It demonstrates inspectable runtime: every node execution generates a trace event visible in the Activity panel. The graph has nodes: retrieve, route, and answer/handoff.',
  },
  {
    id: 'assistant-2',
    topic: 'assistant',
    keywords: ['assistant', 'langgraph', 'graph', 'nodes', 'retrieve', 'route', 'answer'],
    text: 'The assistant graph nodes: (1) retrieve — keyword overlap search over the public corpus; (2) route — intent detection for meeting/booking/handoff vs. information; (3) answer — extractive grounded response citing sources; (4) handoff — meeting request collection with name, email, company, role, and reason.',
  },
  {
    id: 'assistant-3',
    topic: 'assistant',
    keywords: ['corpus', 'public context', 'what can you answer', 'scope', 'limitations', 'boundary'],
    text: "This assistant answers only from a public corpus covering: Nathan Walker's identity, philosophy, architecture approach, Runestack, enterprise context, and key definitions. It does not answer questions about internal systems, private data, or information not in the corpus.",
  },
]

/**
 * Score a query against the corpus using keyword overlap.
 * Returns chunks sorted by relevance (higher score = more relevant).
 */
export function retrieveChunks(query: string, topK = 3): Array<CorpusChunk & { score: number }> {
  const tokens = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2)

  const scored = CORPUS.map((chunk) => {
    const chunkText = (chunk.text + ' ' + chunk.keywords.join(' ')).toLowerCase()
    let score = 0
    for (const token of tokens) {
      if (chunkText.includes(token)) score += 1
      if (chunk.keywords.some((k) => k.includes(token) || token.includes(k))) score += 1
    }
    return { ...chunk, score }
  })

  return scored
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
}
