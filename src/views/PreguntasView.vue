<script setup lang="ts">
import { ref } from 'vue'
import questionsData from '@/data/preguntas.json'
import QuestionCard from '@/components/QuestionCard.vue'

const currentQuestionIndex = ref(0)
const score = ref(0)
const showModal = ref(false)

const questions = questionsData.sort(() => Math.random() - 0.5).slice(0, 5)

const nextQuestion = (isCorrect: boolean) => {
  if (isCorrect) {
    score.value++
  }
  if (currentQuestionIndex.value < questions.length - 1) {
    currentQuestionIndex.value++
  } else {
    showModal.value = true
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-200">
    <div class="w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-4">🧪 Quiz de Química</h1>
      <QuestionCard :question="questions[currentQuestionIndex]" :onNext="nextQuestion" />
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
