<template>
  <div class='w-all wi-1000 ff h-all'>
    <section class="w-all h-all flex">
      <section class="w-220 bc-bs1 hi-100">
        <div class="h-45 bc-bs11 flex fc-fff ai-c jc-s">
          <span class="iconfont fs-20 mr10 fc-fff pl20 iconwenjianguanli"></span><span class="fs-14">传媒之窗</span>
        </div>
        <div class="mt5">
          <el-menu @select="menuSelect" class="br-0 menu-config">
            <transition v-for="(item, index) in menu" :key="index">
              <el-submenu class="menu-config-title" v-if="item.children" :index="item.path">
                <div slot="title">
                  <i :class="item.icon" class="iconfont mr12"></i>
                  <span class="title" slot="title">{{item.title}}</span>
                </div>
                <el-menu-item-group>
                  <el-menu-item class="menu-config-item" v-for="(child, index) in item.children" :key="index" :index="child.path">
                    <i :class="child.icon" class="iconfont mr6"></i><span>{{child.title}}</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item class="menu-config-title" :index="item.path">
                <i :class="item.icon" class="iconfont mr12"></i>
                <span slot="title">{{item.title}}</span>
              </el-menu-item>
            </transition>
          </el-menu>
        </div>
      </section>
      <section class="flex-1 h-all fd-c flex">
        <div class="h-45 bc-bs10 flex ai-c jc-b">
          <span></span>
          <div class="mr10 flex ai-c">
            <el-avatar size="small" icon="el-icon-user-solid"></el-avatar>
            <span class="fc-fff fs-16 ml10">{{user.loginName}}</span>
          </div>
        </div>
        <div class="pp10 bc-bs flex-1 auto">
          <router-view></router-view>
        </div>
      </section>
    </section>
  </div>

</template>

<script>
import { mapActions } from "vuex";
import api from "../../store/api.js";
export default {
  data() {
    return {
      user: this.storage('userinfo'),
      menu: [
        { title: "用户管理", path: "manage-custom", icon: "iconyonghu2", index: 0 },
        { title: "外宣站点设置", path: "manage-net", icon: "iconqiu", index: 1 },
        { title: '编辑下载站点设置', path: 'manage-site', icon: 'iconzhandian', index: 2 },
        { title: '转码站点设置', path: 'manage-trans', icon: 'iconzhuanmaguanli', index: 3 },
        { title: '下载统计', path: 'manage-download', icon: 'iconLC_icon_download_fill', index: 4 },
        // { title: '字典数据', path: 'manage-diction', icon: 'icon-dingdan', index: 4 },
        { title: "退出登录", path: "clear", icon: "icontuichu2", index: 5 }
      ]
    }
  },
  mounted() {

  },
  methods: {
    menuSelect(value) {
      if (value == "clear") {
        api.get("sys/logout", {}).then(res => {
          if (res.code == 2000) {
            localStorage.clear();
            this.$router.push({ name: "login" });
          }
        });
        return;
      }
      this.$router.push({ name: value });
    }
  },
  created() {
    if (!this.storage("userinfo")) {
      this.$router.push({ name: "login" });
    }
  }
}
</script>

<style lang='less'>
</style>
