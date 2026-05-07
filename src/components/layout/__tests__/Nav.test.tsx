import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Nav } from '../Nav'

describe('Nav', () => {
  it('renders dropdown group labels', () => {
    render(<Nav />)
    expect(screen.getAllByText('Thinking').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Work').length).toBeGreaterThan(0)
  })

  it('renders direct links', () => {
    render(<Nav />)
    expect(screen.getAllByText('Portfolio').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0)
  })

  it('renders Nathan Walker name', () => {
    render(<Nav />)
    expect(screen.getByText('Nathan Walker')).toBeTruthy()
  })
})
