import { describe, it, expect, beforeEach } from 'vitest'
import { useUIStore } from '../ui'

describe('UI Store', () => {
  beforeEach(() => {
    useUIStore.setState({ navOpen: false, activeModal: null })
  })

  it('toggles nav', () => {
    useUIStore.getState().toggleNav()
    expect(useUIStore.getState().navOpen).toBe(true)
    useUIStore.getState().toggleNav()
    expect(useUIStore.getState().navOpen).toBe(false)
  })

  it('opens and closes modal', () => {
    useUIStore.getState().openModal('runestack-manifesto')
    expect(useUIStore.getState().activeModal).toBe('runestack-manifesto')
    useUIStore.getState().closeModal()
    expect(useUIStore.getState().activeModal).toBeNull()
  })
})
