<template>
  <div class="q-pa-md">
    <q-table
      title="Usuários"
      :rows="users"
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

const users = ref([])
const columns = ref([
  {
    name: 'email',
    label: 'E-mail',
    field: row => row.email,
    align: 'left'
  }
])

onMounted(async () => {
  $q.loading.show()
  try {
    const response = await api.get('/users')
    users.value = response.data
  } finally {
    $q.loading.hide()
  }
})

const redirectTo = id => {
  router.push(`/user/edit?id=${id}`)
}

const rowClick = (_, row) => {
  redirectTo(row.id)
}
</script>
