<template>
  <div class='w-all'>
    <div class="w-all bc-fff ra-4 pl10 pr10 pb10 sha-7 ">
      <div class="pt10 flex pb10" >
        <el-button @click="$store.state.isTrans=true;" type="primary" icon="iconfont icontianjia" size="small">添加转码任务</el-button>
        <span class="fc-000 pp10 fs-14 fb" >本工具支持音、视频文件转码：*音频文件支持上传ogg.mp3.wma.midi.wav,转码后输出wav文件;*视频文件支持上传vob (DVD格).mpg .mpeg  .mp4 .3gp .mov .rm  .rmvb .wmv .asf.avi.asx,转码后输出MP4文件;</span>
      </div>
      <div class="sha-3 mt5">
        <el-table :data="this.list" style="width: 100%">
          <el-table-column label="任务名称" prop="fileName" width="400"></el-table-column>
          <el-table-column label="创建者" prop="username" width="150"></el-table-column>
          <el-table-column label="任务状态" prop="taskStatus" width="400" :formatter="taskStausInfo">
            <template slot-scope="scope">
              <!--<el-progress v-if="scope.row.taskStatus == '0'" :text-inside="true" :stroke-width="24" :percentage="scope.row.process" status="success" ></el-progress>
              <span v-else>{{scope.row.taskStatus=='1'?'成功':(scope.row.taskStatus=='2'?'失败':'暂不支持格式')}}</span>-->
              <span v-html="taskStausInfo(scope.row,scope.row.taskStatus)"></span>
            </template>
          </el-table-column>
          <el-table-column label="文件大小" prop="fileSize" :formatter="fileSize" width="180"></el-table-column>
          <el-table-column label="创建时间" prop="createDate" width="200"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="deleteFiles(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex jc-s mt15 mb5">
        <el-pagination class="fr" hide-on-single-page="true" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="query.pageNum" :page-size="query.pageSize" background layout="total,sizes,prev, pager, next" :page-sizes="[10, 20]" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../store/api.js";
import date from '../../../lib/date.js';
import { mapState } from "vuex";
export default {
  data() {
    return {
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
      total:0
    };
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
      this.$confirm("确定要删除吗！").then(res => {
        api.post("sys/transcodeDel", {
          id: item.id
        }).then(res => {
          this.$message.success("删除成功");
          this.initData();
        });
      });
    },
    handleSizeChange(val) {
      this.query.pageSize = val;
      // console.log(`每页 ${val} 条`);
      this.handleCurrentChange(1);
    },
    handleCurrentChange(val) {
      this.query.pageNum = val;
      this.initData();
    },
    initData() {
      let self = this;
      this.spinner.show();
      api.post("sys/transcodeList", this.query).then(res => {
          self.spinner.close();
          self.list = res.data.list;
          self.total = res.data.total;
      });
    },
    dataProcess(row){
        let self = this;
        let dt=setInterval(()=>{
            api.get("sys/process",{id:row.id}).then(res=>{
                if(res.code == 2000){
                    if(res.data == 100){
                        self.initData();
                        clearInterval(dt)
                    }
                    row.process= res.data;
                }
            })
        },3000);
    },
   fileSize(row, column, cellValue, index){
      return date.conver(cellValue);
   },
   taskStausInfo(row, cellValue){
        if(cellValue == '0'){
            this.dataProcess(row);
            return '<el-progress :text-inside="true" :stroke-width="24" :percentage="scope.row.process" status="success" ></el-progress>'
        }
        return cellValue=='1'?'成功':(cellValue=='2'?'失败':'暂不支持格式');
   }
  },
  created() {
    this.initData();
  }
};
</script>

<style lang='less' scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  &:hover {
    border: 1px dashed #1976d2;
    span {
      color: #1976d2;
    }
  }
}
</style>
