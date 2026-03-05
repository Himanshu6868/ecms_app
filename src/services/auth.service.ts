import * as SecureStore from 'expo-secure-store';
import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const SESSION_KEY = 'ecms_session_uid';

export const authService = {
  async loginWithEmail(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await SecureStore.setItemAsync(SESSION_KEY, cred.user.uid);
    return cred.user;
  },

  async loginWithGoogle(idToken: string, accessToken: string) {
    const providerCredential = GoogleAuthProvider.credential(idToken, accessToken);
    const cred = await signInWithCredential(auth, providerCredential);
    await SecureStore.setItemAsync(SESSION_KEY, cred.user.uid);
    return cred.user;
  },

  async logout() {
    await signOut(auth);
    await SecureStore.deleteItemAsync(SESSION_KEY);
  },
};
