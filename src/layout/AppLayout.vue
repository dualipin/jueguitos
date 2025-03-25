<script setup lang="ts">
import { VaIcon, VaNavbar, VaNavbarItem } from 'vuestic-ui'
</script>

<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <VaNavbar class="mb-3">
      <template #left>
        <RouterLink to="/">
          <VaNavbarItem class="text-3xl font-semibold"> Mi Química </VaNavbarItem>
        </RouterLink>
      </template>
      <template #right>
        <VaNavbarItem class="text-lg hidden sm:block">
          <RouterLink :to="{ name: 'periodica' }">Tabla Periódica</RouterLink>
        </VaNavbarItem>
        <VaNavbarItem class="text-lg hidden sm:block">
          <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
        </VaNavbarItem>
        <VaNavbarItem>
          <VaMenu>
            <template #anchor>
              <VaIcon :size="30" name="account_circle" />
            </template>

            <RouterLink class="flex-1" :to="{ name: 'login' }">Iniciar Sesión</RouterLink>
          </VaMenu>
        </VaNavbarItem>
      </template>
    </VaNavbar>
    <!-- Título principal de la aplicación -->
    <router-view />
    <footer class="mt-auto bg-gray-800 text-white py-4">
      <div class="container mx-auto text-center">
        <p>© {{ new Date().getFullYear() }}</p>
      </div>
    </footer>
  </div>
</template>
