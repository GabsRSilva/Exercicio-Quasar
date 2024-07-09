<template>
    <div class="login">
        <q-input label="E-mail" v-model="email"/>
        <q-input label="Senha" type="password" v-model="password"/>
        <q-btn type="positove" label="Login" @click="entrar"/>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const entrar = async () => {
  const res = await api.post('/auth/login', {
    email: email.value,
    password: password.value
  })
  localStorage.setItem('token', res.data.token)
  router.push('/')
}

</script>

<style>
.login {
    display: flex;
    align-content: center;
}
</style>
