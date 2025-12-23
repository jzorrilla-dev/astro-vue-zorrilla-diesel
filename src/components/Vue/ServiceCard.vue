<template>
  <div
    class="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-[#00884a] group flex flex-col items-center text-center h-full"
  >
    <div
      class="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-[#00884a]/10 group-hover:border-[#00884a] transition-colors"
    >
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
    </div>
    <h3
      class="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#00884a] transition-colors"
    >
      {{ title }}
    </h3>
    <p class="text-gray-600 leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>
