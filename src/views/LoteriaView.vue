<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-center text-emerald-600">
      Lotería de Elementos Químicos
    </h1>

    <!-- Pantalla de entrada -->
    <div v-if="!playerConnected" class="flex flex-col items-center gap-4">
      <input
        v-model="playerName"
        placeholder="Ingresa tu nombre"
        class="px-4 py-2 border rounded w-full max-w-md"
      />
      <button
        @click="connectToGame"
        class="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700"
        :disabled="!playerName"
      >
        Unirse al juego
      </button>
    </div>

    <!-- Pantalla del juego -->
    <div v-else class="flex flex-col gap-6">
      <div class="flex justify-between items-center">
        <div><span class="font-bold">Jugador:</span> {{ playerName }}</div>
        <div><span class="font-bold">Jugadores conectados:</span> {{ playersCount }}</div>
        <div>
          <button
            v-if="!gameActive && isAdmin"
            @click="startGame"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Iniciar Juego
          </button>
          <button
            v-if="isAdmin && gameActive"
            @click="callNextElement"
            class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Sacar Elemento
          </button>
          <button
            v-if="isAdmin"
            @click="resetGame"
            class="ml-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Reiniciar
          </button>
        </div>
      </div>

      <!-- Estado del juego -->
      <div class="bg-gray-100 p-4 rounded-lg">
        <div v-if="!gameActive" class="text-center text-lg">
          Esperando a que el anfitrión inicie el juego...
        </div>
        <div v-else class="flex flex-col items-center">
          <h2 class="text-2xl font-bold mb-2">Elemento Actual</h2>
          <div
            v-if="currentElement"
            class="flex flex-col items-center p-4 bg-white rounded-lg shadow-md border-2 border-emerald-500 w-48 h-48 justify-center"
          >
            <div class="text-4xl font-bold text-emerald-600">{{ currentElement.simbolo }}</div>
            <div class="text-lg mt-2">{{ currentElement.nombre }}</div>
            <div class="text-sm text-gray-600">{{ currentElement.numero }}</div>
          </div>
          <div v-if="winners.length > 0" class="mt-4 text-center">
            <h3 class="text-xl font-bold text-yellow-600">¡Ganadores!</h3>
            <ul>
              <li v-for="winner in winners" :key="winner" class="font-bold">{{ winner }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Historial de elementos sacados -->
      <div class="mb-4">
        <h3 class="text-xl font-semibold mb-2">Elementos llamados:</h3>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="elemento in calledElements"
            :key="elemento.numero"
            class="flex items-center justify-center p-2 bg-gray-200 rounded text-xs"
          >
            <span class="font-bold">{{ elemento.simbolo }}</span>
            <span class="ml-1">({{ elemento.numero }})</span>
          </div>
        </div>
      </div>

      <!-- Cartón del jugador -->
      <div>
        <h2 class="text-2xl font-semibold mb-4">Tu Cartón</h2>
        <div class="grid grid-cols-4 gap-2">
          <div
            v-for="element in playerCard"
            :key="element.numero"
            class="aspect-square flex flex-col items-center justify-center p-2 rounded-lg shadow-md border-2"
            :class="{
              'border-emerald-500 bg-white': !isMarked(element),
              'border-emerald-600 bg-emerald-100': isMarked(element),
            }"
            @click="markElement(element)"
          >
            <div
              class="text-2xl font-bold"
              :class="{
                'text-emerald-600': !isMarked(element),
                'text-emerald-800': isMarked(element),
              }"
            >
              {{ element.simbolo }}
            </div>
            <div class="text-sm mt-1">{{ element.nombre }}</div>
            <div class="text-xs text-gray-600">{{ element.numero }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { v4 as uuid } from 'uuid'

interface Element {
  numero: number
  simbolo: string
  nombre: string
}

const playerName = ref('')
const playerId = ref('')
const playerConnected = ref(false)
const playerCard = ref<Element[]>([])
const markedElements = ref(new Set<number>())
const isAdmin = ref(false)

// Estado del juego
const gameActive = ref(false)
const socket = ref<WebSocket | null>(null)
const currentElement = ref<Element | null>(null)
const calledElements = ref<Element[]>([])
const playersCount = ref(0)
const winners = ref<string[]>([])

// Generar un ID único para el jugador
const generatePlayerId = (): string => {
  return uuid()
}

// Conectar al juego
const connectToGame = async () => {
  if (!playerName.value) return

  // Generar un ID de jugador
  playerId.value = generatePlayerId()

  // El primer jugador es admin
  if (playersCount.value === 0) {
    isAdmin.value = true
  }

  // Generar cartón
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/generar-carton/16`)
    if (!response.ok) {
      throw new Error('Error al generar cartón')
    }
    playerCard.value = await response.json()
  } catch (error) {
    console.error('Error al generar cartón:', error)
    return
  }

  // Conectar al WebSocket
  connectWebSocket()

  playerConnected.value = true
}

// Conectar al WebSocket
const connectWebSocket = () => {
  socket.value = new WebSocket(`ws://${import.meta.env.VITE_API_HOST}/ws/${playerId.value}`)

  socket.value.onopen = () => {
    console.log('Conectado al servidor WebSocket')
    // Unirse al juego con el cartón generado
    socket.value?.send(
      JSON.stringify({
        type: 'join_game',
        player_id: playerId.value,
        name: playerName.value,
        card: playerCard.value,
      }),
    )
  }

  socket.value.onmessage = (event) => {
    const message = JSON.parse(event.data)
    handleWebSocketMessage(message)
  }

  socket.value.onclose = () => {
    console.log('Desconectado del servidor WebSocket')
  }

  socket.value.onerror = (error) => {
    console.error('Error en WebSocket:', error)
  }
}

interface GameStateData {
  is_active: boolean
  called_elements: Element[]
  current_element: Element | null
  players_count: number
  winners: string[]
}

interface WebSocketMessage {
  type: string
  data?: GameStateData
  element?: Element
  player_id?: string
  players_count?: number
}

// Manejar mensajes del WebSocket
const handleWebSocketMessage = (message: WebSocketMessage) => {
  console.log('Mensaje recibido:', message)

  switch (message.type) {
    case 'game_state':
      // Actualizar el estado del juego
      if (message.data) {
        gameActive.value = message.data.is_active
        calledElements.value = message.data.called_elements.filter(Boolean)
        currentElement.value = message.data.current_element
        playersCount.value = message.data.players_count
        winners.value = message.data.winners
      }
      break

    case 'player_joined':
      // Actualizar contador de jugadores
      if (message.players_count !== undefined) {
        playersCount.value = message.players_count
      }
      break

    case 'player_left':
      // Actualizar contador de jugadores
      if (message.players_count !== undefined) {
        playersCount.value = message.players_count
      }
      break

    case 'game_started':
      // Juego iniciado
      gameActive.value = true
      calledElements.value = []
      currentElement.value = null
      winners.value = []
      markedElements.value = new Set()
      break

    case 'new_element':
      // Nuevo elemento sacado
      if (message.element) {
        currentElement.value = message.element
        if (!calledElements.value.some((e) => e.numero === message.element?.numero)) {
          calledElements.value.push(message.element)
        }
      }
      break

    case 'winner':
      // Alguien ha ganado
      if (message.player_id && !winners.value.includes(message.player_id)) {
        winners.value.push(message.player_id)
      }
      break

    case 'game_reset':
      // Reiniciar el juego
      gameActive.value = false
      calledElements.value = []
      currentElement.value = null
      winners.value = []
      markedElements.value = new Set()
      break
  }
}

// Iniciar el juego (solo admin)
const startGame = () => {
  if (socket.value && isAdmin.value) {
    socket.value.send(
      JSON.stringify({
        type: 'start_game',
      }),
    )
  }
}

// Pedir siguiente elemento (solo admin)
const callNextElement = () => {
  if (socket.value && isAdmin.value && gameActive.value) {
    socket.value.send(
      JSON.stringify({
        type: 'get_next_element',
      }),
    )
  }
}

// Reiniciar el juego (solo admin)
const resetGame = () => {
  if (socket.value && isAdmin.value) {
    socket.value.send(
      JSON.stringify({
        type: 'reset_game',
      }),
    )
  }
}

// Marcar un elemento en el cartón
const markElement = (element: Element) => {
  // Verificar si el elemento ha sido llamado
  const elementoExiste = calledElements.value.some((e) => e.numero === element.numero)

  if (gameActive.value && elementoExiste) {
    markedElements.value.add(element.numero)

    // Notificar al servidor
    socket.value?.send(
      JSON.stringify({
        type: 'mark_element',
        element_num: element.numero,
      }),
    )
  }
}

// Comprobar si un elemento está marcado
const isMarked = (element: Element): boolean => {
  return markedElements.value.has(element.numero)
}

// Cerrar conexión al desmontar el componente
onBeforeUnmount(() => {
  if (socket.value) {
    socket.value.close()
  }
})
</script>
