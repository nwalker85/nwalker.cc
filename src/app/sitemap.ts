import type { MetadataRoute } from 'next'
import { absoluteUrl, allSitemapPages } from '@/lib/seo/site'
import { getPublishedEssays } from '@/lib/content'

const staticPaths = new Set<string>(allSitemapPages.map((page) => page.path))

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticEntries: MetadataRoute.Sitemap = allSitemapPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: 'weekly',
    priority: page.priority,
  }))

  // Published essays not already covered by a static (hand-written) entry —
  // avoids listing the same /writing/<slug> path twice.
  const corpusEntries: MetadataRoute.Sitemap = getPublishedEssays()
    .map((essay) => `/writing/${essay.slug}`)
    .filter((path) => !staticPaths.has(path))
    .map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    }))

  return [...staticEntries, ...corpusEntries]
}
