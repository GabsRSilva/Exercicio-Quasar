import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Notify } from 'quasar'

const api = axios.create({ baseURL: 'http://localhost:3000' })
const http = axios.create()

api.interceptors.request.use(function (config) {
  config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoicmljYXJkb21wYkBvdXRsb29rLmNvbSIsImlhdCI6MTcyMDA1NDQ1NywiZXhwIjoxNzIwMTQwODU3fQ.CXUM1hYDv0JC9QLBLQnD-BH0MBTuzE6Gg-ExBlVlQyc'
  return config
}, (error) => {
  return Promise.reject(error)
})

api.interceptors.response.use(function (response) {
  return response
}, function (error) {
  const [message] = error.response.data.message
  Notify.create({
    type: 'negative',
    message
  })
  return Promise.reject(error)
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api, http }
