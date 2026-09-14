import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EnterprisePage from '../enterprise/page'

describe('Enterprise page', () => {
  it('renders the five executive sections', () => {
    render(<EnterprisePage />)
    expect(screen.getByText('Leadership Scope')).toBeTruthy()
    expect(screen.getByText('Enterprise Wins')).toBeTruthy()
    expect(screen.getByText('Organizational Scaling')).toBeTruthy()
    expect(screen.getByText('Platform Expertise')).toBeTruthy()
    expect(screen.getByText('Governance and Compliance')).toBeTruthy()
  })

  it('uses the canonical conversion metric with its definition', () => {
    const { container } = render(<EnterprisePage />)
    expect(container).toHaveTextContent(/38%/)
    expect(container).not.toHaveTextContent(/76%/)
    expect(container).toHaveTextContent(/structured POC governance/i)
  })

  it('embeds the expanded analyst recognition strip', () => {
    render(<EnterprisePage />)
    expect(screen.getByText(/2025 Analyst Recognition/)).toBeTruthy()
    expect(screen.getByText(/Gartner and Magic Quadrant are registered trademarks/)).toBeTruthy()
  })
})
