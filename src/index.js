import Vue from 'vue';
import App from './pages/App.vue';
import router from './router';
import store from './store/index';
import ElementUI from 'element-ui';
import { session, storages } from 'lib/storage.js';
Vue.prototype.session = session;
Vue.prototype.storage = storages;
Vue.use(ElementUI);
new Vue({
  el:'#app',
  router,
  store,
  render: (h) => h(App),
})
