import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPublishedEssay, getPublishedEssays } from '@/lib/content'

// Hand-written essay directories (src/app/writing/<slug>/page.tsx) take
// routing precedence over this dynamic segment automatically — Next.js
// resolves static path segments before dynamic ones. This set is a defensive
// belt: it keeps the corpus from ever generating a static param, or serving
// a page, for a slug that already has a hand-written route.
const STATIC_WRITING_DIR = path.join(process.cwd(), 'src', 'app', 'writing')

function reservedSlugs(): Set<string> {
  if (!fs.existsSync(STATIC_WRITING_DIR)) return new Set()
  return new Set(
    fs
      .readdirSync(STATIC_WRITING_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name !== '[slug]')
      .map((entry) => entry.name),
  )
}

type RouteParams = { slug: string }

export function generateStaticParams(): RouteParams[] {
  const reserved = reservedSlugs()
  return getPublishedEssays()
    .filter((essay) => !reserved.has(essay.slug))
    .map((essay) => ({ slug: essay.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>
}): Promise<Metadata> {
  const { slug } = await params
  if (reservedSlugs().has(slug)) return {}

  const essay = getPublishedEssay(slug)
  if (!essay) return {}

  const canonical = essay.canonicalUrl ?? `/writing/${essay.slug}`

  return {
    title: `${essay.title} | Nathan Walker`,
    description: essay.description || undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'article',
      title: essay.title,
      description: essay.description || undefined,
      url: `/writing/${essay.slug}`,
      ...(essay.ogImage
        ? {
            images: [
              {
                url: essay.ogImage,
                width: 1200,
                height: 630,
                alt: `${essay.title} — nwalker.cc`,
              },
            ],
          }
        : {}),
    },
  }
}

export default async function PublishedEssayPage({
  params,
}: {
  params: Promise<RouteParams>
}) {
  const { slug } = await params
  if (reservedSlugs().has(slug)) {
    notFound()
  }

  const essay = getPublishedEssay(slug)
  if (!essay) {
    notFound()
  }

  return (
    <main className="px-8">
      <article className="max-w-[720px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Writing{essay.date ? ` · ${essay.date}` : ''}
        </p>
        <h1 className="text-[var(--text-primary)] text-4xl md:text-5xl font-semibold tracking-tight mb-6">
          {essay.title}
        </h1>
        {essay.description ? (
          <p className="text-[var(--text-secondary)] text-xl leading-relaxed mb-12">
            {essay.description}
          </p>
        ) : null}

        <div className="prose-beep space-y-5 text-[var(--text-secondary)] text-lg leading-relaxed">
          {essay.substackUrl ? (
            <p className="italic text-[var(--text-muted)]">
              The figures and full formatting are in the{' '}
              <a className="underline underline-offset-4" href={essay.substackUrl}>
                Substack cut
              </a>
              . This page is the argument.
            </p>
          ) : null}
          {/* HTML is rendered from markdown by src/lib/content.ts via
              rehype-sanitize before it ever reaches this component. */}
          <div dangerouslySetInnerHTML={{ __html: essay.html }} />
        </div>

        <p className="pt-10 mt-10 border-t border-[var(--border)] text-base text-[var(--text-muted)]">
          Nathan Walker
          {essay.canonicalUrl ? (
            <>
              {' '}
              &middot;{' '}
              <a className="underline underline-offset-4" href={essay.canonicalUrl}>
                Canonical
              </a>
            </>
          ) : null}
          {essay.substackUrl ? (
            <>
              {' '}
              &middot;{' '}
              <a className="underline underline-offset-4" href={essay.substackUrl}>
                Substack
              </a>
            </>
          ) : null}
        </p>
      </article>
    </main>
  )
}
