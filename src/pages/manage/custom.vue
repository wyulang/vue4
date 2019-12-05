<template>
  <div class="flex fd-c h-all w-all">
    <div class="pl10 flex jc-b mt10 ai-c">
      <el-radio-group @change="initData()" size="small" v-model="user.role">
        <!--<el-radio-button label="0">管理员</el-radio-button>-->
        <el-radio-button label="1">用户管理</el-radio-button>
        <!--<el-radio-button label="2">普通用户</el-radio-button>-->
      </el-radio-group>
      <div class="h-45 bb flex">
        <div class="flex-1 flex ai-e btn-upload pb6">
          <div @click="isModel=true;user={},user.id=0,isReadonly=false;" class="h-30 lh-25 bc-f5 btn-item">
            <i class="iconfont icontianjia"></i> 新增
          </div>
          <div class="h-30 lh-25 bc-f5 btn-item">
            <i class="iconfont iconshanchu"></i> 批量删除
          </div>
        </div>
      </div>
    </div>
    <div class="pl10 pb10">
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
            <td>{{item.createDate}}</td>
            <td>{{item.lastLoginTime||'-'}}</td>
            <td>{{item.lastLoginIp||'-'}}</td>
            <td>{{item.loginNum}}次</td>
            <td>{{item.uploadNum}}次</td>
            <td>
              <span @click="deleteItem(item)" class="hand mr10">删除</span>
              <span @click="getItem(item)" class="hand">编辑</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex jc-e">
        <el-pagination
                class="fr mt20 mb20"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page="query.pageNum"
                :page-size="query.pageSize"
                background
                layout="total,sizes,prev, pager, next"
                :page-sizes="[10, 20]"
                :total="query.total"
        ></el-pagination>
      </div>
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
          <el-input v-model="user.loginName" placeholder="请输入昵称"></el-input>
        </div>
        <div class="flex ai-c mb20">
          <span class="w-90">登录名：</span>
          <el-input v-model="user.username" placeholder="请输入登录名,长度至少为3位" :disabled="isReadonly"></el-input>
        </div>
        <div class="flex ai-c mb20">
          <span class="w-90">密码：</span>
          <el-input v-model="user.password" placeholder="请输入密码,长度至少为6位"></el-input>
        </div>
        <span slot="footer" class="w-all flex jc-e">
          <el-button @click="isModel = false">取 消</el-button>
          <el-button type="primary" @click="btnAdd">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog title="删除提示"
               :center="true"
               width="400px"
               :append-to-body="true"
               :visible.sync="isConfirm">
      <span> 您是否确定删除该用户信息?</span>
      <span slot="footer" class="w-all flex jc-e">
          <el-button @click="isConfirm = false">取 消</el-button>
          <el-button type="primary" @click="btnDelete">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import api from "../../store/api.js";
export default {
  data() {
    return {
      isModel: false,
      isReadonly:false,
      isConfirm:false,
      deleteId:"",
      list: [],
      query: {
          pageSize: 10,
          pageNum: 1,
          total: 0,
          role: "1"
        },
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
      const loading = this.$loading({
        lock: true,
        text: "loading...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      api
        .post("sys/userList", this.query)
        .then(res => {
          loading.close();
          if (res.code == 2000) {
             this.list = res.data.list;
             this.query.total=res.data.total;
          }
        });
    },
     deleteItem(item){
        this.isConfirm = true;
        this.deleteId = item.id;
    },
    btnDelete() {
      api
          .get("sys/deleteUser", { id: this.deleteId })
        .then(res => {
          if (res.code == 2000) {
            this.$message.success("删除成功！");
            this.isConfirm = false;
            this.initData();
          }else {
              this.$message.error(res.magenta);
          }
        });
    },
    btnAdd() {
       if(!this.user.loginName.length){
            this.$message.error("请输入昵称");
            return;
        }
      if(!this.user.password || this.user.password.length<5){
          this.$message.error("请输入密码，且长度至少为6位");
          return;
      }
      if(!this.user.username.length||this.user.username.length<2){
          this.$message.error("请输入登录名，且长度至少为3位");
          return;
        }
      this.user.role = "1";
      if (!this.user.id) {
        api.post("sys/addUser", this.user).then(res => {
          if (res.code == 2000) {
            this.$message.success("新增成功！");
            this.isModel = false;
            this.initData();
          }else {
              this.$message.warning(res.message);
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
      this.user.role = "1";
      this.isModel = true;
      this.isReadonly=true;
    },
    handleSizeChange(val) {
        this.query.pageSize = val;
        // console.log(`每页 ${val} 条`);
        this.handleCurrentChange(1);
      },
      handleCurrentChange(val){
        this.query.pageNum = val;
        this.initData();
    }
  },
  created() {
    if (!this.storage("userinfo")) {
      this.$router.push({ name: "logon" });
    }
    this.user.userId = this.storage("userinfo").id;
    this.initData();
  }
};
</script>

<style lang="less">
.bc .uploads {
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




