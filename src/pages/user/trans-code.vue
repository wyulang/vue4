<template>
  <div class='w-all'>
    <div class="w-all bc-fff ra-4 pl10 pr10 pb10 sha-7 ">
      <div class="pt10 flex pb10" >
        <el-button @click="$store.state.isTrans=true;" type="primary" icon="iconfont icontianjia" size="small">添加转码任务</el-button>
        <span class="fc-000 pp10 fs-14 fb" >本工具支持音、视频文件转码：*音频文件支持上传ogg.mp3.wma.midi.wav,转码后输出wav文件;*视频文件支持上传vob (DVD格).mpg .mpeg  .mp4 .3gp .mov .rm  .rmvb .wmv .asf.avi.asx,转码后输出MP4文件;</span>
      </div>
      <div class="sha-3 mt5">
        <table class="table w-all">
          <thead>
            <tr>
              <td class="wb-1">
                <el-checkbox :value="selectList.length==list.length&&selectList.length>0" @change="v=>{v?(selectList=list.map(d=>{return d.id})):(selectList=[])}"></el-checkbox>
              </td>
              <td>任务名称</td>
              <td>创建者</td>
              <td>任务状态</td>
             <!-- <td>效率</td>-->
              <td>文件大小</td>
              <td>创建时间</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr class="bt-e" v-for="(item, index) in list" :key="index">
              <td>
                <el-checkbox :value="selectList.includes(item.id)" @change="(v)=>{v?selectList.push(item.id):selectList.splice(selectList.indexOf(item.id),1)}"></el-checkbox>
              </td>
              <td>{{item.fileName}}</td>
              <td>{{item.username}}</td>
              <!--<td v-if="item.taskStatus == '0'"><el-progress :text-inside="true" :stroke-width="24" :percentage="process" status="success" ></el-progress></td>-->
              <!--<td v-else>{{item.taskStatus=='1'?'成功':(item.taskStatus=='2'?'失败':(item.taskStatus=='3'?'暂不支持转码':'进行中'))}}</td>-->
              <td>{{item.taskStatus=='1'?'成功':(item.taskStatus=='2'?'失败':(item.taskStatus=='3'?'暂不支持转码':'进行中'))}}</td>
              <!--<td>{{item.taskEfficiency}}</td>-->
              <td>{{item.fileSize | fileSize}}</td>
              <td>{{item.createDate}}</td>
              <td class="w-150">
                <div @click="deleteFiles(item)" class="flex-line active ai-c hand mr10">
                  <span class="iconfont fs-14 mr2 iconshanchu hand "></span>
                  <span>删除</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
      total:0,
      process:0
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
          /*self.list.forEach(item=>{
            if(item.taskStatus =='0'){
                self.dataProcess(item)
            }
          })*/
      });
    },
    dataProcess(item){
        let self = this;
        let dt=setInterval(()=>{
            api.get("sys/process",{id:item.id}).then(res=>{
                if(res.code == 2000){
                    if(res.data == 100){
                        self.initData();
                        clearInterval(dt)
                    }
                    self.process= res.data;
                }
            })
        },3000);
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
