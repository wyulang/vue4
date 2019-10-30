<template>
  <div class="w-all">
    <div class="flex sha-b pp10 mt10">文件列表</div>

    <div ref="files" class="w-all mt10">
      <el-tree :default-expanded-keys="[0,1]" :data="list" node-key="id" class="sha-b">
        <div class="w-all ai-c bb-fe flex mt3" slot-scope="{ node, data }">
          <div class="flex-1 ml10">
            <span
              :class="{'iconfile1':data.file,'iconwenjianjia fc-fc6':!data.file}"
              class="iconfont"
            ></span>
            <span class="pl10">{{data.fileName}}</span>
            <span
              class="pl30 fc-999"
              v-if="data.createTime"
            >{{data.createTime | date('YYYY-MM-DD hh:mm:ss')}}</span>
            <span class="ml30 fc-999" v-if="data.fileSize">{{data.fileSize | fileSize}}</span>
          </div>
          <div class="flex">
            <span v-if="data.file" class="w-100 mr20">
              <el-button type="text" size="mini" @click="() => dowloadFile(data)" :loading="data.isLoad">下载</el-button>
            </span>
          </div>
        </div>
      </el-tree>
    </div>
  </div>
</template>
<script>
import api from "../../store/api.js";
export default {
  data() {
    return {
      user: this.storage("userinfo"),
      list: []
    };
  },
  methods: {
    dowloadFile(data) {
      const loading = this.$loading({
        lock: true,
        text: "下载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.2)"
      });
      api
        .post(
          "upload-admin/sys/downloadFile",
          {
            ftpPath: data.pathName,
            fileName: data.fileName,
            userId: this.user.id
          },
          { responseType: "blob" }
        )
        .then(res => {
          loading.close();
          const fileName = data.fileName;
          const _res = res;
          let blob = new Blob([_res]);
          let downloadElement = document.createElement("a");
          let href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = fileName; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
          api.post('upload-admin/sys/downloadRecords',{userId:this.user.id});
        });
    },
    initData() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      api
        .get("upload-admin/sys/findFileList", { userId: this.user.id })
        .then(res => {
          loading.close();
          if (res.code == 2000) {
            this.list = res.data[0].ftpFile;
            this.recursion(this.list, true);
          }
        });
    },
    recursion(obj, b) {
      if (obj && obj.length) {
        obj.forEach((v, index) => {
          v.children = JSON.parse(JSON.stringify(v.ftpFile));
          v.isLoad=false;
          if (b) {
            v.id = index;
          }
          delete v.ftpFile;
          if (v.children) {
            this.recursion(v.children);
          }
        });
      }
    }
  },
  created() {
    this.initData();
  }
};
</script>
<style lang="less">
.el-tree-node__content {
  line-height: 30px;
  height: 30px !important;
}
.bb-fe {
  border-bottom: 1px solid #f2f2f2;
}
.fc-fc6 {
  color: #fc6;
}
</style>