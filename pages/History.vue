<template>

    <div class="flex mt-6 mb-4 gap-2">
        <!-- Search Input -->
        <div class="relative flex-1">
            <input type="text" placeholder="Search..." v-model="searchText"
                class="w-full bg-white text-black pl-4 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
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


    <div class="h-screen w-full flex overflow-hidden">
        <!-- Left Column: Alert List -->
        <div class="flex-1 h-full p-6 overflow-y-auto">
            <div :class="[
                'grid gap-6 transition-all duration-300',
                selectedItem
                    ? 'grid-cols-1'
                    : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
            ]">
                <AlertDetail v-for="(item, index) in dataDetail" :key="index" :item="item" :class="[
                    'shadow-md w-full rounded-2xl overflow-hidden cursor-pointer transition',
                    item === selectedItem ? 'bg-blue-600 ring-4 ring-blue-400 text-white' : 'bg-red-600 text-white'
                ]" @click="openDetail(item)" />
            </div>
        </div>


        <!-- Right Column: Detail Panel -->
        <div v-if="selectedItem" class=" flex flex-1 h-fit justify-center">
            <Live v-if="selectedItem.task_status === 'AS'" :item="selectedItem" @updateTask="updateTask"
                @close="selectedItem = null" />
        </div>
    </div>

    <div v-if="isPopupVisible" class="fixed inset-0 z-50 bg-black/10 flex items-center justify-center">
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
import Live from '~/components/elements/Live.vue';
import { useFirebaseMessaging } from '~/utility/useFirebaseMessaging'
import FallingDetection from '~/components/elements/FallingDetection.vue';
const baseURL = getApiBaseUrl()
// Reactive state for data
const dataDetail = ref([]);
const selectedItem = ref(null)
const selectedFilter = ref('')

const isPopupVisible = ref(false)
const popupItem = ref(null)

const openDetail = (item) => {
    selectedItem.value = item
}

const closePopup = () => {
  isPopupVisible.value = false
}

const updateTask = () => {
    getData()
}

// Function to fetch data
const parseDate = (str) => new Date(str);

useFirebaseMessaging(async (payload) => {
    try {
        const result = await fetchAPI.get(baseURL + 'Task/GetTasks');
        if (result) {
            const sorted = result.sort((a, b) => parseDate(b.updated_timestamp) - parseDate(a.updated_timestamp))
            const waitingTasks = sorted.filter(item => ["AP", "CM"].includes(item.task_status));
            if (waitingTasks.length > 0) {
                popupItem.value = waitingTasks[0]
                isPopupVisible.value = true
            } else {
                const completedTasks = sorted.filter(item =>
                    ["SS", "CC", "AS"].includes(item.task_status)
                );
                dataDetail.value = completedTasks;
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error)
    }
})

const getData = async () => {
    try {
        const result = await fetchAPI.get(baseURL + 'Task/GetTasks');
        if (result) {
            const completedTasks = result.sort((a, b) => parseDate(b.updated_timestamp) - parseDate(a.updated_timestamp))
                .filter(item => ["SS", "CC", "AS"].includes(item.task_status));

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
