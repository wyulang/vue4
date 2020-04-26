<template>
  <div class="flex fd-c h-all w-all">
    <div class="w-all bc-fff ra-4 pl10 pr10 pb10 sha-7">
      <div class="flex w-all mt10">
        <div class="sha-7 mr15 pt10 wi-100 pr10">
          <el-tree :data="departList" node-key="id" default-expand-all @node-click="nodeClick" :expand-on-click-node="false">
            <div class="custom-tree-node w-all" slot-scope="{ node, data }">
              <el-dropdown @command="v=>{handleCommand(v,data)}">
                <span class="el-dropdown-link">
                  {{data.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1">新增</el-dropdown-item>
                  <el-dropdown-item command="2">编辑</el-dropdown-item>
                  <el-dropdown-item command="3">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-tree>
        </div>
        <div class="flex-1">
          <div class="pt10 flex pb10">
            <el-button @click="btnNewClick()" icon="iconfont icontianjia" size="small">新增</el-button>
            <!-- <el-button @click="isParment=true;" icon="iconfont iconbumenrenyuanguanli pr5 fs-14" size="small">部门管理</el-button> -->
            <!-- <el-button class="ml10" @click="btnDelete(selectList)" icon="iconfont iconshanchu" size="small">批量删除</el-button> -->
          </div>
          <div class="sha-3 mt5">
            <table class="table w-all">
              <thead>
                <tr>
                  <td class="wb-1">
                    <el-checkbox :value="selectList.length==list.length&&selectList.length>0" @change="v=>{v?(selectList=list.map(d=>{return d.id})):(selectList=[])}"></el-checkbox>
                  </td>
                  <td>用户名</td>
                  <td>登录名</td>
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
          </div>
          <div class="flex jc-e mt15 mb5">
            <el-pagination hide-on-single-page="true" class="fr" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="query.pageNum" :page-size="query.pageSize" background layout="total,sizes,prev, pager, next" :page-sizes="[10, 20]" :total="query.total"></el-pagination>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="用户" :center="true" width="400px" :append-to-body="true" :visible.sync="isModel">
      <div class="w-all">
        <div class="flex ai-c mb20">
          <span class="w-90">用户名：</span>
          <el-input v-model="user.loginName" placeholder="请输入昵称"></el-input>
        </div>
        <div class="flex ai-c mb20">
          <span class="w-90">登录名：</span>
          <el-input v-model="user.username" placeholder="请输入登录名,长度至少为3位" :disabled="isReadonly"></el-input>
        </div>
        <div class="flex ai-c mb20">
          <span class="w-90">密码：</span>
          <el-input v-model="user.password" placeholder="请输入密码,长度至少为6位" type="password"></el-input>
        </div>
        <div class="flex ai-c mb20">
          <span class="w-90">部门：</span>
          <!--<el-input v-model="user.departmentName"></el-input>-->
          <el-select v-model="user.departmentId" style="width: 100%">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <span slot="footer" class="w-all flex jc-e">
          <el-button @click="isModel = false">取 消</el-button>
          <el-button type="primary" @click="btnAdd">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog title="删除提示" :center="true" width="400px" :append-to-body="true" :visible.sync="isConfirm">
      <span> 您是否确定删除该用户信息?</span>
      <span slot="footer" class="w-all flex jc-e">
        <el-button @click="isConfirm = false">取 消</el-button>
        <el-button type="primary" @click="btnDelete">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增节点" :center="true" width="400px" :append-to-body="true" :visible.sync="isAddNode">
      <div class="w-all">
        <div class="flex ai-c mb20">
          <span class="w-90">部门名称：</span>
          <el-input v-model="depart.name" placeholder="请输入部门名称"></el-input>
        </div>
        <div class="flex ai-c mb20">
          <span class="w-90">部门简称：</span>
          <el-input v-model="depart.shortName" placeholder="部门简称"></el-input>
        </div>
        <span slot="footer" class="w-all flex jc-e">
          <el-button @click="isAddNode = false">取 消</el-button>
          <el-button type="primary" @click="btnAddNode">确 定</el-button>
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
      isReadonly: false,
      isParment: false,
      isConfirm: false,
      selectList: [],
      deleteId: "",
      list: [],
      query: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
        role: "1",
        departmentId: "1"
      },
      user: {
        username: "",
        loginName: "",
        password: "",
        role: "1",
        userId: 0,
        id: 0,
        departmentId: "1",
        departmentName: "金华广电"
      },
      departList: [],
      isAddNode: false,
      nodeData: {},
      depart: {
        name: "",
        shortName: "",
        parentId: "",
        id: ""
      },
      value: "",
      options: []
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
            this.query.total = res.data.total;
          }
        });
      api
        .get("sys/departmentList")
        .then(res => {
          if (res.code == 2000) {
            this.departList = res.data;
          }
        });
      api
        .get("sys/departmentAllList")
        .then(res => {
          if (res.code == 2000) {
            this.options = res.data;
          }
        });
    },
    deleteItem(item) {
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
          } else {
            this.$message.error(res.magenta);
          }
        });
    },
    btnAdd() {
      if (!this.user.loginName.length) {
        this.$message.error("请输入用户名");
        return;
      }
      if (!this.user.password || this.user.password.length < 5) {
        this.$message.error("请输入密码，且长度至少为6位");
        return;
      }
      if (!this.user.username.length || this.user.username.length < 2) {
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
          } else {
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
      this.user.departmentId = item.departmentId;
      this.user.departmentName = item.departmentName;
      this.user.role = "1";
      this.isModel = true;
      this.isReadonly = true;
    },
    handleSizeChange(val) {
      this.query.pageSize = val;
      // console.log(`每页 ${val} 条`);
      this.handleCurrentChange(1);
    },
    handleCurrentChange(val) {
      this.query.pageNum = val;
      this.initData();
    },
    handleCommand(type, data) {
      if (type == 1) {
        this.isAddNode = true;
        this.depart.parentId = data.id;
        this.nodeData = data;
      } else if (type == 2) {
        this.isAddNode = true;
        this.depart.id = data.id;
        this.depart.name = data.name;
        this.depart.shortName = data.shortName;
        this.nodeData = data;
      } else if (type == 3) {
        api.get("sys/deleteDepart", { id: data.id }).then(res => {
          if (res.code == 2000) {
            this.$message.success("部门删除成功！");
            // const parent = node.parent;
            // const children = parent.data.children || parent.data;
            // const index = children.findIndex(d => d.id === data.id);
            // children.splice(index, 1);
              this.initData();
          }else {
              this.$message.error(res.message);
          }
        });
      }
    },
    btnAddNode() {
      api.post("sys/saveDepart", this.depart).then(res => {
        if (res.code == 2000) {
          /*const newChild = { id: res.data.id, name: res.data.name, children: [],shortName:res.data.shortName };
          if (!this.nodeData.children) {
              this.$set(this.nodeData, 'children', []);
          }
          this.nodeData.children.push(newChild);
          this.isAddNode = false;*/
          this.isAddNode = false;
          this.initData();
          this.$message.success("操作成功！");
        }
      }
      );

    },
    nodeClick(data) {
      this.query.departmentId = data.id;
      this.user.departmentId = data.id;
      this.user.departmentName = data.name;
      this.initData();
    },
    btnNewClick() {
      this.isModel = true;
      // this.user={};
      this.user.username = "";
      this.user.loginName = "";
      this.user.password = "";
      this.user.id = 0;
      this.isReadonly = false;
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
.tree-nodes {
  display: flex;
  i {
    display: none;
  }
  &:hover {
    i {
      display: block;
      color: #587ed1;
    }
  }
}
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
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
</style>




