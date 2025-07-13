<template>
  <div v-if="streamUrl">
    <video
      ref="videoPlayer"
      class="video-js vjs-default-skin w-full h-auto"
      controls
      autoplay
      muted
      playsinline
    ></video>
  </div>
  <div v-else class="text-gray-500 text-sm">Loading live stream...</div>
</template>

<script setup>

definePageMeta({
  middleware: 'auth'
})

import { onMounted, ref } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

const videoPlayer = ref(null)
const streamUrl = ref(null)

onMounted(async () => {
  try {
    // ✅ ดึงลิงก์จาก API backend ที่ให้ไว้
    const res = 'rtsp://rtsp.dotx.life/test_1'
    streamUrl.value = res // สมมติว่า API คืน { url: 'https://...m3u8' }

    // ✅ เริ่มเล่น video เมื่อได้ URL
    videojs(videoPlayer.value, {
      sources: [{
        src: streamUrl.value,
        type: 'application/x-mpegURL'
      }],
      autoplay: true,
      controls: true,
      fluid: true
    })
  } catch (err) {
    console.error('Error loading stream:', err)
  }
})
</script>
