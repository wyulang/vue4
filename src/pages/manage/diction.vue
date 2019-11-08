<template>
  <div class="flex fd-c h-all w-all">
    <div class="h-45 bb flex">
      <div class="flex-1 flex ai-e btn-upload pb6">
        <div @click="isModel=true" class="h-25 lh-25 bc-f5 btn-item br-5"><i class="icon iconfont icon-addteam"></i> 新增</div>
        <div class="h-25 lh-25 bc-f5 btn-item br-5"><i class="icon iconfont icon-shanchuguan"></i> 批量删除</div>
      </div>
    </div>
    <div class="pl10 pb10 pt10">
      <table class="table">
        <thead>
          <tr>
            <td class="w-10">
              <el-checkbox></el-checkbox>
            </td>
            <td class="w-100">字典码值</td>
            <td>字典值</td>
            <td class="w-100">操作</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="w-10">
              <el-checkbox></el-checkbox>
            </td>
            <td>川南野丁</td>
            <td>2016-09-02</td>
            <td>
              <span class="hand mr10">删除</span>
              <span class="hand">重置</span>
            </td>
          </tr>
        </tbody>

      </table>
    </div>

    <el-dialog title="用户" :center=true width="400px" :append-to-body=true :visible.sync="isModel">
      <div class="w-all">
        <div class="flex ai-c mb10"><span class="w-90">字典名称</span>
          <el-input v-model="user.loginName" placeholder="请输入内容"></el-input>
        </div>
        <div class="flex modules-dig ai-c mb10"><span class="w-90">字典值</span>
          <el-input type="textarea" v-model="user.username" placeholder="请输入内容"></el-input>
        </div>
        <span slot="footer" class="w-all flex jc-e">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
        username: '',
        loginName: '',
        password: '',
        role: '2',
      }
    }
  },
  methods: {
    initData() {
      api.get('sys/dictLis', { dictType: ''}).then(res => {

      })
    },
    btnAdd() {
      api.post('sys/addUser', this.user).then(res => {

      })
    }
  },
  created() {
    this.initData();
  },
}
</script>

<style lang="less">
.modules-dig {
  textarea {
    height: 200px;
  }
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




