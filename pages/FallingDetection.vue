<template>
    <div class="flex gap-6 h-screen overflow-hidden">
        <!-- Left Section -->
        <div class="flex-1 h-full overflow-auto">
            <div v-if="dataTaskDetail && dataTaskDetail.length > 0">
                <div v-for="item in dataTaskDetail" :key="item.task_id">
                    <TaskDetail :item="item" />
                </div>
            </div>
            
            <!-- Health Data Overlay -->
            <div class="mt-10">
                <div class="text-xl font-bold">Health Data Overlay</div>
                <div class="w-full flex md:w-auto mt-5 gap-4">
                    <!-- Heart Rate -->
                    <div class="flex-1 flex items-center gap-2 p-4 border border-gray-400 rounded-xl text-black">
                        <div class="h-10 w-10">
                            <img src="../assets/icons/heart.png" alt="Heart Icon">
                        </div>
                        <div>
                            <div class="text-sm">Heart Rate</div>
                            <div class="flex text-lg font-bold">147 <span class="text-sm ml-1">bpm</span></div>
                        </div>
                    </div>

                    <!-- Blood Pressure -->
                    <div class="flex-1 flex items-center gap-2 p-4 border border-gray-400 rounded-xl text-black">
                        <div class="h-10 w-10">
                            <img src="../assets/icons/heart.png" alt="Blood Pressure Icon">
                        </div>
                        <div>
                            <div class="text-sm">Blood Pressure</div>
                            <div class="text-lg font-bold">120/80</div>
                        </div>
                    </div>

                    <!-- SpO2 -->
                    <div class="flex-1 flex items-center gap-2 p-4 border border-gray-400 rounded-xl text-black">
                        <div class="h-10 w-10">
                            <img src="../assets/icons/heart.png" alt="SpO2 Icon">
                        </div>
                        <div>
                            <div class="text-sm">SpO2</div>
                            <div class="text-lg font-bold">82%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Section: Personal Information -->
        <div v-if="dataUserDetail && dataUserDetail.length > 0" class="flex-1 p-9 border-l-2 border-gray-400 overflow-auto">
            <div v-for="item in dataUserDetail" :key="item.id" class="h-full flex flex-col justify-between">
                <PersonalInformation :item="item" />
                <div class="rounded-xl ">
                    <Map />
                </div>
                <div class="flex w-full justify-end space-x-4 mt-4">
                    <button class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none">
                        Accept
                    </button>
                    <button class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none">
                        Decline
                    </button>
                    <button class="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-red-600 focus:outline-none">
                        Export
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import fetchAPI from '../../service/fetchAPI.ts';
import PersonalInformation from '~/components/elements/PersonalInformation.vue';
import TaskDetail from '~/components/elements/TaskDetail.vue';
import Map from '~/components/elements/Map.vue';

export default {
    name: "FallingDetection",
    components: {
        PersonalInformation,
        TaskDetail,
        Map
    },
    setup() {
        const dataUserDetail = ref([]);
        const dataTaskDetail = ref([]);
        const user = window?.history?.state?.user || {}; 
        const userId = user.userId || "67d146c230e269304cd681a1"; 
        const taskId = user.taskId

        console.log(userId);

        const videoPlayer = ref('../assets/icons/Screen Recording 2025-03-14 131334.mp4');

        const skip = (seconds) => {
        if (videoPlayer.value) {
            videoPlayer.value.currentTime += seconds;
        }
        };

        const getDetailUserData = async () => {
            try {
                const payload = {
                    "user_id": userId
                }
                const result = await fetchAPI.post('User/GetDetailUser', payload);
                if (result && result.user) {
                    dataUserDetail.value = [result.user]
                    console.log(result)
                } 
            } catch (error) {
                console.error('Error fetching data:', error);
                dataTaskDetail.value = [result.task]
            }
        };

        const getDetailTaskData = async () => {
            try {
                const payload = {
                    "task_id": taskId
                }
                const result = await fetchAPI.post('Task/GetTaskByTaskId', payload);
                console.log(result)
                if (result && result.task) {
                    dataTaskDetail.value = [result.task]
                } 
            } catch (error) {
                console.error('Error fetching data:', error);
                dataUserDetail.value = [{
                        address: "-",
                        allergic_medication: "-",
                        birthdate: "-",
                        blood: "-",
                        chronic_disease: "-",
                        citizen_id: "-",
                        current_medication: "-",
                        email: "-",
                        emergency_number: ['-'],
                        fullname: "-",
                        height: "-",
                        hospital_name: ['-'],
                        phone: "-",
                        prefix: "-",
                        primary_care_physician: ['-'],
                        profile_image: "-",
                        user_id: "-",
                        user_type_id: "-",
                        user_type_name: "-",
                        username: "-",
                        weight: "-",
                    }]
            }
        };

        onMounted(() => {
            getDetailUserData();
            getDetailTaskData()
        });

        return {
            dataUserDetail,
            dataTaskDetail,
            videoPlayer,
            skip
        };
    },
};
</script>



<style scoped>
.box-detail-container {
    height: 80px;
    width: 20px;
    background-color: #ede323;
    border-radius: 10px
}

</style>