import { create } from 'zustand';
import type { CaseRecord } from '../types';

type CaseState = {
  cases: CaseRecord[];
  selectedCaseId?: string;
  setCases: (cases: CaseRecord[]) => void;
  upsertCase: (caseRecord: CaseRecord) => void;
  selectCase: (caseId: string) => void;
};

export const useCaseStore = create<CaseState>((set) => ({
  cases: [],
  selectedCaseId: undefined,
  setCases: (cases) => set({ cases }),
  upsertCase: (caseRecord) =>
    set((state) => ({
      cases: state.cases.some((item) => item.caseId === caseRecord.caseId)
        ? state.cases.map((item) => (item.caseId === caseRecord.caseId ? caseRecord : item))
        : [caseRecord, ...state.cases],
    })),
  selectCase: (selectedCaseId) => set({ selectedCaseId }),
}));
