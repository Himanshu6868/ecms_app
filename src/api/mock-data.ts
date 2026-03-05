import { Timestamp } from 'firebase/firestore';
import type { CaseRecord, DashboardMetrics } from '../types';

export const mockCases: CaseRecord[] = [
  {
    caseId: 'CASE-1001',
    title: 'Payment gateway timeout',
    description: 'Intermittent payment failures for enterprise tenant.',
    category: 'TechnicalSupport',
    subcategory: 'PerformanceIssue',
    severity: 'High',
    priority: 'High',
    assignedAgentId: 'agent-01',
    status: 'InProgress',
    attachments: [],
    createdBy: 'reporter-01',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    responseDueAt: Timestamp.now(),
    resolutionDueAt: Timestamp.now(),
    escalated: false,
  },
  {
    caseId: 'CASE-1002',
    title: 'Suspicious account access',
    description: 'Multiple failed logins and possible brute force attack.',
    category: 'SecurityIncident',
    subcategory: 'SuspiciousActivity',
    severity: 'Critical',
    priority: 'Critical',
    assignedAgentId: 'agent-03',
    status: 'Escalated',
    attachments: [],
    createdBy: 'reporter-02',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    responseDueAt: Timestamp.now(),
    resolutionDueAt: Timestamp.now(),
    escalated: true,
  },
];

export const mockDashboard: DashboardMetrics = {
  totalCases: 1240,
  openCases: 338,
  resolvedCases: 902,
  slaCompliance: 96.3,
  averageResolutionHours: 8.2,
  agentWorkload: [
    { agentId: 'agent-01', activeCases: 24 },
    { agentId: 'agent-02', activeCases: 17 },
    { agentId: 'agent-03', activeCases: 29 },
  ],
};
