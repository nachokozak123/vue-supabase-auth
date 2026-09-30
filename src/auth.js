import { ref } from 'vue'
import { supabase } from './supabase'

export const user = ref(null)

// Se resuelve cuando ya se conoce la sesión inicial
export const authReady = supabase.auth.getSession().then(({ data }) => {
  user.value = data.session?.user ?? null
})

supabase.auth.onAuthStateChange((_event, session) => {
  user.value = session?.user ?? null
})

export const register = (email, password, fullName) =>
  supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: window.location.origin + '/login'
    }
  })

export const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password })

export const logout = () => supabase.auth.signOut()

export const sendResetEmail = (email) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/reset-password'
  })

export const updatePassword = (password) =>
  supabase.auth.updateUser({ password })
