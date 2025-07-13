<template>
  <div class = "bg-zinc-100">
      <div v-if="currentRouteName === 'Login'" class="bg-appTheme min-h-screen font-ibm-plex-sans">
    <NuxtPage />
  </div>
  <div v-else>
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentRouteName = computed(() => router.currentRoute.value.name)

onMounted(() => {
  if (
    'serviceWorker' in navigator &&
    'Notification' in window &&
    'PushManager' in window
  ) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then(reg => console.log('✅ Service Worker registered:', reg))
        .catch(err => console.error('❌ SW registration failed:', err))
    })
  } else {
    console.warn('⚠️ Browser does not support Firebase Messaging.')
  }
})
</script>
