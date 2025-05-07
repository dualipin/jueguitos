<template>
  <div class="flex-1 flex items-center justify-center from-blue-300 to-blue-500 bg-gradient-to-r">
    <div class="w-full max-w-md rounded-xl shadow-lg p-6 bg-white overflow-hidden">
      <h1 class="text-2xl font-bold text-center mb-4">Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700"
            >Correo Electrónico</label
          >
          <input
            v-model="username"
            type="text"
            id="username"
            name="username"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm focus:ring-2 focus:ring-blue-500"
          />

          <label for="password" class="block text-sm font-medium text-gray-700 mt-4"
            >Contraseña</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm focus:ring-2 focus:ring-blue-500"
          />

          <div v-if="errorResponse" class="text-red-500 text-sm mt-2">
            {{ errorResponse }}
          </div>

          <button
            type="submit"
            class="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
      <div class="mt-4 text-center">
        <p class="text-sm text-gray-600">
          ¿No tienes una cuenta?
          <RouterLink
            :to="{ name: 'register' }"
            class="font-medium text-blue-600 hover:text-blue-500"
            >Regístrate</RouterLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
// import api from '@/services/api'

const authStore = useAuthStore()
const router = useRouter()
const username = ref('')
const password = ref('')
const errorResponse = ref('')

const login = async () => {
  try {
    console.log(import.meta.env.VITE_API_URL)
    const response = await fetch(import.meta.env.VITE_API_URL + '/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })

    if (!response.ok) {
      throw new Error('Error en la autenticación')
    }
    const data = await response.json()
    if (data) {
      authStore.setUser(data)

      router.push({ name: 'periodica' })
    } else {
      errorResponse.value = 'Error en la autenticación'
    }
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      errorResponse.value = error.message
    } else {
      errorResponse.value = 'Error desconocido'
    }
  }
}
</script>
