import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Notify } from 'quasar'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:3000' })
const http = axios.create()

api.interceptors.request.use(function (config) {
  config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoicmljYXJkb21wYkBvdXRsb29rLmNvbSIsImlhdCI6MTcyMDA1NDQ1NywiZXhwIjoxNzIwMTQwODU3fQ.CXUM1hYDv0JC9QLBLQnD-BH0MBTuzE6Gg-ExBlVlQyc'
  return config
}, (error) => {
  return Promise.reject(error)
})

// Add a response interceptor
api.interceptors.response.use(function (response) {
  return response
}, function (error) {
  const [message] = error.response.data.message
  Notify.create({
    type: 'negative',
    message
  })
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api, http }
