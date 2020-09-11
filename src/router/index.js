import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      icon: 'home', title: 'Home'
    },
    component: () => import(/* webpackChunkName: "home" */ '../pages/home/Home')
  },
  {
    path: '/attendance-list',
    name: 'attendance-list',
    meta: {
      icon: 'list-ul', title: 'Lista de atendimento'
    },
    component: () => import(/* webpackChunkName: "attendance-list" */
      '../pages/attendance-list/AttendanceList')
  },
  {
    path: '/registration',
    name: 'registration',
    meta: {
      icon: 'list-ul', title: 'Cadastro Nome / CRM'
    },
    component: () => import(/* webpackChunkName: "registration" */
      '../pages/registration/RegistrationDoctor')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      icon: 'Login'
    },
    component: () => import(/* webpackChunkName: "login" */ '../pages/login/Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = ' Hospital'

  if (!window.uid && to.name !== 'Login') {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
