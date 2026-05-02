import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../page'

describe('Homepage', () => {
  it('renders hero with thesis statement', () => {
    const { container } = render(<Page />)
    expect(screen.getByText('Nathan Walker')).toBeTruthy()
    expect(screen.getByText(/AI eliminated the cost of building/)).toBeTruthy()
    expect(container).toHaveTextContent(/It did not eliminate the cost of being wrong/)
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

  it('renders Enterprise Proof metrics', () => {
    render(<Page />)
    expect(screen.getByText('$50M+')).toBeTruthy()
    expect(screen.getByText('$17M')).toBeTruthy()
    expect(screen.getByText('76%')).toBeTruthy()
    expect(screen.getByText(/View Enterprise Work/)).toBeTruthy()
  })

  it('renders Contact section', () => {
    render(<Page />)
    expect(screen.getByText('Work With Me')).toBeTruthy()
    expect(screen.getByText(/durability is non-negotiable/)).toBeTruthy()
  })

  it('does not render v1 elements', () => {
    render(<Page />)
    expect(screen.queryByText('Talk to my AI')).toBeNull()
    expect(screen.queryByText('chaos into clarity')).toBeNull()
  })
})
