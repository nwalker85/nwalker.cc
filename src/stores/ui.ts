import { create } from 'zustand'

interface UIState {
  navOpen: boolean
  activeModal: string | null
  toggleNav: () => void
  openModal: (id: string) => void
  closeModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  navOpen: false,
  activeModal: null,
  toggleNav: () => set((s) => ({ navOpen: !s.navOpen })),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
}))
