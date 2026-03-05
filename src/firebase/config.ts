import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

const requireFirebaseEnv = (name: string, value: string | undefined) => {
  if (!value) {
    throw new Error(`Missing Firebase configuration: ${name}. Add it to your Expo env file (for example .env).`);
  }

  return value;
};

const assertNotPlaceholder = (name: string, value: string) => {
  const placeholderPatterns = ['DemoKeyForDevelopment', 'your-', 'example', 'changeme'];
  if (placeholderPatterns.some((pattern) => value.toLowerCase().includes(pattern.toLowerCase()))) {
    throw new Error(
      `Firebase configuration ${name} still has a placeholder value. Add real Firebase credentials to .env before starting the app.`
    );
  }

  return value;
};

const firebaseConfig = {
  apiKey: assertNotPlaceholder(
    'EXPO_PUBLIC_FIREBASE_API_KEY',
    requireFirebaseEnv('EXPO_PUBLIC_FIREBASE_API_KEY', process.env.EXPO_PUBLIC_FIREBASE_API_KEY)
  ),
  authDomain: assertNotPlaceholder(
    'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN',
    requireFirebaseEnv('EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN', process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN)
  ),
  projectId: assertNotPlaceholder(
    'EXPO_PUBLIC_FIREBASE_PROJECT_ID',
    requireFirebaseEnv('EXPO_PUBLIC_FIREBASE_PROJECT_ID', process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID)
  ),
  storageBucket: assertNotPlaceholder(
    'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET',
    requireFirebaseEnv('EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET', process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET)
  ),
  messagingSenderId: assertNotPlaceholder(
    'EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    requireFirebaseEnv('EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID)
  ),
  appId: assertNotPlaceholder(
    'EXPO_PUBLIC_FIREBASE_APP_ID',
    requireFirebaseEnv('EXPO_PUBLIC_FIREBASE_APP_ID', process.env.EXPO_PUBLIC_FIREBASE_APP_ID)
  ),
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
