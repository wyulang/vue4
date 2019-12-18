<template>
    <div class="w-all">
        <!--<div class="w-all pl200 sha-6 mb10 pr10 flex pt15 pb15 ai-c jc-s">-->
            <!--<el-button @click="openDialog()" size="small" type="primary">添加转码任务</el-button>-->
            <!--&lt;!&ndash;<el-button @click="initData()" size="small" type="primary">历史任务查询</el-button>&ndash;&gt;-->
        <!--</div>-->

        <div class="w-all">
            <!--<div class="w-all pl200 sha-6 mb10 pr10 flex pt15 pb15 ai-c jc-s">
                <el-button @click="openDialog()" size="small" type="primary">添加转码任务</el-button>
            </div>-->
            <!--<div v-for="(item, index) in list" :key="index" class="w-all flex ai-c h-40 bb-e">
                <div class="w-60 centent">
                    &lt;!&ndash; <img  class="h-40 w-30" :src="item.fileUrl" alt /> &ndash;&gt;
                    <span v-if="onFileType(item.fileName)=='image'" class="iconfont fs-24 fc-999 icontupian"></span>
                    <i v-else class="icon iconfont fs-28 fc-999" :class="onFileType(item.fileName)"></i>
                </div>
                <div class="flex-1">{{item.fileName}}</div>
                <div class="wb-20">上传时间：{{item.createDate | date('YYYY-MM-DD hh:mm:ss')}}</div>
                <div class="wb-10">文件大小：{{item.fileSize | fileSize}}</div>
                &lt;!&ndash;<div class="w-100 center">
                  <span @click="download(item.fileName,item.fileUrl)" class="fc-a hand">查看文件</span>
                </div>&ndash;&gt;
                <div v-if="query.role==1" class="w-70 fc-btn hand">
                    <span @click="deleteFiles(item)">重置</span>
                </div>
            </div>-->
            <!--<el-table  :data="list" border  style="width: 100%" :row-class-name="tableRowClassName">-->
            <el-button @click="openDialog()" size="small" type="primary" style=" margin-bottom: 18px;">添加转码任务</el-button>
            <!-- <el-table  :data="list" border  style="width: 100%" >
                <el-table-column prop="createDate" label="时间"></el-table-column>
                <el-table-column prop="fileName" label="任务名称"></el-table-column>
                <el-table-column prop="username" label="创建者"></el-table-column>
                <el-table-column prop="taskStatus" label="任务状态"  :formatter = 'stateFormat'></el-table-column>
                <el-table-column prop="taskEfficiency" label="效率"></el-table-column>
                <el-table-column prop="fileSize" label="文件大小">
                    <template scope="scope">
                        <span style="margin-left: 10px">{{scope.row.fileSize | fileSize}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template >
                       <el-button @click="handleClick(scope.row)" type="text" size="small">重置</el-button>
                        <el-button @click="deleteFiles(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table> -->

            <el-pagination
                    class="fr mt20 mb20"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    :current-page="query.pageNum"
                    :page-size="query.pageSize"
                    background
                    layout="total,sizes,prev, pager, next"
                    :page-sizes="[10, 20]"
                    :total="total">
            </el-pagination>
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
                    video: ["3gp", "flv", "rmvb", "avi", "wmv", "mpeg4"]
                },
                query: {
                    startTime: "",
                    endTime: "",
                    fileName: "",
                    pageSize: 10,
                    pageNum: 1,
                    userId: this.storage("userinfo").id,
                    role: this.storage("userinfo").role
                },
                list: [],
                dianList: [],
                total: 0,
                isFile: true,
                urls: "",
                baseUrl: "sys/uploadBigToFtp",
                endList: [],
                ftpCode: "",
                isUpload: false,
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
                    withCredentials:true,
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
            /*tableRowClassName({row, rowIndex}) {
                if (row.taskStatus === '1') {
                    return 'sucess-row';
                } else if (row.taskStatus === '2') {
                    return 'danger-row';
                }
                return '';
            },*/
            stateFormat(row, column){
                if (row.taskStatus === '1') {
                    return '成功';
                } else if (row.taskStatus === '2') {
                    return '失败';
                }
                return '进行中';
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
                const loading = this.$loading({
                    lock: true,
                    text: "Loading",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)"
                });
                api.post("sys/transcodeList", this.query).then(res => {
                    loading.close();
                    this.list = res.data.list;
                    this.total = res.data.total;
                });
            },
            handleSizeChange(val) {
                this.query.pageSize = val;
                // console.log(`每页 ${val} 条`);
                this.handleCurrentChange(1);
            },
            handleCurrentChange(val){
                this.query.pageNum = val;
                this.initData();
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
                            ftpCode: '',
                            fileName: file.name,
                            userId: this.storage("userinfo").id,
                            guid: data.data.guid,
                            type:"1"
                        })
                        .then(res => {
                            if (res.code == 2000) {
                                this.$message.success(file.name.concat("上传完成"));
                                this.initData();
                                setTimeout(v => {
                                    file.cancel();
                                });
                            }
                        });
                }
                if (file.totalChunks <= 1) {
                    this.$message.success(file.name.concat("上传完成"));
                    this.initData();
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
                this.options.query.userId = this.storage("userinfo").id;
                this.options.query.guid = this.uuid();
            },
            openDialog(){
                this.isUpload = true;
            },
            closeDialog(){
                this.isUpload = false;
            }
        },
        created() {
            this.options.target = api.getDomainApi() + this.baseUrl;
            this.initData();
        }
    };
</script>
<style lang="less">
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
    .el-table .danger-row {
        background: #f56c6c;
    }

    .el-table .sucess-row {
        background: #67c23a;
    }
</style>
