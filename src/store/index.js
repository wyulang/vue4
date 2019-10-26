import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isUpload: false,
    isMenu: {
      show: false,
      title: "离校统计"
    }
  },
  actions: {
  },
  mutations: {
    setMenuShow(state, val) {
      state.isMenu = val
    },
    setUpload(state, value) {
      state.isUpload = value
    }
  }
})