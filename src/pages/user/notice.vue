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
          <el-input placeholder="请输入内容" size="small" v-model="query.msgContent" clearable></el-input>
        </div>
      </div>
      <el-button @click="initData()" size="small" type="primary">搜索</el-button>
    </div>
    <div class="w-all bc-fff ra-4 pl10 pr10 pb10 sha-7 mt10 pt10">
      <div class="pt10 flex pb10">
        <el-button @click="readNoticeAll" icon="iconfont fs-13 mr5 iconread_all" size="small">全部标注已读</el-button>
      </div>
      <div class="sha-3 mt5">
        <table class="table w-all">
          <thead>
            <tr>
              <td class="wb-1">
                <el-checkbox :value="selectList.length==list.length&&selectList.length>0" @change="v=>{v?(selectList=list.map(d=>{return d.id})):(selectList=[])}"></el-checkbox>
              </td>
              <td>标题</td>
              <td>内容</td>
              <td>发布时间</td>
              <td>阅读状态</td>
              <!--<td>操作</td>-->
            </tr>
          </thead>
          <tbody>
            <tr class="bt-e" v-for="(item, index) in list" :key="index">
              <td>
                <el-checkbox :value="selectList.includes(item.id)" @change="(v)=>{v?selectList.push(item.id):selectList.splice(selectList.indexOf(item.id),1)}"></el-checkbox>
              </td>
              <td>{{item.sysAnnouncement.titile}}</td>
              <td>{{item.sysAnnouncement.msgContent}}</td>
              <td>{{item.sysAnnouncement.sendTime}}</td>
              <td>{{item.readFlag=='1'?'已读':'未读'}}</td>
              <!--<td class="w-150">
                            <div @click="deleteFiles(item)" class="flex-line active ai-c hand mr10">
                                <span class="iconfont fs-14 mr2 iconshanchu hand "></span>
                                <span>删除</span>
                            </div>
                        </td>-->
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

export default {
  data() {
    return {
      list: [],
      selectList: [],
      query: {
        startTime: "",
        endTime: "",
        msgContent: "",
        pageSize: 10,
        pageNum: 1
      },
      total: 0,
      process: 0
    };
  },
  methods: {
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
      api.post("sys/notice/list", this.query).then(res => {
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
    readNoticeAll(){
      api.get("sys/notice/readAll/").then(res => {
        if (res.code == 2000) {
          this.initData();
        }
      });
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
