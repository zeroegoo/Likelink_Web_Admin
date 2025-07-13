<template>
    <div v-if="dataTaskDetail && dataUserDetail">
        <!-- Popup Modal -->
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <div class="relative bg-white/90 w-[95vw] h-[95vh] max-w-7xl p-6 rounded-2xl shadow-2xl overflow-hidden">
                <!-- Close Button -->
                <button class="absolute top-4 right-5 text-gray-600 hover:text-red-500 text-2xl font-bold z-10"
                    @click="closePopup">
                    ✕
                </button>

                <!-- Content: 2 Columns -->
                <div class="flex h-full gap-6">
                    <!-- Left: Task Detail -->
                    <div class="flex-1 overflow-y-auto pr-3 border-r border-gray-300">
                        <div v-if="dataTaskDetail.length > 0">
                            <div v-for="task in dataTaskDetail" :key="task.task_id" class="mb-4">
                                <TaskDetail :item="task" @close="closePopup" @updateTask="updatetask" />
                            </div>
                        </div>
                    </div>

                    <!-- Right: User Detail -->
                    <div class="flex-1 overflow-y-auto pl-3">
                        <h2 class="text-2xl sm:text-3xl font-bold">Personal Information</h2>

                        <!-- ปุ่มสลับ -->
                        <div class="flex justify-around mt-4">
                            <button class="p-3 pt-1 pb-1 text-xl rounded-xl"
                                :class="activeTab === 'personal' ? 'bg-cyan-400 hover:bg-cyan-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'"
                                @click="activeTab = 'personal'">
                                Personal Information
                            </button>
                            <button class="p-3 pt-1 pb-1 text-xl rounded-xl"
                                :class="activeTab === 'insurance' ? 'bg-cyan-400 hover:bg-cyan-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'"
                                @click="activeTab = 'insurance'">
                                Insurance Card
                            </button>
                        </div>

                        <!-- เนื้อหา -->
                        <div v-if="activeTab === 'personal'">
                            <div v-for="user in dataUserDetail" :key="user.user_id" class="space-y-6 mt-6">
                                <PersonalInformation :item="user" />
                                <div class="rounded-xl">
                                    <Map />
                                </div>
                            </div>
                        </div>

                        <!-- แสดง Insurance -->
                        <div v-else-if="activeTab === 'insurance'">
                            <div v-for="user in dataUserDetail" :key="user.user_id" class="space-y-6 mt-6">
                                <InsuranceCard v-if="user" :item="user.insurances[0]" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import fetchAPI from '../../service/fetchAPI.ts';
import Map from '~/components/elements/Map.vue';
import { useUserStore } from '../store/user'
import { getApiBaseUrl } from '~/config/api'
import TaskDetail from './TaskDetail.vue';
import PersonalInformation from './PersonalInformation.vue';
import InsuranceCard from './InsuranceCard.vue';
const baseURL = getApiBaseUrl()
const emit = defineEmits(['close', 'updateTask'])
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

// Reactive state
const dataUserDetail = ref([]);
const dataTaskDetail = ref([]);
const activeTab = ref('personal')

const closePopup = () => {
    emit('close')
}

const updatetask = () => {
    emit('updateTask')
}
// Fetch user details
// const getDetailUserData = async () => {
//     try {
//         const payload = { "user_id": props.item.user_id };
//         const result = await fetchAPI.post(baseURL + 'B2BUser/GetDetailUser', payload);
//         if (result && result.user) {
//             dataUserDetail.value = [result.user];
//             console.log(result);
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// };

// Fetch task details
const getDetailTaskData = async () => {
    try {
        const payload = { "task_id": props.item.task_id };
        const result = await fetchAPI.post(baseURL + 'Task/GetTaskByTaskId', payload);
        if (result && result.task) {
            dataTaskDetail.value = [result.task];
            dataUserDetail.value = [result.task.user_data];
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Lifecycle hook to fetch data on mount
onMounted(() => {
    // getDetailUserData();
    getDetailTaskData();
});
</script>

<style scoped>
.modal-scroll {
    max-height: 90vh;
    overflow-y: auto;
}

/* .box-detail-container {
    height: 80px;
    width: 20px;
    background-color: #ede323;
    border-radius: 10px
} */
</style>