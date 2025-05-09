<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'vue-router'
import { getCookie } from '@/utils/getCookie'
import { setCookie } from '@/utils/setCookie'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const cookie_id = getCookie('usuario_cookie')
if (cookie_id === '' || cookie_id === null) {
  const random_id = uuidv4()
  setCookie('usuario_cookie', random_id, 10)
}
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
  {
    name: 'dashboard',
    label: 'Dashboard',
  },
]
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
        <VaNavbarItem v-for="item in menuItems" :key="item.name" class="text-lg hidden sm:block">
          <RouterLink :to="{ name: item.name }">{{ item.label }}</RouterLink>
        </VaNavbarItem>
        <VaNavbarItem>
          <VaMenu>
            <template #anchor>
              <VaIcon :size="30" name="account_circle" />
            </template>
            <template v-if="!user">
              <VaMenuItem>
                <RouterLink :to="{ name: 'login' }">Iniciar Sesión</RouterLink>
              </VaMenuItem>
            </template>
            <template v-else>
              <VaMenuItem>
                <!-- <RouterLink :to="{ name: 'profile' }">Perfil</RouterLink> -->
                <span class="text-gray-800 font-semibold">
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
                >
                  Cerrar Sesión
                </VaButton>
              </VaMenuItem>
            </template>
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
