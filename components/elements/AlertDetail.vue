<template>
  <div v-if="item" class="block p-4 shadow-md border border-gray-200 border-t-0" @click="handleClickFallingDetection">
    <!-- Description Section -->
    <div class="mb-4">
      {{ item.description }}
    </div>

    <!-- Main Content Section -->
    <div class="flex flex-wrap items-start justify-between gap-4">
      <!-- Profile Icon -->
      <div class="h-16 w-16 min-w-14 flex-shrink-0">
        <img src="../../assets/icons/pofile.png" alt="Profile Icon" class="h-full w-full object-contain" />
      </div>

      <!-- Details Section -->
      <div class="flex-1">
        <div class="flex flex-col space-y-2">
          <span class="block">{{ item.location }}</span>
          <span class="block ">
            <!-- <div>{{ item.video_image_link }}</div> -->
          </span>
          <!-- <span class="block text-blue-500 underline cursor-pointer break-all">
            <div>{{ item.video_image_link }}</div>
          </span> -->
          <span class="block text-sm font-semibold">{{ item.task_status_name }}</span>
          <div class="flex items-center space-x-4">
            <button @click.stop="likeAction" class="text-blue-500 font-medium hover:underline">
              Like
            </button>
            <button @click.stop="pinAction" class="text-blue-500 font-medium hover:underline">
              Pin
            </button>
          </div>
          <input v-model="inputValue" type="text" id="user-input" placeholder="Comment"
            class="mt-2 w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300 z-10"
            @click.stop />
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
import { defineComponent, toRefs, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const { item } = toRefs(props);
    const inputValue = ref("");

    // Handle navigation
    const handleClickFallingDetection = () => {
      if (item.value && item.value.user_id) {
        console.log(item)
        router.push({
          path: "/FallingDetection",
          state: { user: { userId: item.value.user_id, taskId: item.value.task_id } },
        });
      }
    };

    return {
      item,
      inputValue,
      handleClickFallingDetection,
    };
  },
  methods: {
    likeAction() {
      console.log("Liked");
    },
    pinAction() {
      console.log("Pinned");
    },
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>
