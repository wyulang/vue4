<template>
  <div class="flex bc-base ai-c jc-c h-all">
    <div class="w-300 bc-bb bc-fff ra-4 h-200">
      <div class="bg-fc centent fs-18 mt12">用户登录</div>
      <div class="mt20 flex pl20 pr20">
        <input
          class="w-all pt5 pb5 pl5 pr5 bb"
          v-model="user.username"
          placeholder="请输入用户名"
          type="text"
        />
      </div>
      <div class="mt20 flex pl20 pr20">
        <input
          class="w-all pt5 pb5 pl5 pr5 bb"
          v-model="user.password"
          placeholder="请输入密码"
          type="password"
        />
      </div>
      <div class="flex ai-c jc-c mt20">
        <button @click="goindex" class="w-150 bg-bc h-30">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import api from "../store/api.js";
export default {
  data() {
    return {
      message: "欢迎登录",
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions([""]),
    goindex() {
      if (this.user.username.length < 2) {
        this.$message.error("请输入用户名");
        return;
      }
      if (this.user.password.length < 5) {
        this.$message.error("请输入密码");
        return;
      }
      api.post("upload-admin/sys/login", this.user).then(res => {
        if (res.code == 2000) {
          this.storage("userinfo", res.data);
          if (res.data.role == 0) {
            this.$router.push({ name: "manage-custom" });
          } else {
            this.$router.push({ name: "user-upload" });
          }
        } else {
          this.$message.error("用户名或密码错误");
        }
      });
    }
  },
  created() {},
  mounted() {
    this.$nextTick(res => {
      document.onkeydown = e => {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
          this.goindex();
        }
      };
    });
  }
};
</script>
<style lang="less" scoped>
.bc-base {
  background: linear-gradient(180deg, #00b38a, #ffffff, #ffffff);
}
.bc-bb {
  border: 1px solid #eee;
}
</style>
