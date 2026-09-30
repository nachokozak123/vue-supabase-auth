<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  const { error: e } = await login(email.value, password.value)
  loading.value = false
  if (e) error.value = 'Correo o contraseña incorrectos.'
  else router.push({ name: 'home' })
}
</script>

<template>
  <form class="card" @submit.prevent="submit">
    <h1>Iniciar sesión</h1>
    <p v-if="error" class="msg error">{{ error }}</p>
    <label>Correo<input v-model="email" type="email" autocomplete="email" required /></label>
    <label>Contraseña<input v-model="password" type="password" autocomplete="current-password" required /></label>
    <button :disabled="loading">{{ loading ? 'Entrando…' : 'Iniciar sesión' }}</button>
    <div class="links">
      <router-link to="/register">Crear cuenta</router-link>
      <router-link to="/forgot-password">¿Olvidaste tu contraseña?</router-link>
    </div>
  </form>
</template>
