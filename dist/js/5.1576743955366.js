(window.webpackJsonp_name_library=window.webpackJsonp_name_library||[]).push([[5],{302:function(e,t,r){"use strict";r(71),r(74),r(75),r(182),r(42),r(178),r(70),r(180),r(181),r(30),r(72),r(73),r(123),r(308),r(124),r(187),r(183),r(185),r(125),r(310);var n=r(326),y=r.n(n),o=r(130),i=r(327),v=r.n(i);function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function m(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var f=function(){function t(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),y.a.interceptors.response.use(function(e){return e.data},function(e){return Promise.reject(e)}),m(l(e=function(e,t){return!t||"object"!==a(t)&&"function"!=typeof t?l(e):t}(this,c(t).call(this))),"errorMess","网络异常！请稍后重试"),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(t,o["a"]),function(e,t,r){t&&s(e.prototype,t),r&&s(e,r)}(t,[{key:"request",value:function(e,t,r,n,o,i,a){var s,c=this,l=4<arguments.length&&void 0!==o?o:"json",u=5<arguments.length?i:void 0,f=6<arguments.length?a:void 0;""!=u?("true"==u&&(u=!0),"false"==u&&(u=!1)):u=this.setWithCredentials();var p=this.getHeader(n),d=["get"].includes(r)?"params":"data";p["Content-Type"].includes("urlencoded")&&!["get"].includes(r)&&(t=v.a.stringify(t));var h=(m(s={url:e,method:r,headers:p},d,t),m(s,"responseType",l),m(s,"withCredentials",u),s);return f&&(h.onDownloadProgress=f),y.a.request(h).catch(function(e){c.getMessage(e,"catch")}).then(function(e){return c.getMessage(e,"then"),e})}},{key:"getHeader",value:function(e){var t=0<arguments.length&&void 0!==e?e:{},r={"Content-Type":this.contentType(t)};t.type&&delete t.type,"object"===a(t)&&Object.assign(r,t);var n=this.setToken();return Object.assign(r,n),r}},{key:"get",value:function(e,t,r){var n=2<arguments.length&&void 0!==r?r:{};return this.requestConfig(e,t,"get",n)}},{key:"post",value:function(e,t,r){var n=2<arguments.length&&void 0!==r?r:{};return this.requestConfig(e,t,"post",n)}},{key:"put",value:function(e,t,r){var n=2<arguments.length&&void 0!==r?r:{};return this.requestConfig(e,t,"PUT",n)}},{key:"delete",value:function(e,t,r){var n=2<arguments.length&&void 0!==r?r:{};return this.requestConfig(e,t,"delete",n)}},{key:"all",value:function(e){return y.a.all(e)}},{key:"requestConfig",value:function(t,e,r,n){var o=this,i=3<arguments.length&&void 0!==n?n:{},a=[this.getDomainApi().concat(t),"","","",!1],s=a[0],c=a[1],l=a[2],u=a[3],f=a[4];return Object.keys(i).forEach(function(e){"isUrl"==e?s=t:"header"==e?c=i[e]:"responseType"==e?l=i[e]:"env"==e?s=o.getDomainApi(i[e]).concat(t):"withCredentials"==e?u=i[e]:"Url"==e?s=i[e].concat(t):"download"==e&&(f=i[e])}),this.request(s,e,r,c,l,u,f)}},{key:"getDomainApi",value:function(){return""}},{key:"contentType",value:function(e){return"application/json"}},{key:"getMessage",value:function(){}},{key:"setWithCredentials",value:function(){return!1}},{key:"storage",value:function(e,t,r){if(!r){if(t)return localStorage.setItem(e,JSON.stringify(t));var n=localStorage.getItem(e)||"";return n&&JSON.parse(n)||""}localStorage.removeItem(e)}},{key:"session",value:function(e,t,r){if(!r){if(t)return sessionStorage.setItem(e,JSON.stringify(t));var n=sessionStorage.getItem(e)||"";return n&&JSON.parse(n)||""}sessionStorage.removeItem(e)}},{key:"setToken",value:function(){return{}}}]),t}(),p=r(129);function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function w(e,t){return(w=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function O(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var j=function(){function t(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),O(b(e=function(e,t){return!t||"object"!==d(t)&&"function"!=typeof t?b(e):t}(this,g(t).call(this))),"prod","http://".concat(window.location.host,"/")),O(b(e),"ftp",{me:"http://47.100.197.169:8080/",inte:"http://118.24.198.193:8080/",prod:e.prod}),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&w(e,t)}(t,f),function(e,t,r){t&&h(e.prototype,t),r&&h(e,r)}(t,[{key:"getEnvName",value:function(){var e="prod",t=window.location.href;return 0<t.indexOf("localhost")?e="me":0<t.indexOf("6006")?e="inte":0<t.indexOf("vue4.0")&&(e="inte"),e}},{key:"getDomainApi",value:function(){return this.env("ftp")}},{key:"setWithCredentials",value:function(){return!0}},{key:"setToken",value:function(){return this.storage("userinfo")?{token:this.storage("userinfo").token}:{}}},{key:"getMessage",value:function(e,t){"then"==t&&(e.code&&"4405"==e.code?(p.Message.error(e.message||this.errorMess),window.location.href="#/"):e.code&&"7001"==e.code&&(p.Message.error(e.message||this.errorMess),window.location.href="#/info"))}}]),t}();t.a=new j},303:function(e,t,r){"use strict";function s(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)void 0!==e[n]&&(r[n]=e[n]);return r}var c=Object.prototype.hasOwnProperty,u=Array.isArray,l=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}();e.exports={arrayToObject:s,assign:function(e,r){return Object.keys(r).reduce(function(e,t){return e[t]=r[t],e},e)},combine:function(e,t){return[].concat(e,t)},compact:function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var o=t[n],i=o.obj[o.prop],a=Object.keys(i),s=0;s<a.length;++s){var c=a[s],l=i[c];"object"==typeof l&&null!==l&&-1===r.indexOf(l)&&(t.push({obj:i,prop:c}),r.push(l))}return function(e){for(;1<e.length;){var t=e.pop(),r=t.obj[t.prop];if(u(r)){for(var n=[],o=0;o<r.length;++o)void 0!==r[o]&&n.push(r[o]);t.obj[t.prop]=n}}}(t),e},decode:function(e,t,r){var n=e.replace(/\+/g," ");if("iso-8859-1"===r)return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch(e){return n}},encode:function(e,t,r){if(0===e.length)return e;var n=e;if("symbol"==typeof e?n=Symbol.prototype.toString.call(e):"string"!=typeof e&&(n=String(e)),"iso-8859-1"===r)return escape(n).replace(/%u[0-9a-f]{4}/gi,function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"});for(var o="",i=0;i<n.length;++i){var a=n.charCodeAt(i);45===a||46===a||95===a||126===a||48<=a&&a<=57||65<=a&&a<=90||97<=a&&a<=122?o+=n.charAt(i):a<128?o+=l[a]:a<2048?o+=l[192|a>>6]+l[128|63&a]:a<55296||57344<=a?o+=l[224|a>>12]+l[128|a>>6&63]+l[128|63&a]:(i+=1,a=65536+((1023&a)<<10|1023&n.charCodeAt(i)),o+=l[240|a>>18]+l[128|a>>12&63]+l[128|a>>6&63]+l[128|63&a])}return o},isBuffer:function(e){return!(!e||"object"!=typeof e)&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},isRegExp:function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},merge:function n(o,i,a){if(!i)return o;if("object"!=typeof i){if(u(o))o.push(i);else{if(!o||"object"!=typeof o)return[o,i];(a&&(a.plainObjects||a.allowPrototypes)||!c.call(Object.prototype,i))&&(o[i]=!0)}return o}if(!o||"object"!=typeof o)return[o].concat(i);var e=o;return u(o)&&!u(i)&&(e=s(o,a)),u(o)&&u(i)?(i.forEach(function(e,t){if(c.call(o,t)){var r=o[t];r&&"object"==typeof r&&e&&"object"==typeof e?o[t]=n(r,e,a):o.push(e)}else o[t]=e}),o):Object.keys(i).reduce(function(e,t){var r=i[t];return c.call(e,t)?e[t]=n(e[t],r,a):e[t]=r,e},e)}}},308:function(e,t,r){"use strict";var n=r(1),o=r(309);n({target:"Array",proto:!0,forced:[].forEach!=o},{forEach:o})},309:function(e,t,r){"use strict";var n=r(69).forEach,o=r(179);e.exports=o("forEach")?function(e,t){return n(this,e,1<arguments.length?t:void 0)}:[].forEach},310:function(e,t,r){var n=r(3),o=r(188),i=r(309),a=r(11);for(var s in o){var c=n[s],l=c&&c.prototype;if(l&&l.forEach!==i)try{a(l,"forEach",i)}catch(e){l.forEach=i}}},311:function(e,t,r){"use strict";var n=String.prototype.replace,o=/%20/g,i=r(303),a={RFC1738:"RFC1738",RFC3986:"RFC3986"};e.exports=i.assign({default:a.RFC3986,formatters:{RFC1738:function(e){return n.call(e,o,"+")},RFC3986:function(e){return String(e)}}},a)},326:function(e,t,r){e.exports=r(31)(16)},327:function(e,t,r){"use strict";var n=r(328),o=r(329),i=r(311);e.exports={formats:i,parse:o,stringify:n}},328:function(e,t,r){"use strict";function b(e,t){n.apply(e,j(t)?t:[t])}function w(e,t,r,n,o,i,a,s,c,l,u,f,p){var d=e;if("function"==typeof a?d=a(t,d):d instanceof Date?d=l(d):"comma"===r&&j(d)&&(d=d.join(",")),null===d){if(n)return i&&!f?i(t,C.encoder,p,"key"):t;d=""}if(function(e){return"string"==typeof e||"number"==typeof e||"boolean"==typeof e||"symbol"==typeof e||"bigint"==typeof e}(d)||O.isBuffer(d))return i?[u(f?t:i(t,C.encoder,p,"key"))+"="+u(i(d,C.encoder,p,"value"))]:[u(t)+"="+u(String(d))];var h,y=[];if(void 0===d)return y;if(j(a))h=a;else{var v=Object.keys(d);h=s?v.sort(s):v}for(var m=0;m<h.length;++m){var g=h[m];o&&null===d[g]||(j(d)?b(y,w(d[g],"function"==typeof r?r(t,g):t,r,n,o,i,a,s,c,l,u,f,p)):b(y,w(d[g],t+(c?"."+g:"["+g+"]"),r,n,o,i,a,s,c,l,u,f,p)))}return y}var O=r(303),p=r(311),d=Object.prototype.hasOwnProperty,h={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},j=Array.isArray,n=Array.prototype.push,o=Date.prototype.toISOString,i=p.default,C={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:O.encode,encodeValuesOnly:!1,format:i,formatter:p.formatters[i],indices:!1,serializeDate:function(e){return o.call(e)},skipNulls:!1,strictNullHandling:!1};e.exports=function(e,t){var r,n=e,o=function(e){if(!e)return C;if(null!==e.encoder&&void 0!==e.encoder&&"function"!=typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||C.charset;if(void 0!==e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=p.default;if(void 0!==e.format){if(!d.call(p.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var n=p.formatters[r],o=C.filter;return"function"!=typeof e.filter&&!j(e.filter)||(o=e.filter),{addQueryPrefix:"boolean"==typeof e.addQueryPrefix?e.addQueryPrefix:C.addQueryPrefix,allowDots:void 0===e.allowDots?C.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"==typeof e.charsetSentinel?e.charsetSentinel:C.charsetSentinel,delimiter:void 0===e.delimiter?C.delimiter:e.delimiter,encode:"boolean"==typeof e.encode?e.encode:C.encode,encoder:"function"==typeof e.encoder?e.encoder:C.encoder,encodeValuesOnly:"boolean"==typeof e.encodeValuesOnly?e.encodeValuesOnly:C.encodeValuesOnly,filter:o,formatter:n,serializeDate:"function"==typeof e.serializeDate?e.serializeDate:C.serializeDate,skipNulls:"boolean"==typeof e.skipNulls?e.skipNulls:C.skipNulls,sort:"function"==typeof e.sort?e.sort:null,strictNullHandling:"boolean"==typeof e.strictNullHandling?e.strictNullHandling:C.strictNullHandling}}(t);"function"==typeof o.filter?n=(0,o.filter)("",n):j(o.filter)&&(r=o.filter);var i,a=[];if("object"!=typeof n||null===n)return"";i=t&&t.arrayFormat in h?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var s=h[i];r=r||Object.keys(n),o.sort&&r.sort(o.sort);for(var c=0;c<r.length;++c){var l=r[c];o.skipNulls&&null===n[l]||b(a,w(n[l],l,s,o.strictNullHandling,o.skipNulls,o.encode?o.encoder:null,o.filter,o.sort,o.allowDots,o.serializeDate,o.formatter,o.encodeValuesOnly,o.charset))}var u=a.join(o.delimiter),f=!0===o.addQueryPrefix?"?":"";return o.charsetSentinel&&("iso-8859-1"===o.charset?f+="utf8=%26%2310003%3B&":f+="utf8=%E2%9C%93&"),0<u.length?f+u:""}},329:function(e,t,r){"use strict";function l(e,t){var r,n={},o=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,i=t.parameterLimit===1/0?void 0:t.parameterLimit,a=o.split(t.delimiter,i),s=-1,c=t.charset;if(t.charsetSentinel)for(r=0;r<a.length;++r)0===a[r].indexOf("utf8=")&&("utf8=%E2%9C%93"===a[r]?c="utf-8":"utf8=%26%2310003%3B"===a[r]&&(c="iso-8859-1"),s=r,r=a.length);for(r=0;r<a.length;++r)if(r!==s){var l,u,f=a[r],p=f.indexOf("]="),d=-1===p?f.indexOf("="):p+1;(u=-1===d?(l=t.decoder(f,v.decoder,c,"key"),t.strictNullHandling?null:""):(l=t.decoder(f.slice(0,d),v.decoder,c,"key"),t.decoder(f.slice(d+1),v.decoder,c,"value")))&&t.interpretNumericEntities&&"iso-8859-1"===c&&(u=u.replace(/&#(\d+);/g,function(e,t){return String.fromCharCode(parseInt(t,10))})),u&&t.comma&&-1<u.indexOf(",")&&(u=u.split(",")),y.call(n,l)?n[l]=h.combine(n[l],u):n[l]=u}return n}function u(e,t,r){if(e){var n=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,o=/(\[[^[\]]*])/g,i=0<r.depth&&/(\[[^[\]]*])/.exec(n),a=i?n.slice(0,i.index):n,s=[];if(a){if(!r.plainObjects&&y.call(Object.prototype,a)&&!r.allowPrototypes)return;s.push(a)}for(var c=0;0<r.depth&&null!==(i=o.exec(n))&&c<r.depth;){if(c+=1,!r.plainObjects&&y.call(Object.prototype,i[1].slice(1,-1))&&!r.allowPrototypes)return;s.push(i[1])}return i&&s.push("["+n.slice(i.index)+"]"),function(e,t,r){for(var n=t,o=e.length-1;0<=o;--o){var i,a=e[o];if("[]"===a&&r.parseArrays)i=[].concat(n);else{i=r.plainObjects?Object.create(null):{};var s="["===a.charAt(0)&&"]"===a.charAt(a.length-1)?a.slice(1,-1):a,c=parseInt(s,10);r.parseArrays||""!==s?!isNaN(c)&&a!==s&&String(c)===s&&0<=c&&r.parseArrays&&c<=r.arrayLimit?(i=[])[c]=n:i[s]=n:i={0:n}}n=i}return n}(s,t,r)}}var h=r(303),y=Object.prototype.hasOwnProperty,v={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:h.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1};e.exports=function(e,t){var r=function(e){if(!e)return v;if(null!==e.decoder&&void 0!==e.decoder&&"function"!=typeof e.decoder)throw new TypeError("Decoder has to be a function.");if(void 0!==e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new Error("The charset option must be either utf-8, iso-8859-1, or undefined");var t=void 0===e.charset?v.charset:e.charset;return{allowDots:void 0===e.allowDots?v.allowDots:!!e.allowDots,allowPrototypes:"boolean"==typeof e.allowPrototypes?e.allowPrototypes:v.allowPrototypes,arrayLimit:"number"==typeof e.arrayLimit?e.arrayLimit:v.arrayLimit,charset:t,charsetSentinel:"boolean"==typeof e.charsetSentinel?e.charsetSentinel:v.charsetSentinel,comma:"boolean"==typeof e.comma?e.comma:v.comma,decoder:"function"==typeof e.decoder?e.decoder:v.decoder,delimiter:"string"==typeof e.delimiter||h.isRegExp(e.delimiter)?e.delimiter:v.delimiter,depth:"number"==typeof e.depth||!1===e.depth?+e.depth:v.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"==typeof e.interpretNumericEntities?e.interpretNumericEntities:v.interpretNumericEntities,parameterLimit:"number"==typeof e.parameterLimit?e.parameterLimit:v.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"==typeof e.plainObjects?e.plainObjects:v.plainObjects,strictNullHandling:"boolean"==typeof e.strictNullHandling?e.strictNullHandling:v.strictNullHandling}}(t);if(""===e||null==e)return r.plainObjects?Object.create(null):{};for(var n="string"==typeof e?l(e,r):e,o=r.plainObjects?Object.create(null):{},i=Object.keys(n),a=0;a<i.length;++a){var s=i[a],c=u(s,n[s],r);o=h.merge(o,c,r)}return h.compact(o)}},349:function(e,t,r){"use strict";var l=r(15),u=r(126),f=r(14);e.exports=function(e,t,r){for(var n=l(this),o=f(n.length),i=arguments.length,a=u(1<i?t:void 0,o),s=2<i?r:void 0,c=void 0===s?o:u(s,o);a<c;)n[a++]=e;return n}},387:function(e,t,r){var n=r(1),o=r(349),i=r(83);n({target:"Array",proto:!0},{fill:o}),i("fill")},390:function(e,t,r){},560:function(e,t,r){"use strict";var n=r(390);r.n(n).a},879:function(e,t,r){"use strict";r.r(t);function n(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"w-all h-all hidden fc-1d7eb8 fs-18 rel"},[r("canvas",{attrs:{id:"stars"}}),r("div",{staticClass:"abs at0 ab0 al0 ar0"},[r("div",{staticClass:"w-all h-all flex ai-c jc-c"},[r("div",{staticClass:"flex-line fd-c"},[t._m(0),r("div",{staticClass:"flex ai-c mb20"},[r("span",{staticClass:"w-200"},[t._v("服务器IP地址：")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.data.ipAddress,expression:"data.ipAddress"}],staticClass:"canvass",attrs:{type:"text",readonly:""},domProps:{value:t.data.ipAddress},on:{input:function(e){e.target.composing||t.$set(t.data,"ipAddress",e.target.value)}}})]),r("div",{staticClass:"flex ai-c mb20"},[r("span",{staticClass:"w-200"},[t._v("服务器MAC地址：")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.data.macAddress,expression:"data.macAddress"}],staticClass:"canvass",attrs:{type:"text",readonly:""},domProps:{value:t.data.macAddress},on:{input:function(e){e.target.composing||t.$set(t.data,"macAddress",e.target.value)}}})]),r("div",{staticClass:"flex ai-c mb20"},[r("span",{staticClass:"w-200"},[t._v("服务器CPU序列号：")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.data.cpuSerial,expression:"data.cpuSerial"}],staticClass:"canvass",attrs:{type:"text",readonly:""},domProps:{value:t.data.cpuSerial},on:{input:function(e){e.target.composing||t.$set(t.data,"cpuSerial",e.target.value)}}})]),r("div",{staticClass:"flex ai-c mb20"},[r("span",{staticClass:"w-200"},[t._v("服务器主板序列号：")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.data.mainBoardSerial,expression:"data.mainBoardSerial"}],staticClass:"canvass",attrs:{type:"text",readonly:""},domProps:{value:t.data.mainBoardSerial},on:{input:function(e){e.target.composing||t.$set(t.data,"mainBoardSerial",e.target.value)}}})]),r("div",{staticClass:"flex jc-s"},[r("div",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:JSON.stringify(t.data),expression:"JSON.stringify(data)",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:t.onErr,expression:"onErr",arg:"error"}],staticClass:"fc-1d7eb8 hand w-150 center btnReturn mr20"},[t._v("复制")]),r("div",{staticClass:"fc-1d7eb8 hand w-150 center btnReturn",on:{click:function(e){return t.$router.push("/")}}},[t._v("返回登录>>")])])])])])])}n._withStripped=!0;r(387);var o=r(302),i={data:function(){return{data:{ipAddress:"",macAddress:"",cpuSerial:"",mainBoardSerial:""}}},methods:{initData:function(){var t=this;o.a.get("sys/getServerInfos").then(function(e){2e3==e.code&&(t.data=e.data)})},onCopy:function(){this.$message.success("内容已复制到剪切板！")},onErr:function(){this.$message.error("抱歉，复制失败！")}},mounted:function(){var e=document.getElementById("stars"),n=e.getContext("2d"),o=e.width=window.innerWidth,i=e.height=window.innerHeight,a=217,s=[],t=0,c=document.createElement("canvas"),r=c.getContext("2d");c.width=100,c.height=100;var l=c.width/2,u=r.createRadialGradient(l,l,0,l,l,l);function f(e,t){if(arguments.length<2&&(t=e,e=0),t<e){var r=t;t=e,e=r}return Math.floor(Math.random()*(t-e+1))+e}u.addColorStop(.025,"#CCC"),u.addColorStop(.1,"hsl("+a+", 61%, 33%)"),u.addColorStop(.25,"hsl("+a+", 64%, 6%)"),u.addColorStop(1,"transparent"),r.fillStyle=u,r.beginPath(),r.arc(l,l,l,0,2*Math.PI),r.fill();function p(){this.orbitRadius=f(function(e,t){var r=Math.max(e,t);return Math.round(Math.sqrt(r*r+r*r))/2}(o,i)),this.radius=f(60,this.orbitRadius)/8,this.orbitX=o/2,this.orbitY=i/2,this.timePassed=f(0,1300),this.speed=f(this.orbitRadius)/5e4,this.alpha=f(2,10)/10,s[++t]=this}p.prototype.draw=function(){var e=Math.sin(this.timePassed)*this.orbitRadius+this.orbitX,t=Math.cos(this.timePassed)*this.orbitRadius+this.orbitY,r=f(10);1===r&&0<this.alpha?this.alpha-=.05:2===r&&this.alpha<1&&(this.alpha+=.05),n.globalAlpha=this.alpha,n.drawImage(c,e-this.radius/2,t-this.radius/2,this.radius,this.radius),this.timePassed+=this.speed};for(var d=0;d<1300;d++)new p;!function e(){n.globalCompositeOperation="source-over",n.globalAlpha=.5,n.fillStyle="hsla("+a+", 64%, 6%, 2)",n.fillRect(0,0,o,i),n.globalCompositeOperation="lighter";for(var t=1,r=s.length;t<r;t++)s[t].draw();window.requestAnimationFrame(e)}()},created:function(){this.initData()}},a=(r(560),r(122)),s=Object(a.a)(i,n,[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"flex ai-c mb20"},[t("span",{staticClass:"font-96d2fd"},[this._v("您的证书无效，请核查服务器是否取得授权或联系管理员处理！")])])}],!1,null,"7e4c7832",null);s.options.__file="src/pages/info.vue";t.default=s.exports}}]);