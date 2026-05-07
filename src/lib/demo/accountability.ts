export type ActorRole = 'analyst' | 'manager' | 'admin'
export type Verdict = 'approved' | 'escalated' | 'blocked'

export interface DemoScenario {
  id: string
  name: string
  intent: string
  tool: string
  dataClass: 'public' | 'confidential' | 'regulated'
  requiredRole: ActorRole
  defaultAmount: number
  approvalLimit: number
  mutationScope: 'none' | 'internal' | 'external'
  policyIds: string[]
}

export interface DemoInput {
  scenarioId: string
  actorRole: ActorRole
  amount: number
  hasJustification: boolean
  containmentEnabled: boolean
}

export interface DemoFinding {
  label: string
  status: 'pass' | 'warn' | 'fail'
  detail: string
}

export interface DemoEvaluation {
  scenario: DemoScenario
  verdict: Verdict
  summary: string
  findings: DemoFinding[]
  receipt: {
    id: string
    authorityChain: string[]
    allowedTool: string | null
    policyIds: string[]
    evidenceHash: string
  }
}

export const actorRank: Record<ActorRole, number> = {
  analyst: 1,
  manager: 2,
  admin: 3,
}

export const demoScenarios: DemoScenario[] = [
  {
    id: 'refund',
    name: 'Customer Refund',
    intent: 'Issue a customer refund after a support agent detects duplicate billing.',
    tool: 'billing.refund.create',
    dataClass: 'confidential',
    requiredRole: 'manager',
    defaultAmount: 4200,
    approvalLimit: 5000,
    mutationScope: 'external',
    policyIds: ['AUTH-210', 'FIN-044', 'MUT-118'],
  },
  {
    id: 'deploy',
    name: 'Production Deploy',
    intent: 'Promote a generated service change into a production workload.',
    tool: 'deploy.production.apply',
    dataClass: 'confidential',
    requiredRole: 'admin',
    defaultAmount: 0,
    approvalLimit: 0,
    mutationScope: 'external',
    policyIds: ['AUTH-300', 'CHANGE-022', 'MUT-118'],
  },
  {
    id: 'phi-export',
    name: 'Regulated Data Export',
    intent: 'Export records for a downstream analytics workflow touching regulated data.',
    tool: 'records.export.create',
    dataClass: 'regulated',
    requiredRole: 'admin',
    defaultAmount: 12000,
    approvalLimit: 10000,
    mutationScope: 'external',
    policyIds: ['AUTH-300', 'DATA-919', 'AUDIT-701'],
  },
]

export function getScenario(id: string) {
  return demoScenarios.find((scenario) => scenario.id === id) ?? demoScenarios[0]
}

function stableHash(value: string) {
  let hash = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0).toString(16).padStart(8, '0')
}

export function evaluateDemoRequest(input: DemoInput): DemoEvaluation {
  const scenario = getScenario(input.scenarioId)
  const findings: DemoFinding[] = []
  let hardBlock = false
  let needsEscalation = false

  if (actorRank[input.actorRole] >= actorRank[scenario.requiredRole]) {
    findings.push({
      label: 'Delegated authority',
      status: 'pass',
      detail: `${input.actorRole} authority satisfies ${scenario.requiredRole} requirement.`,
    })
  } else {
    hardBlock = true
    findings.push({
      label: 'Delegated authority',
      status: 'fail',
      detail: `${input.actorRole} cannot invoke ${scenario.tool}; ${scenario.requiredRole} authority required.`,
    })
  }

  if (scenario.approvalLimit > 0 && input.amount > scenario.approvalLimit) {
    needsEscalation = true
    findings.push({
      label: 'Value threshold',
      status: 'warn',
      detail: `$${input.amount.toLocaleString()} exceeds the $${scenario.approvalLimit.toLocaleString()} automatic approval limit.`,
    })
  } else {
    findings.push({
      label: 'Value threshold',
      status: 'pass',
      detail: scenario.approvalLimit > 0 ? 'Request is inside the automatic approval limit.' : 'No financial threshold applies.',
    })
  }

  if (scenario.dataClass === 'regulated' && !input.hasJustification) {
    hardBlock = true
    findings.push({
      label: 'Regulated data basis',
      status: 'fail',
      detail: 'Regulated data requires an explicit business justification before execution.',
    })
  } else if (scenario.dataClass === 'regulated') {
    findings.push({
      label: 'Regulated data basis',
      status: 'pass',
      detail: 'Business justification is attached to the receipt.',
    })
  } else {
    findings.push({
      label: 'Data handling',
      status: 'pass',
      detail: `${scenario.dataClass} data class is compatible with this tool path.`,
    })
  }

  if (scenario.mutationScope === 'external' && !input.containmentEnabled) {
    needsEscalation = true
    findings.push({
      label: 'Mutation containment',
      status: 'warn',
      detail: 'External side effects require containment, rollback, or human approval.',
    })
  } else {
    findings.push({
      label: 'Mutation containment',
      status: 'pass',
      detail: scenario.mutationScope === 'none' ? 'Read-only request.' : 'Mutation boundary is declared and contained.',
    })
  }

  const verdict: Verdict = hardBlock ? 'blocked' : needsEscalation ? 'escalated' : 'approved'
  const allowedTool = verdict === 'approved' ? scenario.tool : null
  const receiptSeed = [
    scenario.id,
    input.actorRole,
    input.amount,
    input.hasJustification,
    input.containmentEnabled,
    verdict,
    scenario.policyIds.join(':'),
  ].join('|')

  return {
    scenario,
    verdict,
    summary: {
      approved: 'Request can execute. The agent receives a scoped tool grant and a signed evidence receipt.',
      escalated: 'Request is not denied, but execution pauses for human approval at the control boundary.',
      blocked: 'Request is blocked before tool access. The failed checks are still recorded as evidence.',
    }[verdict],
    findings,
    receipt: {
      id: `rcpt-${stableHash(receiptSeed).slice(0, 6)}`,
      authorityChain: ['Nathan Walker', input.actorRole, 'governed agent'],
      allowedTool,
      policyIds: scenario.policyIds,
      evidenceHash: stableHash(`${receiptSeed}|evidence`),
    },
  }
}
