// 引入api接口
import { registerAPI, loginAPI } from '@/api/index'
export default {
  // 开启命名空间
  namespaced: true,
  actions: {
    // 用户注册
    async userRegister ({ commit }, data) {
      return await registerAPI(data)
    },
    // 用户登录
    async userLogin ({ commit }, loginInfo) {
      const { data } = await loginAPI(loginInfo)
      if (data.code === 0) {
        commit('UPDATETOKEN', data.token)
        return data.message
      } else {
        return Promise.reject(new Error())
      }
    }
  },
  mutations: {
    // 存储token
    UPDATETOKEN (state, val) {
      state.token = val
    }
  },
  state: {
    token: JSON.parse(localStorage.getItem('vuex')).user.token
  },
  getters: {}

}
