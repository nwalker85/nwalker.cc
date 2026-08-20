import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Beep | Nathan Walker',
  description:
    'A beep from an AI subagent that ignored notification settings becomes a forensic CLI, a bug report, and a claim about delegation without contract.',
  openGraph: {
    title: 'The Beep',
    description:
      'Capabilities forwarded. Constraints dropped. The smallest observable instance of a bug class about to be everywhere.',
    type: 'article',
    url: 'https://nwalker.cc/writing/the-beep',
  },
  alternates: {
    canonical: '/writing/the-beep',
  },
}

export default function TheBeepPage() {
  return (
    <main className="px-8">
      <article className="max-w-[720px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Writing · 2026-08-04
        </p>
        <h1 className="text-[var(--text-primary)] text-4xl md:text-5xl font-semibold tracking-tight mb-6">
          The Beep
        </h1>
        <p className="text-[var(--text-secondary)] text-xl leading-relaxed mb-12">
          It was 2 AM and something beeped at me.
        </p>

        <div className="prose-beep space-y-5 text-[var(--text-secondary)] text-lg leading-relaxed">
          <p>
            Not a notification I could find. Not a banner, not a badge, nothing
            in Notification Center&apos;s recent history that matched. Just a
            beep — the short, confident kind that says{' '}
            <em>something happened and I&apos;ve decided you should know</em> —
            from somewhere inside my own machine, sent by something that
            declined to identify itself.
          </p>
          <p>
            Most people turn the volume down. I want to be clear that I
            understand that option exists.
          </p>
          <p>
            Instead I opened a session and started asking questions, which is
            how most of my projects begin — not with a repo or a plan, but with
            a demand to know what just happened. A few hours later the demand
            had a name, a Swift codebase, and eventually a Homebrew formula.
          </p>

          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight pt-6">
            noise-watch
          </h2>
          <p>
            macOS will happily tell you <em>that</em> audio is playing. It is
            much less forthcoming about <em>who</em> is making noise, and nearly
            silent about who <em>just did</em> — the transient chirp that&apos;s
            gone before you can alt-tab is, forensically speaking, a
            hit-and-run.
          </p>
          <p>
            So the tool works at the layer that can&apos;t lie. It polls
            CoreAudio&apos;s process clients at intervals down to 20
            milliseconds, because the beeps worth catching last about 200. It
            decodes Notification Center&apos;s own on-disk records: the sending
            app, the bundle ID, the notification&apos;s authorization state, and
            the text itself.
          </p>
          <pre className="bg-[var(--bg-secondary)] border border-[var(--border)] p-4 text-sm overflow-x-auto font-mono text-[var(--text-primary)]">
            {`brew tap nwalker85/tools
brew install noise-watch
noise-watch`}
          </pre>
          <p>
            Source:{' '}
            <a
              className="underline underline-offset-4"
              href="https://github.com/nwalker85/noise-watch"
            >
              github.com/nwalker85/noise-watch
            </a>
            . It prints the app, the bundle ID, whether that sender is{' '}
            <em>authorized</em> to notify you, and what it said. A subpoena for
            a sound.
          </p>

          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight pt-6">
            The catch
          </h2>
          <p>
            I built it for a mystery beep. What it caught was more interesting.
          </p>
          <p>
            The noise was coming from Cursor — specifically, from its subagents.
            I run agent harnesses heavily; on any given night there are several
            coding agents working in parallel on my machine. I had Cursor&apos;s
            notifications configured the way I wanted them: quiet.
          </p>
          <p>
            The subagents didn&apos;t care. Their notifications came through
            anyway. The setting I had configured governed an entity that
            wasn&apos;t the one making noise. I have the attribution from
            noise-watch; the precise posting path — helper-bundle mismatch
            versus a side channel — is still an open engineering question. I
            filed it with Cursor with the capture attached. It&apos;s a real bug
            class either way. This piece isn&apos;t about Cursor.
          </p>

          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight pt-6">
            What actually happened
          </h2>
          <p>Here is the shape of the event, stripped of the beep:</p>
          <p>
            A parent application held a contract with me — the operating
            system&apos;s notification settings, which are exactly that: a
            user-granted authorization, scoped to an identity. The parent then
            spawned delegates to act on its behalf. The delegates inherited the
            parent&apos;s <em>capabilities</em> — they could do everything the
            parent could do, including make noise on my desk.
          </p>
          <p>
            They did not inherit its <em>contract</em>.
          </p>
          <p>
            Capabilities forwarded. Constraints dropped. The delegation chain
            lost its bindings in transit — and the only reason I know is that I
            happened to have built a forensic instrument the same week, for an
            unrelated grievance.
          </p>
          <p>
            That&apos;s the whole bug class, and it is about to be everywhere,
            because every agent platform on earth is currently learning to spawn
            delegates. Every one of those delegations carries the same question:{' '}
            <em>did the constraints travel with the authority?</em> And almost
            none of our infrastructure can answer it, because almost none of it
            treats the delegation as a first-class object. The authority is
            real. The contract is vibes.
          </p>
          <p>
            A beep is the smallest possible observable instance of this failure.
            The same structure is how an agent with your CRM credentials emails
            your customer list, how a coding agent with deploy rights ships to
            production on a Sunday, how &quot;the AI did it&quot; becomes a
            sentence your compliance team says to a regulator.
          </p>
          <p>
            You do not want to discover that bug class the way I discovered
            mine. Most of it doesn&apos;t beep.
          </p>

          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight pt-6">
            The part where I tell you this has physics
          </h2>
          <p>
            I&apos;ve spent my career deploying AI systems into environments
            where being wrong has a price — a hundred-plus enterprise voice
            deployments, regulated industries, the kind of rooms where
            &quot;trust us&quot; is not an accepted answer. The conclusion I
            keep arriving at from every direction is the same:{' '}
            <strong className="text-[var(--text-primary)]">
              authority without accountability is just permission, and
              permission without proof is a liability with good marketing.
            </strong>
          </p>
          <p>
            So I&apos;ve been building the alternative. Delegations as explicit,
            verifiable objects — contracts that travel with the authority. I
            published the theoretical foundation:
          </p>
          <p>
            <strong className="text-[var(--text-primary)]">
              DOI:{' '}
              <a
                className="underline underline-offset-4"
                href="https://doi.org/10.5281/zenodo.20818597"
              >
                10.5281/zenodo.20818597
              </a>
            </strong>{' '}
            — <em>Agentropy</em>.
          </p>
          <p>
            I build AI systems that can prove what they did. It turns out the
            beep was a demo.
          </p>

          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight pt-6">
            Coda
          </h2>
          <p>
            noise-watch is installable now (
            <a
              className="underline underline-offset-4"
              href="https://github.com/nwalker85/noise-watch"
            >
              github.com/nwalker85/noise-watch
            </a>
            ). The report is with Cursor. The paper is on Zenodo. And if
            you&apos;re shipping a platform that spawns delegates — the question
            worth losing a night&apos;s sleep to is the one the beep asked me:
          </p>
          <p className="text-[var(--text-primary)] text-xl italic py-4">
            When your agents act in your name, can you prove what they were
            allowed to do?
          </p>
          <p>
            If your answer is a settings panel, I have a Swift CLI that would
            like a word.
          </p>

          <p className="pt-10 mt-10 border-t border-[var(--border)] text-base text-[var(--text-muted)]">
            Nathan Walker ·{' '}
            <a className="underline underline-offset-4" href="https://ravenhelm.ai">
              ravenhelm.ai
            </a>{' '}
            ·{' '}
            <a
              className="underline underline-offset-4"
              href="https://ravenhelm.ai/signals/the-beep/"
            >
              Canonical on Ravenhelm
            </a>{' '}
            ·{' '}
            <a
              className="underline underline-offset-4"
              href="https://github.com/nwalker85/noise-watch"
            >
              noise-watch
            </a>
          </p>
        </div>
      </article>
    </main>
  )
}
