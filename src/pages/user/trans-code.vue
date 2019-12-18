<template>
  <div class='w-all'>
    <div class="w-all bc-fff ra-4 pl10 pr10 pb10 sha-7 ">
      <div class="pt10 flex pb10">
        <el-button @click="$store.state.isTrans=true;" type="primary" icon="iconfont icontianjia" size="small">添加转码任务</el-button>
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
              <td>效率</td>
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
              <td>{{item.taskStatus=='1'?'成功':(item.taskStatus=='2'?'失败':'进行中')}}</td>
              <td>{{item.taskEfficiency}}</td>
              <td>{{item.fileSize | fileSize}}</td>
              <td>{{item.createDate| date('YYYY-MM-DD hh:mm:ss')}}</td>
              <td class="w-150">
                <div @click="btnAdd(item)" class="flex-line active ai-c hand mr10">
                  <span class="iconfont fs-14 mr2 iconbianji hand "></span>
                  <span>编辑</span>
                </div>
                <div @click="btnDelete([item.id])" class="flex-line active ai-c hand mr10">
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
      this.spinner.show();
      api.post("sys/transcodeList", this.query).then(res => {
        this.spinner.close();
        this.list = res.data.list;
        this.total = res.data.total;
      });
    },
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
