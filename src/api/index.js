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
