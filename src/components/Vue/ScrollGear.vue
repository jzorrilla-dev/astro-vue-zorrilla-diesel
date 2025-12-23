<template>
  <div
    class="absolute left-1/2 top-1/2 pointer-events-none z-10 flex items-center justify-center"
    :style="{ transform: `translate(-50%, -50%)` }"
  >
    <GearIcon
      :style="{ transform: `rotate(${rotation}deg)` }"
      class="transition-transform duration-75 ease-linear text-gray-500"
      width="40"
      height="40"
      viewBox="0 0 32 32"
      fill="currentColor"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import GearIcon from '../Vue/GearIcon.vue'

const rotation = ref(0)
let lastScrollY = 0
let ticking = false

const handleScroll = () => {
  const scrollY = window.scrollY
  const scrollDelta = scrollY - lastScrollY

  // Rotar el engranaje según el scroll (más rápido para efecto visual)
  rotation.value += scrollDelta * 0.1

  lastScrollY = scrollY
}

const onScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll()
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  lastScrollY = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
