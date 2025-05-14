<template>
  <div
    class="flex-1 object-center bg-center min-h-screen flex items-center justify-center from-blue-300 to-blue-500 bg-gradient-to-r"
    :style="{ backgroundImage: 'url(' + imagenfondo + ')', backgroundSize: 'cover' }"
  >
    <div class="matraz-container flex flex-col items-center">
      <img
        :src="logo"
        alt="Logo"
        class="absolute left-4 top-4 w-20 h-20 object-center bg-center rounded-full shadow-lg z-10 object-cover"
      />
      <!-- Cuello del matraz -->
      <!-- <div class="flask-neck"></div> -->

      <!-- Cuerpo del matraz (formulario) -->
      <div class="flask-body w-full rounded-t-none">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Iniciar Sesión</h2>
          <p class="text-sm text-gray-600 mt-1">Accede a Studying Chemistry</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1"
              >Correo electrónico</label
            >
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <input
                id="email"
                name="email"
                type="text"
                autocomplete="email"
                required
                class="input-field pl-10 pr-3 py-2 w-full rounded-md"
                placeholder="tu usuario"
                v-model="username"
                @focus="fillLiquid(33)"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1"
              >Contraseña</label
            >
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                class="input-field pl-10 pr-10 py-2 w-full rounded-md"
                placeholder="••••••••"
                v-model="password"
                @focus="fillLiquid(66)"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  :disabled="isLoading"
                  type="button"
                  @click="showPassword = !showPassword"
                  class="text-gray-400 hover:text-gray-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                >
                  <svg
                    v-if="showPassword"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between"></div>

          <div>
            <button
              type="submit"
              class="submit-btn w-full flex justify-center items-center group"
              @mouseover="fillLiquid(100)"
              @mouseout="fillLiquid(66)"
            >
              <div v-if="isLoading" class="atom-spinner">
                <div class="atom-orbit"></div>
                <div class="atom-orbit"></div>
                <div class="atom-orbit"></div>
                <div class="atom-center"></div>
              </div>
              <span>{{ isLoading ? 'Iniciando sesión...' : 'Iniciar sesión' }}</span>
            </button>
          </div>
        </form>

        <!-- Líquido dentro del matraz -->
        <div class="liquid-animation" :style="{ height: liquidHeight + '%' }"></div>

        <!-- Burbujas -->
        <div
          v-for="(bubble, index) in bubbles"
          :key="index"
          class="bubble"
          :style="{
            width: bubble.size + 'px',
            height: bubble.size + 'px',
            left: bubble.left + '%',
            bottom: bubble.bottom + '%',
            animationDelay: bubble.delay + 's',
            animationDuration: bubble.duration + 's',
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import imagenfondo from '@/assets/login.gif'
import logo from '@/assets/logo.jpeg'
import { useToast } from 'vuestic-ui'
// import api from '@/services/api'

const toast = useToast()
const authStore = useAuthStore()
const router = useRouter()
const username = ref('')
const password = ref('')
const errorResponse = ref('')
const showPassword = ref(false)
const isLoading = ref(false)

const handleSubmit = async () => {
  try {
    console.log(import.meta.env.VITE_API_URL)
    const response = await fetch(import.meta.env.VITE_API_URL + '/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })

    if (!response.ok) {
      throw new Error('Error en la autenticación')
    }
    isLoading.value = true
    const data = await response.json()
    if (data) {
      authStore.setUser(data)

      router.push({ name: 'periodica' })
    } else {
      errorResponse.value = 'Error en la autenticación'
      toast.init({
        title: 'Error',
        message: 'Error en la autenticación',
        color: 'danger',
      })
    }

    isLoading.value = false
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      errorResponse.value = error.message
    } else {
      errorResponse.value = 'Error desconocido'
    }
  }
}

const bubbles = ref<
  Array<{
    size: number
    left: number
    bottom: number
    delay: number
    duration: number
  }>
>([])
const liquidHeight = ref(0)

function fillLiquid(height: number) {
  liquidHeight.value = height
}

function adjustElementsPosition() {
  const isMobile = window.innerWidth < 640
  const elements = document.querySelectorAll('.periodic-element') as NodeListOf<HTMLElement>

  if (isMobile) {
    elements.forEach((el) => {
      el.style.display = 'none'
    })
  } else {
    elements.forEach((el) => {
      el.style.display = 'flex'
    })
  }
}

onMounted(() => {
  adjustElementsPosition()
  createBubbles()
  window.addEventListener('resize', adjustElementsPosition)
})

function createBubbles() {
  const bubbleCount = 10
  bubbles.value = []

  for (let i = 0; i < bubbleCount; i++) {
    bubbles.value.push({
      size: Math.floor(Math.random() * 10) + 5,
      left: Math.floor(Math.random() * 90) + 5,
      bottom: Math.floor(Math.random() * 20),
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 2,
    })
  }
}

// Initialize bubbles when component loads
createBubbles()
</script>

<style lang="css" scoped>
.matraz-container {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.matraz-outline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.liquid-animation {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to right, #8884cd, #c4b0f2);
  /* border-radius: 0 0 100px 100px; */
  transition: height 0.8s ease-in-out;
  z-index: -1;
}

.bubble {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  animation: float 3s infinite ease-in-out;
}

@keyframes float {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100px) scale(0.5);
    opacity: 0;
  }
}

.flask-neck {
  height: 80px;
  width: 60px;
  background: linear-gradient(to right, #4f46e5, #8b5cf6);
  margin: 0 auto;
  border-radius: 5px 5px 0 0;
  position: relative;
}

.flask-body {
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.2);
  overflow: hidden;
  position: relative;
  padding: 2rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.input-field {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(79, 70, 229, 0.3);
  transition: all 0.3s ease;
}

.input-field:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

.submit-btn {
  background: linear-gradient(to right, #4f46e5, #8b5cf6);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.submit-btn:hover {
  box-shadow: 0 5px 15px rgba(79, 70, 229, 0.4);
  transform: translateY(-2px);
}

.atom-spinner {
  height: 20px;
  width: 20px;
  position: relative;
  display: inline-block;
  margin-right: 8px;
}

.atom-orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.8);
  animation: atom-spin 1s linear infinite;
}

.atom-orbit:nth-child(2) {
  transform: translate(-50%, -50%) rotate(60deg);
  animation-delay: -0.3s;
}

.atom-orbit:nth-child(3) {
  transform: translate(-50%, -50%) rotate(120deg);
  animation-delay: -0.6s;
}

.atom-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: white;
}

@keyframes atom-spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.periodic-element {
  width: 60px;
  height: 60px;
  background-color: rgba(79, 70, 229, 0.2);
  border: 1px solid rgba(79, 70, 229, 0.5);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  transition: all 0.3s ease;
}

.element-symbol {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4f46e5;
}

.element-number {
  font-size: 0.7rem;
  color: #6b7280;
  position: absolute;
  top: 2px;
  left: 4px;
}

.element-name {
  font-size: 0.6rem;
  color: #4b5563;
}
</style>
