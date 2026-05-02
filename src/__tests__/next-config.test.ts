import { describe, expect, it } from 'vitest'
import nextConfig from '../../next.config'

describe('Next config', () => {
  it('disables framework fingerprinting', () => {
    expect(nextConfig.poweredByHeader).toBe(false)
  })

  it('sets browser hardening headers for every route', async () => {
    expect(nextConfig.headers).toBeTypeOf('function')

    const headers = await nextConfig.headers?.()
    const globalHeaders = headers?.find((entry) => entry.source === '/(.*)')?.headers ?? []
    const headerNames = globalHeaders.map((header) => header.key)

    expect(headerNames).toContain('Strict-Transport-Security')
    expect(headerNames).toContain('Content-Security-Policy')
    expect(headerNames).toContain('X-Content-Type-Options')
    expect(headerNames).toContain('Referrer-Policy')
    expect(headerNames).toContain('Permissions-Policy')
  })
})
