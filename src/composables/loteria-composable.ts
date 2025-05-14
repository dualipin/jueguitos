import type { ElementoQuimico } from '@/types/Elemento'
import { ref } from 'vue'

export const carton = ref<ElementoQuimico[]>([])
export const elementosLanzados = ref<ElementoQuimico[]>([])

export function estaMarcado(elemento: ElementoQuimico) {
  return carton.value.some((element) => element.numeroAtomico === elemento.numeroAtomico)
}
export function marcarElemento(elemento: ElementoQuimico) {
  if (estaMarcado(elemento)) {
    carton.value = carton.value.filter(
      (element) => element.numeroAtomico !== elemento.numeroAtomico,
    )
  } else {
    carton.value.push(elemento)
  }
}

export function reiniciarCarton() {
  carton.value = []
}

export function verificarGanador() {}
