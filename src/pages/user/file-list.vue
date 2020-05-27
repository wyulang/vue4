<template>
  <div class='w-all'>
    <div class="w-all bc-fff pt10 pb10 sha-7 ra-4 pl10 pr10">
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
    <div class="w-all bc-fff ra-4 pl10 pr10 pb10 sha-7 mt10">
      <div class="pt10 flex pb10">
        <el-button @click="$store.state.isUpload=true;" icon="iconfont fs-13 mr5 iconshangchuan" size="small">外宣推送</el-button>
        <el-button @click="deleteAllFile()" icon="iconfont fs-13 mr5 iconshanchu1" size="small">批量删除</el-button>
      </div>
      <div class="sha-3 mt5">
        <table class="table w-all">
          <thead>
            <tr>
              <td class="wb-1">
                <el-checkbox :value="selectList.length==list.length&&selectList.length>0" @change="v=>{v?(selectList=list.map(d=>{return d.id})):(selectList=[])}"></el-checkbox>
              </td>
              <td class="w-100">文件</td>
              <td>文件名</td>
              <td>上传时间</td>
              <td>文件大小</td>
              <td>是否上传成功</td>
              <td class="w-150" v-if="query.role==1">操作</td>
            </tr>
          </thead>
          <tbody>
            <tr class="bt-e" v-for="(item, index) in list" :key="index">
              <td>
                <el-checkbox :value="selectList.includes(item.id)" @change="(v)=>{v?selectList.push(item.id):selectList.splice(selectList.indexOf(item.id),1)}"></el-checkbox>
              </td>
              <td>
                <span v-if="onFileType(item.fileName)=='image'" class="iconfont fs-24 fc-999 icontupian"></span>
                <i v-else class="icon iconfont fs-28 fc-999" :class="onFileType(item.fileName)"></i>
              </td>
              <td>{{item.fileName}}</td>
              <td>{{item.createDate}}</td>
              <td>{{item.fileSize | fileSize}}</td>
              <td>{{item.isUploadSucess=='0'?'上传中':(item.isUploadSucess=='1'?'成功':'失败')}}</td>
              <td v-if="query.role==1" class="w-150">
                <div @click="deleteFiles(item)" class="flex-line active ai-c hand mr10">
                  <span class="iconfont fs-14 mr2 iconshanchu1 hand "></span>
                  <span>删除</span>
                </div>
                <!--<div v-if="item.isUploadSucess =='2'" @click="deleteFiles(item)" class="flex-line active ai-c hand mr10">
                  <span class="iconfont fs-14 mr2 iconshangchuan hand "></span>
                  <span>重新上传</span>
                </div>-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex jc-s mt15 mb5">
        <el-pagination hide-on-single-page="true" class="fr mt5 mb5" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="query.pageNum" :page-size="query.pageSize" background layout="total,sizes,prev, pager, next" :page-sizes="[10, 20]" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../store/api.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      fileTypes: {
        xls: ["xls", "xlsx"],
        word: ["doc", "docx"],
        image: ["png", "jpg", "jpeg", "gif", "bmp"],
        video: ["3gp", "flv", "rmvb", "avi", "wmv", "mpeg4"],
        zip: ["zip", "rar", "7z", "cab"]
      },
      list: [],
      selectList: [],
      query: {
        startTime: "",
        endTime: "",
        fileName: "",
        pageSize: 10,
        pageNum: 1,
        userId: this.storage("userinfo").id,
        role: this.storage("userinfo").role
      },
    }
  },
  computed: {
    isChange() {
      return this.$store.state.changeUpload;　　//需要监听的数据
    }
  },
  watch: {
    isChange(newVal, oldVal) {
      this.initData()
    }
  },
  methods: {
    deleteFiles(item) {
      let _self = this;
        _self.$confirm("确定要删除吗！").then(res => {
        api
          .post("sys/deleteFile", {
            id: item.id,
            userId: _self.query.userId
          })
          .then(res => {
              if(res.code == 2000){
                  _self.$message.info("删除成功");
                  _self.initData();
              }else {
                  _self.$message.error(res.message);
              }

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
      this.spinner.show();
      api.post("sys/fileList", this.query).then(res => {
        this.spinner.close();
        this.list = res.data.list;
        this.total = res.data.total;
      });
    },
    handleSizeChange(val) {
      this.query.pageSize = val;
      this.handleCurrentChange(1);
    },
    handleCurrentChange(val) {
      this.query.pageNum = val;
      this.initData();
    },
    deleteAllFile(){
        let _self = this;
        if(_self.selectList.length == 0){
            _self.$message.warn("请至少选择一条记录");
        }else {
            _self.$confirm("确定要删除选中记录吗！").then(res => {
                api.post("sys/deleteAllFile", {
                        ids: _self.selectList.join(',')
                    })
                    .then(res => {
                        if(res.code == 2000){
                            _self.$message.info("删除成功");
                            _self.initData();
                        }else {
                            _self.$message.error(res.message);
                        }

                    });
            });
        }
    }
  },
  created() {
    this.initData();
  }
}
</script>

<style lang='less' scoped>
</style>
