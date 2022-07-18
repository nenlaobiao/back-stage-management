import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.less'
import Crumb from '@/components/Crumb.vue'
import './permission'
import Moment from 'moment'
Vue.component('Crumb', Crumb)
Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.filter('formatDate', function (value) {
  return Moment(value * 1000).format('YYYY-MM-DD')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
