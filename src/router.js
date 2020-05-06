
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
		component: () => import('./pages/Info.vue'),
		meta: {
			index: 0,
			title: "服务器信息查看"
		}
	},
	{
		path: '/user',
		name: "user",
		component: () => import('./pages/user/default.vue'),
		meta: {
			index: 0,
			title: "用户登录"
		},
		children: [
			{
				path: '/user/upload',
				name: "user-upload",
				component: () => import( /* webpackChunkName: "upload" */'./pages/user/file-list.vue'),
				meta: {
					index: 0,
					title: "外宣推送"
				},
			},
			{
				path: '/user/file',
				name: "user-file",
				component: () => import( /* webpackChunkName: "upload" */'./pages/user/file-new.vue'),
				meta: {
					index: 0,
					title: "编辑下载"
				},
			}, {
				path: '/user/transcode',
				name: "user-transcode",
				component: () => import( /* webpackChunkName: "upload" */'./pages/user/trans-code.vue'),
				meta: {
					index: 0,
					title: "转码管理"
				},
			}, {
				path: '/user/notice',
				name: "user-notice",
				component: () => import( /* webpackChunkName: "upload" */'./pages/user/notice.vue'),
				meta: {
					index: 0,
					title: "我的消息"
				},
			}
		]
	},
	{
		path: '/manage',
		name: "manage",
		component: () => import( /* webpackChunkName: "upload" */'./pages/manage/index.vue'),
		meta: {
			index: 0,
			title: "后端首页"
		},
		children: [
			{
				path: '/manage/dashboard',
				name: "manage-dashboard",
				component: () => import( /* webpackChunkName: "upload" */'./pages/manage/dashboard.vue'),
				meta: {
					index: 0,
					title: "dashboard"
				},
			},
			{
				path: '/manage/custom',
				name: "manage-custom",
				component: () => import( /* webpackChunkName: "upload" */'./pages/manage/custom.vue'),
				meta: {
					index: 0,
					title: "用户管理"
				},
			},
			{
				path: '/manage/net',
				name: "manage-net",
				component: () => import( /* webpackChunkName: "upload" */'./pages/manage/set-net.vue'),
				meta: {
					index: 0,
					title: "外宣站点设置"
				},
			},
			{
				path: '/manage/site',
				name: "manage-site",
				component: () => import( /* webpackChunkName: "upload" */'./pages/manage/set-site.vue'),
				meta: {
					index: 0,
					title: "编辑下载站点设置"
				}
			},
			{
				path: '/manage/trans',
				name: "manage-trans",
				component: () => import( /* webpackChunkName: "upload" */'./pages/manage/trans-site.vue'),
				meta: {
					index: 0,
					title: "编辑下载站点设置"
				}
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
					title: "下载统计"
				},
			}
		]
	}
]

export default new Router({
	routes: routers
})

export const menus = routers;
