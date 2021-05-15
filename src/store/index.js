import Vue from 'vue'
import Vuex from 'vuex'
import { getAdminInfo } from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 教育管理者用户信息
    adminInfo: {
      id: '4564156',
      name: '',
      avatar: ''
    }
  },
  mutations: {
    setAdminInfo(state, data) {
      state.adminInfo = data
    }
  },
  actions: {
    async setAdminInfoAsync(context, data) {
      const res = await getAdminInfo()
      // console.log(res)
      context.commit('setAdminInfo', {
        id: res.data.data.educatorId,
        name: res.data.data.educatorName
      })
    }
  },
  modules: {}
})
