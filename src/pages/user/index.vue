<template>
  <div class="h-all w-all auto">
    <div class="w-all hi-all flex">
      <div class="w-200 wi-200 menu-bgs sha-right">
        <div class="w-all bg-bc fc-fff pt10 pb20">
          <div class="pb13 centent fc-a0cfff flex ai-c jc-c fs-16">
            <span class="iconfont fs-20 iconiconfontmyfill mr6"></span>
            <a @click="modifyPassword()">
              <span>{{this.storage("userinfo").username}}</span>
            </a>
          </div>
          <div @click="toUrl('index')" class="flex fd-c pt20 menu-lines ai-c jc-c hand">
            <span class="iconfont fs-50 iconzhuye1"></span>
            <span>首页</span>
          </div>
          <div @click="toUrl('upload')" class="flex fd-c ai-c jc-c mt20 hand">
            <span class="iconfont fs-35 iconshangchuan"></span>
            <span>外宣推送</span>
          </div>
          <div v-if="user.role==1" @click="toUrl('file')" class="flex fd-c ai-c jc-c mt20 hand">
            <span class="iconfont fs-38 iconwenjian"></span>
            <span>编辑下载</span>
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
    <el-dialog title="修改密码" :center="true" width="400px" :append-to-body="true" :visible.sync="isModel">
      <!--<div class="w-all">
        <div class="flex ai-c mb10">
          <span class="w-90" prop="pass">原密码</span>
          <el-input v-model="ruleForm.pass" placeholder="请输入原密码" type="password"></el-input>
        </div>
        <div class="flex ai-c mb10">
          <span class="w-90" prop="newpass">新密码</span>
          <el-input v-model="ruleForm.newpass" placeholder="请输入新密码" type="password"></el-input>
        </div>
        <div class="flex ai-c mb10">
          <span class="w-90" prop="checknewpass">重复新密码</span>
          <el-input v-model="ruleForm.checknewpass" placeholder="请再次输入新密码" type="password"></el-input>
        </div>
        <span slot="footer" class="w-all flex jc-e">
          <el-button @click="isModel = false">取 消</el-button>
          <el-button type="primary" @click="modifyBtn">确 定</el-button>
        </span>
      </div>-->
      <el-form :inline="true" :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px" size="medium">
        <el-row class="text-center">
          <el-col :span="24">
            <el-form-item label="旧密码" prop="oldPsd">
              <el-input type="password" v-model="ruleForm.oldPsd" placeholder="请输入旧密码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="新密码" prop="newPsd">
              <el-input type="password" v-model="ruleForm.newPsd" placeholder="请输入新密码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="确认新密码" prop="checkNewPsd">
              <el-input type="password" v-model="ruleForm.checkNewPsd" placeholder="请再次输入新密码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" :offset="15">
            <el-form-item size="small" class="el-icon--left">
              <el-button @click="isModel = false">取消</el-button>
              <el-button type="primary" @click="modifyBtn">确定修改</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <div :class="{'w-400':isFile,'':!isFile}" v-if="downloadFile.length>1" class=" fixed ab0 zi-100 ar0 sha-all bc-fff pp10">
      <div @click="isFile=!isFile" class="abs zi-120 hand at-11 al-11">
        <span :class="{'iconicon-error':isFile,'iconshouzhankaiqi':!isFile}" class="iconfont fs-17 fc-999"></span>
      </div>
      <div v-if="!isFile">
        <span class="iconfont fs-25 fc-999 iconxiazai"></span>
      </div>
      <div v-if="isFile" style="max-height: 150px" class="w-all auto">
        <div v-show="item.uid!='111'" v-for="(item, index) in downloadFile" :key="index" class="w-all bb-e mt3 pt3 flex fd-c">
          <div class="fs-13 flex ai-c">
            <span class="iconfont iconLC_icon_download_fill fs-12"></span>
            <span class="ml10">{{item.fileName}}</span>
          </div>
          <el-progress class="w-all flex ai-c" :percentage="item.pross"></el-progress>
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
