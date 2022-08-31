// 引入api接口
import { registerAPI } from '@/api/index'
export default {
  // 开启命名空间
  namespaced: true,
  actions: {
    // 用户注册
    async userRegister ({ commit }, data) {
      return await registerAPI(data)
    }
  },
  mutations: {},
  state: {},
  getters: {}
}
