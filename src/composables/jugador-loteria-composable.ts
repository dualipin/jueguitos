import { ref } from 'vue'
import { carton, elementosLanzados } from './loteria-composable'

export const jugadorSocket = ref<WebSocket | null>(null)
jugadorSocket.value = new WebSocket(`${import.meta.env.VITE_API_HOST}/laloteria`)

jugadorSocket.value.onopen = () => {
  console.log('Conectado al socket del jugador')

  jugadorSocket.value?.send(
    JSON.stringify({
      accion: 'unirse',
    }),
  )
}

jugadorSocket.value.onclose = () => {
  console.log('Desconectado del socket del jugador')
}

jugadorSocket.value.onmessage = (event) => {
  const data = JSON.parse(event.data)
  // carton.value = data.dato.carton

  if (data.tipo === 'carton') {
    carton.value = data.dato
  } else if (data.tipo === 'ganador') {
    console.log('Ganador:', data.dato)
  } else if (data.tipo === 'carton_cambiado' || data.tipo === 'carton_obtenido') {
    cambiarCarton(data)
  } else if (data.tipo === 'elemento_lanzado') {
    manejarElementoLanzado(data)
  }
}

function cambiarCarton(data: any) {
  carton.value = data.dato
  console.log('Cartón cambiado:', data.dato)
}

function manejarElementoLanzado(data: any) {
  const elementoLanzado = data.dato
  elementosLanzados.value.push(elementoLanzado)
  console.log('Elemento lanzado:', elementoLanzado)
}

export function manejarCambiarCarton() {
  jugadorSocket.value?.send(JSON.stringify({ accion: 'cambiar_carton' }))
  carton.value = []
  console.log('Cartón cambiado')
}
