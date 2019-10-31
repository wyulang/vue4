<template>
  <div class="w-all">
    <div class="pl10 pt10 pb10">
      <table class="table">
        <thead class="sha-6">
          <tr>
            <td class="w-10">
              <el-checkbox></el-checkbox>
            </td>
            <td>文件名</td>
            <td>用户名</td>
            <td>登录名</td>
            <td>下载时间</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td class="w-10">
              <el-checkbox></el-checkbox>
            </td>
            <td>{{item.fileName}}</td>
            <td>{{item.username}}</td>
            <td>{{item.loginName}}</td>
            <td>{{item.createDateStr}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import api from "../../store/api.js";
export default {
  data() {
    return {
      list: []
    };
  },
  methods:{
      initData(){
          api.post('upload-admin/sys/downloadRecords',{}).then(res=>{
              if(res.code==2000){
                  this.list=res.data;
              }
          })
      }
  },
  created() {
    //upload-amdin/sys/deleteFile
    this.initData();
  }
};
</script>