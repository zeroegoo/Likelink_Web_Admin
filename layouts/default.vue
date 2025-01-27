<template>
  <div class="w-full h-screen overflow-hidden">
    <div
      id="application-wrapper"
      class="h-full overflow-auto"
    >
      <div
        id="application-content"
        class="sside-content"
      >
        <slot></slot>
      </div>
      <div
        id="application-sidebar"
        class="float-right"
      >
        <Sidebar
          :onSidebarToggle="handleSidebarToggle"
        />
      </div>
    </div>
  </div>
</template>

  
  <script setup lang="ts">
  import { ref, watch } from "vue";
  import Sidebar from "~/components/layouts/Sidebar.vue";
  
  const isSidebarOpen = ref(false);
  
  const handleSidebarToggle = (isOpen: boolean) => {
    isSidebarOpen.value = isOpen;
  };
  
  watch(isSidebarOpen, (newVal) => {
    const sidebarDiv = document.getElementById("application-sidebar");
    const contentDiv = document.getElementById("application-content");
    
    if (newVal) {
      sidebarDiv!.style.marginLeft = `0px` ;
      contentDiv!.style.marginLeft = `${280}px`;
    } else {
      sidebarDiv!.style.marginLeft = `-380px`;
      contentDiv!.style.marginLeft = `80px`;
    }
  });
  </script>
  
  <style scoped>
  #application-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  #application-content {
    flex: 1;
  
  }
  
  #application-sidebar {
    width: 380px;
  }
  </style>
  
  