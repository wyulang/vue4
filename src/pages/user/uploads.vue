<template>
  <div class="w-all">
    <div class="flex w-all pb10 fs-12">
      <div v-for="(item, index) in dianList" :key="index" class="flex sha-6 mr10 fd-c">
        <div class="pt10 centent fs-16">{{item.customerName}}</div>
        <div class="flex pt10 pl10 pr10 pb10">
          <div class="flex ai-c jc-c fd-c mr10">
            <span>今日上传</span>
            <span>
              <i class="fb fs-20">{{item.uploadCountToday}}</i> 条
            </span>
          </div>
          <div class="flex ai-c jc-c mr10 fd-c">
            <span>近30日上传</span>
            <span>
              <i class="fb fs-20">{{item.uploadCountMonth}}</i>条
            </span>
          </div>
          <div class="flex ai-c jc-c fd-c">
            <span>年度上传</span>
            <span>
              <i class="fb fs-20">{{item.uploadCountYear}}</i>条
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-all pl10 sha-6 mb10 pr10 flex pt15 pb15 ai-c jc-s">
      <div class="flex-line">
        <div class="flex-line ai-c mr10">
          <span class="mr10">开始时间</span>
          <el-date-picker v-model="query.startTime" size="small" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <div class="flex-line ai-c mr10">
          <span class="mr10">结束时间</span>
          <el-date-picker v-model="query.endTime" size="small" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <div class="flex-line ai-c mr10">
          <el-input placeholder="请输入内容" size="small" v-model="query.fileName" clearable></el-input>
        </div>
      </div>
      <el-button @click="initData()" size="small" type="primary">搜索</el-button>
    </div>

    <div class="w-all">
      <div v-for="(item, index) in list" :key="index" class="w-all flex ai-c h-40 bb-e">
        <div class="w-60 centent">
          <!-- <img  class="h-40 w-30" :src="item.fileUrl" alt /> -->
          <span v-if="onFileType(item.fileName)=='image'" class="iconfont fs-24 fc-999 icontupian"></span>
          <i v-else class="icon iconfont fs-28 fc-999" :class="onFileType(item.fileName)"></i>
        </div>
        <div class="flex-1">{{item.fileName}}</div>
        <div class="wb-20">上传时间：{{item.createDate | date('YYYY-MM-DD hh:mm:ss')}}</div>
        <div class="wb-10">文件大小：{{item.fileSize | fileSize}}</div>
        <!--<div class="w-100 center">
          <span @click="download(item.fileName,item.fileUrl)" class="fc-a hand">查看文件</span>
        </div>-->
        <div v-if="query.role==1" class="w-70 fc-btn hand">
          <span @click="deleteFiles(item)">删除</span>
        </div>
      </div>

      <el-pagination
              class="fr mt20 mb20"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :current-page="query.pageNum"
              :page-size="query.pageSize"
              background
              layout="total,sizes,prev, pager, next"
              :page-sizes="[10, 20]"
              :total="total">
      </el-pagination>
    </div>
    <div v-show="isUpload" class="fixed at0 ab0 al0 ar0">
      <div class="w-all h-all flex ai-c jc-c">
        <div class="w-600 flex fd-c sha-all pp5 ra-5 bc-fff">
          <div class="flex ai-c jc-b">
            <span class="ml10">上传平台：</span>
            <el-select class="flex-1 ml15 mr15" multiple size="mini" v-model="ftpCode" placeholder="请选择上传平台">
              <el-option v-for="item in ftplist" :key="item.value" :label="item.customerName" :value="item.ftpCode"></el-option>
            </el-select>
            <span @click="$store.commit('setUpload',false)" class="iconfont hand icondelete fs-18 mr10"></span>
          </div>
          <div @click="isCodeUpload" style="height:450px;">
            <uploader @file-success="onFileSuccess" :file-status-text="statusText" @file-added="onFileAdded" ref="uploader" :options="options" class="flex fd-c w-all h-all mt10 pl10 pr10 uploads">
              <uploader-drop style="border: 1px dashed #d9d9d9;" class="br-5 flex jc-c c-aaa fd-c hand mb10 pb10">
                <uploader-btn class="flexupload" style="border:0;">
                  <div class="flex jc-c">
                    <i style="font-size:60px;" class="iconfont iconicon--"></i>
                  </div>
                  <div class="flex jc-c">
                    将文件拖到此处，或
                    <em class="fc-primary">点击上传</em>
                  </div>
                </uploader-btn>
              </uploader-drop>
              <div id="uploaders" ref="uploaders" style="flex:1;position:relative">
                <div class="body-flies">
                  <div class="h-all" v-bar>
                    <div>
                      <uploader-list></uploader-list>
                    </div>
                  </div>
                </div>
              </div>
            </uploader>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../store/api.js";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isUpload"])
  },
  data() {
    return {
      fileTypes: {
        xls: ["xls", "xlsx"],
        word: ["doc", "docx"],
        image: ["png", "jpg", "jpeg", "gif", "bmp"],
        video: ["3gp", "flv", "rmvb", "avi", "wmv", "mpeg4"],
        zip: ["zip", "rar", "7z", "cab"]
      },
      query: {
        startTime: "",
        endTime: "",
        fileName: "",
        pageSize: 10,
        pageNum: 1,
        userId: this.storage("userinfo").id,
        role: this.storage("userinfo").role
      },
      list: [],
      dianList: [],
      total: 0,
      isFile: true,
      urls: "",
      baseUrl: "sys/uploadBigToFtp",
      endList: [],
      ftpCode: "",
      statusText: {
        success: "成功了",
        error: "出错了",
        uploading: "上传中",
        paused: "暂停中",
        waiting: "等待中"
      },
      options: {
        target: "", // 目标上传 URL
        chunked: true,
        chunkSize: "2048000", //分块大小
        duplicate: true,
        headers: {
          token: this.storage("userinfo").token
        },
        query: {
          ftpCode: "",
          userId: ""
        },
        withCredentials:true,
        testMethod: "POST",
        maxChunkRetries: 3, //最大自动失败重试上传次数
        testChunks: false, //是否开启服务器分片校验
        // 服务器分片校验函数，秒传及断点续传基础
        checkChunkUploadedByResponse: function (chunk, message) {
          let objMessage = JSON.parse(message);
          if (objMessage.skipUpload) {
            return true;
          }
          return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0;
        }
      },
      ftplist: []
    };
  },
  methods: {
    isCodeUpload(e) {
      if (!this.ftpCode.length) {
        this.$message.error("请先选择上传平台");
        e.stopPropagation();
        window.event.returnValue = false
        return;
      }
    },
    deleteFiles(item) {
      this.$confirm("确定要删除吗！").then(res => {
        api
          .post("sys/deleteFile", {
            id: item.id,
            userId: this.query.userId
          })
          .then(res => {
            this.$message.error("删除成功");
          });
      });
    },

    onFileType(type) {
      let types = {
        video: "iconmeiti",
        zip: "iconRAR",
        word: "iconword",
        xls: "iconexclxlsxlsx",
        file: "iconfile"
      };
      let dal = "iconfile";
      for (let item in this.fileTypes) {
        if (
          this.fileTypes[item].includes(
            type.replace(/.+\./g, "").toLocaleLowerCase()
          )
        ) {
          dal = item == "image" ? "image" : types[item];
        }
      }
      return dal;
    },
    initData() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      api.get("sys/fileList", this.query).then(res => {
        loading.close();
        this.list = res.data.list;
        this.total = res.data.total;
      });
      api.get("sys/getCustomerList", {
         userId: this.storage("userinfo").id
         }).then(res => {
              this.dianList = res.data;
         });
      api.get("sys/ftpCustomerList", {}).then(res => {
        this.ftplist = res.data;
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
    },
    download(filename, src) {
      var element = document.createElement("a");
      element.setAttribute("href", src);
      element.setAttribute("target", "_blank");
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    onFileSuccess(rootFile, file, response, chunk) {
      let data = JSON.parse(response);
      if (data.code == 2000) {
        this.endList.push({
          fileName: file.name,
          fileSize: file.size,
          fileUrl: data.data
        });
      }

      if (data.data.isMerge) {
        api
          .post("sys/merge", {
            ftpCode: this.ftpCode.toString(),
            fileName: file.name,
            userId: this.storage("userinfo").id,
            guid: data.data.guid
          })
          .then(res => {
            if (res.code == 2000) {
              this.$message.success(file.name.concat("上传完成"));
              this.initData();
              setTimeout(v => {
                file.cancel();
              });
            }
          });
      }
      if (file.totalChunks <= 1) {
        this.$message.success(file.name.concat("上传完成"));
        this.initData();
        setTimeout(v => {
          file.cancel();
        });
      }
    },
    uuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return uuid;
    },
    onFileAdded(file) {
      if (!this.ftpCode.length) {
        this.$message.error("请先选择上传平台");
        file.ignored = true;
      } else {
        this.options.query.ftpCode = this.ftpCode.toString();
        this.options.query.userId = this.storage("userinfo").id;
        this.options.query.guid = this.uuid();
      }
    }
  },
  created() {
    this.options.target = api.getDomainApi() + this.baseUrl;
    this.isShow = this.$route.query.s;
    this.initData();
  }
};
</script>
<style lang="less">
.menu-bg {
  background-color: #4dcaad;
}
.menu-line {
  border-top: 1px solid #369780;
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
  .uploader-btn:hover {
    background-color: transparent !important;
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
