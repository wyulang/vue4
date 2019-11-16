import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

export default new Vuex.Store({
  state: {
    isUpload: false,
    downloadFile: [{uid:'111',pross:0}]
  },
  actions: {
  },
  mutations: {
    setMenuShow(state, val) {
      state.isMenu = val
    },
    setUpload(state, value) {
      state.isUpload = value
    },
    setDownLoad(state, val) {
      state.downloadFile = val;
    },
    setDownLoadPross(state, val) {
      let prss = state.downloadFile.find(v => { return v.uid = val.uid })
      if (prss) {
        prss.pross = val.pross;
        console.log(val,prss)
      }
    }
  }
})
