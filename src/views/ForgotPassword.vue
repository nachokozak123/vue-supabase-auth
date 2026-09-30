<script setup>
import { ref } from 'vue'
import { sendResetEmail } from '../auth'

const email = ref('')
const error = ref('')
const ok = ref(false)
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  const { error: e } = await sendResetEmail(email.value)
  loading.value = false
  if (e) error.value = e.message
  else ok.value = true
}
</script>

<template>
  <form class="card" @submit.prevent="submit">
    <h1>Recuperar contraseña</h1>
    <p v-if="ok" class="msg ok">Si el correo existe, recibirás un enlace para restablecer tu contraseña.</p>
    <template v-else>
      <p v-if="error" class="msg error">{{ error }}</p>
      <label>Correo<input v-model="email" type="email" autocomplete="email" required /></label>
      <button :disabled="loading">{{ loading ? 'Enviando…' : 'Enviar enlace' }}</button>
    </template>
    <div class="links"><router-link to="/login">Volver a iniciar sesión</router-link></div>
  </form>
</template>
