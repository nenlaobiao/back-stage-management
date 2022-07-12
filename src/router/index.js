import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/',
    component: () => import('@/views/Home'),
    redirect: '/welcome',
    children: [
      { path: 'permission', component: () => import('@/views/Root/PermissionList.vue') },
      { path: 'role', component: () => import('@/views/Root/RoleList.vue') },
      { path: 'userlist', component: () => import('@/views/User/UserList.vue') },
      { path: 'goodslist', component: () => import('@/views/Goods/GoodsList.vue') },
      { path: 'goodsclass', component: () => import('@/views/Goods/GoodClass.vue') },
      { path: 'parameters', component: () => import('@/views/Goods/Parameters.vue') },
      { path: 'order', component: () => import('@/views/Order/Order.vue') },
      { path: 'report', component: () => import('@/views/Report/Report.vue') },
      { path: 'welcome', component: () => import('@/views/Home/Welcome.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
