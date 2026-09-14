import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AddToContactsButton, isIOS } from '@/components/sections/AddToContactsButton'

const raw = readFileSync(join(__dirname, '../../../public/nathan-walker.vcf'), 'utf8')
const lines = raw.split('\r\n')

describe('public/nathan-walker.vcf', () => {
  it('uses CRLF line endings exclusively', () => {
    expect(raw.endsWith('\r\n')).toBe(true)
    expect(raw.replace(/\r\n/g, '')).not.toMatch(/[\r\n]/)
  })

  it('is a well-formed vCard 3.0 envelope', () => {
    expect(lines[0]).toBe('BEGIN:VCARD')
    expect(lines[1]).toBe('VERSION:3.0')
    expect(lines.at(-2)).toBe('END:VCARD')
    expect(lines.at(-1)).toBe('')
  })

  it('carries the required identity fields', () => {
    expect(lines).toContain('N:Walker;Nathan;;;')
    expect(lines).toContain('FN:Nathan Walker')
    expect(lines).toContain('ORG:Ravenhelm')
    expect(lines).toContain('EMAIL;TYPE=INTERNET,WORK:nate@ravenhelm.co')
    expect(lines).toContain('TEL;TYPE=CELL,VOICE:+15127812507')
    expect(lines).toContain('URL:https://nwalker.cc')
    expect(lines).toContain('URL:https://ravenhelm.ai')
    expect(lines).toContain('URL;TYPE=LinkedIn:https://www.linkedin.com/in/nwalker85')
    expect(lines).toContain('URL;TYPE=Substack:https://nwalker85.substack.com')
    expect(lines).toContain('X-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/in/nwalker85')
    expect(lines).toContain('X-SOCIALPROFILE;TYPE=substack:https://nwalker85.substack.com')
    expect(lines.some((l) => /^REV:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(l))).toBe(true)
  })

  it('stays small and has no remote photo', () => {
    expect(Buffer.byteLength(raw, 'utf8')).toBeLessThan(150 * 1024)
    expect(raw).not.toMatch(/^PHOTO;VALUE=URI/m)
  })
})

describe('QR assets', () => {
  it('encode the vCard URL and exist in both formats', () => {
    const svg = readFileSync(join(__dirname, '../../../public/qr-contact.svg'), 'utf8')
    expect(svg).toContain('<svg')
    const png = readFileSync(join(__dirname, '../../../public/qr-contact.png'))
    expect(png.subarray(0, 8)).toEqual(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  })
})

describe('AddToContactsButton', () => {
  it('detects iOS user agents and iPadOS-as-Mac', () => {
    expect(isIOS('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', 5, 'iPhone')).toBe(true)
    expect(isIOS('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 5, 'MacIntel')).toBe(true)
    expect(isIOS('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 0, 'MacIntel')).toBe(false)
    expect(isIOS('Mozilla/5.0 (Windows NT 10.0)', 0, 'Win32')).toBe(false)
  })

  it('renders a link to the vCard', () => {
    render(<AddToContactsButton />)
    const link = screen.getByRole('link', { name: /add to contacts/i })
    expect(link).toHaveAttribute('href', '/nathan-walker.vcf')
  })
})
