<template>
  <h1>Tabla Periódica de los Elementos</h1>
  <div class="overflow-auto overflow-x-scroll">
    <div class="min-w-[110rem] grid gap-2 w-auto scale-none xl:scale-90 px-10 py-16">
      <ElementoQuimicoItem
        v-for="elemento in elementos"
        :key="elemento.numeroAtomico"
        :elemento="{ ...elemento }"
        @click="openElement(elemento)"
        :style="elementsGridStyle(elemento)"
      />
    </div>
  </div>

  <VaModal v-model="showModal" blur @close="closeElement" close-button hide-default-actions>
    <h3 class="va-h3">{{ elementoSeleccionado?.nombre }}</h3>
    <div class="mt-5 flex w-full justify-between flex-col md:flex-row">
      <div class="grid grid-cols-2 gap-4">
        <div><strong>Número Atómico:</strong> {{ elementoSeleccionado?.numeroAtomico }}</div>
        <div><strong>Símbolo:</strong> {{ elementoSeleccionado?.simbolo }}</div>
        <div><strong>Peso Atómico:</strong> {{ elementoSeleccionado?.pesoAtomico }}</div>
        <div><strong>Valencia:</strong> {{ elementoSeleccionado?.valencia }}</div>
        <div><strong>Categoría:</strong> {{ elementoSeleccionado?.categoria }}</div>
        <div><strong>Grupo:</strong> {{ elementoSeleccionado?.grupo }}</div>
        <div><strong>Período:</strong> {{ elementoSeleccionado?.periodo }}</div>
        <div><strong>Punto de Fusión:</strong> {{ elementoSeleccionado?.puntoFusion }}</div>
        <div><strong>Punto de Ebullición:</strong> {{ elementoSeleccionado?.puntoEbullicion }}</div>
        <div><strong>Densidad:</strong> {{ elementoSeleccionado?.densidad }}</div>
        <div>
          <strong>Estructura Atómica:</strong> {{ elementoSeleccionado?.estructuraAtomica }}
        </div>
      </div>
      <hr class="block md:hidden my-10" />
      <div class="flex flex-col w-1/2 items-center gap-5">
        <p>{{ elementoSeleccionado?.datoCurioso }}</p>
        <img
          class="rounded-xl w-10/12 aspect-auto object-fit shadow-lg"
          :src="elementoSeleccionado?.imagen"
          :alt="elementoSeleccionado?.nombre"
        />
      </div>
    </div>
  </VaModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ElementoQuimico } from '@/types/Elemento'
import elementosJSON from '@/data/elementos.json'
import ElementoQuimicoItem from '@/components/tabla-periodica/ElementoQuimicoItem.vue'

const elementos = ref<ElementoQuimico[]>(elementosJSON.elementos as ElementoQuimico[])
const elementoSeleccionado = ref<ElementoQuimico | null>(null)
const showModal = ref(false)

function elementsGridStyle(elemento: ElementoQuimico) {
  const gridColumn = elemento.grupo!
  const gridRow = elemento.periodo!

  if (elemento.numeroAtomico! >= 57 && elemento.numeroAtomico! <= 70) {
    return {
      gridRow: 8,
    }
  }

  if (elemento.numeroAtomico! >= 89 && elemento.numeroAtomico! <= 102) {
    return {
      gridRow: 9,
    }
  }

  return {
    gridColumn: gridColumn,
    gridRow: gridRow,
  }
}

function openElement(elemento: ElementoQuimico) {
  elementoSeleccionado.value = elemento
  showModal.value = true
}

function closeElement() {
  elementoSeleccionado.value = null
}
</script>
