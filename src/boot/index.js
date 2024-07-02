import MainLayout from 'layouts/MainLayout.vue'

export default ({ router }) => {
  router.addRoute({
    path: '/cliente',
    component: MainLayout,
    children: [
      { path: 'view', component: () => import('boot/cliente/ClienteView.vue') },
      { path: 'edit', component: () => import('boot/cliente/ClienteEdit.vue') }
    ]
  })

  /*
  router.beforeEach((to, from, next) => {
    return next()
  })
    */
}
