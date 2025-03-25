<template>
  <!-- Título principal de la aplicación -->
  <h1 class="text-4xl font-bold mb-8">Dashboard</h1>

  <section class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <!-- Componente de gráfico con Chart.js -->
    <div class="col-span-full md:col-span-1">
      <!-- Componente de gráfico con ApexCharts -->
      <ChartComponent />
    </div>
    <div class="col-span-full md:col-span-1 grid grid-cols-1 gap-6 md:grid-cols-2">
      <!-- Componente de gráfico con ApexCharts -->
      <div class="col-span-full md:col-span-1 gap-5 flex flex-col">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-4">Tiempo promedio en la pagina</h2>
          <p class="text-gray-600 text-5xl">00:03:30</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-4">Usuarios activos</h2>
          <p class="text-gray-600 text-5xl">1,200</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-4">Usuarios registrados</h2>
          <p class="text-gray-600 text-5xl">5,000</p>
        </div>
      </div>
      <!-- Componente de gráfico con ApexCharts -->
      <div></div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Importa los componentes de los gráficos
import ChartComponent from '@/components/ChartComponent.vue'
</script>
