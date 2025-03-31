<template>
  <div class="overflow-auto overflow-x-scroll">
    <div
      class="min-w-[110rem] grid grid-cols-18 grid-rows-9 gap-2 w-auto scale-none xl:scale-90 px-10"
    >
      <ElementoQuimicoItem
        v-for="elemento in elementos"
        :key="elemento.numeroAtomico"
        :elemento="{ ...elemento }"
        @click="openElement(elemento)"
        :style="elementsGridStyle(elemento)"
      />
      <div class="div col-span-16 grid place-content-center">
        <h1 class="text-2xl md:text-5xl text-center font-bold">Tabla Periódica de los Elementos</h1>
      </div>
      <div class="col-span-10 px-10 grid row-span-2 row-start-2 grid-cols-2">
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-square bg-red-600"></div>
          <span>Metales Alcalinos</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-square bg-orange-600"></div>
          <span>Alcalinotérreos</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-square bg-yellow-600"></div>
          <span>Otros Metales</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-square bg-teal-500"></div>
          <span>Metales de Transición</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-square bg-emerald-800"></div>
          <span>Lantánidos</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-square bg-green-600"></div>
          <span>Actínidos</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-square bg-sky-600"></div>
          <span>Metaloides</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-square bg-indigo-600"></div>
          <span>No Metal</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-square bg-pink-600"></div>
          <span>Halógenos</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-square bg-blue-600"></div>
          <span>Gases Nobles</span>
        </div>
      </div>
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
import { onMounted, onUnmounted, ref } from 'vue'
import type { ElementoQuimico } from '@/types/Elemento'
import elementosJSON from '@/data/elementos.json'
import ElementoQuimicoItem from '@/components/tabla-periodica/ElementoQuimicoItem.vue'
import api from '@/services/api'
import { getCookie } from '@/utils/getCookie'

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

async function openElement(elemento: ElementoQuimico) {
  await api.post('/interacciones', {
    elemento: elemento.nombre,
    usuario_cookie: getCookie('usuario_cookie'),
  })
  elementoSeleccionado.value = elemento
  showModal.value = true
}

function closeElement() {
  elementoSeleccionado.value = null
}

const milisecond = ref<number>(0)

onMounted(async () => {
  milisecond.value = new Date().getTime()
})

onUnmounted(async () => {
  const time = new Date().getTime() - milisecond.value
  try {
    await api.post('/tiempos_pagina', {
      page: 'Tabla Periódica',
      tiempo: time,
      usuario_cookie: getCookie('usuario_cookie'),
    })
  } catch (error) {
    console.log(error)
  }
})
</script>
