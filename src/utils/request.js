import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/',
  timeout: 5000
})
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.state.user.userData && store.state.user.userData.token) {
    config.headers.Authorization = store.state.user.userData.token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const { data, meta } = response.data
  if (meta.status === 400 && meta.msg === '无效token') {
    Message.error(meta.msg)
    store.commit('user/setUserData', '')
    router.push('/login')
    return meta
  } else if (meta.status >= 400) {
    Message.error(meta.msg)
    return meta
  } else {
    Message.success(meta.msg)
    return data
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
