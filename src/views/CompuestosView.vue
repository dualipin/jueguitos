<script setup lang="ts">
import { ref, onMounted } from 'vue'

const compuesto = ref({
  nombre: '',
  formula: '',
  estructura: '',
})

const userInput = ref('')
const message = ref('')
const isCorrect = ref(false)
const attempts = ref(0)

async function fetchCompuesto() {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/api/compuesto')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    compuesto.value = data.compuesto
  } catch (error) {
    console.error('Error fetching compuesto:', error)
  }
}

function checkAnswer() {
  attempts.value++

  if (userInput.value.trim().toLowerCase() === compuesto.value.formula.toLowerCase()) {
    message.value = '¡Correcto! Has adivinado la fórmula.'
    isCorrect.value = true
  } else {
    message.value = 'Incorrecto. Intenta de nuevo.'
  }
}

function getNewCompuesto() {
  userInput.value = ''
  message.value = ''
  isCorrect.value = false
  attempts.value = 0
  fetchCompuesto()
}

onMounted(async () => {
  await fetchCompuesto()
})
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 text-center">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Adivina la fórmula del compuesto</h1>

    <div class="mb-6">
      <button
        @click="getNewCompuesto"
        class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
      >
        <span>Cambiar compuesto</span>
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 class="text-2xl font-bold text-gray-700 mb-3">{{ compuesto.nombre }}</h2>
      <div v-if="compuesto.estructura" class="text-gray-600 italic">{{ compuesto.estructura }}</div>
    </div>

    <div v-if="!isCorrect" class="mb-6">
      <p class="text-gray-700 mb-4">Escribe la fórmula química de este compuesto:</p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <input
          type="text"
          v-model="userInput"
          placeholder="Fórmula química (ej: H2O)"
          @keyup.enter="checkAnswer"
          class="border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          @click="checkAnswer"
          class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Comprobar
        </button>
      </div>
      <p v-if="attempts > 0" class="mt-3 text-gray-600">Intentos: {{ attempts }}</p>
      <p
        v-if="message"
        class="mt-3 font-bold"
        :class="isCorrect ? 'text-green-500' : 'text-red-500'"
      >
        {{ message }}
      </p>
    </div>

    <div v-else class="bg-green-50 border border-green-200 rounded-lg p-6">
      <p class="text-green-600 font-bold mb-2">{{ message }}</p>
      <p class="mb-4">
        La fórmula correcta es: <strong>{{ compuesto.formula }}</strong>
      </p>
      <button
        @click="getNewCompuesto"
        class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
      >
        Siguiente compuesto
      </button>
    </div>
  </div>
</template>
