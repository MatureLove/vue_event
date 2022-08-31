export default [
  {
    path: '/',
    redirect: '/login'
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
