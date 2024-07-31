<template>
    <div class="login">
        <q-input label="E-mail" v-model="email"/>
        <q-input label="Senha" type="password" v-model="password"/>
        <q-btn type="positove" label="Login" class="botton" @click="entrar"/>
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
  router.push('/boots')
}

</script>

<style>
.login {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 40px 30%;
    background-color: #5ecf4c;
    padding: 10px;
    border-radius: 5px;
}

.botton{
  margin-top: 50px;
}
</style>
