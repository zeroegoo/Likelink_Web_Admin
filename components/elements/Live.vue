<template>
    <div v-if="item" class="w-full m-6 bg-white shadow-xl rounded-3xl flex flex-col overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 bg-white">
            <div class="flex items-start space-x-4">
                <div class="h-14 w-2 bg-cyan-500 rounded-full"></div>
                <div class="text-left">
                    <div class="flex">
                        <h3 class="text-lg font-bold text-cyan-500">IN PROGRESS</h3>
                        <!-- <img src="../../assets/icons/alert.png" />  -->
                    </div>
                    <p class="text-sm text-gray-500">{{ item.created_timestamp }}</p>
                </div>
            </div>
            <button @click="$emit('close')" class="text-gray-800 hover:text-gray-600 text-xl transition" title="Close">
                ✕
            </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-6 space-y-6">
            <!-- Video Thumbnail -->
            <div v-if="streamUrl" class="rounded-xl overflow-hidden shadow-sm border border-gray-200">

                <video ref="videoPlayer" class="video-js vjs-default-skin w-full h-auto" controls autoplay muted
                    playsinline></video>
            </div>

            <div>
                <div class="flex items-center">
                    <!-- <img class="h-3 w-5" src="../../assets/icons/Vector.png" > -->
                    <div class="text-base font-semibold text-gray-500 mb-1">IN PROGRESS</div>
                </div>
                <div class="text-base text-gray-900">13:33:
                    Fall Detected</div>
                <div class="text-base text-gray-900">13:33:
                    Case Accepted (Unit 1)</div>
                <div class="text-base text-gray-900">13:33:
                    Responding....</div>

            </div>
            <!-- Action Buttons -->
            <div v-if="item.task_status == 'AS'" class="flex gap-4 pt-4 items-center justify-stretch">
                <div class="flex bg-cyan-500 hover:bg-cyan-600 items-center justify-between  rounded-lg p-2">
                    <img class="h-5 w-5" src="../../assets/icons/mdi_microphone (1).png" />
                    <button @click="handleSafe(item.task_id, item.user_id)"
                        class="flex-1 pl-2 text-white rounded-lg font-medium transition text-start">
                        Call Resident
                    </button>
                </div>
                <div class="flex bg-cyan-500 hover:bg-cyan-600 items-center justify-between  rounded-lg p-2.5">
                    <img class="h-5 w-5" src="../../assets/icons/teenyicons_id-solid.png" />
                    <button @click="openPopup(item)"
                        class="flex-1 pl-2 text-white rounded-lg font-medium transition text-start">
                        View Information
                    </button>
                </div>
                <div class="flex bg-green-500 hover:bg-green-600 items-center justify-between  rounded-lg p-2.5">
                    <img class="h-5 w-5" src="../../assets/icons/fluent-mdl2_completed-solid.png" />
                    <button @click="handleCompleteCase(item.task_id, item.user_id)"
                        class="flex-1 pl-2 text-white rounded-lg font-medium transition text-start">
                        Complete Case
                    </button>
                </div>
            </div>
        </div>
    </div>
    <transition name="fade">
        <div v-if="toast.message" :class="[
            'absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow z-20 text-white',
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        ]">
            {{ toast.message }}
        </div>
    </transition>

    <div v-if="isPopupVisible" class="fixed inset-0 z-50 bg-black/10 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-xl relative">
            <FallingDetection :item="popupItem" @close="closePopup" />
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import fetchAPI from '../../service/fetchAPI'
import FallingDetection from './FallingDetection.vue'
import { getApiBaseUrl } from '~/config/api'
import { StorageService } from '../../utility/StorageService'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

const baseURL = getApiBaseUrl()

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

const videoPlayer = ref(null)
const streamUrl = ref(null)


onMounted(async () => {
    try {
        const res = props.item?.camera?.external_link
        if (!res) {
            throw new Error('stream URL not found in props.item.camera.external_link')
        }

        streamUrl.value = res

        // 🟢 รอ DOM render <video ref="videoPlayer"> เสร็จก่อน
        await nextTick()

        if (!videoPlayer.value) {
            throw new Error('videoPlayer DOM element not found')
        }

        // เรียก videojs หลังจาก DOM พร้อมแล้ว
        const player = videojs(videoPlayer.value, {
            sources: [
                {
                    src: streamUrl.value,
                    type: 'application/x-mpegURL',
                },
            ],
            autoplay: true,
            controls: true,
            fluid: true,
        })

        player.ready(() => {
            console.log('✅ Video.js player ready')
        })
    } catch (err) {
        console.error('Error loading stream:', err)
    }
})

const toast = ref({ message: null, type: 'success' })

const selectedItem = ref(null)

const isPopupVisible = ref(false)
const popupItem = ref(null)

function showToast(message, type = 'success', duration = 2000) {
    toast.value = { message, type }
    setTimeout(() => {
        toast.value.message = null
    }, duration)
}

const openPopup = (item) => {
    popupItem.value = item
    isPopupVisible.value = true
    selectedItem.value = item
}
const closePopup = () => {
    isPopupVisible.value = false
}

const emit = defineEmits(['close', 'updateTask'])

async function handleCompleteCase(id, user_id) {
    const user = StorageService.get('UserDetail')
    try {
        const payload = {
            task_id: `${id}`,
            task_status: 'SS',
            user_id: `${user.user_id}`
        }
        const result = await fetchAPI.post(`${baseURL}Task/UpdateTask`, payload)
        if (result) {
            showToast('❌ Marked as Fail', 'success')
            emit('updateTask')
            setTimeout(() => emit('close'), 100)
        }
    } catch (error) {
        console.error('Error fetching data:', error)
        showToast('⚠️ Something went wrong', 'error')
    }
}

async function handleSafe(id, user_id) {
    const user = StorageService.get('UserDetail')
    try {
        const payload = {
            task_id: id,
            task_status: 'CC',
            user_id: `${user.user_id}`
        }
        const result = await fetchAPI.post(`${baseURL}Task/UpdateTask`, payload)
        if (result) {
            emit('updateTask', payload)
            showToast('✅ Marked as Safe', 'success')
            setTimeout(() => emit('close'), 100)
        }
    } catch (error) {
        console.error('Error fetching data:', error)
        showToast('⚠️ Something went wrong', 'error')
    }
}
</script>

<style scoped>
@media (max-width: 768px) {
    .text-lg {
        font-size: 1rem;
    }

    .flex {
        flex-direction: column;
    }

    .space-x-4 {
        margin-right: 0;
        margin-left: 0;
    }

    .button {
        margin-bottom: 12px;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>