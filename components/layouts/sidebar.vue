<template>
  <aside
    class="bg-cyan-500 text-white w-64 p-4 fixed top-0 left-0 h-screen overflow-y-auto transition-all duration-300 flex flex-col justify-between"
    :class="{ '-translate-x-full': !isSidebarOpen }"
  >
    <div>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold mb-4">EMS</h1>
        <div
          class="text-2xl font-bold mb-4 cursor-pointer"
          @click="toggleSidebar"
        >
          &lt;&lt;
        </div>
      </div>
      <ul>
        <li class="my-2 pt-4 pb-4">
          <router-link to="/" class="text-xl hover:text-neutral-500">Home</router-link>
        </li>
        <li class="my-2 pt-4 pb-4">
          <router-link to="/EmergencyAlert" class="text-xl hover:text-neutral-500">Alert</router-link>
        </li>
        <li class="my-2 pt-4 pb-4">
          <router-link to="/Rescue" class="text-xl hover:text-neutral-500">Rescue</router-link>
        </li>
        <li class="my-2 pt-4 pb-4">
          <router-link to="/LivePreview" class="text-xl hover:text-neutral-500">Live Preview</router-link>
        </li>
        <li class="my-2 pt-4 pb-4">
          <router-link to="/Chat" class="text-xl hover:text-neutral-500">Chat</router-link>
        </li>
        <li class="my-2 pt-4 pb-4">
          <router-link to="/Setting" class="text-xl hover:text-neutral-500">Setting</router-link>
        </li>
      </ul>
    </div>

    <!-- Logout Button -->
    <div class="mt-auto">
      <button
        class="w-full py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded-md"
        @click="logout"
      >
      <!-- <img src="../../assets/icons/logout.jpg" /> -->
        Logout
      </button>
    </div>
  </aside>

  <div
    v-if="!isSidebarOpen"
    class="fixed top-0 left-0 p-3 bg-cyan-500 text-white rounded-r-xl text-2xl font-bold shadow-md cursor-pointer"
    @click="openSidebar"
  >
    &gt;&gt;
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Sidebar",
  props: {
    onSidebarToggle: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const isSidebarOpen = ref(true);
    const router = useRouter();

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
      localStorage.removeItem("isLoggedIn"); 
      router.push("/login");
    };

    onMounted(() => {
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", checkScreenSize);
    });

    return {
      isSidebarOpen,
      toggleSidebar,
      openSidebar,
      logout,
    };
  },
});
</script>

<style scoped>
button {
  transition: background 0.3s;
}
</style>
