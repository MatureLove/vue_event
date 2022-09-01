import Vue from 'vue'
import Vuex from 'vuex'
// 该插件可以使vuex持久化存储
import createPersistedState from 'vuex-persistedstate'
// 引入用户注册登录模块
import user from './user'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    user
  },
  // 配置为 vuex 的插件
  plugins: [createPersistedState()]
})
