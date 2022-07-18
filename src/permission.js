import router from '@/router'
import store from '@/store'
router.beforeEach((to, from, next) => {
  const token = store.state.user.userData.token
  if (token) {
    if (to.path === '/login') {
      next('/welcome')
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
