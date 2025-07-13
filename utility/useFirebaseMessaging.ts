import { getMessaging, onMessage } from 'firebase/messaging'
import { useNuxtApp } from '#app'

export function useFirebaseMessaging(onReceive: (payload: any) => void) {
  if (typeof window === 'undefined') {
    // Avoid running SSR
    return;
  }

  const { $firebaseApp } = useNuxtApp();

  if (!$firebaseApp) {
    console.warn('❌ Firebase app not initialized yet!');
    return;
  }

  const messaging = getMessaging($firebaseApp);

  onMessage(messaging, onReceive);
}
