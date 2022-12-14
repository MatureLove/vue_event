import Vue from 'vue'
import Vuex from 'vuex'
// 引入用户注册登录模块
import user from './user'
import layout from './layout'
import article from './article'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    user,
    layout,
    article
  }
})
