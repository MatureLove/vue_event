// 导入发送请求的函数
import request from '@/utils/request'
export const getListApi = () => {
  return request({
    url: '/api/reg',
    method: 'post',
    data: {
      username: 'liujunyan',
      password: '123456',
      repassword: '123456'
    }
  })
}
