import * as SecureStore from 'expo-secure-store';
// import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import { auth } from '../firebase/config';

const SESSION_KEY = 'ecms_session_uid';

export const authService = {
  async loginWithEmail(email: string, password: string) {
    // Firebase login temporarily disabled.
    const mockUid = `${email}:${password}`;
    await SecureStore.setItemAsync(SESSION_KEY, mockUid);
    return { uid: mockUid };
  },

  async loginWithGoogle(idToken: string, accessToken: string) {
    // Firebase Google login temporarily disabled.
    const mockUid = `${idToken}:${accessToken}`;
    await SecureStore.setItemAsync(SESSION_KEY, mockUid);
    return { uid: mockUid };
  },

  async logout() {
    // Firebase sign-out temporarily disabled.
    await SecureStore.deleteItemAsync(SESSION_KEY);
  },
};
