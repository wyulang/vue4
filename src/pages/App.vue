<template>
  <router-view class="wi-1200"></router-view>
</template>
<style lang="less">
@import url('~@css/pc.less');
@import url('~element-ui/lib/theme-chalk/index.css');
body{
  overflow: hidden;
}
.bg-bc{
  background-color: #409eff;
  color: #fff;
}
.bg-fc{
  color: #409eff;
}
.fc-a0cfff{
  color: #d5eaff;
}

.wi-1200{
  min-width: 1200px;
}

.table{
  width: 99%;
  td{
    border-right: 1px solid #f5f5f5;
  }
  tr td:last-child{
    border-right: 0;
  }
  thead td{
    padding: 10px 10px;
    border-bottom: 1px solid #67c23a;
    background-color: #f9f9f9;
  }
  tbody td{
    padding: 10px 10px;
    border-bottom: 1px solid #f5f5f5;
  }
}
</style>
