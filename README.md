# ECMS Mobile (Expo + TypeScript)

Production-grade Enterprise Case Management System mobile foundation using **Expo managed workflow**, **React Navigation**, **Zustand**, **Firebase Auth**, **Firestore**, **Firebase Storage**, **Expo Notifications + FCM**, and **Cloud Functions**.

## Initialization

```bash
npx create-expo-app ecms-mobile -t expo-template-blank-typescript
```

This repository has been aligned to that baseline and expanded with enterprise architecture.

## Architecture

```text
src/
  api/
  components/
  firebase/
  hooks/
  modules/
    auth/
    cases/
    documents/
    notifications/
    reports/
    users/
  navigation/
  services/
  store/
  types/
  utils/
firebase/
  firestore.rules
  storage.rules
  functions/
```

## Core Modules Implemented

- Authentication: email/password and Google sign-in hooks (`src/modules/auth`, `src/services/auth.service.ts`).
- Case management: list/details/create/assign screens and services (`src/modules/cases`, `src/services/case.service.ts`).
- Notifications: Expo push registration service (`src/services/notification.service.ts`).
- Document management: image/document picker + Firebase storage uploader (`src/services/document.service.ts`).
- Reporting/dashboard: KPI dashboard screen (`src/modules/reports/dashboard.screen.tsx`).
- Role management and SLA policy constants (`src/utils/constants.ts`).

## Firestore Collections

- `users`
- `cases`
- `case_comments`
- `case_files`
- `audit_logs`
- `notifications`

## Security

- Firestore RBAC and scoped read/write in `firebase/firestore.rules`.
- Storage upload limits and authenticated-only access in `firebase/storage.rules`.
- Callable and scheduled Cloud Functions validate authentication before privileged operations.

## Scalability Notes (500+ concurrent users)

- Firestore document-oriented model with targeted queries and indexed access patterns.
- Assignment and SLA logic moved to Cloud Functions for centralized control.
- Zustand local state slices isolate updates and reduce unnecessary re-renders.
- Notification + audit flows are append-only and horizontally scalable in Firestore.

## Run

```bash
npm install
npm run start
```

Configure Firebase via Expo public env vars:

```bash
cp .env.example .env
```

Then fill/update these keys in `.env`:

- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_FIREBASE_APP_ID`
