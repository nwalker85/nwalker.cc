import type { MetadataRoute } from 'next'
import { absoluteUrl, allSitemapPages } from '@/lib/seo/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return allSitemapPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: 'weekly',
    priority: page.priority,
  }))
}
