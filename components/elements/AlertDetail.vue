<template>
  <div v-if="item && item.user_data" class="p-2">
    <div class="bg-white rounded-xl shadow-md p-3 w-full h-full">
      <div class="mb-3">
        <h2 class="text-base font-semibold text-gray-800">Updates</h2>
        <p class="text-sm text-gray-500">{{ item.created_timestamp }}</p>
      </div>

      <div class="flex flex-col lg:flex-row gap-3">
        <div class="flex flex-col items-center text-center w-full lg:w-1/5">
          <div class="w-20 h-20 rounded-full overflow-hidden mb-2">
            <img :src="item.user_data.profile_image" alt="Profile" class="w-full h-full object-cover" />
          </div>
          <h3 class="font-bold text-sm">{{ item.user_data.prefix}} {{ item.user_data.fullname }}</h3>
          <!-- <h4 class="text-sm text-gray-500">Wannatest</h4> -->
          <p class="text-sm text-gray-500">{{ item.user_data.birthdate }}</p>
          <p class="text-sm">1-1111-11111-1-11</p>
        </div>

        <div class="flex flex-col gap-2 flex-1">
          <div class="text-sm">
            <div class="flex ">
              <img class="h-4 w-4 items-center text-center" src="../../assets/icons/majesticons_map-marker.png" />
              <p class="font-semibold">Address</p>
            </div>
            <p class="bg-gray-100 p-2 rounded-xl">{{ item.user_data.address }}</p>
          </div>
          <div class="text-sm">
            <div class="flex ">
              <img class="h-5 w-5 items-center text-center" src="../../assets/icons/healthicons_insurance-card.png" />
              <p class="font-semibold">Insurance</p>
            </div>
            <p class="bg-gray-100 p-2 rounded-xl">เอไอเอ (AIA)</p>
          </div>
          <div class="text-sm">
            <div class="flex ">
              <img class="h-5 w-5 items-center text-center" src="../../assets/icons/famicons_medical-sharp.png" />
              <p class="font-semibold">Volunteer</p>
            </div>
            <p class="bg-gray-100 p-2 rounded-xl">Volunteer</p>
          </div>
          <div class="text-sm">
            <div class="flex ">
              <img class="h-5 w-5 items-center text-center" src="../../assets/icons/mdi_ambulance.png" />
              <p class="font-semibold">Unit Info</p>
            </div>
            <p class="bg-gray-100 p-2 rounded-xl">1669 EMS Center</p>
          </div>
        </div>

        <div class="flex flex-col h-inherit justify-between gap-1 lg:w-1/3 border-l border-gray-200 pl-2">
          <p class="text-sm text-red-500 font-semibold">Falling</p>
          <div class="w-full h-full aspect-video rounded-xl overflow-hidden" @click="handleClickFallingDetection">
            <img :src="item.video_image_link" class="object-cover w-full h-full" />
          </div>
          <div class="text-sm mt-1">
            <p class="font-semibold">Description</p>
            <p class="bg-gray-100 p-2 rounded-xl">ภายในห้องครัว</p>
          </div>
          <div class="flex gap-2 mt-2">
            <button class="bg-green-500 text-white text-sm flex-1 py-1 rounded-full">Accept</button>
            <button class="bg-red-500 text-white text-sm flex-1 py-1 rounded-full">Reject</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { defineProps, toRefs } from 'vue'
import { useUserStore } from '../../store/user'

const router = useRouter()
const userStore = useUserStore()

const props = defineProps({
  item: Object
})

const { item } = toRefs(props)

const handleClickFallingDetection = () => {
  if (item.value?.user_id) {
    userStore.setUser(item.value.user_id, item.value.task_id);
    router.push({ path: "/FallingDetection" })
  }
}
</script>
<style scoped>
/* Add your styles here */
</style>
