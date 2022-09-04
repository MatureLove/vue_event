// 导入发送请求的函数
import request from '@/utils/request'
import store from '@/store'
// 用户注册 data包含username passwo repassword
export const registerAPI = (data) => {
  return request({
    url: '/api/reg',
    method: 'post',
    data
  })
}
/**
 *
 * @param {*} param0 username string password string,接受两个参数 用户名密码 用户登录
 * @returns promise对象
 */
export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
/**
 *
 * @returns promise对象，获取用户信息 ，需要携带请求头token
 */
export const reqGetUserInfo = () => {
  return request({
    url: '/my/userinfo',
    headers: {
      Authorization: store.state.user.token
    }
  })
}

export const reqGetNavInfo = () => {
  return request({
    url: '/my/menus',
    method: 'get',
    headers: {
      Authorization: store.state.user.token
    }
  })
}
