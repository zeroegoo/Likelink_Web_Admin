<template>
    <div v-if="taskItems" class="flex flex-col min-h-screen">
        <!-- ส่วนบน: รายละเอียด -->
        <div class="flex mt-5 justify-between">
            <div class="flex items-center">
                <div class="box-detail-container"></div>
                <div class="text-2xl text-cyan-500 pl-4 sm:text-3xl font-bold">
                    IN PROGRESS
                </div>
            </div>
            <div class="flex items-center">
                <div>Start Time: {{ taskItems.updated_timestamp }}</div>
            </div>
        </div>

        <!-- วิดีโอ -->
        <div class="mt-5 flex justify-center">
            <video class="w-full max-w-4xl h-auto md:h-[500px] rounded-sm" ref="videoPlayer" controls>
                <source :src="taskItems.video_link" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>

        <!-- Health Data Overlay -->
        <div class="mt-10">
            <div class="w-full flex flex-col md:flex-row mt-5 gap-4">
                <!-- Live View -->
                <div
                    class="flex-1 flex items-center gap-3 p-4 bg-white shadow-md hover:shadow-lg transition rounded-2xl text-gray-800">
                    <div class="h-12 w-12 flex-shrink-0">
                        <img src="../../assets/icons/fluent_live-20-filled.png" alt="Live Icon"
                            class="w-full h-full object-contain" />
                    </div>
                    <div class="flex text-xl font-bold items-end">Live View</div>
                </div>
                <!-- Speak -->
                <div
                    class="flex-1 flex items-center gap-3 p-4 bg-white shadow-md hover:shadow-lg transition rounded-2xl text-gray-800">
                    <div class="h-12 w-12 flex-shrink-0">
                        <img src="../../assets/icons/mdi_microphone.png" alt="Mic Icon"
                            class="w-full h-full object-contain" />
                    </div>
                    <div class="text-xl font-bold">Speak</div>
                </div>
                <!-- Share -->
                <div
                    class="flex-1 flex items-center gap-3 p-4 bg-white shadow-md hover:shadow-lg transition rounded-2xl text-gray-800">
                    <div class="h-12 w-12 flex-shrink-0">
                        <img src="../../assets/icons/ix_export.png" alt="Share Icon"
                            class="w-full h-full object-contain" />
                    </div>
                    <div class="text-xl font-bold">Share</div>
                </div>
            </div>
        </div>

        <!-- ปุ่มล่างสุด -->
        <div class="flex justify-end space-x-4 mt-10  mb-6">
            <button @click="handleAccept(item.task_id, item.user_id)"
                class="px-6 py-2s bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none">
                Accept
            </button>
            <button @click="handleDecine(item.task_id, item.user_id)"
                class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none">
                Decline
            </button>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { getApiBaseUrl } from '~/config/api'
const baseURL = getApiBaseUrl()
import fetchAPI from '../../service/fetchAPI';
import { StorageService } from '../../utility/StorageService'

// Props
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
const emit = defineEmits(['close'])
// Reactive variable initialized with the prop
const taskItems = ref(props.item || {});)

async function handleAccept(id, user_id) {
    const user = StorageService.get('UserDetail')
    try {
        const payload = {
            task_id: `${id}`,
            task_status: 'AS',
            user_id: `${user.user_id}`
        }
        const result = await fetchAPI.post(`${baseURL}Task/UpdateTask`, payload)
        if (result) {
            // showToast('❌ Marked as Fail', 'success')
            emit('updateTask', payload)
            setTimeout(() => emit('close'), 100)
        }
    } catch (error) {
        console.error('Error fetching data:', error)
        setTimeout(() => emit('close'), 100)
        // showToast('⚠️ Something went wrong', 'error')
    }
}

async function handleDecine(id, user_id) {
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
            // showToast('✅ Marked as Safe', 'success')
            setTimeout(() => emit('close'), 100)
        }
    } catch (error) {
        console.error('Error fetching data:', error)
        setTimeout(() => emit('close'), 100)
        // showToast('⚠️ Something went wrong', 'error')
    }
}
</script>


<style scoped></style>