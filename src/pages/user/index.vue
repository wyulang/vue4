<template>
  <div class="h-all w-all auto">
   <div class="flex w-all pb10 fs-12">
      <div v-for="(item, index) in dianList" :key="index" class="flex sha-6 mr10 fd-c">
        <div class="pt10 centent fs-16">{{item.customerName}}</div>
        <div class="flex pt10 pl10 pr10 pb10">
          <div class="flex ai-c jc-c fd-c mr10">
            <span>今日上传</span>
            <span>
              <i class="fb fs-20">{{item.uploadCountToday}}</i> 条
            </span>
          </div>
          <div class="flex ai-c jc-c mr10 fd-c">
            <span>近30日上传</span>
            <span>
              <i class="fb fs-20">{{item.uploadCountMonth}}</i>条
            </span>
          </div>
          <div class="flex ai-c jc-c fd-c">
            <span>年度上传</span>
            <span>
              <i class="fb fs-20">{{item.uploadCountYear}}</i>条
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../store/api.js";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["downloadFile"])
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPsd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      user: this.storage("userinfo"),
      isModel: false,
      isFile: true,
      rules: {
        oldPsd: [{ required: true, message: "请输入密码" }],
        newPsd: [{ required: true, message: "请输入新密码" }],
        checkNewPsd: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      ruleForm: {}
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
      }else if (type == "transcode") {
          this.$router.push({ name: "user-transcode" });
      }
    },
    loginout() {
      api.get("sys/logout", {}).then(res => {
        if (res.code == 2000) {
          localStorage.clear();
          this.$router.push({ name: "login" });
        }
      });
    },
    modifyPassword() {
      this.isModel = true;
      this.ruleForm = {};
      this.ruleForm.id = this.user.id;
    },
    modifyBtn() {
      if (this.ruleForm.newPsd.length < 5) {
        this.$message.error("密码至少为六位!");
        return;
      }
      if (this.ruleForm.newPsd == this.ruleForm.oldPsd) {
        this.$message.error("新密码不能与原密码一样!");
        return;
      }
      if (this.ruleForm.newPsd != this.ruleForm.checkNewPsd) {
        this.$message.error("两次输入密码不一致!");
        return;
      }
      api.post("sys/modifyPassword", this.ruleForm).then(res => {
        if (res.code == 2000) {
          this.$message.success("修改密码成功");
          this.isModel = false;
          // this.initData();
        } else {
          this.$message.error(res.message);
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
