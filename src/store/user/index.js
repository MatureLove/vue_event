// 引入api接口
import { registerAPI, loginAPI, reqGetUserInfo, reqUpdateUserInfo } from '@/api/index'
import { getToken, setToken, removeToken } from '@/utils/token'
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
        setToken(data.token)
        return data.message
      } else {
        return Promise.reject(new Error())
      }
    },
    // 获取用户信息
    async getUserInfo ({ commit }) {
      const { data } = await reqGetUserInfo()
      // console.log(1)
      commit('GETUSERINFO', data.data)
    },
    // 更新用户信息
    async updateUserInfo ({ commit }, userinfo) {
      const { data } = await reqUpdateUserInfo(userinfo)
      if (data.code === 0) {
        return data.message
      } else {
        return Promise.reject(new Error(data.message))
      }
    }
  },
  mutations: {
    // 存储token
    UPDATETOKEN (state, val) {
      state.token = val
    },
    // 退出登录
    QUITLOGIN (state) {
      state.token = ''
      state.userinfo = {}
      removeToken()
    },
    // 获取用户信息
    GETUSERINFO (state, val) {
      state.userinfo = val
    }
  },
  state: {
    token: getToken(), // token
    userinfo: {}// 用户信息 email id nickname user_pic username
  },
  getters: {
    username: state => state.userinfo.username,
    user_pic: state => state.userinfo.user_pic,
    nickname: state => state.userinfo.nickname,
    id: state => state.userinfo.id
  }

}
