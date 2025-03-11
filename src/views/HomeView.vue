// src/App.vue
<template>
  <div class="bg-gray-100 min-h-screen p-6">
    <!-- Título principal de la aplicación -->
    <h1 class="text-4xl text-center font-bold mb-8">Aplicación de la Tabla Periódica</h1>

    <!-- Componente de gráfico con Chart.js -->
    <ChartComponent />

    <!-- Componente de gráfico con D3.js -->
    <!-- <D3ChartComponent /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// Importa los componentes de los gráficos
import ChartComponent from '@/components/ChartComponent.vue'

export default defineComponent({
  components: {
    ChartComponent,
  },
})
</script>

<style scoped>
/* TailwindCSS ya se usa para los estilos */
</style>
