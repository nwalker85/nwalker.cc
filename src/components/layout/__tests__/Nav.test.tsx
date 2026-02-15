import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Nav } from '../Nav'

describe('Nav', () => {
  it('renders all navigation items', () => {
    render(<Nav />)
    expect(screen.getByText('Philosophy')).toBeTruthy()
    expect(screen.getByText('Enterprise')).toBeTruthy()
    expect(screen.getByText('Architecture')).toBeTruthy()
    expect(screen.getByText('Runestack')).toBeTruthy()
    expect(screen.getByText('Portfolio')).toBeTruthy()
    expect(screen.getByText('Contact')).toBeTruthy()
  })

  it('renders Nathan Walker name', () => {
    render(<Nav />)
    expect(screen.getByText('Nathan Walker')).toBeTruthy()
  })
})
