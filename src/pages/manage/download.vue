<template>
  <div class="w-all">
    <div class="pl10 pt10 pb10">
      <table class="table">
        <thead class="sha-6">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    //upload-amdin/sys/deleteFile
  }
};
</script>