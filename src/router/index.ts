import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'periodica',
          component: () => import('../views/PeriodicaView.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'preguntas',
          name: 'preguntas',
          component: () => import('../views/PreguntasView.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'loteria',
          name: 'loteria',
          component: () => import('../views/LoteriaView.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue'),
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/LoginView.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../views/RegisterView.vue'),
        },
      ],
    },
    {
      path: '/admin',
      component: () => import('@/layout/DashboardLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
          meta: {
            requiresAuth: true,
            role: 'administrador',
          },
        },
        {
          path: 'registrar-publicacion',
          name: 'registrar-publicacion',
          component: () => import('../views/RegistrarPublicacionView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user') !== null
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const userRole = JSON.parse(localStorage.getItem('user') || 'null')?.role

  console.log(userRole)

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (userRole !== to.meta.role && to.name === 'dashboard') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
