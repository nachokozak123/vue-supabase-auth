<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { user, updatePassword, logout } from '../auth'

const router = useRouter()
const password = ref('')
const error = ref('')
const ok = ref(false)
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  const { error: e } = await updatePassword(password.value)
  loading.value = false
  if (e) { error.value = e.message; return }
  ok.value = true
  await logout()
  setTimeout(() => router.push({ name: 'login' }), 1800)
}
</script>

<template>
  <form class="card" @submit.prevent="submit">
    <h1>Nueva contraseña</h1>
    <p v-if="ok" class="msg ok">Contraseña actualizada. Inicia sesión con la nueva.</p>
    <p v-else-if="!user" class="msg error">
      El enlace no es válido o expiró. <router-link to="/forgot-password">Solicita otro</router-link>.
    </p>
    <template v-else>
      <p v-if="error" class="msg error">{{ error }}</p>
      <label>Nueva contraseña<input v-model="password" type="password" autocomplete="new-password" minlength="6" required /></label>
      <button :disabled="loading">{{ loading ? 'Guardando…' : 'Guardar contraseña' }}</button>
    </template>
  </form>
</template>
