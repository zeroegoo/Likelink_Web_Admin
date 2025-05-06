<template>
  <div class="h-screen w-full flex flex-col">
    <div class="px-4">
      <h1 class="text-2xl sm:text-3xl font-bold">Emergency Alerts</h1>
    </div>
    <div v-if="dataDetail" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full overflow-y-auto">
      <div v-for="item in dataDetail" :key="item.task_id">
        <AlertDetail :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import AlertDetail from '~/components/elements/AlertDetail.vue';
import fetchAPI from '../../service/fetchAPI.ts';
import { useRouter } from 'vue-router';

export default {
  name: "EmergencyAlerts",
  components: {
    AlertDetail
  },
  setup() {
    const dataDetail = ref([]);
    const router = useRouter();

    const getData = async () => {
      try {
        const result = await fetchAPI.get('Task/GetTasks');
        if (result) {
          dataDetail.value = result
        }
      } catch (error) {
        dataDetail.value = [
          {
            description: "Patient Sataus",
            location: "ID: 4559",
            video_link: "https://www.youtube.com/watch?v=ZRVgKDoWkyU&t=1120s",
            task_status_name: "1 hour ago",
            updated_timestamp: "24 November 2024"

          },
          {
            description: "Patient Sataus",
            location: "ID: 4559",
            video_link: "https://www.youtube.com/watch?v=ZRVgKDoWkyU&t=1120s",
            task_status_name: "1 hour ago",
            updated_timestamp: "24 November 2024"

          },
          {
            description: "Patient Sataus",
            location: "ID: 4559",
            video_link: "https://www.youtube.com/watch?v=ZRVgKDoWkyU&t=1120s",
            task_status_name: "1 hour ago",
            updated_timestamp: "24 November 2024"

          }
        ]
        console.error('Error fetching data:', error);
      }
    };

    onMounted(() => {
      getData();
    });

    return {
      dataDetail,
    };
  },
};
</script>



<style scoped>
#scroll::-webkit-scrollbar {
  width: 12px;
  background-color: #e7e7e7;
}

#scroll::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #b9b9b9;
}
</style>
