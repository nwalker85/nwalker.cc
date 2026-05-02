export type OwnershipBoundary =
  | 'personal'
  | 'ravenhelm'
  | 'ravenhelm-consulting'
  | 'community'
  | 'product'
  | 'methodology'
  | 'concept'
  | 'personal-project'
  | 'sunset'

export interface DomainPortfolioEntry {
  domain: string
  label: string
  boundary: OwnershipBoundary
  purpose: string
  livePolicy: string
  canonicalTarget?: string
  priority: 'critical' | 'high' | 'medium' | 'low' | 'sunset'
  contentPlan: string[]
  url?: string
}

export const domainPortfolio: DomainPortfolioEntry[] = [
  {
    domain: 'nwalker.cc',
    label: 'Nathan Walker',
    boundary: 'personal',
    purpose: 'Personal authority hub for AI governance, systems architecture, and founder identity.',
    livePolicy: 'Canonical public personal site.',
    priority: 'critical',
    url: 'https://nwalker.cc',
    contentPlan: ['Founder biography', 'AI governance corpus', 'Ecosystem map', 'Selected work and speaking links'],
  },
  {
    domain: 'ravenhelm.co',
    label: 'Ravenhelm, LLC',
    boundary: 'ravenhelm',
    purpose: 'Primary company domain for Ravenhelm, LLC.',
    livePolicy: 'Canonical company site.',
    priority: 'critical',
    url: 'https://ravenhelm.co',
    contentPlan: ['Company positioning', 'Operating principles', 'Products and series', 'Contact and legal identity'],
  },
  {
    domain: 'ravenhelm.ai',
    label: 'Ravenhelm Consulting',
    boundary: 'ravenhelm-consulting',
    purpose: 'Consulting series and advisory surface for enterprise AI governance and architecture.',
    livePolicy: 'Separate consulting property; cross-link to Ravenhelm, LLC and Nathan Walker.',
    priority: 'high',
    url: 'https://ravenhelm.ai',
    contentPlan: ['Consulting thesis', 'Offerings', 'Engagement model', 'Case-study placeholders'],
  },
  {
    domain: 'ravenhelm.org',
    label: 'Ravenhelm Community',
    boundary: 'community',
    purpose: 'Community, public-good, and standards-adjacent Ravenhelm work.',
    livePolicy: 'Separate community surface.',
    priority: 'medium',
    url: 'https://ravenhelm.org',
    contentPlan: ['Community charter', 'Participation model', 'Public resources', 'Events or working groups'],
  },
  {
    domain: 'ravenhelm.dev',
    label: 'Ravenhelm Homelab',
    boundary: 'ravenhelm',
    purpose: 'Company prototype, homelab, and operational development domain.',
    livePolicy: 'Operational domain; noindex public surfaces unless intentionally published.',
    priority: 'high',
    url: 'https://ravenhelm.dev',
    contentPlan: ['Prototype index', 'Status links', 'Internal docs pointers', 'Access policy'],
  },
  {
    domain: 'runestack.ai',
    label: 'Runestack',
    boundary: 'product',
    purpose: 'Production product domain for Runestack.',
    livePolicy: 'Canonical product site.',
    priority: 'critical',
    url: 'https://runestack.ai',
    contentPlan: ['Product promise', 'Architecture overview', 'Use cases', 'Waitlist or contact path'],
  },
  {
    domain: 'runestack.dev',
    label: 'Runestack Dev',
    boundary: 'product',
    purpose: 'Development, staging, and preview surface for Runestack.',
    livePolicy: 'Operational/dev domain; noindex by default.',
    priority: 'high',
    url: 'https://runestack.dev',
    contentPlan: ['Preview index', 'Release notes', 'Developer status', 'Access policy'],
  },
  {
    domain: 'domainintelligenceschema.org',
    label: 'Domain Intelligence Schema',
    boundary: 'methodology',
    purpose: 'Canonical methodology and schema site for modeling business domains.',
    livePolicy: 'High-priority citable methodology/spec site.',
    priority: 'critical',
    url: 'https://domainintelligenceschema.org',
    contentPlan: ['Definition', 'Schema model', 'Examples', 'FAQ', 'Versioned specification'],
  },
  {
    domain: 'domainintelligenceschema.ai',
    label: 'DIS AI Alias',
    boundary: 'methodology',
    purpose: 'AI-oriented alias for Domain Intelligence Schema.',
    livePolicy: '301 redirect to domainintelligenceschema.org.',
    canonicalTarget: 'https://domainintelligenceschema.org',
    priority: 'high',
    contentPlan: ['Redirect only', 'Preserve ownership', 'Cloudflare redirect rule'],
  },
  {
    domain: 'artimetrics.ai',
    label: 'Artimetrics',
    boundary: 'concept',
    purpose: 'Concept and specification surface for agent identification.',
    livePolicy: 'Canonical concept/spec site.',
    priority: 'high',
    url: 'https://artimetrics.ai',
    contentPlan: ['Definition', 'Agent identity model', 'Identifier examples', 'Relationship to Domain Intelligence'],
  },
  {
    domain: 'artimetrics.org',
    label: 'Artimetrics Org Alias',
    boundary: 'concept',
    purpose: 'Reserved neutral namespace for Artimetrics.',
    livePolicy: 'Redirect or reserve until the governance/spec role is distinct.',
    canonicalTarget: 'https://artimetrics.ai',
    priority: 'medium',
    contentPlan: ['Redirect decision', 'Preserve ownership', 'Future governance option'],
  },
  {
    domain: 'ravenmask.ai',
    label: 'Ravenmask',
    boundary: 'personal',
    purpose: 'Personal/lab identity domain, separate from Ravenhelm company properties.',
    livePolicy: 'Canonical personal lab domain.',
    priority: 'medium',
    url: 'https://ravenmask.ai',
    contentPlan: ['Personal lab positioning', 'Projects index', 'Private/public boundary', 'Contact path'],
  },
  {
    domain: 'ravenmask.net',
    label: 'Ravenmask Net Alias',
    boundary: 'personal',
    purpose: 'Protective alias for Ravenmask.',
    livePolicy: '301 redirect to ravenmask.ai.',
    canonicalTarget: 'https://ravenmask.ai',
    priority: 'low',
    contentPlan: ['Redirect only', 'Preserve ownership'],
  },
  {
    domain: 'hrafngrima.com',
    label: 'Hrafngrima',
    boundary: 'personal',
    purpose: 'Alternative personal domain.',
    livePolicy: 'Reserve or redirect after personal identity decision.',
    priority: 'low',
    url: 'https://hrafngrima.com',
    contentPlan: ['Alias decision', 'Optional personal note', 'Redirect target'],
  },
  {
    domain: 'theviking.ai',
    label: 'The Viking',
    boundary: 'personal-project',
    purpose: "Camper domain, intentionally outside the professional authority graph.",
    livePolicy: 'Separate personal project site.',
    priority: 'medium',
    url: 'https://theviking.ai',
    contentPlan: ['Camper identity', 'Build notes', 'Travel/log content', 'Tools or checklist links'],
  },
  {
    domain: 'theviking.tools',
    label: 'The Viking Tools',
    boundary: 'personal-project',
    purpose: 'Potential tools adjunct for the camper domain.',
    livePolicy: 'Verify ownership and renewal before building.',
    priority: 'low',
    url: 'https://theviking.tools',
    contentPlan: ['Ownership verification', 'Tool index decision', 'Redirect fallback'],
  },
  {
    domain: 'clutchtap.com',
    label: 'ClutchTap',
    boundary: 'sunset',
    purpose: 'No current strategic use.',
    livePolicy: 'Let expire unless a concrete product reason appears before renewal.',
    priority: 'sunset',
    contentPlan: ['Do not build', 'Cancel or allow expiration', 'Check for forgotten dependencies'],
  },
]

export const publicEcosystemEntries = domainPortfolio.filter((entry) =>
  ['critical', 'high'].includes(entry.priority) && entry.boundary !== 'sunset',
)
