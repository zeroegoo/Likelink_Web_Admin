<template>
  <div v-if="currentRouteName === 'Login'" class="bg-appTheme min-h-screen font-ibm-plex-sans">
    <NuxtPage />
  </div>
  <div v-else>
    <NuxtLayout names="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    
    const currentRouteName = computed(() => router.currentRoute.value.name);

    onMounted(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 
      if (!isLoggedIn && currentRouteName.value !== 'Login') {
        // router.push('/EmergencyAlert');
        router.push('/Login');
      }
    });

    return {
      currentRouteName,
    };
  },
});
</script>
