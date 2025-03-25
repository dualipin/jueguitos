<script setup lang="ts">
import { ref } from 'vue'
import { CategoriaElemento, type ElementoQuimico } from '@/types/Elemento'

const props = defineProps<{
  elemento: ElementoQuimico
}>()
const elemento = ref<ElementoQuimico | null>(props.elemento)
</script>

<template>
  <div
    :class="[
      { 'bg-red-600': elemento?.categoria === CategoriaElemento.MetalesAlcalinos },
      { 'bg-orange-600': elemento?.categoria === CategoriaElemento.Alcalinoterreos },
      { 'bg-yellow-600': elemento?.categoria === CategoriaElemento.OtrosMetales },
      { 'bg-teal-500': elemento?.categoria === CategoriaElemento.MetalesTransicion },
      { 'bg-emerald-800': elemento?.categoria === CategoriaElemento.Lantanidos },
      { 'bg-green-600': elemento?.categoria === CategoriaElemento.Actinidos },
      { 'bg-sky-600': elemento?.categoria === CategoriaElemento.Metaloides },
      { 'bg-indigo-600': elemento?.categoria === CategoriaElemento.NoMetal },
      { 'bg-pink-600': elemento?.categoria === CategoriaElemento.Halogenos },
      { 'bg-blue-600': elemento?.categoria === CategoriaElemento.GasesNobles },
      {
        'bg-gray-400':
          !elemento?.categoria || elemento?.categoria === CategoriaElemento.ElementosDesconocidos,
      },
    ]"
    class="flex flex-col border rounded-lg p-2 cursor-pointer text-white hover:brightness-150 hover:scale-125 transition-transform hover:shadow-2xl"
  >
    <div class="flex justify-between items-center">
      <span class="text-lg">{{ elemento?.numeroAtomico }}</span>
      <div class="flex flex-col">
        <span class="text-xs">{{ elemento?.pesoAtomico }}</span>
        <span class="text-xs text-right">{{ elemento?.valencia }}</span>
      </div>
    </div>
    <div class="flex justify-around items-center">
      <div class="flex flex-col text-[0.5rem]">
        <span>{{ elemento?.puntoEbullicion }}</span>
        <span>{{ elemento?.puntoFusion }}</span>
        <span>{{ elemento?.densidad }}</span>
      </div>
      <span class="text-4xl font-bold">{{ elemento?.simbolo }}</span>
    </div>
    <span class="text-center text-xs">{{ elemento?.estructuraAtomica }}</span>
    <span class="text-center text-sm">{{ elemento?.nombre }}</span>
  </div>
</template>
