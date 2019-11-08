<template>
  <div class="flex fd-c h-all w-all">
    <div class="h-45 bb flex">
      <div class="flex-1 flex ai-e btn-upload pb6">
        <div @click="isModel=true;" class="h-30 lh-25 bc-f5 btn-item "><i class=" iconfont icontianjia"></i> 新增</div>
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
            <td>公司名</td>
            <td>ftp用户名</td>
            <td>ftp密码</td>
            <td>端口</td>
            <td>ftp域名</td>
            <td>ftp码值</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td class="w-10">
              <el-checkbox></el-checkbox>
            </td>
            <td>{{item.customerName}}</td>
            <td>{{item.ftpUsername}}</td>
            <td>{{item.ftpPassword}}</td>
            <td>{{item.ftpPort}}</td>
            <td>{{item.ftpHost}}</td>
            <td>{{item.ftpCode}}</td>
            <td>
              <span @click="getData(item)" class="hand">编辑</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <el-dialog
      title="站点"
      :center="true"
      width="400px"
      :append-to-body="true"
      :visible.sync="isModel"
    >
      <div class="w-all">
        <div class="flex ai-c mb10">
          <span class="w-90">客户名称</span>
          <el-input v-model="user.customerName" placeholder="请输入内容"></el-input>
        </div>
        <div class="flex ai-c mb10">
          <span class="w-90">ftp用户名</span>
          <el-input v-model="user.ftpUsername" placeholder="请输入内容"></el-input>
        </div>
        <div class="flex ai-c mb10">
          <span class="w-90">ftp密码</span>
          <el-input v-model="user.ftpPassword" placeholder="请输入内容"></el-input>
        </div>
        <div class="flex ai-c mb10">
          <span class="w-90">ftp域名</span>
          <el-input v-model="user.ftpHost" placeholder="请输入内容"></el-input>
        </div>
        <div class="flex ai-c mb10">
          <span class="w-90">ftp端口</span>
          <el-input v-model="user.ftpPort" placeholder="请输入内容"></el-input>
        </div>
        <span slot="footer" class="w-all flex jc-e">
          <el-button @click="isModel = false">取 消</el-button>
          <el-button type="primary" @click="modifyBtn">确 定</el-button>
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
      isModify: false,
      list: [],
      user: {
        customerName: "",
        ftpHost: "",
        ftpPort: "",
        ftpUsername: "",
        ftpPassword: "",
        id: ""
      }
    };
  },
  methods: {
    initData() {
      api.get("sys/ftpCustomerList").then(res => {
        if(res.code==2000){
          this.list = res.data;
        }
      });
    },
    btnAdd() {
      api.post("sys/customerFtpInfo", this.user).then(res => {
        if (res.code == 2000) {
          this.initData();
          this.$message.success("新增成功");
          this.isModel = false;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    getData(item) {
      this.user = JSON.parse(JSON.stringify(item));
      this.isModel = true;
    },
    modifyBtn() {
      if (this.user.id) {
        api.post("sys/editFtpInfo", this.user).then(res => {
            this.initData();
            this.$message.success("修改成功");
            this.isModel = false;

        });
      } else {
        this.btnAdd();
      }
    }
  },
  created() {
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




