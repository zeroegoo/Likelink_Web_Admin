<template>
    <div class="flex gap-8 h-screen overflow-hidden">
        <!-- Left Section -->
        <div class="flex-1 h-full overflow-auto">
            <div class="flex mt-5 justify-between">
                <div class="flex items-center">
                    <div class="box-detail-container"></div>
                    <div class="text-2xl pl-4 sm:text-3xl font-bold">
                        Falling Detection !!
                    </div>
                </div>
                <div class="flex items-center">
                    <div>Start Time :</div>
                    <div>13:33:45</div>
                </div>
            </div>
            <div class="w-full md:w-auto mt-5">
                <div class="bg-black h-80 rounded-xl"></div>
                <div class="w-full flex md:w-auto mt-5 gap-4">
                    <div class="bg-black h-40 rounded-xl flex-1"></div>
                    <div class="bg-black h-40 rounded-xl flex-1"></div>
                    <div class="bg-black h-40 rounded-xl flex-1"></div>
                </div>
                <div class="w-full flex md:w-auto mt-5 gap-4">
                    <div class="bg-black h-10 rounded-xl flex-1"></div>
                    <div class="bg-black h-10 rounded-xl flex-1"></div>
                    <div class="bg-black h-10 rounded-xl flex-1"></div>
                </div>
            </div>
            <div class="mt-10">
                <div class="text-xl sm:text-xl font-bold">
                    Health Data Overlay
                </div>
                <div class="w-full flex md:w-auto mt-5 gap-4">
                    <!-- Heart Rate -->
                    <div
                        class="flex-1 flex items-center gap-2 p-4  border-1 border-[oklch(0.552_0.016_285.938)] rounded-xl text-black">
                        <div class="h-10 w-10"><img src="../assets/icons/heart.png" alt="Heart Rate"></div>
                        <div>
                            <div class="text-sm">Heart Rate</div>
                            <div class="flex text-lg font-bold">147 <span class="text-sm ml-1">bpm</span></div>
                        </div>
                    </div>

                    <!-- Blood Pressure -->
                    <div
                        class="flex-1 flex items-center gap-2 border-1 border-[oklch(0.552_0.016_285.938)]  p-4 rounded-xl text-black">
                        <div class="h-10 w-10"><img src="../assets/icons/heart.png" alt="Blood Pressure"></div>
                        <div>
                            <div class="text-sm">Blood Pressure</div>
                            <div class="text-lg font-bold">120/80</div>
                        </div>
                    </div>

                    <!-- SpO2 -->
                    <div
                        class="flex-1 flex items-center border-1 border-[oklch(0.552_0.016_285.938)]  gap-2 p-4 rounded-xl text-black">
                        <div class="h-10 w-10"><img src="../assets/icons/heart.png" alt="SpO2"></div>
                        <div>
                            <div class="text-sm">SpO2</div>
                            <div class="text-lg font-bold">82%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Section: Personal Information -->
        <div v-if="dataDetail && dataDetail.length > 0"
            class="flex-1 p-10 border-l-2 border-[oklch(0.552_0.016_285.938)] overflow-auto">
            <div v-for="item in dataDetail" :key="item.task_id" class="h-full flex flex-col justify-between">
                <div>
                    <h2 class="text-2xl sm:text-3xl font-bold">Personal Information</h2>
                    <div class="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
                        <!-- Name -->
                        <div class="flex flex-col text-black">
                            <div class="font-semibold text-black text-base">Name</div>
                            <div class="bg-[oklch(0.956_0.045_203.388)] p-2 rounded-xl mt-2">{{ item.fullname }}</div>
                        </div>

                        <!-- Age -->
                        <div class="flex flex-col text-black">
                            <div class="font-semibold text-black text-base">AGE</div>
                            <div class="bg-[oklch(0.956_0.045_203.388)] p-2 rounded-xl mt-2">{{ item.height }}</div>
                        </div>

                        <!-- Blood -->
                        <div class="flex flex-col text-black">
                            <div class="font-semibold text-black text-base">Blood</div>
                            <div class="bg-[oklch(0.956_0.045_203.388)] p-2 rounded-xl mt-2">{{ item.blood }}</div>
                        </div>

                        <!-- Weight -->
                        <div class="flex flex-col text-black">
                            <div class="font-semibold text-black text-base">WEIGHT</div>
                            <div class="bg-[oklch(0.956_0.045_203.388)] p-2 rounded-xl mt-2">{{ item.weight }}</div>
                        </div>

                        <!-- Height -->
                        <div class="flex flex-col text-black">
                            <div class="font-semibold text-black text-base">HEIGHT</div>
                            <div class="bg-[oklch(0.956_0.045_203.388)] p-2 rounded-xl mt-2">{{ item.height }}</div>
                        </div>

                        <!-- Address -->
                        <div class="flex flex-col text-black">
                            <div class="font-semibold text-black text-base">ADDRESS</div>
                            <div class="bg-[oklch(0.956_0.045_203.388)] p-2 rounded-xl mt-2">{{ item.address }}</div>
                        </div>

                        <!-- EMS Phone Number -->
                        <div class="flex flex-col text-black">
                            <div class="font-semibold text-black text-base">EMS Phone Number</div>
                            <div class="bg-[oklch(0.956_0.045_203.388)] p-2 rounded-xl mt-2">{{ item.phone }}</div>
                        </div>

                        <!-- Right of Treatment -->
                        <div class="flex flex-col text-black">
                            <div class="font-semibold text-black text-base">RIGHT OF TREATMENT</div>
                            <div class="bg-[oklch(0.956_0.045_203.388)] p-2 rounded-xl mt-2">-</div>
                        </div>
                    </div>

                    <h2 class="text-2xl font-bold mt-5 mb-4">Medical History</h2>
                    <div class="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-2 gap-4 text-white">
                        <!-- Past Medical Condination -->
                        <div class="flex flex-col text-black">
                            <div class="font-semibold text-black text-base">Past Medical Condination</div>
                            <div class="bg-[oklch(0.956_0.045_203.388)] p-2 rounded-xl mt-2">-</div>
                        </div>

                        <!-- Medications -->
                        <div class="flex flex-col text-black">
                            <div class="font-semibold text-black text-base">Medications</div>
                            <div class="bg-[oklch(0.956_0.045_203.388)] p-2 rounded-xl mt-2">-</div>
                        </div>

                        <!-- Blood -->
                        <div class="flex flex-col text-black">
                            <div class="font-semibold text-black text-base">Allergies</div>
                            <div class="bg-[oklch(0.956_0.045_203.388)] p-2 rounded-xl mt-2">{{ item.allergic_medication
                                }}</div>
                        </div>

                        <!-- Blood -->
                        <div class="flex flex-col text-black">
                            <div class="font-semibold text-black text-base">Surgical History</div>
                            <div class="bg-[oklch(0.956_0.045_203.388)] p-2 rounded-xl mt-2">-</div>
                        </div>
                    </div>
                </div>
                <div class="flex w-full justify-end space-x-4">
                    <div>
                        <button
                            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none">
                            Accept
                        </button>
                    </div>
                    <div>
                        <button class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none">
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import { ref, onMounted } from 'vue';
import fetchAPI from '../../service/fetchAPI.ts';
import { useRouter } from 'vue-router';

