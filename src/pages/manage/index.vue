<template>
  <div class="flex ai-c jc-c h-all w-all relative manages">
    <canvas style="z-index:1" class="w-all h-all relative" id="starts">该浏览器不支持canvas</canvas>
    <div class="login-body">
      <div class="contents">
        <div class="content-body">
          <section class="lefts">
            <div class="titles flex ai-c">
              <span class="iconfont iconiconfontmyfill fs-21 mr10"></span>
              {{storage('userinfo').loginName}}
            </div>
            <div class="navs">
              <div
                :class="{'active':navActive==item.index}"
                v-for="(item, index) in menu"
                :key="index"
                @click="toMenu(item)"
                class="navs-item"
              >
                <i :class="item.icon" class="icon iconfont"></i>
                <span class="w-100 ml10">{{item.name}}</span>
              </div>
            </div>
          </section>
          <section class="rights flex fd-c">
            <router-view></router-view>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import api from "../../store/api.js";
// import canvas from '../../assets/coaves.js';
export default {
  data() {
    return {
      message: "欢迎登录",
      navType: 0,
      navActive: 0,
      menu: [
        {
          name: "用户管理",
          path: "manage-custom",
          icon: "icon-user6",
          index: 0
        },
        {
          name: "外宣站点设置",
          path: "manage-net",
          icon: "icon-icon_setting",
          index: 1
        },
          { name: '编辑下载站点设置', path: 'manage-site', icon: 'icon-user6', index: 2 },
          { name: '下载统计', path: 'manage-download', icon: 'icon-user6', index: 4 },

        // { name: '字典数据', path: 'manage-diction', icon: 'icon-dingdan', index: 4 },
          { name: "退出登录", path: "clear", icon: "icon-tuichu2", index: 5 }
      ]
    };
  },
  methods: {
    goindex() {
      this.$router.push({ name: "index" });
    },
    toMenu(item) {
      if (item.path == "clear") {
        api.get("sys/logout", {}).then(res => {
          if (res.code == 2000) {
            localStorage.clear();
            this.$router.push({ name: "login" });
          }
        });
        return;
      }
      this.navActive = item.index;
      this.$router.push({ name: item.path });
    }
  },
  created() {
    if (!this.storage("userinfo")) {
      this.$router.push({ name: "login" });
    }
    // this.navActive=this.menu.filter(v=>{return v.path==this.$route.name})[0].index;
  },
  mounted() {
    // canvas("starts", 230, 1000, 60, 2, 50000, 0.5);
  }
};
</script>
<style lang="less">
.manages {
  .login-body {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 22;
    .contents {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      padding: 0;
      .content-body {
        width: 100%;
        min-width: 950px;
        background-color: #fff;
        opacity: 0.95;
        display: flex;
        .navs {
          display: flex;
          flex-direction: column;
          align-items: center;
          .navs-item {
            display: flex;
            background-color: #62676c;
            color: #fff;
            cursor: pointer;
            width: 100%;
            align-items: center;
            padding: 15px 0;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #6d6d6d;
            &.active {
              color: #fff;
              background-color: #67c23a;
            }
            &:hover {
              background-color: #3a8ee6;
              border-bottom: 1px solid #3a8ee6;
            }
          }
        }
        .lefts {
          background-color: #909399;
          width: 170px;
        }
        .rights {
          flex: 1;
          .btn-upload {
            .btn-item {
              margin-left: 10px;
              padding: 2px 10px;
              cursor: pointer;
              i {
                font-weight: bold;
                font-size: 15px;
              }
              &.active {
                color: #67c23a;
              }
            }
          }
          .btn-change {
            div {
              padding: 3px 5px;
            }
          }
        }
        .titles {
          background-color: #3e3f43;
          color: #fff;
          line-height: 45px;
          padding-left: 20px;
          font-size: 16px;
        }
        .inpust {
          background-color: transparent;
          input {
            background-color: transparent;
            color: #fff;
            width: 100%;
            border: 1px solid #3872f6;
            border-radius: 3px;
            line-height: 40px;
            padding: 2px 5px 2px 30px;
            background: none;
          }
        }
      }
    }
  }
}
</style>
