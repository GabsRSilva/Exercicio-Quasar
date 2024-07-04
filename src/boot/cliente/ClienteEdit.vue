<template>
  <q-toolbar xclass="bg-primary">
    <q-toolbar-title>Cliente</q-toolbar-title>
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
        v-if="!!cliente.id"
      />
    </div>
  </q-toolbar>
  <div class="row q-pa-sm q-col-gutter-sm">
    <q-input
      outlined
      class="col-md-8 col-xs-12"
      label="Nome do Cliente"
      v-model="cliente.nome"
     />
     <q-input
      outlined
      class="col-md-2 col-xs-12"
      label="Telefone"
      v-model="cliente.telefone"
     />
     <q-input
      outlined
      class="col-md-2 col-xs-12"
      label="C.P.F"
      v-model="cliente.cpf"
     />
     <q-input
      outlined
      class="col col-xs-12"
      label="E-mail"
      v-model="cliente.email"
     />
     <div class="col">
      <q-card>
        <q-card-section><b>Endereço</b></q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row q-col-gutter-sm">
            <q-input
              outlined
              class="col-md-2 col-xs-12"
              label="Cep"
              v-model="cliente.cep"
              @blur="consultaCep"
              @change="changeCep"
            />
            <q-input
              outlined
              class="col-md-8 col-xs-12"
              label="Logradouro"
              v-model="cliente.endereco"
            />
            <q-input
              outlined
              class="col-md-2 col-xs-12"
              label="Número"
              v-model="cliente.numero"
            />
            <q-input
              outlined
              class="col-12"
              type="textarea"
              label="Complemento"
              v-model="cliente.complemento"
            />
            <q-input
              outlined
              class="col-md-4 col-xs-12"
              label="Bairro"
              v-model="cliente.bairro"
            />
            <q-input
              outlined
              class="col-md-4 col-xs-12"
              label="Cidade"
              v-model="cliente.cidade"
            />
            <q-input
              outlined
              class="col-md-4 col-xs-12"
              label="Estado"
              v-model="cliente.estado"
            />
          </div>
        </q-card-section>
      </q-card>
     </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { api, http } from 'boot/axios'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const route = useRoute()
const router = useRouter()

defineOptions({
  name: 'ClienteEdit'
})

const cliente = ref({})
const hasChange = ref(false)

onMounted(async () => {
  $q.loading.show()
  try {
    const { id } = route.query
    if (`${id}` === '0') return
    const response = await api.get(`/cliente/${id}`)
    cliente.value = response.data
  } finally {
    $q.loading.hide()
  }
})

const consultaCep = async () => {
  $q.loading.show()
  try {
    if (!cliente.value.cep) return
    if (!hasChange.value) return
    delete cliente.value.numero
    delete cliente.value.complemento
    const response = await http.get(`https://viacep.com.br/ws/${cliente.value.cep}/json/`)
    const { logradouro, complemento, bairro, localidade, uf } = response.data
    cliente.value.endereco = logradouro
    cliente.value.complemento = complemento
    cliente.value.bairro = bairro
    cliente.value.cidade = localidade
    cliente.value.estado = uf
    hasChange.value = false
  } finally {
    $q.loading.hide()
  }
}

const changeCep = () => {
  hasChange.value = true
}

const saveOrUpdate = async () => {
  $q.loading.show()
  let response = { data: {} }
  try {
    const { id } = route.query
    if (`${id}` === '0') {
      response = await api.post('/cliente', { ...cliente.value })
    } else {
      response = await api.patch(`/cliente/${id}`, { ...cliente.value })
    }
    $q.notify({
      type: 'positive',
      message: 'Dados salvo com sucesso!'
    })
    cliente.value = response.data
    router.go(-1)
  } finally {
    $q.loading.hide()
  }
}

const remove = async () => {
  const { id } = route.query
  await api.delete(`/cliente/${id}`)
  router.go(-1)
}

</script>
