import type { Timestamp } from 'firebase/firestore';

export type UserRole =
  | 'SystemAdministrator'
  | 'CaseManager'
  | 'CaseAgent'
  | 'Supervisor'
  | 'Auditor'
  | 'Reporter';

export type CaseCategory =
  | 'TechnicalSupport'
  | 'CustomerService'
  | 'SecurityIncident'
  | 'Compliance';

export type CaseSubcategory =
  | 'ApplicationError'
  | 'PerformanceIssue'
  | 'FeatureRequest'
  | 'GeneralInquiry'
  | 'AccountIssue'
  | 'BillingDispute'
  | 'ProductInquiry'
  | 'Feedback'
  | 'DataBreach'
  | 'UnauthorizedAccess'
  | 'SuspiciousActivity'
  | 'RegulatoryViolation'
  | 'AuditRequest'
  | 'PolicyReview';

export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
export type CasePriority = Severity;
export type CaseStatus = 'Open' | 'Assigned' | 'InProgress' | 'Escalated' | 'Resolved' | 'Closed';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  department: string;
  skills: CaseCategory[];
  activeCaseCount: number;
  notificationToken?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CaseAttachment {
  id: string;
  fileName: string;
  mimeType: string;
  url: string;
  sizeBytes: number;
  uploadedBy: string;
  uploadedAt: Timestamp;
}

export interface CaseRecord {
  caseId: string;
  title: string;
  description: string;
  category: CaseCategory;
  subcategory: CaseSubcategory;
  severity: Severity;
  priority: CasePriority;
  assignedAgentId?: string;
  status: CaseStatus;
  attachments: CaseAttachment[];
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  responseDueAt: Timestamp;
  resolutionDueAt: Timestamp;
  escalated: boolean;
}

export interface CaseComment {
  id: string;
  caseId: string;
  message: string;
  createdBy: string;
  createdAt: Timestamp;
}

export interface AuditLog {
  id: string;
  actorId: string;
  eventType: 'CASE_CREATE' | 'CASE_UPDATE' | 'CASE_ASSIGN' | 'LOGIN' | 'ROLE_CHANGE';
  targetId: string;
  metadata: Record<string, string | number | boolean>;
  createdAt: Timestamp;
}

export interface InAppNotification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'CASE_ASSIGNMENT' | 'CASE_UPDATE' | 'SLA_WARNING' | 'ESCALATION' | 'COMMENT';
  read: boolean;
  createdAt: Timestamp;
}

export interface DashboardMetrics {
  totalCases: number;
  openCases: number;
  resolvedCases: number;
  slaCompliance: number;
  averageResolutionHours: number;
  agentWorkload: { agentId: string; activeCases: number }[];
}
