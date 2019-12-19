<template>
    <div class="flex fd-c h-all w-all">
        <div class="w-all bc-fff ra-4 pl10 pr10 pb10 sha-7">
            <div class="flex w-all mt10">
                <div class="sha-7 mr15 pt10 wi-100 pr10">
                    <div class="flex w-all w-500 h-150">
                        <p style="margin: 20px;font-size: 20px;font-weight: bold">用户下载统计分析</p>
                        <el-button-group style="margin-top: 15px">
                            <el-button size="small" plain @click="openDay">日</el-button>
                            <el-button size="small" plain @click="openMonth">月</el-button>
                            <el-button size="small" plain @click="openYear">年</el-button>
                        </el-button-group>
                    </div>
                    <div  class="flex-line w-all w-1000 h-500">
                        <div class=" w-all" id="dayData"  v-show="dayFlag">
                        </div></div>
                    <div  class="flex-line w-all w-1000 h-500">
                        <div class=" w-all" id="monthData" v-show="monthFlag">
                        </div></div>
                    <div  class="flex-line w-all w-1000 h-500">
                        <div class=" w-all" id="yearData" v-show="yearFlag">
                        </div>
                    </div>
                </div>
                <div class="flex-1">
                    <div class="flex w-all w-500 h-150">
                        <p style="margin: 20px;font-size: 20px;font-weight: bold">用户上传统计分析</p>
                        <el-button-group style="margin-top: 15px">
                            <el-button size="small" plain @click="openFileDay">日</el-button>
                            <el-button size="small" plain @click="openFileMonth">月</el-button>
                            <el-button size="small" plain @click="openFileYear">年</el-button>
                        </el-button-group>
                    </div>
                    <div  class="flex-line w-all w-1000 h-500">
                        <div class=" w-all" id="dayFileData"  v-show="dayFileFlag">
                        </div></div>
                    <div  class="flex-line w-all w-1000 h-500">
                        <div class=" w-all" id="monthFileData" v-show="monthFileFlag">
                        </div></div>
                    <div  class="flex-line w-all w-1000 h-500">
                        <div class=" w-all" id="yearFileData" v-show="yearFileFlag">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



</template>

<script>
    import api from "../../store/api.js";
    let echarts = require('echarts');
    export default {
        name: "dashboard",
        data(){
            return{
                dayFlag:true,
                monthFlag:true,
                yearFlag:true,
                dayFileFlag:true,
                monthFileFlag:true,
                yearFileFlag:true
            }
        },
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            // let myChart = echarts.init(document.getElementById('echartContainer'));
        },
        methods:{
            initChart(id,title,xname,yname,data,sname){
                let myChart = echarts.init(document.getElementById(id), 'light');
                myChart.clear();
                let option = {
                    title : {
                        text: title,
                        textStyle:{ //设置主标题风格
                            fontSize: 16,
                            fontWeight: 'normal',
                        },
                        padding: 0,
                        x:'center'
                    },
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    toolbox: {
                        left: 'right',
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '2%',
                        bottom: '10%',
                        top:'15%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            name: xname,
                            type : 'category',
                            nameGap:25,
                            nameLocation:"center",
                            data : data.map(function(item){
                                return item.date;
                            }),
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            name: yname,
                            nameGap:30,
                            nameLocation:"center",
                            type : 'value',
                            min:0
                        }
                    ],
                    legend: {
                        show:true,
                        name:sname,
                        padding: 30,
                        x:'left'
                    },
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        textStyle: { //数值样式
                            color: 'black',
                            fontSize: 16,
                        }
                    },
                    series : [
                        {
                            name:sname,
                            type:'bar',
                            barWidth: '60%',
                            data:data.map(function(item){
                                return item.count_num;
                            }),
                            itemStyle:{//
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#C8EBFA'},
                                            {offset: 0.5, color: '#94D8F6'},
                                            {offset: 1, color: '#00B0F0'}
                                        ]
                                    )
                                },
                            },
                        }
                    ]
                };

                myChart.setOption(option,true);
                window.onresize = myChart.resize;
            },
            initData(){
                api.get("sys/dashboard").then( res => {
                    if(res.code == 2000){
                        let data  = res.data;
                        // 绘制图表
                        this.initChart("dayData","用户下载统计(按天)","日期","次数",data.downday,"次数");
                        this.initChart("monthData","用户下载统计(按月)","日期","次数",data.downmonth,"次数");
                        this.initChart("yearData","用户下载统计(按年)","日期","次数",data.downyear,"次数");

                        this.initChart("dayFileData","用户上传统计(按天)","日期","次数",data.fileday,"次数");
                        this.initChart("monthFileData","用户上传统计(按月)","日期","次数",data.filemonth,"次数");
                        this.initChart("yearFileData","用户上传统计(按年)","日期","次数",data.fileyear,"次数");
                        this.dayFlag = true;
                        this.monthFlag = false;
                        this.yearFlag = false;
                        this.dayFileFlag = true;
                        this.monthFileFlag = false;
                        this.yearFileFlag = false;
                    }else {
                        this.$message.error(red.message);
                    }
                });
            },
            openYear(){
                this.dayFlag = false;
                this.monthFlag = false;
                this.yearFlag = true;
            },
            openMonth(){
                this.dayFlag = false;
                this.monthFlag = true;
                this.yearFlag = false;
            },
            openDay(){
                this.dayFlag = true;
                this.monthFlag = false;
                this.yearFlag = false;
            },
            openFileYear(){
                this.dayFileFlag = false;
                this.monthFileFlag = false;
                this.yearFileFlag = true;
            },
            openFileMonth(){
                this.dayFileFlag = false;
                this.monthFileFlag = true;
                this.yearFileFlag = false;
            },
            openFileDay(){
                this.dayFileFlag = true;
                this.monthFileFlag = false;
                this.yearFileFlag = false;
            }
        },
        created(){
            this.initData();
        }
    }
</script>

<style scoped>

</style>
