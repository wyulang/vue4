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
          <div class="flex ai-c">
            <div @click="$store.state.isUpload=true;" class="flex ai-c fc-fff hand ml10">
              <span class="iconfont iconshangchuan mr5"></span>
              <span>外宣推送</span>
            </div>
          </div>
          <div class="mr10 flex ai-c">
            <span class="iconfont iconiconfontmyfill fc-fff fs-22 mr5"></span>
            <el-dropdown class="outline" @command="handleCommand">
              <span class="fc-fff outline fs-18 hand">
                {{user.loginName}}<i class="iconfont iconpaixu- fs-12 ml5"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">密码修改</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="pp10 bc-bs flex-1 auto">
          <router-view></router-view>
        </div>
      </section>
    </section>
    <el-dialog title="修改密码" :center="true" width="400px" :append-to-body="true" :visible.sync="isModel">
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

    <upload :uploadType="0" v-show="isUpload"></upload>
    <upload :uploadType="2" v-show="isTrans"></upload>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import upload from "./uploads";
import api from "../../store/api.js";
export default {
  components:{
    upload
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
      user: this.storage('userinfo'),
      menu: [
        { title: "我的文件", path: "user-upload", icon: "iconwenjianjia", index: 0 },
        { title: "编辑下载", path: "user-file", icon: "iconic_edit", index: 1 },
        { title: '转码管理', path: 'user-transcode', icon: 'iconzhandian', index: 2 },
        { title: "退出登录", path: "clear", icon: "icontuichu2", index: 3 }
      ],
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
    }
  },
  computed: {
    ...mapState(["downloadFile",'isUpload','isTrans'])
  },
  mounted() {

  },
  methods: {
    handleCommand(val) {
      if (val == "1") {
        this.isModel = true;
        this.ruleForm = {};
        this.ruleForm.id = this.user.id;
      }
    },
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
