<template>
    <div class="w-all">
        <div class="flex ai-c mb20">
            <span class="w-120">服务器IP地址：</span>
            <el-input v-model="data.ipAddress" readonly></el-input>
        </div>
        <div class="flex ai-c mb20">
            <span class="w-120">服务器MAC地址：</span>
            <el-input v-model="data.macAddress" readonly></el-input>
        </div>
        <div class="flex ai-c mb20">
            <span class="w-120">服务器CPU序列号：</span>
            <el-input v-model="data.cpuSerial" readonly></el-input>
        </div>
        <div class="flex ai-c mb20">
            <span class="w-120">服务器主板序列号：</span>
            <el-input v-model="data.mainBoardSerial"  readonly></el-input>
        </div>
    </div>
</template>

<script>
    import api from "../store/api.js";
    export default {
        data(){
            return {
                data:{
                    ipAddress:"",
                    macAddress:"",
                    cpuSerial:"",
                    mainBoardSerial:""
                }
            }
        },
        methods:{
            initData(){
                api.get("sys/getServerInfos").then(res => {
                    if(res.code==2000){
                        this.data = res.data;
                    }
                });
            }
        },
        created() {
            this.initData();
        }
    }
</script>

<style scoped>

</style>
