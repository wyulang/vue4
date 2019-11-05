import Vue from 'vue';
import App from './pages/App.vue';
import router from './router';
import store from './store/index';
import ElementUI from 'element-ui';
import { session, storages } from 'lib/storage.js';
import Vuebar from 'vuebar';
import date from '../lib/date.js';
import uploader from 'vue-simple-uploader';
Vue.use(uploader);
Vue.use(Vuebar);
Vue.use(ElementUI);
Vue.prototype.session = session;
Vue.prototype.storage = storages;
Vue.use(ElementUI);
new Vue({
  el:'#app',
  router,
  store,
  render: (h) => h(App),
});

Vue.filter('date',function(value,fmt){
  return date.format(value)
})

Vue.filter('fileSize',function(value,fmt){
  return date.conver(value)
})
