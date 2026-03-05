import type { CaseCategory, CaseSubcategory, Severity, UserRole } from '../types';

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  SystemAdministrator: ['*'],
  CaseManager: ['case:create', 'case:assign', 'case:edit', 'dashboard:view', 'report:view'],
  CaseAgent: ['case:view_assigned', 'case:update_status', 'case:add_comment'],
  Supervisor: ['case:view_department', 'case:escalate', 'case:reassign', 'dashboard:view'],
  Auditor: ['audit:view', 'report:view', 'case:view_all'],
  Reporter: ['case:create', 'case:view_own'],
};

export const CATEGORY_MAP: Record<CaseCategory, CaseSubcategory[]> = {
  TechnicalSupport: ['ApplicationError', 'PerformanceIssue', 'FeatureRequest', 'GeneralInquiry'],
  CustomerService: ['AccountIssue', 'BillingDispute', 'ProductInquiry', 'Feedback'],
  SecurityIncident: ['DataBreach', 'UnauthorizedAccess', 'SuspiciousActivity'],
  Compliance: ['RegulatoryViolation', 'AuditRequest', 'PolicyReview'],
};

export const SLA_POLICY_MINUTES: Record<Severity, { responseMins: number; resolutionMins: number }> = {
  Critical: { responseMins: 15, resolutionMins: 240 },
  High: { responseMins: 30, resolutionMins: 480 },
  Medium: { responseMins: 120, resolutionMins: 7200 },
  Low: { responseMins: 240, resolutionMins: 10080 },
};
