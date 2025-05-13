<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import QuestionCard from '@/components/QuestionCard.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const currentQuestionIndex = ref(0)
const score = ref(0)
const showModal = ref(false)
const useIA = ref(false)
const esProfesor = ref(authStore.user?.role === 'profesor')

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/preguntas/ai/`)
      const data = await response.json()
      questions.value = data as []
      loading.value = false
      return
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/preguntas/aleatorias/`)
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

const pregunta = ref({
  pregunta: '',
  opciones: [],
  respuesta: '',
  creado_por: authStore.user?.username,
})

const opcion = ref('')

async function crearPregunta() {
  try {
    loading.value = true
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/preguntas/crear/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pregunta.value),
    })
    const data = await response.json()
    console.log('Pregunta creada:', data)
  } catch (error) {
    console.error('Error creating question:', error)
  } finally {
    loading.value = false
    pregunta.value = {
      pregunta: '',
      opciones: [],
      respuesta: '',
      creado_por: authStore.user?.username,
    }
    opcion.value = ''
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
  <template v-if="loading">
    <div class="fixed inset-0 flex flex-col gap-10 items-center justify-center bg-white z-50">
      <span
        class="aspect-square w-16 border-2 border-gray-300 rounded-full animate-spin border-t-transparent"
      ></span>
      <span class="text-2xl font-bold text-gray-700">Cargando...</span>
    </div>
  </template>

  <div class="min-h-screen flex flex-col items-center justify-center px-4 py-8">
    <div v-if="esProfesor" class="w-full max-w-5xl mb-8 p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-xl font-bold mb-4 text-center">Crear Nueva Pregunta</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <VaInput
          v-model="pregunta.pregunta"
          placeholder="Ingrese la pregunta"
          label="Pregunta"
          class="mb-2"
        />
        <VaInput
          v-model="pregunta.respuesta"
          placeholder="Ingrese la respuesta correcta"
          label="Respuesta correcta"
          class="mb-2"
        />
      </div>

      <div class="mt-4 border-t pt-4">
        <div class="flex flex-wrap justify-between items-center mb-3">
          <label class="font-semibold text-gray-700">Opciones existentes</label>
          <div class="text-sm text-gray-500">{{ pregunta.opciones.length }} opciones</div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div v-for="(opcion, index) in pregunta.opciones" :key="index" class="flex items-center">
            <VaInput v-model="pregunta.opciones[index]" placeholder="Opción" class="flex-grow" />
            <VaButton
              @click="() => pregunta.opciones.splice(index, 1)"
              icon="delete"
              preset="danger"
              size="small"
              class="ml-2"
              flat
            />
          </div>
        </div>

        <div class="flex flex-col sm:flex-row mt-3 mb-4">
          <VaInput
            v-model="opcion"
            placeholder="Ingrese una nueva opción"
            class="flex-grow mb-2 sm:mb-0 sm:mr-2"
          />
          <VaButton
            @click="
              () => {
                if (opcion.trim().length > 0) {
                  //@ts-ignore
                  pregunta.opciones.push(opcion)
                  opcion = ''
                }
              }
            "
            class="whitespace-nowrap"
            ><VaIcon icon="plus" class="mr-1" /> Agregar</VaButton
          >
        </div>
      </div>

      <div class="flex justify-center md:justify-end mt-6">
        <VaButton @click="crearPregunta" preset="primary" size="large" :loading="loading">
          <VaIcon icon="save" class="mr-2" /> Guardar Pregunta
        </VaButton>
      </div>
    </div>

    <div class="flex items-center mb-4 w-full justify-center">
      <RouterLink
        :to="{ name: 'preguntas-profesor' }"
        class="bg-blue-500 hover:bg-blue-700 font-semibold text-lg text-white py-2 px-4 rounded text-center w-full sm:w-auto"
        >Contestar preguntas de un profesor</RouterLink
      >
    </div>

    <div class="w-full max-w-md" v-if="!esProfesor">
      <h1 class="text-2xl font-bold text-center mb-4">🧪 Quiz de Química</h1>
      <div class="flex justify-center">
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
