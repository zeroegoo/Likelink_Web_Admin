<template>
  <div v-if="item" class="p-2" @click="handleClickFallingDetection">
  <div class="bg-white rounded-xl shadow-md p-3 w-full h-full">
    <div class="mb-3">
      <h2 class="text-base font-semibold text-gray-800">Updates</h2>
      <p class="text-sm text-gray-500">01/01/2025 00.00 AM</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-3">
      <div class="flex flex-col items-center text-center w-full lg:w-1/5">
        <div class="w-20 h-20 rounded-full overflow-hidden mb-2">
          <img src="../../assets/icons/pofile.png" alt="Profile" class="w-full h-full object-cover" />
        </div>
        <h3 class="font-bold text-sm">Mrs. Somsri</h3>
        <h4 class="text-sm text-gray-500">Wannatest</h4>
        <p class="text-sm text-gray-500">87 Years</p>
        <p class="text-sm">1-1111-11111-1-11</p>
      </div>

      <div class="flex flex-col gap-2 flex-1">
        <div class="text-sm">
          <div class="flex ">
            <img class="h-4 w-4 items-center text-center" src="../../assets/icons/majesticons_map-marker.png" />
            <p class="font-semibold">Address</p>
          </div>
          <p class="bg-gray-100 p-2 rounded-xl">A space play 291/109 sutthisan bkk</p>
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
        <div class="w-full h-full aspect-video rounded-xl overflow-hidden">
          <img src="../../assets/icons/pexels-ricky-esquivel-2627063.jpg" class="object-cover w-full h-full" />
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


<script setup lang="ts">
import { useRouter } from 'vue-router'
import { defineProps, toRefs, ref } from 'vue'

const router = useRouter()

const props = defineProps<{
  item: {
    user_id?: string,
    task_id?: string
  }
}>()

const { item } = toRefs(props)
const inputValue = ref("")

// Navigation
const handleClickFallingDetection = () => {
  if (item.value?.user_id) {
    router.push({
      path: "/FallingDetection",
      state: {
        user: {
          userId: item.value.user_id,
          taskId: item.value.task_id
        }
      }
    })
  } else {
    router.push({ path: "/FallingDetection" })
  }
}

// Other actions
const likeAction = () => {
  console.log("Liked")
}

const pinAction = () => {
  console.log("Pinned")
}
</script>


<style scoped>
/* Add your styles here */
</style>
