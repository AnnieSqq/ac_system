import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    redirect: '/educated_list',
    children: [
      {
        path: '/educated_list',
        component: () => import('../views/Home/EducatedList.vue')
      },
      {
        path: '/educated_info',
        component: () => import('../views/Home/EducatedInfo.vue')
      },
      {
        path: '/certificate_info',
        component: () => import('../views/Home/CertificateInfo.vue')
      },
      {
        path: '/study_auth',
        component: () => import('../views/Home/StudyAuth.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
