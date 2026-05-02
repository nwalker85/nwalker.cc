import { absoluteUrl, siteUrl } from './site'

type JsonLdEntity = Record<string, unknown>

export function buildPersonSchema(): JsonLdEntity {
  return {
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Nathan Walker',
    alternateName: ['nwalker85', 'Nathan Walker (nwalker85)'],
    url: `${siteUrl}/`,
    jobTitle: 'Enterprise AI Architect',
    description:
      'Nathan Walker builds AI governance, enterprise platform, and accountable agent systems for environments where mistakes carry commercial or regulatory consequence.',
    sameAs: [
      'https://github.com/nwalker85',
      'https://linkedin.com/in/nwalker85',
      'https://ravenhelm.ai',
      'https://runestack.ai',
    ],
    knowsAbout: [
      'AI Governance',
      'AI Auditability',
      'Agentic Systems',
      'Enterprise AI Architecture',
      'Enterprise AI Platforms',
      'Platform Engineering',
      'Systems Architecture',
      'Deterministic AI Systems',
      'AI Control Planes',
    ],
  }
}

export function buildWebSiteSchema(): JsonLdEntity {
  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Nathan Walker',
    url: `${siteUrl}/`,
    publisher: {
      '@id': `${siteUrl}/#person`,
    },
    inLanguage: 'en-US',
    about: [
      'AI governance',
      'enterprise AI architecture',
      'agentic systems',
      'auditability',
      'platform engineering',
    ],
  }
}

export function buildCollectionPageSchema({
  path,
  name,
  description,
}: {
  path: string
  name: string
  description: string
}): JsonLdEntity {
  return {
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(path)}#collection`,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      '@id': `${siteUrl}/#website`,
    },
    author: {
      '@id': `${siteUrl}/#person`,
    },
  }
}

export function createGraph(entities: JsonLdEntity[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': entities,
  }
}
