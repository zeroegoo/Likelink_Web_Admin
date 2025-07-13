<template>
  <div v-if="item" class="bg-white shadow-md overflow-hidden rounded-3xl"
      :class="{ 'pointer-events-none opacity-40': isDisabledStatus }">
    <!-- Red Header (ตอนนี้อยู่ภายในกล่องสีขาว) -->
    <div :class="[
      'text-white justify-between items-center text-xs sm:text-sm font-bold rounded-3xl',
       getStatusClass(item.task_status)
    ]">
<div class="flex p-3 justify-between">
  <span class="flex items-center gap-2">
    <img
      class="h-5 w-5"
  :src="item.task_status === 'AS' ? inProgressIcon : alertIcon"
    >
    {{ item.task_status === 'AS' ? 'IN PROGRESS' : 'FALL DETECTED' }}
  </span>
  <span class="truncate">{{ item.created_timestamp }}</span>
</div>

      <!-- Card Body -->
      <div class="w-full rounded-3xl p-4 flex bg-white  flex-col sm:flex-row gap-3 items-start sm:items-center">
        <!-- Image -->
        <!-- <div /*@click="openPopup"*/> -->
         <div>
          <img :src=item.video_image_link alt="Fall Incident"
            class="w-full sm:w-20 h-auto sm:h-20 object-cover rounded-md max-h-40" />
        </div>

        <!-- Text Info -->
        <div class="flex flex-col text-sm text-gray-800 w-full">
          <!-- Name -->
          <div class="flex flex-col sm:flex-row justify-between text-xs text-gray-600 mt-2 gap-3 w-full">
            <div class="flex gap-1 w-full sm:w-1/2">
              <img class="h-3 w-3 mt-1" src="../../assets/icons/solar_user-bold.png" alt="User Icon" />
              <div class="font-semibold pl-1 break-words">{{ item?.user_data?.prefix }} {{ item?.user_data?.fullname }}
              </div>
            </div>

            <div class="flex gap-1 w-full sm:w-1/2">
              <img class="h-3 w-3 mt-1" src="../../assets/icons/Vector.png" alt="User Icon" />
              <div class="font-semibold pl-1 break-words">{{ item?.user_data?.prefix }} {{ item?.user_data?.fullname }}
              </div>
            </div>
          </div>

          <!-- Address Info -->
          <div class="flex flex-col sm:flex-row justify-between text-xs text-gray-600 mt-2 gap-3 w-full">
            <!-- House No -->
            <div class="flex flex-col gap-1 w-full sm:w-1/2">
              <span>House No.</span>
              <div class="flex items-center">
                <img class="h-4 w-4" src="../../assets/icons/ic_round-house.png" alt="House Icon" />
                <span class="pl-1 break-words">{{ item.house_number }}</span>
              </div>
            </div>

            <!-- Room -->
            <div class="flex flex-col gap-1 w-full sm:w-1/2">
              <span>Room</span>
              <div class="flex justify-start">
                <img class="h-4 w-4" src="../../assets/icons/material-symbols_meeting-room-rounded.png"
                  alt="Room Icon" />
                <span class="pl-1 word">{{ item?.user_data?.address}}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, computed  } from 'vue';
import { useRouter } from 'vue-router'
import { defineProps, toRefs } from 'vue'
import { useUserStore } from '../../store/user'
import alertIcon from '@/assets/icons/alert.png'
import inProgressIcon from '@/assets/icons/in-progress.png'

const router = useRouter()
const userStore = useUserStore()

// Define props
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

function getStatusClass(status) {
  switch (status) {
    case 'SS': return 'bg-green-600';
    case 'W':  return 'bg-red-600';
    case 'CC': return 'bg-gray-400';
    case 'AP':
    case 'CM': return 'bg-red-600';
    case 'AS': return 'bg-gradient-to-r from-cyan-500 to-blue-500';
    default:   return 'bg-white';
  }
}

const { item } = toRefs(props)
const isDisabledStatus = computed(() => ['CC', 'SS'].includes(props.item.task_status))

// const handleClickFallingDetection = () => {
//   if (item.value?.user_id) {
//     userStore.setUser(item.value.user_id, item.value.task_id);
//     router.push({ path: "/FallingDetection" });
//   }
// }

</script>
<style scoped>
.word {
  word-break: break-all;
}
</style>
