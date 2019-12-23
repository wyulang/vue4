
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

/* webpackChunkName: "upload" */

const routers = [
	{
		path: '/',
		name: "login",
		component: () => import('./pages/login.vue'),
		meta: {
			index: 0,
			title: "用户登录"
		}
	},
	{
		path: '/info',
		name: "info",
		component: () => import('./pages/info.vue'),
		meta: {
			index: 0,
			title: "服务器信息查看"
		}
	},
	{
		path: '/user',
		name: "user",
		component: () => import('./pages/user/index.vue'),
		meta: {
			index: 0,
			title: "用户登录"
		},
		children: [
			{
				path: '/user/upload',
				name: "user-upload",
				component: () => import( /* webpackChunkName: "upload" */'./pages/user/uploads.vue'),
				meta: {
					index: 0,
					title: "用户登录"
				},
			},
			{
				path: '/user/file',
				name: "user-file",
				component: () => import( /* webpackChunkName: "upload" */'./pages/user/file-new.vue'),
				meta: {
					index: 0,
					title: "用户登录"
				},
			},
		]
	},
	{
		path: '/manage',
		name: "manage",
		component: () => import( /* webpackChunkName: "upload" */'./pages/manage/index.vue'),
		meta: {
			index: 0,
			title: "用户登录"
		},
		children: [
			{
				path: '/manage/custom',
				name: "manage-custom",
				component: () => import( /* webpackChunkName: "upload" */'./pages/manage/custom.vue'),
				meta: {
					index: 0,
					title: "用户登录"
				},
			},
			{
				path: '/manage/net',
				name: "manage-net",
				component: () => import( /* webpackChunkName: "upload" */'./pages/manage/set-net.vue'),
				meta: {
					index: 0,
					title: "用户登录"
				},
			},
            {
                path: '/manage/site',
                name: "manage-site",
                component: () => import( /* webpackChunkName: "upload" */'./pages/manage/set-site.vue'),
                meta: {
                    index: 0,
                    title: "用户登录"
                },
            },
			{
				path: '/manage/admin',
				name: "manage-admin",
				component: () => import( /* webpackChunkName: "upload" */'./pages/manage/admin.vue'),
				meta: {
					index: 0,
					title: "用户登录"
				},
			},
			{
				path: '/manage/diction',
				name: "manage-diction",
				component: () => import( /* webpackChunkName: "upload" */'./pages/manage/diction.vue'),
				meta: {
					index: 0,
					title: "用户登录"
				},
			},
			{
				path: '/manage/download',
				name: "manage-download",
				component: () => import( /* webpackChunkName: "upload" */'./pages/manage/download.vue'),
				meta: {
					index: 0,
					title: "用户登录"
				},
			}
		]
	}
]

export default new Router({
	routes: routers
})

export const menus = routers;
