'use strict';

import baseApi from "lib/webapi.js";
import { Message } from 'element-ui';

class webapi extends baseApi {
  constructor() {
    super();
  }
  getEnvName() {
    let env = 'prod';
    let url = window.location.href;
    if (url.indexOf('localhost') > 0) {
      env = "me"
    } else if (url.indexOf('172') > 0) {
      env = "inte"
    } else if (url.indexOf('index.html#') > 0) {
      env = "inte"
    }
    return env;
  }

  prod = `http://${window.location.host}`;

  // ftp = {
  //   // me: 'http://localhost:8080/',
  //   me: 'http://172.18.0.11:8018/',
  //   inte: 'http://172.18.0.11:8018/',
  //   prod: prod,
  // };
  ftp = {
    // me: 'http://localhost:8080/',
    me: 'http://118.24.198.193:8080/',
    inte: 'http://118.24.198.193:8080/',
    prod: this.prod,
  };

  getDomainApi(type) {
    return this.env('ftp')
  }

  //请求体BUG提示
  getMessage(err, type) {
    if (type == 'then') {
      // Message.error(err.msg || this.errorMess);
    } else if (type == 'catch') {
      // Message.error(err.msg || this.errorMess);
    }
  }
}

export default new webapi();
