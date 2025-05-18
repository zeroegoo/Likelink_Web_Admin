<template>
    <div>
        <div v-if="personalItems">
            <div>
                <h2 class="text-2xl sm:text-3xl font-bold">Personal Information</h2>
                <div class="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
                    <!-- Name -->
                    <div class="flex flex-col text-black">
                        <div class="font-semibold text-black text-base">Name</div>
                        <div class="bg-[#AFE9FF] p-2 rounded-xl mt-2">{{ personalItems.fullname }}
                        </div>
                    </div>

                    <!-- Age -->
                    <div class="flex flex-col text-black">
                        <div class="font-semibold text-black text-base">AGE</div>
                        <div class="bg-[#AFE9FF] p-2 rounded-xl mt-2">{{ personalItems.height }}
                        </div>
                    </div>

                    <!-- Blood -->
                    <div class="flex flex-col text-black">
                        <div class="font-semibold text-black text-base">Blood</div>
                        <div class="bg-[#AFE9FF] p-2 rounded-xl mt-2">{{ personalItems.blood }}</div>
                    </div>

                    <!-- Weight -->
                    <div class="flex flex-col text-black">
                        <div class="font-semibold text-black text-base">WEIGHT</div>
                        <div class="bg-[#AFE9FF] p-2 rounded-xl mt-2">{{ personalItems.weight }}
                        </div>
                    </div>

                    <!-- Height -->
                    <div class="flex flex-col text-black">
                        <div class="font-semibold text-black text-base">HEIGHT</div>
                        <div class="bg-[#AFE9FF] p-2 rounded-xl mt-2">{{ personalItems.height }}
                        </div>
                    </div>

                    <!-- Address -->
                    <div class="flex flex-col text-black">
                        <div class="font-semibold text-black text-base">ADDRESS</div>
                        <div class="bg-[#AFE9FF] p-2 rounded-xl mt-2">{{ personalItems.address }}
                        </div>
                    </div>

                    <!-- EMS Phone Number -->
                    <div class="flex flex-col text-black">
                        <div class="font-semibold text-black text-base">EMS Phone Number</div>
                        <div class="bg-[#AFE9FF] p-2 rounded-xl mt-2">{{ personalItems.phone }}</div>
                    </div>

                    <!-- Right of Treatment -->
                    <div class="flex flex-col text-black">
                        <div class="font-semibold text-black text-base">RIGHT OF TREATMENT</div>
                        <div class="bg-[#AFE9FF] p-2 rounded-xl mt-2">-</div>
                    </div>
                </div>

                <h2 class="text-2xl font-bold mt-5 mb-4">Medical History</h2>
                <div class="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-2 gap-4 text-white">
                    <!-- Past Medical Condination -->
                    <div class="flex flex-col text-black">
                        <div class="font-semibold text-black text-base">Past Medical Condination</div>
                        <div class="bg-[#AFE9FF] p-2 rounded-xl mt-2">-</div>
                    </div>

                    <!-- Medications -->
                    <div class="flex flex-col text-black">
                        <div class="font-semibold text-black text-base">Medications</div>
                        <div class="bg-[#AFE9FF] p-2 rounded-xl mt-2">-</div>
                    </div>

                    <!-- Blood -->
                    <div class="flex flex-col text-black">
                        <div class="font-semibold text-black text-base">Allergies</div>
                        <div class="bg-[#AFE9FF] p-2 rounded-xl mt-2">{{
                            personalItems.allergic_medication
                        }}</div>
                    </div>

                    <!-- Blood -->
                    <div class="flex flex-col text-black">
                        <div class="font-semibold text-black text-base">Surgical History</div>
                        <div class="bg-[#AFE9FF] p-2 rounded-xl mt-2">-</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Props definition
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

// Default data
const dataDetail = [{
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
}];

const personalItems = ref(props.item ?? dataDetail);
</script>

<style scoped></style>