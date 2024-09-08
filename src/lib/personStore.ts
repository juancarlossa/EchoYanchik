import { create } from 'zustand'

type State = {
  height: number | undefined
  weight: number | undefined
  age: number | undefined
  gender: string
  systole: number | undefined
  diastole: number | undefined
  heartRate: number | undefined

  bsa: number | undefined
  bmi: number | undefined
  map: number | undefined
}

type Action = {
  updateHeight: (height: State['height']) => void
  updateWeight: (weight: State['weight']) => void
  updateAge: (age: State['age']) => void
  updateGender: (gender: State['gender']) => void
  updateSystole: (systole: State['systole']) => void
  updateDiastole: (diastole: State['diastole']) => void
  updateHeartRate: (heartRate: State['heartRate']) => void

  updateBsa: (bsa: State['bsa']) => void
  updateBmi: (bmi: State['bmi']) => void
  updateMap: (map: State['map']) => void
}

// Create your store, which includes both state and (optionally) actions
export const usePersonStore = create<State & Action>((set) => ({
  height: undefined,
  weight: undefined,
  age: undefined,
  gender: 'man',
  systole: undefined,
  diastole: undefined,
  heartRate: undefined,

  bsa: undefined,
  bmi: undefined,
  map: undefined,

  updateHeight: (height) => set(() => ({ height: height })),
  updateWeight: (weight) => set(() => ({ weight: weight })),
  updateAge: (age) => set(() => ({ age: age })),
  updateGender: (gender) => set(() => ({ gender: gender })),
  updateSystole: (systole) => set(() => ({ systole: systole })),
  updateDiastole: (diastole) => set(() => ({ diastole: diastole })),
  updateHeartRate: (heartRate) => set(() => ({ heartRate: heartRate })),
  updateBsa: (bsa) => set(() => ({ bsa: bsa })),
  updateBmi: (bmi) => set(() => ({ bmi:bmi })),
  updateMap: (map) => set(() => ({ map:map })),
}))

