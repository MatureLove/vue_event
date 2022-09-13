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
/**
 * 上传用户头像
 * @param {*} avatar base64字符串
 * @returns
 */
export const updateAvatarAPI = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: {
      avatar
    }
  })
}/**
 * 修改用户密码
 * @param {*} param0 原密码 新密码 确认密码old_pwd, new_pwd, re_pwd
 * @returns promise对象
 */
export const updatePwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}
/**
 *
 * @returns 获取文章分类列表
 */
export const getCateListApi = () => {
  return request({
    url: '/my/cate/list'
  })
}
/**
 * 添加文章分类
 * @param {*} param0 cate_name,文章分类名字 cate_alias 文章分类别名 string
 * @returns promise对象
 */
export const addCateListApi = ({ cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/add',
    method: 'post',
    data: {
      cate_name,
      cate_alias
    }
  })
}
/**
 * 修改文章分类
 * @param {*} param0 id, cate_alias, cate_name
 * @returns promise对象
 */
export const updateCateListApi = ({ id, cate_alias, cate_name }) => {
  return request({
    url: '/my/cate/info',
    method: 'PUT',
    data: {
      id,
      cate_name,
      cate_alias
    }
  })
}
/**
 * 删除文章分类
 * @param {*} id id 文章分类id
 * @returns  promis对象
 */
export const deleteCateListApi = (id) => {
  return request({
    url: '/my/cate/del',
    method: 'DELETE',
    params: {
      id
    }
  })
}
