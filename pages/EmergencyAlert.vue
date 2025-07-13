<template>
  <div class="h-screen w-full flex flex-col pr-5">
    <div class="px-4 py-2">
      <h1 class="text-2xl sm:text-3xl font-bold">Emergency Alerts</h1>
    </div>


    <div class="flex mt-6 mb-4 gap-2">
      <!-- Search Input -->
      <div class="relative flex-1">
        <input type="text" placeholder="Search..." v-model="searchText"
          class="w-full bg-white text-black pl-4 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        <!-- <svg
      class="absolute left-3 top-2.5 w-5 h-5 text-gray-500"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1016.65 2a7.5 7.5 0 000 15z"
      />
    </svg> -->
      </div>

      <!-- Dropdown -->
      <div class="w-40">
        <select v-model="selectedFilter"
          class="w-full bg-white text-black px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500">
          <option disabled value="">Filter</option>
          <option value="alert">Alert</option>
          <option value="history">History</option>
          <option value="residents">Residents</option>
          <option value="residents">All</option>
        </select>
      </div>
    </div>

    <div v-if="dataDetail"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 overflow-y-auto">
      <AlertDetail v-for="(item, index) in dataDetail" :key="index" :item="item" :class="[
        'shadow-md w-full rounded-2xl overflow-hidden cursor-pointer transition',
        item === selectedItem ? 'bg-blue-600 ring-4 ring-blue-400 text-white' : 'bg-red-600 text-white'
      ]" @click="openPopup(item)" />
    </div>

  </div>


  <div v-if="isPopupVisible && popupItem" class="fixed inset-0 z-50 bg-black/10 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-xl relative">
      <FallingDetection :item="popupItem" @close="closePopup" @updateTask="updateTask" />
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  middleware: 'auth'
})

import { ref, onMounted } from 'vue';
import AlertDetail from '~/components/elements/AlertDetail.vue';
import fetchAPI from '../../service/fetchAPI.ts';
import { getApiBaseUrl } from '~/config/api'
import { useFirebaseMessaging } from '~/utility/useFirebaseMessaging'
import FallingDetection from '~/components/elements/FallingDetection.vue';
const baseURL = getApiBaseUrl()

const dataDetail = ref([])
const selectedItem = ref(null)

const isPopupVisible = ref(false)
const popupItem = ref(null)
const selectedFilter = ref('');

const updateTask = () => {
  getData()
}
useFirebaseMessaging(async () => {
  try {
    const result = await fetchAPI.get(baseURL + 'Task/GetTasks');
    if (result) {
      const completedTasks = result.sort((a, b) => parseDate(b.updated_timestamp) - parseDate(a.updated_timestamp))
        .filter(item => ["AP", "CM"].includes(item.task_status));

      dataDetail.value = completedTasks;
    }
    selectedItem.value = dataDetail.value[0]
    openPopup(dataDetail.value[0])
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
const parseDate = (str) => new Date(str);
const openPopup = (item) => {
  popupItem.value = item
  isPopupVisible.value = true
  selectedItem.value = item
}
const closePopup = () => {
  isPopupVisible.value = false
}
// Function to fetch data
const getData = async () => {
  try {
    const result = await fetchAPI.get(baseURL + 'Task/GetTasks');
    if (result) {
      const completedTasks = result.sort((a, b) => parseDate(b.updated_timestamp) - parseDate(a.updated_timestamp))
        .filter(item => ["AP", "CM"].includes(item.task_status));

      dataDetail.value = completedTasks;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Lifecycle hook to fetch data on mount
onMounted(() => {
  getData();
});
</script>

<style scoped>
#scroll::-webkit-scrollbar {
  width: 12px;
  background-color: #e7e7e7;
}

#scroll::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #b9b9b9;
}
</style>
