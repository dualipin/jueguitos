<script setup lang="ts">
import BurbujasMovimiento from '@/components/BurbujasMovimiento.vue'
import api from '@/services/api'
import { ref } from 'vue'
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const submit = ref(false)
const message = ref<null | string>()

async function registrarEstudiante(usuario: string, contrasena: string) {
  const data = await api.post('/crear_estudiante/', {
    username: usuario,
    password: contrasena,
  })

  return data
}

async function onSubmit() {
  submit.value = true
  function checkUser() {
    if (username.value.length < 3) {
      message.value = 'El nombre de usuario debe tener al menos 3 caracteres'
      console.error('El nombre de usuario debe tener al menos 3 caracteres')
      return false
    }
    if (username.value.length > 20) {
      console.error('El nombre de usuario no puede tener más de 20 caracteres')
      message.value = 'El nombre de usuario no puede tener más de 20 caracteres'
      return false
    }
    if (password.value.length < 6) {
      console.error('La contraseña debe tener al menos 6 caracteres')
      message.value = 'La contraseña debe tener al menos 6 caracteres'
      return false
    }
    if (password.value.length > 20) {
      console.error('La contraseña no puede tener más de 20 caracteres')
      message.value = 'La contraseña no puede tener más de 20 caracteres'
      return false
    }
    if (password.value !== confirmPassword.value) {
      console.error('Las contraseñas no coinciden')
      message.value = 'Las contraseñas no coinciden'
      return false
    }
    if (!/^[a-zA-Z0-9]+$/.test(username.value)) {
      console.error('El nombre de usuario solo puede contener letras y números')
      message.value = 'El nombre de usuario solo puede contener letras y números'
      return false
    }
    return true
  }

  if (!checkUser()) {
    console.error('Error en los datos de registro')
    submit.value = true
    return
  }

  message.value = null

  try {
    // Simulación de registro
    submit.value = false
    const data = await registrarEstudiante(username.value, password.value)

    if (!data) message.value = 'Usuario ya existe'
    message.value = 'Usuario registrado'
  } catch (error) {
    console.error('Error al registrar el usuario:', error)
    message.value = 'Error al registrar el usuario'
    submit.value = false
  }
}
</script>

<template>
  <div
    class="px-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 min-h-screen flex items-center justify-center"
  >
    <BurbujasMovimiento color="blanco" />
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Regístrate</h2>
      <form @submit.prevent="onSubmit">
        <div class="form-group mb-4">
          <label for="username" class="block text-gray-700 font-medium mb-2"
            >Nombre de usuario:</label
          >
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Ingrese su nombre de usuario"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="form-group mb-4">
          <label for="password" class="block text-gray-700 font-medium mb-2">Contraseña:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Ingrese su contraseña"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="form-group mb-4">
          <label for="confirm-password" class="block text-gray-700 font-medium mb-2"
            >Confirmar Contraseña:</label
          >
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
            placeholder="Confirme su contraseña"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          :disabled="submit"
          class="w-full bg-gradient-to-r cursor-pointer disabled:opacity-50 disabled:pointer-events-none from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Register
        </button>

        <div
          v-if="message"
          class="text-center mt-4"
          :class="{
            'text-green-500': message === 'Usuario registrado',
            'text-red-500': message !== 'Usuario registrado',
          }"
        >
          {{ message }}
        </div>
      </form>

      <div>
        <p class="text-sm text-gray-600 mt-4 text-center">
          ¿Ya tienes una cuenta?
          <RouterLink :to="{ name: 'login' }" class="font-medium text-blue-600 hover:text-blue-500"
            >Iniciar sesión</RouterLink
          >
        </p>
      </div>
    </div>
  </div>
</template>
