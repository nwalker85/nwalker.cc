import { create } from 'zustand'

interface UIState {
  navOpen: boolean
  activeModal: string | null
  /** 0 = hero name sits in the thesis block, 1 = it has merged into the sticky nav bar. */
  heroHandoff: number
  toggleNav: () => void
  openModal: (id: string) => void
  closeModal: () => void
  setHeroHandoff: (value: number) => void
}

export const useUIStore = create<UIState>((set) => ({
  navOpen: false,
  activeModal: null,
  heroHandoff: 0,
  toggleNav: () => set((s) => ({ navOpen: !s.navOpen })),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
  setHeroHandoff: (value) => set({ heroHandoff: value }),
}))
