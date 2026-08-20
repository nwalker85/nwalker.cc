import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../page'

describe('Homepage', () => {
  it('renders hero with identity line and thesis statement', () => {
    const { container } = render(<Page />)
    expect(screen.getAllByText('Nathan Walker').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('AI Governance & Enterprise Platforms')).toBeTruthy()
    expect(screen.getByText(/AI eliminated the cost of building/)).toBeTruthy()
    expect(container).toHaveTextContent(/It did not eliminate the cost of being wrong/)
    expect(container.querySelector('p em')?.textContent).toMatch(/wrong/) // owner-canonical emphasis
  })

  it('renders What AI Did Not Collapse with the scar closing line', () => {
    render(<Page />)
    expect(screen.getByText('What AI Did Not Collapse')).toBeTruthy()
    expect(screen.getByText('Security boundary design')).toBeTruthy()
    expect(screen.getByText(/These decisions do not appear in the prompt/)).toBeTruthy()
    expect(screen.getByText(/They appear in the scars/)).toBeTruthy()
    expect(screen.queryByText(/These are not features/)).toBeNull()
  })

  it('renders Enterprise Proof metrics with the canonical conversion number', () => {
    render(<Page />)
    expect(screen.getByText('$50M+')).toBeTruthy()
    expect(screen.getByText('$17M')).toBeTruthy()
    expect(screen.getByText('38%')).toBeTruthy()
    expect(screen.queryByText('76%')).toBeNull()
    expect(screen.getByText(/View Enterprise Work/)).toBeTruthy()
  })

  it('renders the 2025 analyst recognition strip', () => {
    render(<Page />)
    expect(screen.getByText(/2025 Analyst Recognition/)).toBeTruthy()
    expect(screen.getByText(/Everest Group/)).toBeTruthy()
    expect(screen.getByText(/IDC MarketScape/)).toBeTruthy()
    expect(screen.getByText(/Magic Quadrant/)).toBeTruthy()
  })

  it('keeps hardware language off the homepage', () => {
    const { container } = render(<Page />)
    expect(container).not.toHaveTextContent(/10Gb/i)
    expect(container).not.toHaveTextContent(/GPU/i)
  })

  it('renders the Judgment Gap section', () => {
    render(<Page />)
    expect(screen.getByText('The Judgment Gap')).toBeTruthy()
    expect(screen.getByText(/Correct systems are not/)).toBeTruthy()
    expect(screen.getByText(/Judgment determines durability/)).toBeTruthy()
  })

  it('renders accountable AI section', () => {
    render(<Page />)
    expect(screen.getByText(/Accountable AI Is the Logical Conclusion/)).toBeTruthy()
    expect(screen.getByText(/governance becomes mandatory/)).toBeTruthy()
    expect(screen.getByText(/Permission without auditability is fragility/)).toBeTruthy()
  })

  it('renders Contact section', () => {
    render(<Page />)
    expect(screen.getByText('Work With Me')).toBeTruthy()
    expect(screen.getByText(/durability is non-negotiable/)).toBeTruthy()
  })

  it('does not leak a personal mailbox or phone into the homepage crawl', () => {
    const { container } = render(<Page />)
    expect(container.innerHTML).not.toMatch(/gmail\.com/i)
    expect(container.innerHTML).not.toMatch(/781-2507/)
    expect(container.innerHTML).not.toMatch(/mailto:/i)
    expect(container.innerHTML).not.toMatch(/tel:/i)
  })

  it('does not render v1 elements', () => {
    render(<Page />)
    expect(screen.queryByText('Talk to my AI')).toBeNull()
    expect(screen.queryByText('chaos into clarity')).toBeNull()
  })
})
