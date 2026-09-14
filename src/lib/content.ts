import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

// The published-content repo (nwalker85/nwalker-cc-published) is fetched into
// content/published/ at build time by scripts/fetch-published.sh. Essays live
// at nwalker-cc/essays/<slug>.md with YAML frontmatter.
export const DEFAULT_ESSAYS_DIR = path.join(
  process.cwd(),
  'content',
  'published',
  'nwalker-cc',
  'essays',
)

export type PublishedEssayKind = 'field-note' | 'campaign' | 'research'

export interface PublishedEssayFrontmatter {
  title?: string
  slug?: string
  // YAML parses an unquoted `2026-08-01` as a Date, so accept either.
  date?: string | Date
  // Written by an older seed schema; treated as a date fallback when `date`
  // is absent (see example-essay.md in the published repo).
  updated_at?: string | Date
  kind?: PublishedEssayKind
  description?: string
  substack_url?: string
  canonical_url?: string
  og_image?: string
  status?: string
  // Bifröst promotion gate. `true` marks a released entry; the promotion
  // Action only ever lands eligible files in the published repo, so an
  // absent field means an older seed and is also treated as eligible.
  publish_eligible?: boolean
}

export interface PublishedEssay {
  slug: string
  title: string
  date: string | null
  kind: PublishedEssayKind | null
  description: string
  substackUrl: string | null
  canonicalUrl: string | null
  ogImage: string | null
  html: string
}

function isPublishEligible(fm: PublishedEssayFrontmatter): boolean {
  return fm.publish_eligible === undefined || fm.publish_eligible === true
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, '')
}

// YAML parses an unquoted `2026-08-01` as a Date, not a string, so
// frontmatter fields must tolerate both representations.
function toDateString(value: unknown): string | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }
  if (typeof value === 'string' && value.trim() !== '') {
    return value.slice(0, 10)
  }
  return null
}

function normalizeDate(fm: PublishedEssayFrontmatter): string | null {
  return toDateString(fm.date) ?? toDateString(fm.updated_at)
}

function renderMarkdown(markdown: string): string {
  const file = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .processSync(markdown)
  return String(file)
}

function listEssayFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((filename) => filename.endsWith('.md'))
    .sort()
}

function parseEssayFile(dir: string, filename: string): PublishedEssay | null {
  const raw = fs.readFileSync(path.join(dir, filename), 'utf8')
  const { data, content } = matter(raw)
  const fm = data as PublishedEssayFrontmatter

  if (!fm.title || !isPublishEligible(fm)) return null

  return {
    slug: fm.slug || slugFromFilename(filename),
    title: fm.title,
    date: normalizeDate(fm),
    kind: fm.kind ?? null,
    description: fm.description ?? '',
    substackUrl: fm.substack_url ?? null,
    canonicalUrl: fm.canonical_url ?? null,
    ogImage: fm.og_image ?? null,
    html: renderMarkdown(content),
  }
}

/** All publish-eligible essays from the corpus, sorted by date descending. */
export function getPublishedEssays(dir: string = DEFAULT_ESSAYS_DIR): PublishedEssay[] {
  const essays = listEssayFiles(dir)
    .map((filename) => parseEssayFile(dir, filename))
    .filter((essay): essay is PublishedEssay => essay !== null)

  return essays.sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date)
    if (a.date) return -1
    if (b.date) return 1
    return a.title.localeCompare(b.title)
  })
}

/** A single published essay by slug, or null if absent / not eligible. */
export function getPublishedEssay(
  slug: string,
  dir: string = DEFAULT_ESSAYS_DIR,
): PublishedEssay | null {
  return getPublishedEssays(dir).find((essay) => essay.slug === slug) ?? null
}
