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
      <div class="col-span-full md:col-span-1 gap-5 flex h-full">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <ul>
            <li v-for="(tiempo, index) in tiempoPromedio" :key="index">
              <h2 class="text-2xl font-bold mb-4">Tiempo promedio en {{ tiempo.page }}</h2>
              <p class="text-gray-600 text-5xl">{{ tiempo.tiempo }}</p>
            </li>
          </ul>
        </div>
        <!-- <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-4">Usuarios activos</h2>
          <p class="text-gray-600 text-5xl">1,200</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-4">Usuarios registrados</h2>
          <p class="text-gray-600 text-5xl">5,000</p>
        </div> -->
      </div>
      <!-- Componente de gráfico con ApexCharts -->
      <div>
        <VaButton
          @click="
            () => {
              analiticaReport(
                {
                  avgSessionDuration: 10,
                  bounceRate: 0.5,
                  pageviews: 10000,
                  sessions: 5000,
                  users: 3000,
                },
                '',
              )
            }
          "
          color="primary"
          >Actualizar</VaButton
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Importa los componentes de los gráficos
import ChartComponent from '@/components/ChartComponent.vue'
import { analiticaReport } from '@/reports/analiticaReport'
import api from '@/services/api'
import { onMounted, ref } from 'vue'

const tiempoPromedio = ref([
  {
    tiempo: '00:00:00',
    page: 'Tabla periódica',
  },
])

onMounted(async () => {
  try {
    const response = await api.get('/tiempos_pagina')
    if (response.data && response.data.length > 0) {
      const tiemposPorPagina: { [page: string]: number } = {}
      response.data.forEach((item: { page: string | number; tiempo: number }) => {
        if (item.page) {
          tiemposPorPagina[item.page] = (tiemposPorPagina[item.page] || 0) + item.tiempo
        }
      })

      tiempoPromedio.value = Object.entries(tiemposPorPagina).map(([page, tiempo]) => {
        const horas = Math.floor(tiempo / 3600)
        const minutos = Math.floor((tiempo % 3600) / 60)
        const segundos = Math.floor(tiempo % 60)
        return {
          tiempo: `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(
            segundos,
          ).padStart(2, '0')}`,
          page: page,
        }
      })
    }
  } catch (error) {
    console.error(error)
  }
})
</script>
