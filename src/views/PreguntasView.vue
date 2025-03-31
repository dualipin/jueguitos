<script setup lang="ts">
import { ref } from 'vue'
import questionsData from '@/data/preguntas.json'
import QuestionCard from '@/components/QuestionCard.vue'

const currentQuestionIndex = ref(0)
const score = ref(0)

const questions = questionsData.sort(() => Math.random() - 0.5).slice(0, 5)

const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.length - 1) {
    currentQuestionIndex.value++
  } else {
    alert(`¡Juego terminado! Puntuación: ${score.value}/${questions.length}`)
    currentQuestionIndex.value = 0
    score.value = 0
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-200">
    <div class="w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-4">🧪 Quiz de Química</h1>
      <QuestionCard :question="questions[currentQuestionIndex]" :onNext="nextQuestion" />
    </div>
  </div>
</template>
