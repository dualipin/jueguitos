<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import QuestionCard from '@/components/QuestionCard.vue'

const currentQuestionIndex = ref(0)
const score = ref(0)
const showModal = ref(false)
const useIA = ref(false)

const loading = ref(false)

const questions = ref([])

watch(useIA, async () => {
  loading.value = true
  await fetchQuestions()
  loading.value = false
})

const fetchQuestions = async () => {
  try {
    loading.value = true
    if (useIA.value) {
      // Fetch questions from the API
      const response = await fetch('http://localhost:8000/api/preguntas/ai/')
      const data = await response.json()
      questions.value = data as []
      loading.value = false
      return
    }
    const response = await fetch('http://localhost:8000/api/preguntas/aleatorias/')
    const data = await response.json()
    questions.value = data as []
    loading.value = false
  } catch (error) {
    console.error('Error fetching questions:', error)
    loading.value = false
  } finally {
    loading.value = false
  }
}

// const questions = questionsData.sort(() => Math.random() - 0.5).slice(0, 5)

const nextQuestion = async (isCorrect: boolean) => {
  if (isCorrect) {
    score.value++
  }
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
  } else {
    showModal.value = true
    await fetchQuestions()
  }
}

onMounted(async () => {
  // Simulate fetching questions from an API
  await fetchQuestions()
  // Shuffle and slice the questions
  // questions.value = questionsData.sort(() => Math.random() - 0.5).slice(0, 5)
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-4">🧪 Quiz de Química</h1>
      <div>
        <VaSwitch
          v-model="useIA"
          class="mb-4"
          :label="useIA ? 'Preguntas con IA activada' : 'Preguntas con IA desactivada'"
          :label-position="'left'"
          :label-style="{ color: useIA ? '#4CAF50' : '#FF5722' }"
          :label-class="useIA ? 'text-green-500' : 'text-red-500'"
        />
      </div>
      <template v-if="loading">
        <p class="text-center text-gray-700">Cargando preguntas...</p>
      </template>
      <template v-else-if="questions.length == 0">
        <p class="text-center text-gray-700">No hay preguntas disponibles.</p>
      </template>
      <template v-else>
        <QuestionCard :question="questions[currentQuestionIndex]" :onNext="nextQuestion" />
      </template>
    </div>
    <span class="text-center text-gray-700 mb-4 mt-4"
      >Pregunta: {{ currentQuestionIndex + 1 }}/{{ questions.length }}</span
    >
  </div>

  <VaModal v-model="showModal" hide-default-actions overlay-opacity="0.2">
    <div class="text-center text-lg font-semibold">
      <p class="mb-2">¡Gracias por jugar!</p>
      <p>
        Puntuación final: <span class="text-green-500">{{ score }}</span> de
        <span class="text-blue-500">{{ questions.length }}</span>
      </p>
      <p class="text-sm text-gray-600 mt-2">
        ¿Quieres intentarlo de nuevo para mejorar tu puntuación?
      </p>
    </div>
    <template #footer>
      <VaButton
        @click="
          () => {
            showModal = false
            currentQuestionIndex = 0
            score = 0
          }
        "
      >
        Cerrar
      </VaButton>
    </template>
  </VaModal>
</template>
