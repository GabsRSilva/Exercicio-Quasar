<template>
  <div class="q-pa-md">
    <q-table
      title="Clientes"
      :rows="clientes"
      :columns="columns"
      row-key="name"
      @row-click="rowClick"
    />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="redirectTo(0)" />
    </q-page-sticky>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const router = useRouter()

defineOptions({
  name: 'ClienteView'
})

const clientes = ref([])
const columns = ref([
  {
    name: 'Nome',
    label: 'Nome',
    field: row => row.nome,
    align: 'left'
  }
])

onMounted(async () => {
  $q.loading.show()
  try {
    const response = await api.get('/cliente')
    clientes.value = response.data
  } finally {
    $q.loading.hide()
  }
})

const redirectTo = id => {
  router.push(`/cliente/edit?id=${id}`)
}

const rowClick = (_, row) => {
  redirectTo(row.id)
}
</script>
