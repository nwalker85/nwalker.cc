import { describe, expect, it } from 'vitest'
import { evaluateDemoRequest } from '../accountability'

describe('evaluateDemoRequest', () => {
  it('approves a contained manager refund inside threshold', () => {
    const result = evaluateDemoRequest({
      scenarioId: 'refund',
      actorRole: 'manager',
      amount: 4200,
      hasJustification: true,
      containmentEnabled: true,
    })

    expect(result.verdict).toBe('approved')
    expect(result.receipt.allowedTool).toBe('billing.refund.create')
  })

  it('escalates external mutation when containment is disabled', () => {
    const result = evaluateDemoRequest({
      scenarioId: 'refund',
      actorRole: 'manager',
      amount: 4200,
      hasJustification: true,
      containmentEnabled: false,
    })

    expect(result.verdict).toBe('escalated')
    expect(result.receipt.allowedTool).toBeNull()
    expect(result.findings.some((finding) => finding.label === 'Mutation containment')).toBe(true)
  })

  it('blocks regulated exports without justification', () => {
    const result = evaluateDemoRequest({
      scenarioId: 'phi-export',
      actorRole: 'admin',
      amount: 12000,
      hasJustification: false,
      containmentEnabled: true,
    })

    expect(result.verdict).toBe('blocked')
    expect(result.receipt.allowedTool).toBeNull()
  })
})
