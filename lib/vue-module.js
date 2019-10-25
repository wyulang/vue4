import Vue from 'vue';
import { formatDate, dateAdd } from 'lib/dateformat.js';
Vue.directive('numberInt', {
	bind: function (el, binding, vnode) {
		const element = el.getElementsByTagName('input')[0]
		const len = binding.arg  // 初始化设置 
		element.value = Number(element.value).toFixed(len)  // 失焦时候格式化
		element.addEventListener('keyup', function () {
			vnode.data.model.callback(element.value.replace(/[^\d\.]/g, ''))
		});
		element.addEventListener('blur', function () {
			let val = element.value && element.value.replace(/[^\d\.]/g, '');
			val = Number(val).toFixed(len);
			vnode.data.model.callback(val)
		})
	}
})

Vue.filter('date', function (value, format = 'YYYY-MM-DD') {
	return formatDate(value, format);
})


