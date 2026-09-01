/**
 * Tests for /assistant page and homepage updates.
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../page'
import AssistantPage from '../assistant/page'

// Mock next/font to avoid loading issues in tests
vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter', className: 'inter' }),
  JetBrains_Mono: () => ({ variable: '--font-mono', className: 'mono' }),
}))

// Mock next/navigation for Nav component
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Homepage assistant integration', () => {
  it('renders "Launch the Assistant Demo" in AccountableAI section', () => {
    render(<Page />)
    expect(screen.getByText(/Launch the Assistant Demo/)).toBeTruthy()
  })

  it('does not render "Talk to my AI" anywhere', () => {
    render(<Page />)
    expect(screen.queryByText(/Talk to my AI/i)).toBeNull()
  })

  it('keeps Runestack link in AccountableAI section', () => {
    render(<Page />)
    expect(screen.getByText('See Runestack →')).toBeTruthy()
  })
})

describe('Nav component', () => {
  it('still has exactly five executive nav links (no Assistant)', async () => {
    const { Nav } = await import('@/components/layout/Nav')
    render(<Nav />)
    const navLinks = ['Philosophy', 'Enterprise', 'Architecture', 'Runestack', 'Contact']
    for (const label of navLinks) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1)
    }
    // Assistant should NOT be in the nav
    expect(screen.queryByRole('link', { name: /^Assistant$/i })).toBeNull()
  })
})

describe('/assistant marketing page', () => {
  it('explains public context and launches the app', () => {
    render(<AssistantPage />)
    expect(screen.getByText('Portfolio Assistant')).toBeTruthy()
    expect(screen.getAllByText(/Launch the Assistant Demo/).length).toBeGreaterThan(0)
    expect(screen.getByText(/public corpus only/i)).toBeTruthy()
    expect(screen.getAllByText(/LangGraph/).length).toBeGreaterThan(0)
  })
})
