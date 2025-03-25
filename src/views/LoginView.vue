<template>
  <div class="flex-1 flex items-center justify-center from-blue-300 to-blue-500 bg-gradient-to-r">
    <div class="w-full max-w-md rounded-xl shadow-lg p-6 bg-white overflow-hidden">
      <h1 class="text-2xl font-bold text-center mb-4">Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Correo Electrónico</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            name="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus:ring-2 focus:ring-blue-500"
          />

          <label for="password" class="block text-sm font-medium text-gray-700 mt-4"
            >Contraseña</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            class="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    // Simulación de inicio de sesión
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // Redirige a la página principal
    router.push('/')
  } catch (error) {
    console.error(error)
  }
}
</script>
