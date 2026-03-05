import { useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';

export const useAuthSession = () => {
  const setFirebaseUser = useAuthStore((state) => state.setFirebaseUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    // Firebase auth listener temporarily disabled so the app can render UI
    // without Firebase environment variables configured.
    setFirebaseUser(null);
    setLoading(false);

    return undefined;
  }, [setFirebaseUser, setLoading]);
};
