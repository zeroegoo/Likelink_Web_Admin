<template>
    <div v-if="taskItems">
        <div class="flex mt-5 justify-between">
            <div class="flex items-center">
                <div class="box-detail-container"></div>
                <div class="text-2xl pl-4 sm:text-3xl font-bold">
                    Falling Detection !!
                </div>
            </div>
            <div class="flex items-center">
                <div>Start Time: {{ taskItems.updated_timestamp }}</div>
            </div>
        </div>
        <div class="mt-5 flex justify-center">
            <video class="w-full max-w-4xl h-auto md:h-[500px] rounded-sm" ref="videoPlayer" controls>
                <source :src="taskItems.video_link" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Props
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});

// Reactive variable initialized with the prop
const taskItems = ref(props.item || {});

console.log(taskItems);
</script>


<style scoped></style>