<template>
  <aside
    class="bg-white text-neutral-400 w-64 p-4 fixed top-0 left-0 h-screen overflow-y-auto transition-all duration-300 flex flex-col justify-between"
    :class="{ '-translate-x-full': !isSidebarOpen }">
    <div>
      <div class="flex items-center justify-between">
        <img src="../../assets/icons/lifelinklogo.png" alt="Lifelink Logo" class="h-16 w-16" />
        <div class="pl-2">
          <h5 class="text-cyan-500 text-3xl font-semibold">LIFELINK</h5>
          <p class="text-cyan-500 text-sm font-medium">EMS Department</p>
        </div>
        <div class="text-2xl font-bold mb-4 cursor-pointer" @click="toggleSidebar">
          &lt;&lt;
        </div>
      </div>
<ul>
  <li
    v-for="item in menuItems"
    :key="item.path"
    class="my-2 pt-4 pb-4"
  >
    <router-link
      :to="item.path"
      class="text-xl flex items-center gap-3 px-2 py-2 rounded-xl transition-all duration-200"
      :class="{
        'bg-cyan-100 text-cyan-500 font-semibold': $route.path === item.path,
        'hover:text-neutral-500': $route.path !== item.path
      }"
    >
      <!-- <img :src="item.icon" alt="icon" class="w-6 h-6" /> -->
      {{ item.label }}
    </router-link>
  </li>
</ul>
    </div>

    <!-- Logout Button -->
    <div class="mt-auto">
      <button class="w-full py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded-md" @click="logout">
        <!-- <img src="../../assets/icons/logout.jpg" /> -->
        Logout
      </button>
    </div>
  </aside>

  <div v-if="!isSidebarOpen"
    class="fixed top-0 left-0 p-3 bg-cyan-500 text-white rounded-r-xl text-2xl font-bold shadow-md cursor-pointer"
    @click="openSidebar">
    &gt;&gt;
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { StorageService } from '../../utility/StorageService';

// Props definition
const props = defineProps({
  onSidebarToggle: {
    type: Function,
    required: true,
  },
});

const menuItems = [
  { path: '/', label: 'Home', icon: new URL('../../assets/icons/home.png', import.meta.url).href },
  { path: '/EmergencyAlert', label: 'Alert', icon: new URL('../../assets/icons/alert.png', import.meta.url).href },
  { path: '/History', label: 'History', icon: new URL('../../assets/icons/history.png', import.meta.url).href },
  // { path: '/Residents', label: 'Residents', icon: new URL('../../assets/icons/residents.png', import.meta.url).href },
  // { path: '/Service', label: 'Service', icon: new URL('../../assets/icons/service.png', import.meta.url).href },
  // { path: '/Account', label: 'Account', icon: new URL('../../assets/icons/account.png', import.meta.url).href },
  { path: '/Setting', label: 'Setting', icon: new URL('../../assets/icons/setting.png', import.meta.url).href },
];


// Reactive state
const isSidebarOpen = ref(true);
const router = useRouter();

// Methods
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  props.onSidebarToggle(isSidebarOpen.value);
};

const openSidebar = () => {
  isSidebarOpen.value = true;
  props.onSidebarToggle(isSidebarOpen.value);
};

const checkScreenSize = () => {
  if (window.innerWidth < 1000) {
    isSidebarOpen.value = false;
  } else {
    isSidebarOpen.value = true;
  }
  props.onSidebarToggle(isSidebarOpen.value);
};

const logout = () => {
  console.log("Logging out...");
  StorageService.clear()
  document.cookie = `UserAutoLI=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
  router.push("/login");
};

// Lifecycle hooks
onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});
</script>


<style scoped>
button {
  transition: background 0.3s;
}
</style>
