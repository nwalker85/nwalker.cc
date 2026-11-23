import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Architecture | Nathan Walker',
  description:
    'Systems philosophy and infrastructure proof — how I think about and build production systems, and how this site is actually deployed.',
  alternates: {
    canonical: '/architecture',
  },
}

const principles = [
  'Segmented VLAN trust zones with zero-trust inter-VLAN policy enforcement',
  'Isolated inference plane — GPU workloads separated from general compute',
  'Kubernetes workload fabric across a 3-node HA cluster',
  'Cryptographic identity for every service, no implicit trust',
  'Immutable infrastructure — nothing is patched in place',
]

// What this site actually is. Every line is a property of the artifact that
// served this page, verifiable by viewing source and following the repository.
const delivery = [
  { label: 'Build', value: 'GitHub Actions — lint, unit tests, static export on every PR' },
  { label: 'Output', value: 'Plain HTML, CSS, and JS in an immutable artifact' },
  { label: 'Serving', value: 'CDN edge, no origin server, nothing to patch or restart' },
  { label: 'TLS', value: 'Managed certificates, automated renewal, HSTS at the edge' },
  { label: 'Deploy', value: 'Merge to the release branch — the artifact is the deploy' },
  { label: 'Rollback', value: 'Revert the commit; the previous artifact republishes' },
  { label: 'State', value: 'None. No database, no session store, no cookies' },
  { label: 'Credentials', value: 'None in the build or the served artifact' },
]

const estate = [
  { label: 'Engines', value: '198 repositories under active management' },
  { label: 'Services', value: '103 running — containers, supervised agents, resident daemons' },
  { label: 'Devices', value: '628 catalogued across three sites, identity-resolved past MAC rotation' },
  { label: 'Zones', value: '14 segmented trust zones, per-tier firewall policy' },
  { label: 'Operators', value: 'One' },
]

export default function ArchitecturePage() {
  return (
    <main className="px-8">
      <div className="max-w-[720px] mx-auto py-32">
        {/* Layer A — Systems Philosophy */}
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Systems Philosophy
        </p>
        <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-6">
          Infrastructure Is a Reflection of Judgment
        </h2>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
          I operate a segmented, 10Gb, GPU-backed private AI fabric — not as a hobby, but as a proving ground for the systems I design for regulated environments. Every architectural decision here maps to a production pattern I&apos;d deploy for a customer.
        </p>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12">
          Trust zones enforce lateral movement boundaries. Inference workloads run on an isolated plane. Governance primitives sit between agents and the tools they call. The question isn&apos;t whether the system works — it&apos;s whether the system survives scrutiny.
        </p>

        <ul className="space-y-4 mb-16 list-none">
          {principles.map((item) => (
            <li key={item} className="text-[var(--text-muted)] text-base">
              {item}
            </li>
          ))}
        </ul>

        <div className="space-y-2 mb-20">
          <p className="text-[var(--text-primary)] text-lg font-medium">
            Systems should fail safely.
          </p>
          <p className="text-[var(--text-primary)] text-lg font-medium">
            They should scale intentionally.
          </p>
          <p className="text-[var(--text-primary)] text-lg font-medium">
            They should survive audit.
          </p>
        </div>

        {/* Layer B — Infrastructure Proof */}
        <section className="border-t border-[var(--edge)] pt-16">
          <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
            Infrastructure Proof
          </p>
          <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-6">
            How This Site Is Deployed
          </h2>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
            This site is a static export. It is compiled to plain HTML at build
            time and served from a CDN edge — there is no origin server, no
            container, and no runtime to fail.
          </p>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12">
            An earlier version ran on managed containers behind a load balancer,
            with VPC isolation and infrastructure-as-code. It was a good
            demonstration of those patterns and a bad way to host four pages of
            prose: the app cost almost nothing while the load balancer and NAT
            gateway cost the most, and any control-plane mistake took the whole
            site down. A portfolio that can return an error page is a weaker
            argument than one that cannot. So the demonstration moved to where
            the complexity actually earns its keep, and the front door became
            undestroyable.
          </p>

          <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-6">
            Delivery Properties
          </h3>
          <div className="space-y-4 mb-16">
            {delivery.map((s) => (
              <div key={s.label} className="flex items-baseline gap-4">
                <span className="text-[var(--text-primary)] font-medium text-sm font-[family-name:var(--font-mono)] min-w-[100px] shrink-0">
                  {s.label}
                </span>
                <span className="text-[var(--text-muted)] text-sm">
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-4">
            Where the Complexity Went
          </h3>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-8">
            The infrastructure work this site used to advertise still exists — it
            just runs where it is load-bearing, behind a private estate rather
            than beneath a brochure. Aggregates, because the details are not a
            marketing surface:
          </p>
          <div className="space-y-4 mb-12">
            {estate.map((s) => (
              <div key={s.label} className="flex items-baseline gap-4">
                <span className="text-[var(--text-primary)] font-medium text-sm font-[family-name:var(--font-mono)] min-w-[100px] shrink-0">
                  {s.label}
                </span>
                <span className="text-[var(--text-muted)] text-sm">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-12">
            The dated record of what was built on it is at{' '}
            <a
              className="text-[var(--text-primary)] underline underline-offset-4"
              href="https://nwalker85.github.io/wins/"
            >
              the done log
            </a>
            .
          </p>

          <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-4">
            CI/CD Pipeline
          </h3>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-6">
            Pull requests run lint, the unit suite, and a production build —
            a build that fails to export never reaches the branch. Merge
            publishes the exported artifact. There is no deploy step that can
            drift from the source, because the artifact <em>is</em> the source
            compiled.
          </p>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-6">
            A synthetic probe runs on a schedule against the live host, checking
            real routes rather than a health endpoint — a static site has no
            runtime to report on, so a 200 for a page nobody can render proves
            nothing. Probe failures open a GitHub issue with the failing output
            attached.
          </p>

          <p className="text-[var(--text-primary)] text-lg font-medium border-l-2 border-[var(--primary)] pl-6 my-12">
            &ldquo;If the infrastructure isn&apos;t good enough for your own portfolio, why would a customer trust you with theirs?&rdquo;
          </p>
        </section>
      </div>
    </main>
  )
}
