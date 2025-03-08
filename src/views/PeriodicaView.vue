<template>
  <div class="container mx-auto p-4 py-10">
    <h1 class="text-3xl font-bold mb-4">Tabla Periódica de los Elementos</h1>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Buscar elemento..."
      class="mb-4 p-2 border rounded w-full md:w-1/2"
    />
    <div class="flex flex-col gap-6 w-full">
      <div
        class="w-full xl:w-1/2 p-4 border rounded min-h-48"
        :class="getCategoryClass(selectedElement?.category!)"
      >
        <div v-if="selectedElement">
          <h2 class="text-2xl font-bold mb-2">{{ selectedElement.name }}</h2>
          <p><strong>Símbolo:</strong> {{ selectedElement.symbol }}</p>
          <p><strong>Número Atómico:</strong> {{ selectedElement.number }}</p>
          <p><strong>Masa Atómica:</strong> {{ selectedElement.atomicMass }}</p>
          <p><strong>Categoría:</strong> {{ selectedElement.category }}</p>
          <p><strong>Fase:</strong> {{ selectedElement.phase }}</p>
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
            class="border p-2 text-center cursor-pointer hover:bg-gray-200"
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
