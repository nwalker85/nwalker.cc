import type { Metadata } from 'next'
import Link from 'next/link'
import { getPublishedEssays } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Writing | Nathan Walker',
  description: 'Field notes and essays on accountable AI systems.',
  alternates: {
    canonical: '/writing',
  },
  openGraph: {
    type: 'website',
    url: '/writing',
    title: 'Field notes',
    description: 'Field notes and essays on accountable AI systems.',
    images: [{ url: '/og/writing.png', width: 1200, height: 630, alt: 'Field notes — nwalker.cc' }],
  },
}

type WritingIndexEntry = {
  slug: string
  href: string
  date: string | null
  title: string
  blurb: string
}

// Hand-written essays under src/app/writing/<slug>/page.tsx. The corpus
// fetched into content/published/ (see src/lib/content.ts) is merged in
// below; a corpus entry with a matching slug takes precedence.
const handWrittenPosts: WritingIndexEntry[] = [
  {
    slug: 'the-row',
    href: '/writing/the-row',
    date: '2026-08-31',
    title: 'The row',
    blurb:
      'Six years at the presales-to-delivery boundary, one spreadsheet row, and the sixty-year-old mathematics it was hiding.',
  },
  {
    slug: 'nothing-scripts-the-eyebrows',
    href: '/writing/nothing-scripts-the-eyebrows',
    date: '2026-08-25',
    title: 'Nothing scripts the eyebrows',
    blurb:
      'A face that infers emphasis from the loudness of its own voice, fifty times a second. No animation track, no keyframe, no list of words.',
  },
  {
    slug: 'the-beep',
    href: '/writing/the-beep',
    date: '2026-08-04',
    title: 'The Beep',
    blurb:
      'A mystery notification becomes a forensic CLI and a claim about delegation without contract.',
  },
]

function mergedPosts(): WritingIndexEntry[] {
  const bySlug = new Map<string, WritingIndexEntry>()

  for (const post of handWrittenPosts) {
    bySlug.set(post.slug, post)
  }

  for (const essay of getPublishedEssays()) {
    bySlug.set(essay.slug, {
      slug: essay.slug,
      href: `/writing/${essay.slug}`,
      date: essay.date,
      title: essay.title,
      blurb: essay.description,
    })
  }

  return [...bySlug.values()].sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date)
    if (a.date) return -1
    if (b.date) return 1
    return a.title.localeCompare(b.title)
  })
}

export default function WritingIndexPage() {
  const posts = mergedPosts()

  return (
    <main className="px-8">
      <div className="max-w-[720px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Writing
        </p>
        <h1 className="text-[var(--text-primary)] text-3xl md:text-4xl font-semibold tracking-tight mb-12">
          Field notes
        </h1>
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.href} className="border-t border-[var(--border)] pt-8">
              {post.date ? (
                <p className="text-[var(--text-muted)] text-sm mb-2">{post.date}</p>
              ) : null}
              <Link
                href={post.href}
                className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight hover:underline underline-offset-4"
              >
                {post.title}
              </Link>
              <p className="text-[var(--text-secondary)] mt-3 leading-relaxed">
                {post.blurb}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
