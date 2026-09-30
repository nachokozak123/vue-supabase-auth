<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { user, logout } from '../auth'
import { supabase } from '../supabase'

const router = useRouter()
const profile = ref(null)

onMounted(async () => {
  const { data } = await supabase.from('profiles').select('*').eq('id', user.value.id).single()
  profile.value = data
})

async function signOut() {
  await logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <section class="card">
    <h1>Hola, {{ profile?.full_name || user?.email }}</h1>
    <p class="msg ok">Sesión iniciada como {{ user?.email }}</p>
    <button class="secondary" @click="signOut">Cerrar sesión</button>
  </section>
</template>
