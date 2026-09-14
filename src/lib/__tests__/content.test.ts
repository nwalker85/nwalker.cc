import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { getPublishedEssay, getPublishedEssays } from '../content'

let dir: string

function writeEssay(filename: string, contents: string) {
  fs.writeFileSync(path.join(dir, filename), contents, 'utf8')
}

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'nwalker-cc-essays-'))
})

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true })
})

describe('getPublishedEssays', () => {
  it('parses frontmatter and renders GFM markdown to sanitized HTML', () => {
    writeEssay(
      'a-field-note.md',
      `---
title: A field note
date: 2026-08-01
kind: field-note
description: A short note.
substack_url: https://nwalker85.substack.com/p/a-field-note
canonical_url: https://ravenhelm.ai/signals/a-field-note/
og_image: /og/a-field-note.png
---

# Heading

A paragraph with **bold** and a [link](https://example.com).

- one
- two
`,
    )

    const [essay] = getPublishedEssays(dir)

    expect(essay.slug).toBe('a-field-note')
    expect(essay.title).toBe('A field note')
    expect(essay.date).toBe('2026-08-01')
    expect(essay.kind).toBe('field-note')
    expect(essay.description).toBe('A short note.')
    expect(essay.substackUrl).toBe('https://nwalker85.substack.com/p/a-field-note')
    expect(essay.canonicalUrl).toBe('https://ravenhelm.ai/signals/a-field-note/')
    expect(essay.ogImage).toBe('/og/a-field-note.png')
    expect(essay.html).toContain('<h1')
    // rehype-sanitize's default schema clobber-prefixes ids/names to avoid
    // DOM clobbering (mirrors GitHub's own sanitize schema).
    expect(essay.html).toContain('id="user-content-heading"')
    expect(essay.html).toContain('<strong>bold</strong>')
    expect(essay.html).toContain('<li>one</li>')
  })

  it('falls back to the filename stem when slug is absent', () => {
    writeEssay(
      'no-slug.md',
      `---
title: No slug here
date: 2026-08-02
---

Body.
`,
    )

    const [essay] = getPublishedEssays(dir)
    expect(essay.slug).toBe('no-slug')
  })

  it('tolerates missing optional keys entirely', () => {
    writeEssay(
      'minimal.md',
      `---
title: Minimal
---

Body only.
`,
    )

    const [essay] = getPublishedEssays(dir)
    expect(essay.title).toBe('Minimal')
    expect(essay.date).toBeNull()
    expect(essay.kind).toBeNull()
    expect(essay.description).toBe('')
    expect(essay.substackUrl).toBeNull()
    expect(essay.canonicalUrl).toBeNull()
    expect(essay.ogImage).toBeNull()
  })

  it('falls back to updated_at (date part) when date is absent', () => {
    // Matches the synthetic seed schema used by the published repo's
    // example-essay.md (title/status/publish_eligible/updated_at, no date).
    writeEssay(
      'seed.md',
      `---
title: Seed
status: candidate
publish_eligible: true
updated_at: 2026-08-22T00:00:00Z
---

Body.
`,
    )

    const [essay] = getPublishedEssays(dir)
    expect(essay.date).toBe('2026-08-22')
  })

  it('excludes an entry when publish_eligible is explicitly false', () => {
    writeEssay(
      'not-eligible.md',
      `---
title: Not eligible
publish_eligible: false
---

Body.
`,
    )

    expect(getPublishedEssays(dir)).toHaveLength(0)
  })

  it('includes an entry when publish_eligible is absent (older seed)', () => {
    writeEssay(
      'older-seed.md',
      `---
title: Older seed
---

Body.
`,
    )

    expect(getPublishedEssays(dir)).toHaveLength(1)
  })

  it('includes an entry when publish_eligible is explicitly true', () => {
    writeEssay(
      'eligible.md',
      `---
title: Eligible
publish_eligible: true
---

Body.
`,
    )

    expect(getPublishedEssays(dir)).toHaveLength(1)
  })

  it('skips a file with no title', () => {
    writeEssay(
      'no-title.md',
      `---
date: 2026-08-01
---

Body.
`,
    )

    expect(getPublishedEssays(dir)).toHaveLength(0)
  })

  it('sorts dated entries newest first, undated entries last', () => {
    writeEssay('older.md', '---\ntitle: Older\ndate: 2026-01-01\n---\n\nBody.\n')
    writeEssay('newer.md', '---\ntitle: Newer\ndate: 2026-06-01\n---\n\nBody.\n')
    writeEssay('undated.md', '---\ntitle: Undated\n---\n\nBody.\n')

    const titles = getPublishedEssays(dir).map((essay) => essay.title)
    expect(titles).toEqual(['Newer', 'Older', 'Undated'])
  })

  it('returns an empty list when the corpus directory does not exist', () => {
    expect(getPublishedEssays(path.join(dir, 'missing'))).toEqual([])
  })

  it('sanitizes raw HTML embedded in markdown', () => {
    writeEssay(
      'unsafe.md',
      `---
title: Unsafe
---

<script>alert(1)</script>

Safe paragraph.
`,
    )

    const [essay] = getPublishedEssays(dir)
    expect(essay.html).not.toContain('<script>')
    expect(essay.html).toContain('Safe paragraph.')
  })
})

describe('getPublishedEssay', () => {
  it('finds an essay by slug', () => {
    writeEssay('the-thing.md', '---\ntitle: The thing\nslug: the-thing\ndate: 2026-08-01\n---\n\nBody.\n')

    const essay = getPublishedEssay('the-thing', dir)
    expect(essay).not.toBeNull()
    expect(essay?.title).toBe('The thing')
  })

  it('returns null for an unknown slug', () => {
    expect(getPublishedEssay('nope', dir)).toBeNull()
  })
})
