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

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    setup(props) {

        const taskItems = ref(props.item || {}); // Ensures it starts with `item` or `null`
        console.log(taskItems)
        return { taskItems };
    },
});
</script>

<style scoped></style>