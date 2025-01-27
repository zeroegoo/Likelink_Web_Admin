<template>
  <div v-if="item" class="block p-4 shadow-md border border-gray-200 border-t-0">
    <!-- Description Section -->
    <div class="mb-4">
      {{ item.description }}
    </div>

    <!-- Main Content Section -->
    <div class="flex flex-wrap items-start justify-between gap-4">
      <!-- Profile Icon -->
      <div class="h-16 w-16 min-w-14 flex-shrink-0">
        <img
          src="../../assets/icons/pofile.png"
          alt="Profile Icon"
          class="h-full w-full object-contain"
        />
      </div>

      <!-- Details Section -->
      <div class="flex-1">
        <div class="flex flex-col space-y-2">
          <span class="block">{{ item.location }}</span>
          <span class="block text-blue-500 underline cursor-pointer break-all">
            <a :href="item.video_link" target="_blank">{{ item?.video_link }}</a>
          </span>
          <span class="block text-sm font-semibold">{{ item.task_status_name }}</span>
          <div class="flex items-center space-x-4">
            <button
              @click="likeAction"
              class="text-blue-500 font-medium hover:underline"
            >
              Like
            </button>
            <button
              @click="pinAction"
              class="text-blue-500 font-medium hover:underline"
            >
              Pin
            </button>
          </div>
          <input
            v-model="item.inputValue"
            type="text"
            id="user-input"
            placeholder="Comment"
            class="mt-2 w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      <!-- Timestamp Section -->
      <div class="text-right flex-shrink-0">
        <span class="text-sm text-gray-500">{{ item.updated_timestamp }}</span>
      </div>
    </div>
  </div>
</template>

  
  <script lang="ts">
  export default {
    props: {
    item: {
      type: Object,
      required: true,
     },
   },
    setup(props) {

      // const alertData = ref(props)
      // console.log(alertData)
      return {
        // alertData
      };
    },
    methods: {
      likeAction() {
        console.log('Liked');
      },
      pinAction() {
        console.log('Pinned');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  