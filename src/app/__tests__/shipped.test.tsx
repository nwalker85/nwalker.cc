import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ShippedPage from '../shipped/page'

describe('Shipped page', () => {
  it('renders the executive header and metrics', () => {
    render(<ShippedPage />)
    expect(screen.getByText('Evidentiary Record')).toBeTruthy()
    expect(screen.getByRole('heading', { level: 1, name: 'Shipped' })).toBeTruthy()
    expect(screen.getByText('Delivery Metrics')).toBeTruthy()
    expect(screen.getByText('Dated Ships')).toBeTruthy()
    expect(screen.getByText(/295 capabilities delivered across 24 active weeks/)).toBeTruthy()
  })

  it('renders filter controls and spheres', () => {
    render(<ShippedPage />)
    expect(screen.getByPlaceholderText(/Filter by capability/i)).toBeTruthy()
    expect(screen.getByText('All Spheres')).toBeTruthy()
    expect(screen.getByText('Execution')).toBeTruthy()
    expect(screen.getByText('Platform')).toBeTruthy()
    expect(screen.getByText('Topology')).toBeTruthy()
  })

  it('filters results when searching', () => {
    render(<ShippedPage />)
    const input = screen.getByPlaceholderText(/Filter by capability/i)
    fireEvent.change(input, { target: { value: 'Domain Intelligence Schema' } })

    expect(screen.getByText(/Showing 4 of 295 capabilities/)).toBeTruthy()
    expect(screen.getByText(/Automated Domain Intelligence Schema CDN deployment/)).toBeTruthy()
  })
})
