import { describe, expect, it } from 'vitest'
import nextConfig from '../../next.config'

describe('Next config', () => {
  it('disables framework fingerprinting', () => {
    expect(nextConfig.poweredByHeader).toBe(false)
  })

  // The site is served from a CDN as static files. These two properties are
  // what make that true, and a regression in either one silently reintroduces
  // an origin server requirement.
  it('exports a static site', () => {
    expect(nextConfig.output).toBe('export')
  })

  it('emits directory-style routes so the CDN resolves them without a redirect', () => {
    expect(nextConfig.trailingSlash).toBe(true)
  })

  // `headers()` is unsupported under `output: "export"`. Header policy lives at
  // the edge now; keeping a headers() block here would be an unenforced control
  // that reads like an enforced one.
  it('does not declare unsupported response headers', () => {
    expect(nextConfig.headers).toBeUndefined()
  })
})
