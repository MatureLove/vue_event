// 导入发送请求的函数
import request from '@/utils/request'
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
    url: '/my/userinfo'
  })
}
/**
 * 获取导航栏信息
 * @returns
 */
export const reqGetNavInfo = () => {
  return request({
    url: '/my/menus',
    method: 'get'
  })
}
/**
 * 更新用户信息
 * @param {*} param0 id, username, nickname, email, user_pic
 * @returns promise对象
 */
export const reqUpdateUserInfo = ({ id, username, nickname, email, user_pic }) => {
  return request({
    url: '/my/userinfo',
    method: 'put',
    data: {
      id,
      username,
      nickname,
      email,
      user_pic
    }
  })
}
