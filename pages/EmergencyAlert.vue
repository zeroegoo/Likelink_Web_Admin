<template>
  <div class="h-screen w-full flex flex-col">

    <div class="p-4">
      <div class="relative w-full">
        <input type="text" id="user-input" placeholder="Search..."
          class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
        <img src="../assets/icons/search.jpg" alt="Search Icon"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
      </div>
    </div>

    <div class="px-4">
      <h1 class="text-2xl sm:text-3xl font-bold">Emergency Alerts</h1>
    </div>

    <div class="flex flex-row flex-1 overflow-y-auto">
      <div v-if="dataDetail" class="flex flex-wrap gap-4 p-4 w-full lg:w-3/4 overflow-y-auto" id="scroll">
        <div v-for="item in dataDetail" :key="item.task_id" class="flex-grow sm:w-1/2 lg:w-1/3 xl:w-1/4 w-full"
          @click="() => handleClickFallingDetection(item)">
          <AlertDetail :item="item" />
        </div>
      </div>

      <div class="w-full lg:w-1/4 p-4 bg-gray-100">
        <div>
          <h2 class="text-lg font-semibold mb-2">Filter Options</h2>
          <div class="grid grid-cols-1 gap-2">
            <div>
              <label class="flex items-center space-x-2">
                <input type="checkbox" name="like" />
                <span>Like</span>
              </label>
            </div>
            <div>
              <label class="flex items-center space-x-2">
                <input type="checkbox" name="pin" />
                <span>Pin</span>
              </label>
            </div>
            <div>
              <label class="flex items-center space-x-2">
                <input type="checkbox" name="comment" />
                <span>Comment</span>
              </label>
            </div>
          </div>
          <div class="w-full mt-4 flex justify-around">
            <button type="submit"
              class="w-full max-w-md p-3 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition duration-200">
              View Details
            </button>
          </div>
        </div>
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
        const result = await fetchAPI.get('http://rifile.trueddns.com:48195/api/Task/GetTasks');
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

          }
        ]
        console.error('Error fetching data:', error);
      }
    };

    const handleClickFallingDetection = (item) => {
      const user_id = item.user_id
      router.push('/FallingDetection').then(() => {
        // window.history.replaceState({ user_id: user_id }, '', '/FallingDetection');
      });
    };


    onMounted(() => {
      getData();
    });

    return {
      dataDetail,
      handleClickFallingDetection
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
