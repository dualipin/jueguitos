<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const user = computed(() => authStore.user)

const menuItems = [
  {
    name: 'periodica',
    label: 'Tabla Periódica',
  },
  {
    name: 'preguntas',
    label: 'Preguntas',
  },
  {
    name: 'loteria',
    label: 'Loteria',
  },
  {
    name: 'compuestos',
    label: 'Compuestos',
  },
  { name: 'nosotros', label: 'Nosotros' },
]

const isMobileMenuOpen = ref(false)
const isMobile = computed(() => window.innerWidth < 768)
</script>

<template>
  <VaNavbar class="mb-3 px-4">
    <template #left>
      <RouterLink to="/" class="no-underline">
        <VaNavbarItem class="text-xl lg:text-3xl font-semibold text-primary">
          Studying Chemistry
        </VaNavbarItem>
      </RouterLink>
    </template>

    <!-- Desktop Menu -->
    <template #center v-if="authStore.isAuthenticated">
      <div class="hidden lg:flex items-center space-x-1">
        <VaNavbarItem
          v-for="item in menuItems"
          :key="item.name"
          class="text-lg mx-1 hover:bg-primary-lighten-1 rounded-lg transition-colors duration-200"
        >
          <RouterLink :to="{ name: item.name }" class="px-3 py-2 block no-underline">
            {{ item.label }}
          </RouterLink>
        </VaNavbarItem>
        <VaNavbarItem v-if="user?.role === 'administrador'">
          <RouterLink
            :to="{ name: 'dashboard' }"
            class="px-3 py-2 block no-underline text-lg hover:bg-primary-lighten-1 rounded-lg transition-colors duration-200"
          >
            Dashboard
          </RouterLink>
        </VaNavbarItem>
      </div>
    </template>

    <template #right>
      <!-- Mobile Menu Button -->
      <VaNavbarItem class="lg:hidden" v-if="isMobile">
        <VaButton icon="menu" preset="plain" @click="isMobileMenuOpen = !isMobileMenuOpen" />
      </VaNavbarItem>

      <!-- User Menu -->
      <VaNavbarItem>
        <VaMenu position="bottom">
          <template #anchor>
            <VaAvatar
              :size="36"
              icon="account_circle"
              class="cursor-pointer hover:opacity-80 transition-opacity"
            />
          </template>
          <template v-if="!user">
            <VaMenuItem>
              <RouterLink :to="{ name: 'login' }" class="block w-full px-4 py-2 no-underline">
                Iniciar Sesión
              </RouterLink>
            </VaMenuItem>
          </template>
          <template v-else>
            <VaMenuItem>
              <span class="block px-4 py-2 text-gray-800 font-semibold">
                {{ user.username }} - {{ user.role }}
              </span>
            </VaMenuItem>
            <VaMenuItem>
              <VaButton
                @click="
                  () => {
                    authStore.clearUser()
                    router.push({ name: 'login' })
                  }
                "
                color="danger"
                class="w-full"
                size="small"
              >
                Cerrar Sesión
              </VaButton>
            </VaMenuItem>
          </template>
        </VaMenu>
      </VaNavbarItem>
    </template>
  </VaNavbar>

  <!-- Mobile Menu Overlay -->
  <div v-if="isMobileMenuOpen" class="fixed inset-0 z-50 bg-white lg:hidden">
    <div class="flex justify-end p-4">
      <VaButton icon="close" preset="plain" @click="isMobileMenuOpen = false" />
    </div>
    <div class="px-4 py-2">
      <ul class="space-y-4">
        <li v-for="item in menuItems" :key="item.name" @click="isMobileMenuOpen = false">
          <RouterLink
            :to="{ name: item.name }"
            class="block text-xl py-3 border-b border-gray-200 no-underline hover:bg-gray-100 px-3 rounded"
          >
            {{ item.label }}
          </RouterLink>
        </li>
        <li v-if="user?.role === 'administrador'">
          <RouterLink
            :to="{ name: 'dashboard' }"
            class="block text-xl py-3 border-b border-gray-200 no-underline hover:bg-gray-100 px-3 rounded"
          >
            Dashboard
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
