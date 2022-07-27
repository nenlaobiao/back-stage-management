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
      { path: 'rootList', component: () => import('@/views/Root/RootList.vue'), meta: { c: '角色列表' } },
      { path: 'role', component: () => import('@/views/Root/RoleList.vue'), meta: { d: '列表列表' } },
      { path: 'userlist', component: () => import('@/views/User/UserList.vue') },

      { path: 'goodslist', component: () => import('@/views/Goods/GoodsList.vue') },
      { path: 'goodsclass', component: () => import('@/views/Goods/GoodClass.vue'), meta: { b: '商品' } },
      { path: 'parameters', component: () => import('@/views/Goods/Parameters.vue') },
      { path: 'goodslist/goods/:id', component: () => import('@/views/Goods/AddGoods.vue') },
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
