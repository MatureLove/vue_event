import { reqGetNavInfo } from '@/api/index'

export default {
  // 开启命名空间
  namespaced: true,
  actions: {
    async getNavInfo ({ commit }) {
      const { data } = await reqGetNavInfo()
      commit('GETNAVINFO', data.data)
    }
  },
  mutations: {
    // 存储侧边栏数据
    GETNAVINFO (state, val) {
      state.navList = val
    }
  },
  state: {
    navList: [] // 侧边栏数据
  },
  getters: {

  }
}
