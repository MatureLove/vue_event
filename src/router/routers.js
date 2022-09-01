export default [
  {
    path: '/',
    component: () => import('@/views/layout')
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
