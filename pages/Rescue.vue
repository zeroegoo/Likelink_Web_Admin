<template>
        <div class="flex-1 p-9 border-l-2 border-gray-400 overflow-auto">
            <div class="h-full flex flex-col justify-between">
                <div class="rounded-xl ">
                    <MapConnection />
                </div>
            </div>
        </div>
</template>
  
  <script lang="ts">
import MapConnection from '~/components/elements/MapConnection.vue';

  export default {
    name: "LivePreview",
    components: {
      MapConnection
    },
    setup() {
      return {
  
      };
    },
  };
  </script>
  
  
  
  <style scoped>
  </style>
  