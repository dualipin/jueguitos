<template>
  <header class="flex justify-center items-center my-4">
    <RouterLink to="/grafica" class="text-blue-500 hover:underline">Ver gráfica</RouterLink>
  </header>
  <div class="container mx-auto p-4 py-10">
    <h1 class="text-3xl font-bold mb-4">Tabla Periódica de los Elementos</h1>
    <div class="flex flex-col gap-6 w-full">
      <div
        v-if="selectedElement"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div
          class="bg-white p-6 border rounded-lg w-full max-w-lg"
          :class="getCategoryClass(selectedElement?.category!)"
        >
          <h2 class="text-2xl font-bold mb-2">{{ selectedElement.name }}</h2>
          <p><strong>Símbolo:</strong> {{ selectedElement.symbol }}</p>
          <p><strong>Número Atómico:</strong> {{ selectedElement.number }}</p>
          <p><strong>Masa Atómica:</strong> {{ selectedElement.atomicMass }}</p>
          <p><strong>Categoría:</strong> {{ selectedElement.category }}</p>
          <p><strong>Fase:</strong> {{ selectedElement.phase }}</p>
          <div class="mt-4 flex justify-end">
            <button class="text-red-500 hover:text-red-700" @click="selectedElement = null">
              Cerrar
            </button>
          </div>
        </div>
      </div>
      <div class="overflow-x-scroll overscroll-x-auto w-full">
        <div
          class="grid gap-2"
          style="
            grid-template-columns: repeat(18, minmax(60px, 1fr));
            grid-auto-rows: minmax(60px, auto);
          "
        >
          <div
            v-for="element in filteredElements"
            :key="element.symbol"
            class="border rounded-lg p-2 text-center cursor-pointer hover:bg-gray-200"
            :class="getCategoryClass(element.category)"
            :style="{ gridColumn: element.group, gridRow: element.period }"
            @click="selectElement(element)"
          >
            <div class="text-xl font-bold">{{ element.symbol }}</div>
            <div class="text-sm">{{ element.number }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import elementosData from '@/assets/elementos.json'
import axios from '@/services/api'

async function registrarInteraccion(elemento: { symbol: string }) {
  try {
    const response = await axios.post('/interaccion', {
      elemento: elemento.symbol, // Envía solo el símbolo del elemento
    })
    console.log('Interacción registrada:', response.data)
  } catch (error) {
    console.error('Error al registrar interacción:', error)
  }
}
const searchQuery = ref('')
interface Element {
  symbol: string
  number: number
  name: string
  atomicMass: number
  category: string
  phase: string
  group: number
  period: number
}

const elements = elementosData.elementos as Element[]
const selectedElement = ref<Element | null>(null)

const filteredElements = computed(() => {
  return elements.filter(
    (element) =>
      element.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      element.symbol.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const selectElement = (element: Element) => {
  selectedElement.value = element
  registrarInteraccion(element)
}

function getCategoryClass(category: string) {
  const categoryColors: Record<string, string> = {
    'Metal alcalino': 'bg-red-100',
    'Metal alcalinotérreo': 'bg-green-100',
    'Metal de transición': 'bg-blue-100',
    Metaloide: 'bg-yellow-100',
    'No metal': 'bg-purple-100',
    Halógeno: 'bg-orange-100',
    'Gas noble': 'bg-pink-100',
  }
  return categoryColors[category] || 'bg-gray-100'
}
</script>
