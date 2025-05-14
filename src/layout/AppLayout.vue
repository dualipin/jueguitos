<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { getCookie } from '@/utils/getCookie'
import { setCookie } from '@/utils/setCookie'
import MenuApp from '@/components/navegacion/MenuApp.vue'

const cookie_id = getCookie('usuario_cookie')
if (cookie_id === '' || cookie_id === null) {
  const random_id = uuidv4()
  setCookie('usuario_cookie', random_id, 10)
}
</script>

<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <!-- Título principal de la aplicación -->
    <MenuApp />
    <main>
      <router-view />
    </main>
    <footer class="bg-gray-800 mt-auto">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center">
          <div class="flex items-center">
            <RouterLink :to="{ name: 'nosotros' }">
              <h2 class="text-2xl font-bold text-white">Studying Chemistry</h2>
            </RouterLink>
          </div>
          <div class="mt-8 md:mt-0">
            <p class="text-center text-base text-gray-400">
              &copy; 2025 Studying Chemistry. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
