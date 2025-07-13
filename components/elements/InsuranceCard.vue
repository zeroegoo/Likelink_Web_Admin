<template>
  <div>
    <div class="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
      <!-- Name -->
      <div class="flex flex-col text-black">
        <div class="font-semibold text-base">Name</div>
        <div class="bg-[#d0d0d0] p-2 rounded-xl mt-2">
          {{ insurance.name }} {{ insurance.surname }}
        </div>
      </div>

      <!-- Company -->
      <div class="flex flex-col text-black">
        <div class="font-semibold text-base">Company</div>
        <div class="bg-[#d0d0d0] p-2 rounded-xl mt-2">{{ insurance.company_name }}</div>
      </div>

      <!-- Policy Number -->
      <div class="flex flex-col text-black">
        <div class="font-semibold text-base">Policy Number</div>
        <div class="bg-[#d0d0d0] p-2 rounded-xl mt-2">{{ insurance.policy_number }}</div>
      </div>

      <!-- Start Date -->
      <div class="flex flex-col text-black">
        <div class="font-semibold text-base">Start Date</div>
        <div class="bg-[#d0d0d0] p-2 rounded-xl mt-2">{{ insurance.start_date }}</div>
      </div>

      <!-- End Date -->
      <div class="flex flex-col text-black">
        <div class="font-semibold text-base">End Date</div>
        <div class="bg-[#d0d0d0] p-2 rounded-xl mt-2">{{ insurance.end_date }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

// ใช้ props.item โดยตรง → เปลี่ยนชื่อเพื่อความเข้าใจ
const insurance = props.item

console.log('📦 Insurance item:', insurance)
</script>

<style scoped></style>
