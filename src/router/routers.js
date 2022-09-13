export default [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home')
      },
      {
        path: '/user-info',
        component: () => import('@/views/user/userinfo')
      },
      {
        path: '/user-avatar',
        component: () => import('@/views/user/updateAvatar')
      },
      {
        path: '/user-pwd',
        component: () => import('@/views/user/resetPassword')
      },
      {
        path: '/art-cate',
        component: () => import('@/views/article/artCate')
      },
      {
        path: '/art-list',
        component: () => import('@/views/article/artList')
      }
    ]
  },
  {
    path: '/register',
    component: () => import('@/views/register')
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]
