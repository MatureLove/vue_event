// 引入axios
import axios from 'axios'
// 引入store
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
// 创建一个自定的axios方法(比原axios多了个基地址)
// axios函数请求的url地址前面会被拼接基地址, 然后axios请求baseURL+url后台完整地址
export const baseURL = 'http://big-event-vue-api-t.itheima.net'
const myAxios = axios.create({ baseURL })

// 定义请求拦截器
myAxios.interceptors.request.use(function (config) {
  if (store.state.user.token) {
    // 为请求头挂载 Authorization 字段
    config.headers.Authorization = store.state.user.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 定义响应拦截器
myAxios.interceptors.response.use(function (response) {
  // 响应状态码为 2xx 时触发成功的回调，形参中的 response 是“成功的结果”

  return response
}, function (error) {
  // 响应状态码不是 2xx 时触发失败的回调，形参中的 error 是“失败的结果”
  // 状态码401时表示token过期了，需要退出登录删除token删除用户信息
  if (error.response.status === 401) {
    store.commit('user/QUITLOGIN')
    router.push('/login')
    Message.error('身份信息已过期，请重新登录')
  }
  return Promise.reject(error)
})
// 导出自定义的axios方法, 供外面调用传参发请求
export default myAxios
