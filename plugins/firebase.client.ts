import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging'

console.log('📦 firebase.client.ts loaded')
const firebaseConfig = {
  apiKey: "AIzaSyDAla6DeRf4gNH1ge1zMWQ1FAxSXOsOVv8",
  authDomain: "lifelink-e5638.firebaseapp.com",
  projectId: "lifelink-e5638",
  storageBucket: "lifelink-e5638.firebasestorage.app",
  messagingSenderId: "106455594164",
  appId: "1:106455594164:web:1d7170d64e43417a2613e1",
  measurementId: "G-194QVCSEPX"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig)

const messaging = getMessaging(app) 

export default defineNuxtPlugin(() => {
  console.log('🚀 Nuxt plugin running')

  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    (async () => {
      try {
        console.log('📥 Registering Service Worker...')
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')

        const messaging = getMessaging(app) // 'messaging' is defined here

        const fcmToken = useState<string | null>('fcmToken', () => null) 

        const permission = await Notification.requestPermission()
        console.log('🔐 Notification permission:', permission)

        if (permission === 'granted') {
          const token = await getToken(messaging, {
            vapidKey: 'BOJHKYe4m8d3-MQparv4yQ3ZulFdBWLn-vhr0050KxSaXVkInbxNW_gR7gqq7HNpwf2mr2K5rSGh8g4vE38TR7M', //VAPID key
            serviceWorkerRegistration: registration
          })

          if (token) {
            fcmToken.value = token 
            console.log('📲 FCM Token:', token)
          } else {
            console.warn('⚠️ No token received')
          }
        }

        onMessage(messaging, (payload) => {
          console.log('📩 Message received (foreground):', payload);
        
          let messageTitle = 'New Message!'; // Default title
          let messageBody = '';
        
          if (payload.notification) {
            messageTitle = payload.notification.title || messageTitle;
            messageBody = payload.notification.body || '';
          }
        
          if (payload.data) {
            messageTitle = payload.data.title || messageTitle;
            messageBody = payload.data.body || messageBody;
          }
        });

      } catch (err) {
        console.error('🔥 Error during FCM setup:', err)
      }
    })()
  }

  return {
    provide: {
      firebaseApp: app,
      messaging
    }
  }
})
