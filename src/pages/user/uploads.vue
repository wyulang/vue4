<template>
  <div class="fixed at0 ab0 zi-140 bc-t8 al0 ar0">
    <div class="w-all h-all flex ai-c jc-c">
      <div class="w-600 flex fd-c sha-all rel pp5 ra-5 bc-fff">
        <div class="abs ar-18 at-18 bc-fff ra-all sha-all w-23 pt2 h-23"><span @click="$store.commit('setUpload',false)" class="iconfont hand ml2 icondelete fs-18 mr10"></span></div>
        <div v-if="uploadType==0" class="flex ai-c mt5 jc-b">
          <span class="ml10">上传平台：</span>
          <el-select class="flex-1 ml15 mr15" multiple size="mini" v-model="ftpCode" placeholder="请选择上传平台">
            <el-option v-for="item in ftplist" :key="item.value" :label="item.customerName" :value="item.ftpCode"></el-option>
          </el-select>
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
</template>
<script>
import api from "../../store/api.js";
import { mapState } from "vuex";
export default {
  props: ['uploadType'],
  data() {
    return {
      fileTypes: {
        xls: ["xls", "xlsx"],
        word: ["doc", "docx"],
        image: ["png", "jpg", "jpeg", "gif", "bmp"],
        video: ["3gp", "flv", "rmvb", "avi", "wmv", "mpeg4"],
        zip: ["zip", "rar", "7z", "cab"]
      },
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
        withCredentials: true,
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
      if (!this.ftpCode.length && this.uploadType == 0) {
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
      api.get("sys/getCustomerList", {
        userId: this.storage("userinfo").id
      }).then(res => {
        this.dianList = res.data;
      });
      api.get("sys/ftpCustomerList", { type: "0" }).then(res => {
        this.ftplist = res.data;
      });
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
            guid: data.data.guid,
            type: this.uploadType
          })
          .then(res => {
            if (res.code == 2000) {
              this.$message.success(file.name.concat("上传完成"));
              this.initData();
              this.$store.state.changeUpload = this.$store.state.changeUpload + 1;
              setTimeout(v => {
                file.cancel();
              });
            }
          });
      }
      if (file.totalChunks <= 1) {
        this.$message.success(file.name.concat("上传完成"));
        this.initData();
        this.$store.state.changeUpload = this.$store.state.changeUpload + 1;
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
      if (!this.ftpCode.length && this.uploadType == 0) {
        this.$message.error("请先选择上传平台");
        file.ignored = true;
      } else if (this.uploadType == 1) {
        let formet = ['.asx', '.asf', '.mpg', '.wmv', '.3gp', '.mp4', '.mov', '.avi', '.flv','.mp3','.wav','.mpeg'];
        if (!formet.includes(file.name.substring(file.name.lastIndexOf('.')).toLocaleLowerCase())) {
          this.$message.error("请上传视频或音频文件");
          file.ignored = true;
        }
      }
      else {
        this.options.query.ftpCode = this.ftpCode.toString();
        this.options.query.userId = this.storage("userinfo").id;
        this.options.query.guid = this.uuid();
      }
    }
  },
  created() {
    this.options.target = api.getDomainApi() + this.baseUrl;
    this.initData();
  }
};
</script>
<style lang="less">
.bc-t8 {
  background-color: rgba(0, 0, 0, 0.5);
}
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
