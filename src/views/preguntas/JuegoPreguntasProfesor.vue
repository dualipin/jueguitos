<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import QuestionCard from '@/components/QuestionCard.vue'

const value = ref('')
const profesor = ref<null | string>(null)
const loading = ref(false)
const correctas = ref(0)
const preguntas = ref<any[]>([])

const obtenerPreguntasProfesor = async () => {
  try {
    if (!value.value.trim()) {
      alert('Por favor, ingrese el usuario del profesor')
      return
    }

    loading.value = true
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/preguntas/profesor/${value.value.trim()}`,
    )

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const data = await response.json()
    if (data.length === 0) {
      alert('No hay preguntas para este profesor')
      return
    }

    preguntas.value = data
    profesor.value = value.value
    correctas.value = 0 // Reset counter when loading new questions
  } catch (error) {
    console.error('Error fetching questions:', error)
    alert('Error al cargar las preguntas')
  } finally {
    loading.value = false
  }
}

function onNext(isCorrect: boolean) {
  if (isCorrect) {
    correctas.value++

    if (correctas.value === preguntas.value.length) {
      setTimeout(() => {
        alert('¡Felicidades! Has respondido todas las preguntas correctamente.')
      }, 300)
    }
  }
}

// Watch for changes to automatically fetch questions when value changes
watch(value, (newValue) => {
  if (newValue && newValue.trim()) {
    profesor.value = null // Reset profesor when input changes
  }
})

onMounted(() => {
  if (value.value && value.value.trim()) {
    obtenerPreguntasProfesor()
  }
})
</script>

<template>
  <div
    v-if="loading"
    class="flex justify-center items-center h-screen flex-col gap-6 fixed inset-0 bg-white z-50"
  >
    <span
      class="border-t-2 border-gray-500 rounded-full animate-spin h-12 w-12 md:h-16 md:w-16"
    ></span>
    <span class="text-xl md:text-3xl font-bold">Cargando...</span>
  </div>

  <div class="flex flex-col gap-4 w-full max-w-5xl px-4 mx-auto">
    <h1 class="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <span class="text-2xl md:text-3xl font-bold">Juego de preguntas</span>
      <span v-if="profesor" class="text-xl md:text-2xl font-bold sm:ml-2"
        >- Profesor: {{ profesor }}</span
      >
    </h1>

    <div class="flex gap-2 flex-col">
      <VaInput
        v-model="value"
        placeholder="Ingrese el usuario de su profesor"
        label="Usuario del profesor que les dará las preguntas"
        class="flex-grow"
      />
      <VaButton @click="obtenerPreguntasProfesor" :loading="loading" class="w-full sm:w-auto">
        Cargar preguntas
      </VaButton>
    </div>

    <div>
      <span class="text-xl md:text-2xl font-bold block">Preguntas</span>
      <span v-if="preguntas.length === 0" class="text-lg md:text-xl font-bold"
        >No hay preguntas</span
      >

      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-3 md:mt-4"
      >
        <QuestionCard
          v-for="(pregunta, index) in preguntas"
          :key="index"
          :question="pregunta"
          @next="onNext"
        />
      </div>

      <div v-if="preguntas.length > 0" class="mt-4 flex flex-col items-center">
        <span class="text-xl md:text-2xl font-bold"
          >Correctas: {{ correctas }} / {{ preguntas.length }}</span
        >
        <span
          v-if="correctas === preguntas.length"
          class="text-lg md:text-xl font-bold text-green-600"
          >¡Felicidades!</span
        >
        <span v-else class="text-lg md:text-xl font-bold">¡Sigue intentando!</span>
      </div>
    </div>
  </div>
</template>
