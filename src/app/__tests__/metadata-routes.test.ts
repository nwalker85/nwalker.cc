import { describe, expect, it } from 'vitest'
import robots from '../robots'
import sitemap from '../sitemap'

describe('metadata routes', () => {
  it('advertises the production sitemap from robots.txt', () => {
    const rules = robots()

    expect(rules.sitemap).toBe('https://nwalker.cc/sitemap.xml')
    expect(rules.rules).toEqual({
      userAgent: '*',
      allow: '/',
    })
  })

  it('lists citable and primary pages in sitemap.xml', () => {
    const entries = sitemap()
    const urls = entries.map((entry) => entry.url)

    expect(urls).toContain('https://nwalker.cc/')
    expect(urls).toContain('https://nwalker.cc/architecture')
    expect(urls).toContain('https://nwalker.cc/enterprise')
    expect(urls).toContain('https://nwalker.cc/philosophy')
    expect(urls).toContain('https://nwalker.cc/runestack')
    expect(urls).toContain('https://nwalker.cc/ecosystem')
    expect(urls).toContain('https://nwalker.cc/definitions')
    expect(urls).toContain('https://nwalker.cc/frameworks')
    expect(urls).toContain('https://nwalker.cc/patterns')
  })
})
