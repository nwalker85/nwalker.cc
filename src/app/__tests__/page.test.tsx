import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Page from '../page'

describe('Home page', () => {
  it('renders without crashing', () => {
    const { container } = render(<Page />)
    expect(container).toBeTruthy()
  })
})
