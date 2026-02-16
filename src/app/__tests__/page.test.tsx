import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../page'

describe('Homepage', () => {
  it('renders hero with thesis statement', () => {
    render(<Page />)
    expect(screen.getByText('Nathan Walker')).toBeTruthy()
    expect(screen.getByText(/AI eliminated the cost of building/)).toBeTruthy()
    expect(screen.getByText(/It did not eliminate the cost of being wrong/)).toBeTruthy()
  })

  it('renders the Judgment Gap section', () => {
    render(<Page />)
    expect(screen.getByText('The Judgment Gap')).toBeTruthy()
    expect(screen.getByText(/Correct systems are not/)).toBeTruthy()
    expect(screen.getByText(/That is where I operate/)).toBeTruthy()
  })

  it('renders What AI Did Not Collapse section', () => {
    render(<Page />)
    expect(screen.getByText(/What AI Did Not Collapse/)).toBeTruthy()
    expect(screen.getByText(/Security boundary design/)).toBeTruthy()
    expect(screen.getByText(/They appear in the scars/)).toBeTruthy()
  })

  it('renders Enterprise Proof metrics', () => {
    render(<Page />)
    expect(screen.getByText('$50M+')).toBeTruthy()
    expect(screen.getByText('$17M')).toBeTruthy()
    expect(screen.getByText('76%')).toBeTruthy()
    expect(screen.getByText(/View Executive Portfolio/)).toBeTruthy()
  })

  it('renders Contact section', () => {
    render(<Page />)
    expect(screen.getByText('Work With Me')).toBeTruthy()
    expect(screen.getByText(/cost of being wrong is material/)).toBeTruthy()
  })

  it('does not render v1 elements', () => {
    render(<Page />)
    expect(screen.queryByText('Talk to my AI')).toBeNull()
    expect(screen.queryByText('chaos into clarity')).toBeNull()
  })
})
