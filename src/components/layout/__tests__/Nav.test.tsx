import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Nav } from '../Nav'

describe('Nav', () => {
  it('renders the flat executive nav links', () => {
    render(<Nav />)
    for (const label of ['Philosophy', 'Enterprise', 'Architecture', 'Runestack', 'Contact']) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0)
    }
  })

  it('does not render the old dropdown groups or demoted items', () => {
    render(<Nav />)
    expect(screen.queryByText('Thinking')).toBeNull()
    expect(screen.queryByText('Work')).toBeNull()
    expect(screen.queryByText('Resume')).toBeNull()
    expect(screen.queryByText('Definitions')).toBeNull()
  })

  it('renders Nathan Walker name', () => {
    render(<Nav />)
    expect(screen.getByText('Nathan Walker')).toBeTruthy()
  })
})
