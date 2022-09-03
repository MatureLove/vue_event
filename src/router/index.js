import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})
router.beforeEach(async (to, from, next) => {
  // 获取token，通过token判断用户是否登录
  const token = store.state.user.token
  // 获取用户名。通过这个判断是否获取用户信息
  const username = store.state.user.userinfo.username
  // token存在
  if (token) {
    // 如果用户已经登录，还要跳转登录页，直接跳转到首页
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断是否已经获取到用户信息
      if (username) {
        next()
      } else {
        try {
          // 没有获取到用户信息，先获取用户信息
          await store.dispatch('user/getUserInfo')
          next()
        } catch (error) {
          // token过期需要清除本地token，返回登陆页重新登录，重新获取token
          await store.commit('user/QUITLOGIN')
          next('/login')
        }
      }
    }
  } else {
    next()
  }
})
export default router
