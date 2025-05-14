<script setup lang="ts">
import { carton, estaMarcado, marcarElemento } from '@/composables/loteria-composable'
import { adminSocket } from '@/composables/admin-loteria-composable'
import { manejarCambiarCarton, jugadorSocket } from '@/composables/jugador-loteria-composable'
import { onBeforeUnmount } from 'vue'

onBeforeUnmount(() => {
  adminSocket.value?.close()
  jugadorSocket.value?.close()
})
</script>

<template>
  <div class="">
    <!-- controles -->
    <div class="flex justify-between items-center mb-4">
      <button
        class="transition-colors bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="() => manejarCambiarCarton()"
      >
        Cambiar Cartón
      </button>
    </div>
  </div>

  <div class="grid grid-cols-4 gap-2">
    <div
      v-for="elemento in carton"
      :key="elemento.numeroAtomico"
      class="aspect-square flex flex-col items-center justify-center p-2 rounded-lg shadow-md border-2"
      :class="{
        'border-emerald-500 bg-white': !estaMarcado(elemento),
        'border-emerald-600 bg-emerald-100': estaMarcado(elemento),
      }"
      @click="marcarElemento(elemento)"
    >
      <div
        class="text-2xl font-bold"
        :class="{
          'text-emerald-600': !estaMarcado(elemento),
          'text-emerald-800': estaMarcado(elemento),
        }"
      >
        {{ elemento.simbolo }}
      </div>
      <div class="text-sm mt-1">{{ elemento.nombre }}</div>
      <div class="text-xs text-gray-600">{{ elemento.numeroAtomico }}</div>
    </div>
  </div>
</template>
