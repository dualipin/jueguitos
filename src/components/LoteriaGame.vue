<template>
  <VaChip class="mb-4" color="primary" v-if="isGameStarted">La partida ha comenzado</VaChip>

  Hola: {{ name }}

  <VaButton
    class="mb-4"
    color="success"
    @click="
      () => {
        if (adminSocket && isAdminConnected) {
          adminSocket.send(JSON.stringify({ action: 'llamar_elemento' }))
        } else {
          console.error('No se puede enviar el mensaje. Conexión no establecida.')
        }
      }
    "
    >Enviar mensaje</VaButton
  >
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

defineProps<{
  isGameStarted: boolean
}>()

const authStore = useAuthStore()
const name = ref(authStore.user?.username)

// estados del socket
const socket = ref<WebSocket | null>(null)
const adminSocket = ref<WebSocket | null>(null)
const isConnected = ref(false)
const isAdminConnected = ref(false)

socket.value = new WebSocket(`${import.meta.env.VITE_API_HOST}/laloteria`)
adminSocket.value = new WebSocket(`${import.meta.env.VITE_API_HOST}/admin/laloteria`)

socket.value.onopen = () => {
  console.log('Conectado al servidor de WebSocket')
  isConnected.value = true
}

socket.value.onclose = () => {
  console.log('Desconectado del servidor de WebSocket')
  isConnected.value = false
}

socket.value.onerror = (error) => {
  console.error('Error en la conexión de WebSocket:', error)
}
socket.value.onmessage = (event) => {
  const data = JSON.parse(event.data)
  console.log('Mensaje recibido del servidor:', data)

  // Aquí puedes manejar los mensajes recibidos del servidor
  // Por ejemplo, actualizar el estado del juego o la interfaz de usuario
}

adminSocket.value.onopen = () => {
  console.log('Conectado al servidor de WebSocket admin')
  isAdminConnected.value = true
}
adminSocket.value.onclose = () => {
  console.log('Desconectado del servidor de WebSocket admin')
  isAdminConnected.value = false
}
adminSocket.value.onerror = (error) => {
  console.error('Error en la conexión de WebSocket admin:', error)
}
adminSocket.value.onmessage = (event) => {
  const data = JSON.parse(event.data)
  console.log('Mensaje recibido del servidor admin:', data)

  // Aquí puedes manejar los mensajes recibidos del servidor admin
  // Por ejemplo, actualizar el estado del juego o la interfaz de usuario
}

// const enviarMensaje = (message: { action: string }) => {
//   if (socket.value && isConnected.value) {
//     socket.value.send(JSON.stringify({ message }))
//   } else {
//     console.error('No se puede enviar el mensaje. Conexión no establecida.')
//   }
// }

// const cerrarConexion = () => {
//   if (socket.value) {
//     socket.value.close()
//     socket.value = null
//     isConnected.value = false
//   }
// }

onBeforeMount(() => {
  // Cerrar la conexión del WebSocket al desmontar el componente
  return () => {
    if (adminSocket.value) {
      adminSocket.value.close()
      adminSocket.value = null
      isAdminConnected.value = false
    }
    if (socket.value) {
      socket.value.close()
      socket.value = null
      isConnected.value = false
    }
    console.log('Conexión de WebSocket cerrada')
  }
})
</script>
