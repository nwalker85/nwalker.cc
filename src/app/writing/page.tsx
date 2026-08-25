import type { Metadata } from 'next'
import Link from 'next/link'

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

const posts = [
  {
    href: '/writing/nothing-scripts-the-eyebrows',
    date: '2026-08-25',
    title: 'Nothing scripts the eyebrows',
    blurb:
      'A face that infers emphasis from the loudness of its own voice, fifty times a second. No animation track, no keyframe, no list of words.',
  },
  {
    href: '/writing/the-beep',
    date: '2026-08-04',
    title: 'The Beep',
    blurb:
      'A mystery notification becomes a forensic CLI and a claim about delegation without contract.',
  },
]

export default function WritingIndexPage() {
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
              <p className="text-[var(--text-muted)] text-sm mb-2">{post.date}</p>
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
