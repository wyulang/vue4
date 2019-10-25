import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const routers = [
  {
    path: '/',
    name: "index",
    component: () => import(/* webpackChunkName: "exam" */ './pages/index.vue'),
    meta: {
      index: 0,
      title: 'index',
      isHeader: 1,
      isFooter: 1,
    }
  },
  {
    path: '/two',
    name: "two",
    component: () => import(/* webpackChunkName: "exam" */ './pages/two.vue'),
    meta: {
      index: 0,
      title: 'index',
      isHeader: 1,
      isFooter: 1,
    }
  },
]

const routerDefaut = new Router({
  routes: routers,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default routerDefaut;