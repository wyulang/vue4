<template>
  <div class="flex fd-c h-all w-all">
    <div class="h-45 bb flex">
      <div class="flex-1 flex ai-e btn-upload pb6">
        <div @click="isModel=true;user.id=0" class="h-30 lh-25 bc-f5 btn-item "><i class=" iconfont icontianjia"></i> 新增</div>
        <div class="h-30 lh-25 bc-f5 btn-item"><i class=" iconfont iconshanchu"></i> 批量删除</div>
      </div>
    </div>
    <div class="pl10 pb10 pt10">
      <table class="table">
        <thead>
          <tr>
            <td class="w-10">
              <el-checkbox></el-checkbox>
            </td>
            <td>昵称</td>
            <td>用户名</td>
            <td>注册时间</td>
            <td>上次登录时间</td>
            <td>上次登录IP</td>
            <td>登录次数</td>
            <td>上传次数</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td class="w-10">
              <el-checkbox></el-checkbox>
            </td>
            <td>{{item.loginName}}</td>
            <td>{{item.username}}</td>
            <td>{{item.registerTime}}</td>
            <td>{{item.lastLoginTime||'-'}}</td>
            <td>{{item.lastLoginIp||'-'}}</td>
            <td>{{item.loginNum}}次</td>
            <td>{{item.uploadNum}}次</td>
            <td>
              <span @click="btnDelete(item.username,item.id)" class="hand mr10">删除</span>
              <span @click="getItem(item)" class="hand">编辑</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <el-dialog
      title="用户"
      :center="true"
      width="400px"
      :append-to-body="true"
      :visible.sync="isModel"
    >
      <div class="w-all">
        <div class="flex ai-c mb20">
          <span class="w-90">昵称：</span>
          <el-input v-model="user.loginName" placeholder="请输入内容"></el-input>
        </div>
        <div class="flex ai-c mb20">
          <span class="w-90">登录名：</span>
          <el-input v-model="user.username" placeholder="请输入内容"></el-input>
        </div>
        <div class="flex ai-c mb20">
          <span class="w-90">密码：</span>
          <el-input v-model="user.password" placeholder="请输入内容"></el-input>
        </div>
        <span slot="footer" class="w-all flex jc-e">
          <el-button @click="isModel = false">取 消</el-button>
          <el-button type="primary" @click="btnAdd">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "../../store/api.js";
export default {
  data() {
    return {
      isModel: false,
      list: [],
      user: {
        username: "",
        loginName: "",
        password: "",
        role: "1",
        userId: 0,
        id: 0
      }
    };
  },
  methods: {
    initData() {
      api.get("sys/userList", { role: 1 }).then(res => {
        this.list = res;
      });
    },
    btnDelete(name, id) {
      api
        .get("sys/deleteUser", { username: name, id: id })
        .then(res => {
          if (res.code == 2000) {
            this.$message.success("删除成功！");
            this.isModel = false;
            this.initData();
          }
        });
    },
    btnAdd() {
      if (!this.user.id) {
        api.post("sys/addUser", this.user).then(res => {
          if (res.code == 2000) {
            this.$message.success("新增成功！");
            this.isModel = false;
            this.initData();
          }
        });
      } else {
        api.post("sys/editUser", this.user).then(res => {
          if (res.code == 2000) {
            this.$message.success("修改成功！");
            this.isModel = false;
            this.initData();
          }
        });
      }
    },
    getItem(item) {
      this.user.username = item.username;
      this.user.loginName = item.loginName;
      this.user.password = item.password;
      this.user.id = item.id;
      this.isModel = true;
    }
  },
  created() {
    if (!this.storage("userinfo")) {
      this.$router.push({ name: "logon" });
    }
    this.user.userId = this.storage("userinfo").userId;
    this.initData();
  }
};
</script>

<style lang="less">
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
  .flexupload {
    &:hover {
      background-color: transparent;
    }
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




