import { create } from 'zustand';
import type { User } from 'firebase/auth';
import type { UserProfile } from '../types';

type AuthState = {
  firebaseUser: User | null;
  profile: UserProfile | null;
  loading: boolean;
  setFirebaseUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  firebaseUser: null,
  profile: null,
  loading: true,
  setFirebaseUser: (firebaseUser) => set({ firebaseUser }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
}));