export default {
    name: "FallingDetection",
    components: {

    },
    setup() {
        const dataDetail = ref([]);
        const user = window?.history?.state?.user || {}; 
        const id = user.id || "67d146c230e269304cd681a1"; 

        console.log(id); // Logs the user ID

        const getDetailUserData = async () => {
            try {
                const payload = {
                    "user_id": id
                }
                const result = await fetchAPI.post('http://rifile.trueddns.com:48195/api/User/GetDetailUser', payload);
                if (result && result.user) {
                    dataDetail.value = [result.user]
                } 
            } catch (error) {
                console.error('Error fetching data:', error);
                 dataDetail.value = [ {
                    address:"-",
                    allergic_medication:"-",
                    birthdate:"-",
                    blood:"-",
                    chronic_disease:"-",
                    citizen_id:"-",
                    current_medication:"-",
                    email:"-",
                    emergency_number:['-'],
                    fullname:"-",
                    height:"-",
                    hospital_name:['-'],
                    phone:"-",
                    prefix:"-",
                    primary_care_physician :['-'],
                    profile_image:"-",
                    user_id:"-",
                    user_type_id:"-",
                    user_type_name:"-",
                    username:"-",
                    weight:"-",
                    }]
            }
        };

        onMounted(() => {
            getDetailUserData();
        });

        return {
            dataDetail
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