<template>
  <div class="h-all w-all auto">
    <div class="w-all hi-all flex">
      <div class="w-200 wi-200 menu-bgs sha-right">
        <div class="w-all bg-bc fc-fff pt10 pb20">
          <div class="pb13 centent fc-a0cfff flex ai-c jc-c fs-16">
            <span class="iconfont fs-20 iconiconfontmyfill mr6"></span>
            <span>{{this.storage("userinfo").username}}</span>
          </div>
          <div @click="toUrl('index')" class="flex fd-c pt20 menu-lines ai-c jc-c hand">
            <span class="iconfont fs-50 iconzhuye1"></span>
            <span>首页</span>
          </div>
          <div @click="toUrl('upload')" class="flex fd-c ai-c jc-c mt20 hand">
            <span class="iconfont fs-35 iconshangchuan"></span>
            <span>文件上传</span>
          </div>
          <div v-if="user.role==1" @click="toUrl('file')" class="flex fd-c ai-c jc-c mt20 hand">
            <span class="iconfont fs-38 iconwenjian"></span>
            <span>我的文件</span>
          </div>
          <div @click="loginout()" class="flex fd-c ai-c jc-c mt30 hand">
            <i class="iconfont fs-35 icontuichu"></i>
            <span>退出登录</span>
          </div>
        </div>
      </div>
      <div class="flex-1 pl20 pr20">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../store/api.js";
export default {
  data() {
    return {
      user: this.storage("userinfo")
    };
  },
  methods: {
    toUrl(type) {
      if (type == "index") {
        this.$router.push({ name: "user-upload" });
      } else if (type == "upload") {
        this.$router.push({ name: "user-upload" });
        this.$store.commit("setUpload", true);
      } else if (type == "file") {
        this.$router.push({ name: "user-file" });
      }
    },
    loginout() {
      api.get("sys/logout", {}).then(res => {
        if (res.code == 2000) {
          localStorage.clear();
          this.$router.push({ name: "login" });
        }
      });
    }
  }
};
</script>

<style lang="less">
.menu-bgs {
  background-color: #a0cfff;
}
.menu-lines {
  border-top: 1px solid #3a8fcc;
}
.uploads {
  padding: 10px;
  box-sizing: border-box;
  height: 100%;
  position: relative;
  .body-flies {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
  }
  .uploader-btn:hover {
    background-color: transparent !important;
  }
  .filebox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
  }
  .filelist {
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    .item-list {
      border: 1px solid #f1f1f1;
      padding: 10px;
      display: flex;
      flex-direction: column;
      flex: 1;
      width: 15%;
      max-width: 15%;
      min-width: 15%;
      margin-right: 16px;
      margin-bottom: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
