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
      <div class="flex jc-e">
        <el-pagination
          class="fr mt20 mb20"
          @current-change="setFileList"
          :current-page.sync="query.page"
          background
          layout="prev, pager, next"
          :total="query.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../store/api.js";
export default {
  data() {
    return {
      list: [],
      query: {
        size: 10,
        page: 1,
        total: 0
      }
    };
  },
  methods: {
    initData() {
      api.post("upload-admin/sys/downloadRecords", this.query).then(res => {
        if (res.code == 2000) {
          this.list = res.data.list;
          this.query.total=res.data.total;
        }
      });
    },
    setFileList(page) {
      this.query.page = page;
      this.initData();
    }
  },
  created() {
    //upload-amdin/sys/deleteFile
    this.initData();
  }
};
</script>