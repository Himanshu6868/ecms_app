# Firestore Schema

## users/{userId}
- email: string
- displayName: string
- role: SystemAdministrator | CaseManager | CaseAgent | Supervisor | Auditor | Reporter
- department: string
- skills: CaseCategory[]
- activeCaseCount: number
- notificationToken?: string
- createdAt: timestamp
- updatedAt: timestamp

## cases/{caseId}
- caseId: string
- title: string
- description: string
- category: TechnicalSupport | CustomerService | SecurityIncident | Compliance
- subcategory: string
- severity: Critical | High | Medium | Low
- priority: Critical | High | Medium | Low
- assignedAgentId?: string
- status: Open | Assigned | InProgress | Escalated | Resolved | Closed
- attachments: CaseAttachment[]
- createdBy: string
- createdAt: timestamp
- updatedAt: timestamp
- responseDueAt: timestamp
- resolutionDueAt: timestamp
- escalated: boolean

## case_comments/{commentId}
- caseId: string
- message: string
- createdBy: string
- createdAt: timestamp

## case_files/{fileId}
- caseId: string
- fileName: string
- mimeType: string
- url: string
- sizeBytes: number
- uploadedBy: string
- uploadedAt: timestamp

## audit_logs/{logId}
- actorId: string
- eventType: CASE_CREATE | CASE_UPDATE | CASE_ASSIGN | LOGIN | ROLE_CHANGE
- targetId: string
- metadata: map
- createdAt: timestamp

## notifications/{notificationId}
- userId: string
- title: string
- body: string
- type: CASE_ASSIGNMENT | CASE_UPDATE | SLA_WARNING | ESCALATION | COMMENT
- read: boolean
- createdAt: timestamp
