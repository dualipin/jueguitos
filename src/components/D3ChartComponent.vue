<template>
  <div class="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-semibold mb-4">Gráfico de Ineracciones con D3</h2>
    <!-- Asegúrate de que el contenedor tenga dimensiones específicas -->
    <div ref="chartRef" class="w-full h-80"></div>
    <!-- Añadí clases de Tailwind para asegurar el tamaño -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import * as d3 from 'd3'
import axios from '@/services/api'

interface Interaccion {
  id: number
  elemento: string
  fecha: string
}

export default defineComponent({
  setup() {
    const chartRef = ref<HTMLElement | null>(null)
    const interacciones = ref<Interaccion[]>([])

    onMounted(async () => {
      try {
        // Asegúrate de que la URL sea correcta para obtener las interacciones
        const response = await axios.get('/api/interacciones')
        interacciones.value = response.data.data

        // Log para ver los datos que recibimos
        console.log('Datos de interacciones:', interacciones.value)

        // Datos de ejemplo: IDs y fechas
        const data = interacciones.value

        // Verifica los datos antes de proceder
        if (data.length === 0) {
          console.warn('No hay datos para mostrar en el gráfico.')
          return
        }

        // Log para ver el valor máximo de los datos
        const maxId = d3.max(data, (d) => d.id)
        console.log('Valor máximo de ID:', maxId)

        const width = 400
        const height = 200

        const svg = d3
          .select(chartRef.value)
          .append('svg')
          .attr('width', width)
          .attr('height', height)

        // Escala para el eje X (con base en el índice)
        const xScale = d3
          .scaleBand()
          .domain(data.map((_, i) => String(i))) // Se usa el índice de las interacciones
          .range([0, width])
          .padding(0.1)

        // Escala para el eje Y (con base en los valores de 'id')
        const yScale = d3
          .scaleLinear()
          .domain([0, maxId || 0]) // Se usa el ID para la altura
          .range([height, 0])

        // Log para ver los valores de las escalas
        console.log('Escala X:', xScale.domain())
        console.log('Escala Y:', yScale.domain())

        // Agregar las barras al gráfico
        svg
          .selectAll('.bar')
          .data(data)
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', (d, i) => xScale(String(i))!) // Usamos el índice para la posición X
          .attr('y', (d) => yScale(d.id)) // La posición Y es determinada por la escala
          .attr('width', xScale.bandwidth()) // Ancho de las barras
          .attr('height', (d) => height - yScale(d.id)) // Altura de las barras
          .attr('fill', 'steelblue')

        // Agregar los ejes X y Y
        svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(xScale))

        svg.append('g').call(d3.axisLeft(yScale))
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    })

    return {
      chartRef,
    }
  },
})
</script>

<style scoped>
/* Puedes agregar más estilos si es necesario */
</style>
