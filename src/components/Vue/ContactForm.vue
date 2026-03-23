<template>
  <div
    class="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
  >
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium mb-2"
          >Nombre completo</label
        >
        <input
          id="name"
          name="name"
          v-model="form.name"
          type="text"
          required
          class="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 border-2 border-transparent focus:border-white focus:outline-none focus:bg-white transition-all"
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium mb-2">Email</label>
        <input
          id="email"
          name="email"
          v-model="form.email"
          type="email"
          required
          class="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 border-2 border-transparent focus:border-white focus:outline-none focus:bg-white transition-all"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label for="phone" class="block text-sm font-medium mb-2"
          >Teléfono</label
        >
        <input
          id="phone"
          name="phone"
          v-model="form.phone"
          type="tel"
          required
          class="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 border-2 border-transparent focus:border-white focus:outline-none focus:bg-white transition-all"
          placeholder="+595 981 234 567"
        />
      </div>

      <div>
        <label for="vehicle" class="block text-sm font-medium mb-2"
          >Vehículo</label
        >
        <input
          id="vehicle"
          name="vehicle"
          v-model="form.vehicle"
          type="text"
          required
          class="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 border-2 border-transparent focus:border-white focus:outline-none focus:bg-white transition-all"
          placeholder="Marca y modelo"
        />
      </div>

      <div>
        <label for="message" class="block text-sm font-medium mb-2"
          >Describe el problema</label
        >
        <textarea
          id="message"
          name="message"
          v-model="form.message"
          required
          rows="4"
          class="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 border-2 border-transparent focus:border-white focus:outline-none focus:bg-white transition-all resize-none"
          placeholder="Contanos que le sucede a tu vehículo o máquina..."
        ></textarea>
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-white text-[#00884a] px-8 py-4 rounded-lg font-bold hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <span v-if="!isSubmitting && !submitted">Enviar Mensaje</span>
        <span v-else-if="isSubmitting">Enviando...</span>
        <span v-else>✓ Mensaje Enviado</span>
      </button>

      <div
        v-if="submitted"
        class="bg-white/20 border border-white/40 rounded-lg p-4 text-center animate-fade-in"
      >
        <p class="font-semibold">¡Gracias por contactarnos!</p>
        <p class="text-sm text-green-100 mt-1">
          Te responderemos en la brevedad posible
        </p>
      </div>

      <div
        v-if="error"
        class="bg-red-500/20 border border-red-500/40 rounded-lg p-4 text-center animate-fade-in mt-4"
      >
        <p class="font-semibold text-white">Hubo un error al enviar</p>
        <p class="text-sm text-red-100 mt-1">
          Por favor, intenta nuevamente más tarde.
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  vehicle: '',
  message: ''
})

const isSubmitting = ref(false)
const submitted = ref(false)
const error = ref(false)

// IMPORTANTE: Reemplaza 'YOUR_FORM_ID' con tu ID real de Formspree
// Puedes obtenerlo creando un nuevo formulario en https://formspree.io/
const PUBLIC_FORMSPREE_ENDPOINT = import.meta.env.PUBLIC_FORMSPREE_ENDPOINT

const handleSubmit = async () => {
  isSubmitting.value = true
  error.value = false

  try {
    const response = await fetch(PUBLIC_FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    if (response.ok) {
      submitted.value = true
      // Resetear formulario
      form.value = {
        name: '',
        email: '',
        phone: '',
        vehicle: '',
        message: ''
      }

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        submitted.value = false
      }, 5000)
    } else {
      const data = await response.json()
      console.error('Error sending form:', data)
      error.value = true
    }
  } catch (err) {
    console.error('Error network:', err)
    error.value = true
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
