(window.webpackJsonp_name_library=window.webpackJsonp_name_library||[]).push([[7],{265:function(s,t,n){},343:function(s,t,n){"use strict";var i=n(265);n.n(i).a},361:function(s,t,n){"use strict";n.r(t);function i(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"h-all w-all auto"},[n("div",{staticClass:"w-all hi-all flex"},[n("div",{staticClass:"w-200 menu-bgs sha-right"},[n("div",{staticClass:"w-all bg-bc fc-a0cfff pt10 pb20"},[n("div",{staticClass:"pb13 centent fc-a0cfff flex ai-c jc-c fs-16"},[n("span",{staticClass:"iconfont fs-20 iconiconfontmyfill mr6"}),n("span",[t._v(t._s(this.storage("userinfo").username))])]),n("div",{staticClass:"flex fd-c pt20 menu-lines ai-c jc-c hand",on:{click:function(s){return t.toUrl("index")}}},[n("span",{staticClass:"iconfont fs-50 iconzhuye1"}),n("span",[t._v("首页")])]),n("div",{staticClass:"flex fd-c ai-c jc-c mt20 hand",on:{click:function(s){return t.toUrl("upload")}}},[n("span",{staticClass:"iconfont fs-35 iconshangchuan"}),n("span",[t._v("文件上传")])]),1==t.user.role?n("div",{staticClass:"flex fd-c ai-c jc-c mt20 hand",on:{click:function(s){return t.toUrl("file")}}},[n("span",{staticClass:"iconfont fs-38 iconwenjian"}),n("span",[t._v("我的文件")])]):t._e(),n("div",{staticClass:"flex fd-c ai-c jc-c mt30 hand",on:{click:function(s){return t.loginout()}}},[n("i",{staticClass:"iconfont fs-35 icontuichu"}),n("span",[t._v("退出登录")])])])]),n("div",{staticClass:"flex-1 pl20 pr20"},[n("router-view")],1)])])}i._withStripped=!0;var a={data:function(){return{user:this.storage("userinfo")}},methods:{toUrl:function(s){"index"==s?this.$router.push({name:"user-upload"}):"upload"==s?(this.$router.push({name:"user-upload"}),this.$store.commit("setUpload",!0)):"file"==s&&this.$router.push({name:"user-file"})},loginout:function(){localStorage.clear(),this.$router.push({name:"login"})}}},c=(n(343),n(80)),e=Object(c.a)(a,i,[],!1,null,null,null);e.options.__file="src/pages/user/index.vue";t.default=e.exports}}]);