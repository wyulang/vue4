<template>
  <div id="container" class="w-all hidden h-all">
    <div class="rel zi-100" id="output"></div>
    <div class="abs at0 ab0 al0 ar0 zi-120">
      <div class="h-all w-all ai-c jc-c flex">
        <div class="w-300 bc-bb jc-c ai-c flex fd-c ra-4 h-200">
          <span class="fs-18 fc-fff mb15">用户登录</span>
          <input v-model="user.username" AUTOCOMPLETE="off" placeholder="请输入用户名" class="inputs h-38" type="text" />
          <input v-model="user.password" AUTOCOMPLETE="off" placeholder="请输入密码" class="inputs h-38" type="password" />
          <button @click="goindex" class="buttons h-36">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import api from "../store/api.js";
import canvas from "lib/vector.js";
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
      const loading = this.$loading({
        lock: true,
        text: "loading...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      api.post("sys/login", this.user).then(res => {
        loading.close();
        if (res.code == 2000) {
          this.storage("userinfo", res.data);
          if (res.data.role == 0) {
            this.$router.push({ name: "manage-custom" });
          } else {
            this.$router.push({ name: "user-upload" });
          }
        } else if (res.code == 7001) {
          // this.$router.push({ name: "Info" });
        }else {
          this.$message.error("用户名或密码错误");
        }
      });
    }
  },
  created() {},
  mounted() {
    this.$nextTick(res => {
      canvas("container", "output");
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
.inputs {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.4);
  width: 200px;
  border-radius: 3px;
  padding: 8px 15px;
  margin: 0 auto 10px;
  display: block;
  text-align: center;
  font-size: 13px;
  -webkit-transition-duration: 0.25s;
  transition-duration: 0.25s;
  font-weight: 300;
  &:hover {
    // background-color: rgba(255, 255, 255, 0.4);
  }
  &:focus {
    background-color: #fff;
    // width: 230px;
    color: #333;
  }
}

.buttons {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;
  background-color: rgba(255, 255, 255, 0.8);
  border: 0;
  padding: 10px 15px;
  color: #333;
  border-radius: 3px;
  width: 180px;
  cursor: pointer;
  font-family: microsoft yahei, Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  -webkit-transition-duration: 0.25s;
  transition-duration: 0.25s;
  &:hover {
    background-color: #fff;
  }
}
</style>
