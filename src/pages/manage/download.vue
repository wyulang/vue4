<template>
  <div class="w-all">
    <div class="pl10 pt10 pb10" >
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
            <td>操作</td>
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
            <td>{{item.createDate}}</td>
            <td><!--<a v-if="item.isVideo" @click="() => toHref(item.id,1)" :loading="item.isLoad">在线播放</a>-->
              <el-button v-if="item.isVideo" type="text" size="mini" @click="() => toHref(item.id,1)" :loading="item.isLoad">在线播放</el-button>
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
      <section v-if="video.isShow" class="videoDig">
        <div @click="video.isShow=false;" class="dig-close"></div>
        <div class="dig-body">
          <video ref="video" class="outline" :src="video.src" id="homeVideo" controls="controls">
            您的浏览器不支持 video 标签。
          </video>
        </div>
      </section>
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
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      isVideo: false,
      video: {
        isShow: false,
        src: ''
      },
    };
  },
  methods: {
    toHref(id) {
      let url = api.getDomainApi("")
      this.video.isShow = true;
      this.video.src = url+"sys/view?id="+id;
    },
    initData() {
      api.post("sys/downloadRecords", this.query).then(res => {
        if (res.code == 2000) {
          this.list = res.data.list;
          if(this.list.length){
            this.list.forEach((v,index) => {
              v.isLoad = false;
              v.isVideo = v.fileDownloadPath && (v.fileDownloadPath.split('.')[v.fileDownloadPath.split('.').length - 1]).toLocaleLowerCase()=='mp4'
            });
          }
          this.query.total=res.data.total;
        }
      });
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
    //upload-amdin/sys/deleteFile
    this.initData();
  }
};
</script>
<style lang="less">
  .videoDig {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    background: rgba(2, 2, 2, 0.55);
    .dig-close {
      width: 64px;
      height: 64px;
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAYAAACGVs+MAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgRmlyZXdvcmtzIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNkY5NUY4RDM3RDgxMUU3QjQyMUZENTIwNDY5OTFDNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNkY5NUY4RTM3RDgxMUU3QjQyMUZENTIwNDY5OTFDNCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE2Rjk1RjhCMzdEODExRTdCNDIxRkQ1MjA0Njk5MUM0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE2Rjk1RjhDMzdEODExRTdCNDIxRkQ1MjA0Njk5MUM0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Aaf3PgAAANpJREFUeNrMl0EOgyAQRaEbexQP5Cl6Ck/RK8ztWLcrlEQSQ0WYYT70J8YEdN6TqIAxR7z3tB/OgBMYgZU2BniMA8NjKDbO/jcODI+ZY+eClMjAl/QiiEQVHCXBgmtLiOBaEk3wVgkVuFRCFV6QoIvrSB1+Kv6+k4DCCxDqAi9IpFnRs9mdBHHrWaHEZz9NSfPXWvvk1npIRuACHjJJRgDxDlBPeO4roC7w2n4oHCrBLaoqIS2Wue/Fha8tT9L0e66d/SASQ9eEQ1fFQ/cF/7IzGrc3HL073gQYAL2Iz1119SZEAAAAAElFTkSuQmCC")
      no-repeat center center;
      position: absolute;
      top: 66px;
      right: 30px;
      z-index: 100002;
      cursor: pointer;
    }
    .dig-body {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      video {
        width: 60%;
        outline: none;
      }
    }
  }
</style>
