<script setup>
import { ref } from 'vue'
import { register } from '../auth'

const fullName = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const ok = ref(false)
const loading = ref(false)

async function submit() {
  error.value = ''
  if (password.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres.'
    return
  }
  loading.value = true
  const { error: e } = await register(email.value, password.value, fullName.value)
  loading.value = false
  if (e) error.value = e.message
  else ok.value = true
}
</script>

<template>
  <form class="card" @submit.prevent="submit">
    <h1>Crear cuenta</h1>
    <p v-if="ok" class="msg ok">Te enviamos un correo para confirmar tu cuenta. Revisa tu bandeja de entrada.</p>
    <template v-else>
      <p v-if="error" class="msg error">{{ error }}</p>
      <label>Nombre completo<input v-model="fullName" autocomplete="name" required /></label>
      <label>Correo<input v-model="email" type="email" autocomplete="email" required /></label>
      <label>Contraseña<input v-model="password" type="password" autocomplete="new-password" minlength="6" required /></label>
      <button :disabled="loading">{{ loading ? 'Creando…' : 'Crear cuenta' }}</button>
    </template>
    <div class="links"><router-link to="/login">Ya tengo cuenta</router-link></div>
  </form>
</template>
