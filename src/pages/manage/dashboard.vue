<template>
  <div class="w-all flex">
    <div class="wb-49">
      <div class="flex w-all mb60 ai-c">
        <p class="fs-20 fb mr10">用户下载统计分析</p>
        <el-button-group>
          <el-button size="small" plain @click="openDay">日</el-button>
          <el-button size="small" plain @click="openMonth">月</el-button>
          <el-button size="small" plain @click="openYear">年</el-button>
        </el-button-group>
      </div>
      <div v-show="dayFlag" class="flex-line w-all h-500">
        <div class="w-all pp10" id="dayData" >
        </div>
      </div>
      <div v-show="monthFlag" class="flex-line w-all h-500">
        <div class="w-all pp10" id="monthData" >
        </div>
      </div>
      <div  v-show="yearFlag" class="flex-line w-all h-500">
        <div class=" w-all pp10" id="yearData">
        </div>
      </div>
    </div>

    <div class="wb-49">
      <div class="flex w-all ai-c mb60">
        <p class="fs-20 fb mr10">用户上传统计分析</p>
        <el-button-group>
          <el-button size="small" plain @click="openFileDay">日</el-button>
          <el-button size="small" plain @click="openFileMonth">月</el-button>
          <el-button size="small" plain @click="openFileYear">年</el-button>
        </el-button-group>
      </div>
      <div v-show="dayFileFlag" class="flex-line w-all pp10 h-500">
        <div class=" w-all" id="dayFileData" >
        </div>
      </div>
      <div v-show="monthFileFlag" class="flex-line w-all pp10 h-500">
        <div class=" w-all" id="monthFileData" >
        </div>
      </div>
      <div v-show="yearFileFlag" class="flex-line w-all pp10 h-500">
        <div class=" w-all" id="yearFileData" >
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import api from "../../store/api.js";
let echarts = require('echarts');
export default {
  data() {
    return {
      dayFlag: true,
      monthFlag: true,
      yearFlag: true,
      dayFileFlag: true,
      monthFileFlag: true,
      yearFileFlag: true
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    // let myChart = echarts.init(document.getElementById('echartContainer'));
  },
  methods: {
    initChart(id, title, xname, yname, data, sname) {
      let myChart = echarts.init(document.getElementById(id), 'light');
      myChart.clear();
      let option = {
        title: {
          text: title,
          textStyle: { //设置主标题风格
            fontSize: 14,
            fontWeight: 'normal',
          },
          padding: 0,
          x: 'center'
        },
        color: ['#4778c7'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        toolbox: {
          left: 'right',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '2%',
          bottom: '10%',
          top: '15%',
          containLabel: true
        },
        xAxis: [
          {
            name: xname,
            type: 'category',
            nameGap: 25,
            nameLocation: "center",
            data: data.map(function (item) {
              return item.date;
            }),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            name: yname,
            nameGap: 30,
            nameLocation: "center",
            type: 'value',
            min: 0
          }
        ],
        legend: {
          show: true,
          name: sname,
          padding: 30,
          x: 'left'
        },
        label: {
          show: true, //开启显示
          position: 'top', //在上方显示
          textStyle: { //数值样式
            color: 'black',
            fontSize: 16,
          }
        },
        series: [
          {
            name: sname,
            type: 'bar',
            barWidth: '60%',
            data: data.map(function (item) {
              return item.count_num;
            }),
            itemStyle: {//
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#C8EBFA' },
                    { offset: 0.5, color: '#94D8F6' },
                    { offset: 1, color: '#00B0F0' }
                  ]
                )
              },
            },
          }
        ]
      };

      myChart.setOption(option, true);
      window.onresize = myChart.resize;
    },
    initData() {
      api.get("sys/dashboard").then(res => {
        if (res.code == 2000) {
          let data = res.data;
          // 绘制图表
          this.initChart("dayData", "用户下载统计(按天)", "日期", "次数", data.downday, "次数");
          this.initChart("monthData", "用户下载统计(按月)", "日期", "次数", data.downmonth, "次数");
          this.initChart("yearData", "用户下载统计(按年)", "日期", "次数", data.downyear, "次数");

          this.initChart("dayFileData", "用户上传统计(按天)", "日期", "次数", data.fileday, "次数");
          this.initChart("monthFileData", "用户上传统计(按月)", "日期", "次数", data.filemonth, "次数");
          this.initChart("yearFileData", "用户上传统计(按年)", "日期", "次数", data.fileyear, "次数");
          this.dayFlag = true;
          this.monthFlag = false;
          this.yearFlag = false;
          this.dayFileFlag = true;
          this.monthFileFlag = false;
          this.yearFileFlag = false;
        } else {
          this.$message.error(red.message);
        }
      });
    },
    openYear() {
      this.dayFlag = false;
      this.monthFlag = false;
      this.yearFlag = true;
    },
    openMonth() {
      this.dayFlag = false;
      this.monthFlag = true;
      this.yearFlag = false;
    },
    openDay() {
      this.dayFlag = true;
      this.monthFlag = false;
      this.yearFlag = false;
    },
    openFileYear() {
      this.dayFileFlag = false;
      this.monthFileFlag = false;
      this.yearFileFlag = true;
    },
    openFileMonth() {
      this.dayFileFlag = false;
      this.monthFileFlag = true;
      this.yearFileFlag = false;
    },
    openFileDay() {
      this.dayFileFlag = true;
      this.monthFileFlag = false;
      this.yearFileFlag = false;
    }
  },
  created() {
    this.initData();
  }
}
</script>

<style scoped>
</style>
