<template>
  <q-toolbar xclass="bg-primary">
    <q-toolbar-title>Usuário</q-toolbar-title>
    <div class="row q-gutter-sm">
      <q-btn
        color="primary"
        label="Salvar"
        outline
        icon="save"
        @click="saveOrUpdate"
      />
      <q-btn
        color="negative"
        label="Excluir"
        outline
        icon="delete"
        @click="remove"
        v-if="!!user.id"
      />
    </div>
  </q-toolbar>
  <div class="row q-pa-sm q-col-gutter-sm">
    <q-input
      label="Usuário"
      class="col"
      outlined
      v-model="user.email"
    />
    <q-input
      label="Senha"
      class="col"
      outlined
      type="password"
      v-model="user.password"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { api } from 'boot/axios'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const route = useRoute()
const router = useRouter()

defineOptions({
  name: 'UserEdit'
})

const user = ref({})

onMounted(async () => {
  $q.loading.show()
  try {
    const { id } = route.query
    if (`${id}` === '0') return
    const response = await api.get(`/users/${id}`)
    user.value = response.data
  } finally {
    $q.loading.hide()
  }
})

const saveOrUpdate = async () => {
  $q.loading.show()
  let response = { data: {} }
  try {
    const { id } = route.query
    if (`${id}` === '0') {
      response = await api.post('/users', { ...user.value })
    } else {
      response = await api.patch(`/users/${id}`, { ...user.value })
    }
    $q.notify({
      type: 'positive',
      message: 'Dados salvo com sucesso!'
    })
    user.value = response.data
    router.go(-1)
  } finally {
    $q.loading.hide()
  }
}

const remove = async () => {
  const { id } = route.query
  await api.delete(`/users/${id}`)
  router.go(-1)
}

</script>
