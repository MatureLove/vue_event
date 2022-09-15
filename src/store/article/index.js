import { getCateListApi, addCateListApi, updateCateListApi, deleteCateListApi, uploadCateApi } from '@/api'
export default {
  namespaced: true,
  actions: {
    // 获取文章分类列表
    async getCateList ({ commit }) {
      const { data } = await getCateListApi()
      if (data.code === 0) {
        commit('GETCATELIST', data.data)
        return data.message
      } else {
        return Promise.reject(new Error(data.message))
      }
    },
    // 添加文章分类列表
    async addCateList({ commit }, cateObj) {
      return await addCateListApi(cateObj)
    },
    // 修改文章分类列表
    async updateCateList({ commit }, updateinfo) {
      return await updateCateListApi(updateinfo)
    },
    // 删除文章分类
    async deleteCateList({ commit }, id) {
      return await deleteCateListApi(id)
    },
    // 发表文章
    async uploadCate({ commit }, fd) {
      return await uploadCateApi(fd)
    }
  },
  mutations: {
    GETCATELIST (state, cateList) {
      state.cateList = cateList
    }
  },
  state: {
    cateList: []
  },
  getters: {

  }
}
