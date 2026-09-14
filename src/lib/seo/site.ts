export const siteUrl = 'https://nwalker.cc'

export const primaryPages = [
  {
    path: '/',
    title: 'Nathan Walker | AI Governance & Enterprise Platforms',
    description: 'AI eliminated the cost of building. It did not eliminate the cost of being wrong.',
    priority: 1,
  },
  {
    path: '/architecture',
    title: 'Architecture | Nathan Walker',
    description: 'Systems philosophy and infrastructure proof for production-grade AI and enterprise platforms.',
    priority: 0.8,
  },
  {
    path: '/enterprise',
    title: 'Enterprise Work | Nathan Walker',
    description: 'Selected enterprise projects shipped under regulatory, commercial, and operational constraint.',
    priority: 0.8,
  },
  {
    path: '/philosophy',
    title: 'Philosophy | Nathan Walker',
    description: 'Frameworks and principles for durable systems, governance, and accountable AI.',
    priority: 0.8,
  },
  {
    path: '/runestack',
    title: 'Runestack | Nathan Walker',
    description: 'The accountability layer for AI agents: delegation chains, authority, and verification.',
    priority: 0.7,
  },
  {
    path: '/ecosystem',
    title: 'Ecosystem | Nathan Walker',
    description: 'The domain and concept map around Nathan Walker, Ravenhelm, Runestack, Domain Intelligence Schema, and Artimetrics.',
    priority: 0.7,
  },
] as const

export const corpusPages = [
  {
    path: '/definitions',
    title: 'AI Governance Definitions | Nathan Walker',
    description: 'Canonical definitions for AI governance, control planes, auditability, and agentic systems.',
    priority: 0.9,
  },
  {
    path: '/frameworks',
    title: 'AI Governance Frameworks | Nathan Walker',
    description: 'Named frameworks for deterministic AI control, event-first architecture, and accountable agents.',
    priority: 0.9,
  },
  {
    path: '/patterns',
    title: 'Enterprise AI Architecture Patterns | Nathan Walker',
    description: 'Reusable patterns for auditable, governed, and enterprise-ready AI systems.',
    priority: 0.9,
  },
  {
    path: '/patterns/healthcare-voice-ai',
    title: 'Healthcare Voice AI Patterns | Nathan Walker',
    description: 'Bounded definitions and architecture patterns for healthcare voice AI: patient access, scheduling recovery, prior authorization, and collections under HIPAA constraint.',
    priority: 0.7,
  },
  {
    path: '/frameworks/architecting-certainty',
    title: 'Architecting Certainty | Nathan Walker',
    description: 'An eight-pillar methodology for high-stakes technology demonstrations: earning the right to demo, narrative structure, value engineering, and execution discipline.',
    priority: 0.7,
  },
  {
    path: '/writing',
    title: 'Writing | Nathan Walker',
    description: 'Field notes and essays on accountable AI systems.',
    priority: 0.7,
  },
  {
    path: '/writing/the-beep',
    title: 'The Beep | Nathan Walker',
    description:
      'A beep from an AI subagent that ignored notification settings becomes a forensic CLI, a bug report, and a claim about delegation without contract.',
    priority: 0.6,
  },
  {
    path: '/writing/the-row',
    title: 'The row | Nathan Walker',
    description:
      'Six years at the presales-to-delivery boundary, one spreadsheet row, and the sixty-year-old mathematics it was hiding.',
    priority: 0.6,
  },
  {
    path: '/writing/nothing-scripts-the-eyebrows',
    title: 'Nothing scripts the eyebrows | Nathan Walker',
    description:
      'A face that infers emphasis from the loudness of its own voice, fifty times a second. How a photograph becomes a face that breathes, and why the raggedness is the point.',
    priority: 0.6,
  },
] as const

export const allSitemapPages = [...primaryPages, ...corpusPages] as const

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString()
}
