<template>
  <div class="w-all">
    <div class="flex ai-c sha-b pp10 mt10">
      <span class="wi-60">时间排序：</span>
      <div class="flex fc-aaa fd-c">
        <span @click="setQuery(0,1)" :class="{'file-active':query.timesort==1,'fc-ccc':query.timesort==2}" class="iconfont hand iconpaixushang"></span>
        <span @click="setQuery(0,2)" style="margin-top:-5px" :class="{'file-active':query.timesort==2,'fc-ccc':query.timesort==2}" class="iconfont hand iconpaixu-"></span>
      </div>
      <span class="wi-60 ml20">文件名排序：</span>
      <div class="flex fc-aaa fd-c">
        <span @click="setQuery(1,1)" :class="{'file-active':query.filesort==1,'fc-ccc':query.filesort==2}" class="iconfont hand iconpaixushang"></span>
        <span @click="setQuery(1,2)" :class="{'file-active':query.filesort==2,'fc-ccc':query.filesort==2}" style="margin-top:-5px" class="iconfont hand iconpaixu-"></span>
      </div>
      <span class="wi-60 ml10">上传时间：</span>
      <el-date-picker value-format="yyyy-MM-dd" size="small" v-model="query.date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
      <span class="wi-60 ml10">文件名称：</span>
      <el-input size="small" class="w-150" v-model="query.name" placeholder="请输入内容" @keydown.enter.native="searchEnter"></el-input>
      <el-button size="small" @click="btnSerch" class="ml20" type="primary">查询</el-button>
      <el-button size="small" @click="resetSerch" class="ml20" type="primary">重置</el-button>
    </div>

    <div class="w-all mt10">
      <el-tree ref="ftree" :default-expanded-keys="[0,1]" :data="list" node-key="id" class="sha-b" lazy>
        <div class="w-all ai-c rel bb-fe flex mt3" slot-scope="{ node, data }">
          <div class="flex-1 ml10">
            <span :class="{'iconfile1':data.file,'iconwenjianjia fc-fc6':!data.file}" class="iconfont"></span>
            <span class="pl10">{{data.fileName}}</span>
            <span class="pl30 fc-999" v-if="data.createTime">{{data.createTime |date('YYYY-MM-DD')}}</span>
            <span class="ml30 fc-999" v-if="data.fileSize">{{data.fileSize | fileSize}}</span>
          </div>
          <div class="flex">
            <span v-if="data.file" class="w-100 mr20">
              <!--<el-button v-if="data.isVideo" type="text" size="mini" @click="() => dowloadFile(data,1)" :loading="data.isLoad">在线播放</el-button>-->
              <el-button type="text" size="mini" @click="() => dowloadFile(data,2)" :loading="data.isLoad">下载</el-button>
            </span>
          </div>
        </div>
      </el-tree>
    </div>
    <div class="h-20"></div>
    <section v-if="video.isShow" class="videoDig">
      <div @click="video.isShow=false;" class="dig-close"></div>
      <div class="dig-body">
        <video ref="video" class="outline" :src="video.src" id="homeVideo" controls="controls">您的浏览器不支持 video 标签。</video>
      </div>
    </section>
  </div>
