<script setup lang="ts">
import { defineProps, ref } from 'vue'

const props = defineProps(['question', 'onNext', 'disabled'])
const selectedAnswer = ref<string | null>(null)
const isCorrect = ref<boolean | null>(null)

const checkAnswer = (option: string) => {
  selectedAnswer.value = option
  isCorrect.value = option === props.question.respuesta

  // setTimeout(() => {
  props.onNext(isCorrect.value)
  // }, 500)
  //   selectedAnswer.value = null
  //   isCorrect.value = null
}
</script>

<template>
  <div class="p-6 bg-gray-200/20 shadow-md rounded-md" :class="{ 'cursor-not-allowed': disabled }">
    <div class="p-6 bg-white shadow-md rounded-md">
      <h2 class="text-xl font-semibold">{{ question.pregunta }}</h2>
      <div class="mt-4 space-y-2">
        <button
          v-for="option in question.opciones"
          :key="option"
          @click="!disabled && checkAnswer(option)"
          class="w-full px-4 py-2 text-left border rounded-md"
          :class="{
            'hover:bg-gray-100': !disabled,
            'bg-green-300': selectedAnswer === option && isCorrect,
            'bg-red-300': selectedAnswer === option && isCorrect === false,
            'opacity-70 cursor-not-allowed': disabled,
          }"
          :disabled="disabled"
        >
          {{ option }}
        </button>
      </div>
    </div>
  </div>
</template>
