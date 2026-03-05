import { Timestamp, addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { SLA_POLICY_MINUTES } from '../utils/constants';
import type { CasePriority, CaseRecord, CaseStatus } from '../types';

const computeDueDates = (priority: CasePriority) => {
  const now = Date.now();
  const policy = SLA_POLICY_MINUTES[priority];
  return {
    responseDueAt: Timestamp.fromMillis(now + policy.responseMins * 60 * 1000),
    resolutionDueAt: Timestamp.fromMillis(now + policy.resolutionMins * 60 * 1000),
  };
};

export const caseService = {
  async createCase(caseInput: Omit<CaseRecord, 'caseId' | 'createdAt' | 'updatedAt' | 'status' | 'responseDueAt' | 'resolutionDueAt' | 'escalated'>) {
    const { responseDueAt, resolutionDueAt } = computeDueDates(caseInput.priority);

    return addDoc(collection(db, 'cases'), {
      ...caseInput,
      status: 'Open' satisfies CaseStatus,
      responseDueAt,
      resolutionDueAt,
      escalated: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  },

  async updateCase(caseId: string, patch: Partial<CaseRecord>) {
    return updateDoc(doc(db, 'cases', caseId), {
      ...patch,
      updatedAt: serverTimestamp(),
    });
  },
};