</template>
<script>
import api from "../../store/api.js";
import py from "lib/py.js";
// import { mapState } from "vuex";
export default {
  data() {
    return {
      user: this.storage("userinfo"),
      list: [],
      downlist: [],
      baseList: [],
      metas: [
        "avi",
        "wmv",
        "mpeg",
        "mp4",
        "m4v",
        "mov",
        "asf",
        "flv",
        "f4v",
        "rmvb",
        "rm",
        "3gp",
        "vob",
        "mkv"
      ],
      isVideo: false,
      video: {
        isShow: false,
        src: ""
      },
      query: {
        timesort: 0,
        filesort: 0,
        date: "",
        name: ""
      }
    };
  },
  methods: {
    dowloadFile(data, type) {
      let isDowns = this.$store.state.downloadFile.find(v => {
        return v.uid == data.uid;
      });
      if (isDowns) {
        if (isDowns.pross < 100) {
          this.$message.error(`${data.fileName}正在下载中....`);
        } else {
          this.$message.error(`${data.fileName} 文件已下载完成。`);
        }
        return;
      }
      // this.downlist.push(JSON.parse(JSON.stringify(data)));
      // this.$store.commit("setDownLoad", this.downlist);
      data.uptime = new Date().getTime();
      this.$store.state.downloadFile.push(data);
      this.$store.state.downloadFile.sort((a, b) => {
        return b.uptime - a.uptime;
      });
      api
        .post(
          "sys/downloadFile",
          {
            ftpPath: data.pathName,
            fileName: data.fileName,
            userId: this.user.id
          },
          {
            responseType: "blob",
            download: res => {
              let complete = (res.loaded / data.fileSize || 0) * 100;
              data.pross = complete.toFixed(2);
              this.$store.commit("setDownLoadPross", {
                uid: "111",
                pross: complete.toFixed(2)
              });
            }
          }
        )
        .then(res => {
          // data.isDown = false;
          data.pross = 100;
          // this.$store.state.downloadFile=this.$store.state.downloadFile.filter(v=>{return v.pross<100});
          const fileName = data.fileName;
          const _res = res;
          let blob = new Blob([_res]);
          let downloadElement = document.createElement("a");
          let href = window.URL.createObjectURL(blob); //创建下载的链接
          if (type == 2) {
            downloadElement.href = href;
            downloadElement.download = fileName; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
            // api.post('sys/downloadRecords', { userId: this.user.id });
          } else {
            this.video.isShow = true;
            this.video.src = href;
          }
        });
    },
    btnSerch() {
      if (this.query.date || this.query.name) {
        this.list = [];
        this.getQuery(this.baseList);
        setTimeout(() => {
          this.setSort(false, this.list);
        }, 200);
      } else {
        this.list = [];
        this.list = this.baseList;
        this.setSort(false, this.list);
      }
    },
    setQuery(type, value) {
      let listData = [];
      if (type == 0) {
        if (this.query.timesort != value) {
          this.query.filesort = 0;
          this.query.timesort = value;
          this.setSort(false, this.list);
        }
      }
      if (type == 1) {
        if (this.query.filesort != value) {
          this.query.timesort = 0;
          this.query.filesort = value;
          this.setSort(false, this.list);
        }
      }
    },
    getQuery(list) {
      list.forEach(v => {
        if (v.file) {
          if (this.query.date && this.query.name) {
            if (
              v.fileName.includes(this.query.name) &&
              (v.date > new Date(this.query.date[0] + " 00:00:01").getTime() &&
                v.date < new Date(this.query.date[1] + " 23:59:59").getTime())
            ) {
              this.list.push(v);
            }
          } else if (this.query.date && !this.query.name) {
            if (
              v.date > new Date(this.query.date[0] + " 00:00:01").getTime() &&
              v.date < new Date(this.query.date[1] + " 23:59:59").getTime()
            ) {
              this.list.push(v);
            }
          } else if (!this.query.date && this.query.name) {
            if (v.fileName.includes(this.query.name)) {
              this.list.push(v);
            }
          }
        }
        if (v.children) {
          this.getQuery(v.children);
        }
      });
    },
    setSort(parent, list) {
      if (list.length) {
        let [file, text, fileAll] = [[], [], []];
        list.forEach(v => {
          v.file ? file.push(v) : text.push(v);
        });
        if (this.query.filesort == 1) {
          file.sort((a, b) => {
            return a.py.localeCompare(b.py);
          });
          text.sort((a, b) => {
            return a.py.localeCompare(b.py);
          });
        } else if (this.query.filesort == 2) {
          file.sort((a, b) => {
            return b.py.localeCompare(a.py);
          });
          text.sort((a, b) => {
            return b.py.localeCompare(a.py);
          });
        }

        if (this.query.timesort == 1) {
          file.sort((a, b) => {
            return a.date - b.date;
          });
          text.sort((a, b) => {
            return a.date - b.date;
          });
        } else if (this.query.timesort == 2) {
          file.sort((a, b) => {
            return b.date - a.date;
          });
          text.sort((a, b) => {
            return b.date - a.date;
          });
        }
        list = [];
        fileAll = [].concat(text).concat(file);
        fileAll.forEach(v => {
          if (v.children) {
            this.setSort(v, v.children);
          }
        });
        if (parent) {
          parent.children = fileAll;
        } else {
          this.list = fileAll;
        }
      }
    },
    initData() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      api.post("sys/findFileList", { userId: this.user.id,ftpPath: "/",
          fileName: "/", }).then(res => {
        loading.close();
        if (res.code == 2000) {
          this.list = res.data[0].ftpFile;
          this.recursion(this.list, true);
          setTimeout(() => {
            this.baseList = JSON.parse(JSON.stringify(this.list));
          }, 300);
        }
      });
    },
    recursion(obj, b) {
      if (obj && obj.length) {
        obj.forEach((v, index) => {
          v.children = JSON.parse(JSON.stringify(v.ftpFile));
          v.py = py(v.fileName)[0].toLocaleLowerCase();
          v.date = new Date(v.createTime).getTime();
          v.isLoad = false;
          v.pross = 0;
          setTimeout(() => {
            v.uid = this.generateUUID();
          }, 100);
          v.isDown = false;
          v.isVideo = this.metas.includes(
            v.fileName
              .split(".")
              [v.fileName.split(".").length - 1].toLocaleLowerCase()
          );
          if (b) {
            v.id = index;
          }
          delete v.ftpFile;
          delete v.createUser;
          if (v.children) {
            this.recursion(v.children);
          }
        });
      }
    },
    searchEnter(e) {
      var keyCode = window.event ? e.keyCode : e.which;
      if (keyCode == 13) {
        this.btnSerch();
      }
    },
    generateUUID() {
      var d = new Date().getTime(),
        uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
          c
        ) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
      return uuid;
    },
    resetSerch() {
      this.query.timesort = 0;
      this.query.filesort = 0;
      this.query.date = "";
      this.query.name = "";
      this.list = this.baseList;
    }
  },
  created() {
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
.el-tree-node__content {
  line-height: 30px;
  height: 30px !important;
}
.file-active {
  color: #2398f2;
}
.bb-fe {
  border-bottom: 1px solid #f2f2f2;
}
.fc-fc6 {
  color: #fc6;
}
</style>
