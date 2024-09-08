import { create } from 'zustand';

export type Measurement = {
  value: number | undefined;
  unit: string;
};

export type PlaxState = {
  LVIDd: Measurement;
  LVIDs: Measurement;
  IVSd: Measurement;
  PWd: Measurement;
  RVOTplax: Measurement;
  LAAP: Measurement;
  AoA: Measurement;
  AoSV: Measurement;
  AoPxA: Measurement;

  RVOTpsax: Measurement;
  PA: Measurement;

  LVEDV: Measurement;
  LVESV: Measurement;
  LVEF: Measurement;
};

type Action = {
  updateParam: <K extends keyof PlaxState>(param: K, value: Measurement) => void;
  updateLVIDd: (LVIDd: Measurement) => void;
  updateLVIDs: (LVIDs: Measurement) => void;
  updateIVSd: (IVSd: Measurement) => void;
  updatePWd: (PWd: Measurement) => void;
  updateRVOT: (RVOT: Measurement) => void;
  updateLAAP: (LAAP: Measurement) => void;
  updateAoSV: (AoSV: Measurement) => void;
  updateAoPxA: (AoPxA: Measurement) => void;

  setLVEF: (LVEF: Measurement) => void;
};

export const usePlaxStore = create<PlaxState & Action>((set) => ({
  LVIDd: { value: undefined, unit: 'cm' },
  LVIDs: { value: undefined, unit: 'cm' },
  IVSd: { value: undefined, unit: 'cm' },
  PWd: { value: undefined, unit: 'cm' },
  RVOTplax: { value: undefined, unit: 'cm' },
  LAAP: { value: undefined, unit: 'cm' },
  AoA: { value: undefined, unit: 'cm' },
  AoSV: { value: undefined, unit: 'cm' },
  AoPxA: { value: undefined, unit: 'cm' },

  RVOTpsax: { value: undefined, unit: 'cm' },
  PA: { value: undefined, unit: 'cm' },

  LVEDV: { value: undefined, unit: 'ml' },
  LVESV: { value: undefined, unit: 'ml' },
  LVEF: { value: undefined, unit: '%' },

  updateParam: (param, value) => set((state) => ({ ...state, [param]: value })),
  updateLVIDd: (LVIDd) => set(() => ({ LVIDd })),
  updateLVIDs: (LVIDs) => set(() => ({ LVIDs })),
  updateIVSd: (IVSd) => set(() => ({ IVSd })),
  updatePWd: (PWd) => set(() => ({ PWd })),
  updateRVOT: (RVOTplax) => set(() => ({ RVOTplax })),
  updateLAAP: (LAAP) => set(() => ({ LAAP })),
  updateAoSV: (AoSV) => set(() => ({ AoSV })),
  updateAoPxA: (AoPxA) => set(() => ({ AoPxA })),

  setLVEF: (LVEF) => set(() => ({ LVEF })),
}));
