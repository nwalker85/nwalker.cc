'use client'

import { useMemo, useState } from 'react'
import {
  type ActorRole,
  demoScenarios,
  evaluateDemoRequest,
  getScenario,
} from '@/lib/demo/accountability'

const actorOptions: { value: ActorRole; label: string }[] = [
  { value: 'analyst', label: 'Analyst' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Admin' },
]

const verdictStyles = {
  approved: 'text-[var(--status-success)] border-[rgba(45,203,112,0.35)] bg-[rgba(45,203,112,0.08)]',
  escalated: 'text-[var(--status-warning)] border-[rgba(227,179,65,0.38)] bg-[rgba(227,179,65,0.08)]',
  blocked: 'text-[var(--status-error)] border-[rgba(255,77,79,0.38)] bg-[rgba(255,77,79,0.08)]',
}

const findingStyles = {
  pass: 'text-[var(--status-success)]',
  warn: 'text-[var(--status-warning)]',
  fail: 'text-[var(--status-error)]',
}

export function AccountabilityDemo() {
  const [scenarioId, setScenarioId] = useState(demoScenarios[0].id)
  const [actorRole, setActorRole] = useState<ActorRole>('manager')
  const [amount, setAmount] = useState(demoScenarios[0].defaultAmount)
  const [hasJustification, setHasJustification] = useState(true)
  const [containmentEnabled, setContainmentEnabled] = useState(true)
  const [runCount, setRunCount] = useState(1)

  const scenario = getScenario(scenarioId)
  const evaluation = useMemo(
    () =>
      evaluateDemoRequest({
        scenarioId,
        actorRole,
        amount,
        hasJustification,
        containmentEnabled,
      }),
    [scenarioId, actorRole, amount, hasJustification, containmentEnabled],
  )

  function markInteraction() {
    setRunCount((count) => count + 1)
  }

  function selectScenario(id: string) {
    const next = getScenario(id)
    setScenarioId(id)
    setAmount(next.defaultAmount)
    setActorRole(next.requiredRole)
    setHasJustification(next.dataClass !== 'regulated')
    setContainmentEnabled(true)
    markInteraction()
  }

  return (
    <div className="border border-[var(--edge)] bg-[var(--surface)]">
      <div className="grid lg:grid-cols-[360px_1fr]">
        <aside className="border-b lg:border-b-0 lg:border-r border-[var(--edge)] p-5 md:p-6">
          <div className="mb-8">
            <p className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-3">
              Request
            </p>
            <div className="grid gap-2">
              {demoScenarios.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectScenario(item.id)}
                  className={`text-left border px-4 py-3 transition-colors cursor-pointer ${
                    scenarioId === item.id
                      ? 'border-[var(--primary)] bg-[rgba(30,103,255,0.08)]'
                      : 'border-[var(--edge)] hover:border-[var(--text-muted)]'
                  }`}
                >
                  <span className="block text-[var(--text-primary)] text-sm font-medium mb-1">
                    {item.name}
                  </span>
                  <span className="block text-[var(--text-muted)] text-xs leading-relaxed">
                    {item.tool}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <label className="block">
              <span className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase block mb-2">
                Actor Authority
              </span>
              <select
                value={actorRole}
                onChange={(event) => {
                  setActorRole(event.target.value as ActorRole)
                  markInteraction()
                }}
                className="w-full bg-[var(--background)] border border-[var(--edge)] px-3 py-3 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--primary)]"
              >
                {actorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase block mb-2">
                Request Value
              </span>
              <input
                type="range"
                min="0"
                max="20000"
                step="500"
                value={amount}
                onChange={(event) => {
                  setAmount(Number(event.target.value))
                  markInteraction()
                }}
                className="w-full accent-[var(--primary)]"
              />
              <span className="text-[var(--text-primary)] font-[family-name:var(--font-mono)] text-sm">
                ${amount.toLocaleString()}
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasJustification}
                onChange={(event) => {
                  setHasJustification(event.target.checked)
                  markInteraction()
                }}
                className="mt-1 accent-[var(--primary)]"
              />
              <span>
                <span className="block text-[var(--text-primary)] text-sm font-medium">
                  Business justification attached
                </span>
                <span className="block text-[var(--text-muted)] text-xs leading-relaxed">
                  Required for regulated data paths.
                </span>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={containmentEnabled}
                onChange={(event) => {
                  setContainmentEnabled(event.target.checked)
                  markInteraction()
                }}
                className="mt-1 accent-[var(--primary)]"
              />
              <span>
                <span className="block text-[var(--text-primary)] text-sm font-medium">
                  Mutation containment enabled
                </span>
                <span className="block text-[var(--text-muted)] text-xs leading-relaxed">
                  External effects require rollback or approval.
                </span>
              </span>
            </label>
          </div>
        </aside>

        <section className="p-5 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-8">
            <div>
              <p className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-2">
                Governed Evaluation #{runCount.toString().padStart(2, '0')}
              </p>
              <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                {scenario.name}
              </h2>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-[680px]">
                {scenario.intent}
              </p>
            </div>
            <div className={`border px-4 py-2 text-sm font-[family-name:var(--font-mono)] uppercase tracking-widest ${verdictStyles[evaluation.verdict]}`}>
              {evaluation.verdict}
            </div>
          </div>

          <div className="grid md:grid-cols-4 border border-[var(--edge)] mb-8">
            {[
              ['Intent', 'parsed'],
              ['Authority', actorRole],
              ['Policy', evaluation.verdict === 'blocked' ? 'failed' : 'checked'],
              ['Tool Grant', evaluation.receipt.allowedTool ? 'scoped' : 'withheld'],
            ].map(([label, value], index) => (
              <div key={label} className={`p-4 ${index < 3 ? 'border-b md:border-b-0 md:border-r border-[var(--edge)]' : ''}`}>
                <p className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-2">
                  {label}
                </p>
                <p className="text-[var(--text-primary)] text-sm font-[family-name:var(--font-mono)]">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[var(--text-primary)] text-lg leading-relaxed mb-8">
            {evaluation.summary}
          </p>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            <div>
              <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-4">
                Control Checks
              </h3>
              <div className="space-y-4">
                {evaluation.findings.map((finding) => (
                  <article key={finding.label} className="border-t border-[var(--edge)] pt-4">
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h4 className="text-[var(--text-primary)] text-sm font-medium">
                        {finding.label}
                      </h4>
                      <span className={`text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest ${findingStyles[finding.status]}`}>
                        {finding.status}
                      </span>
                    </div>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                      {finding.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="border border-[var(--edge)] bg-[var(--background)] p-5 h-fit">
              <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-5">
                Evidence Receipt
              </h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-1">Receipt</dt>
                  <dd className="text-[var(--text-primary)] font-[family-name:var(--font-mono)] text-sm">{evaluation.receipt.id}</dd>
                </div>
                <div>
                  <dt className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-1">Authority Chain</dt>
                  <dd className="text-[var(--text-secondary)] text-sm">{evaluation.receipt.authorityChain.join(' -> ')}</dd>
                </div>
                <div>
                  <dt className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-1">Tool</dt>
                  <dd className="text-[var(--text-secondary)] text-sm break-all">{evaluation.receipt.allowedTool ?? 'withheld pending control resolution'}</dd>
                </div>
                <div>
                  <dt className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-1">Policies</dt>
                  <dd className="text-[var(--text-secondary)] text-sm">{evaluation.receipt.policyIds.join(', ')}</dd>
                </div>
                <div>
                  <dt className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-1">Evidence Hash</dt>
                  <dd className="text-[var(--text-primary)] font-[family-name:var(--font-mono)] text-sm">{evaluation.receipt.evidenceHash}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>
      </div>
    </div>
  )
}
