import { create } from 'zustand'

type State = {
  measure: string
}

type Action = {
  updateMeasure: (measure: string) => void
}

// Create your store, which includes both state and (optionally) actions
export const useOptionsStore = create<State & Action>((set) => ({
  measure: 'cm',
  updateMeasure: (measure) => set({ measure: measure }),
}))

