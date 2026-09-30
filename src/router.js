import { createRouter, createWebHistory } from 'vue-router'
import { user, authReady } from './auth'

const routes = [
  { path: '/', name: 'home', component: () => import('./views/Home.vue'), meta: { auth: true } },
  { path: '/login', name: 'login', component: () => import('./views/Login.vue'), meta: { guest: true } },
  { path: '/register', name: 'register', component: () => import('./views/Register.vue'), meta: { guest: true } },
  { path: '/forgot-password', name: 'forgot', component: () => import('./views/ForgotPassword.vue'), meta: { guest: true } },
  // El enlace del correo crea una sesión temporal, por eso no es "guest"
  { path: '/reset-password', name: 'reset', component: () => import('./views/ResetPassword.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach(async (to) => {
  await authReady
  if (to.meta.auth && !user.value) return { name: 'login' }
  if (to.meta.guest && user.value) return { name: 'home' }
})

export default router
