import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Code from '../views/Codes/Index.vue'
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
  },
  // 扫描二维码查看受教育者信息
  {
    path: '/code',
    component: Code,
    children: [
      {
        path: 'educated',
        component: () => import('../views/Codes/EducatedLook.vue')
      },
      {
        path: 'course',
        component: () => import('../views/Codes/CourseLook.vue')
      },
      {
        path: 'check',
        component: () => import('../views/Codes/CheckCerti.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
