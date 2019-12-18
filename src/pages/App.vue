<template>
  <router-view class="wi-1200"></router-view>
</template>
<style lang="less">
@import url("~@css/pc.less");
@import url("~element-ui/lib/theme-chalk/index.css");
@import "~vue-loading-new/dist/vueLoadingNew.css";
body {
  overflow: hidden;
}
.bg-bc {
  background-color: #409eff;
  color: #fff;
}
.bg-fc {
  color: #409eff;
}
.fc-a0cfff {
  color: #d5eaff;
}

.wi-1200 {
  min-width: 1200px;
}

.el-menu {
    border-right: 0 !important;
  }
.menu-config {
  
  .menu-config-title {
    background-color: #1b2737;
    border-bottom: 1px solid #000;
    border-top: 1px solid #333f4a;
    line-height: 48px !important;
    color: #c4e4ef;
    i {
      color: #c4e4ef;
    }
    &:first-child {
      border-top: 0;
    }
    .el-submenu__title {
      background-color: #1b2737;
      color: #c4e4ef;
    }

    .el-menu-item-group__title {
      padding: 0;
    }
    .menu-config-item {
      background-color: #2b3953;
      i {
        color: #c4e4ef !important;
      }
      background-color: #2b3953;
      color: #c4e4ef !important;
      padding-left: 40px !important;
    }
    .el-menu--inline {
      border-top: 1px solid #000;
    }
    .is-active {
      position: relative;
      background-color: #314f75;
      &:before {
        content: "";
        height: 100%;
        width: 4px;
        position: absolute;
        background-color: #1976d2;
        top: 0;
        left: 0;
      }
    }
    &.is-active {
      color: #1976d2;
      i {
        color: #1976d2;
      }
      .title {
        color: #1976d2 !important;
      }
    }
  }
}
.ff {
  font-family: tahoma, "microsoft yahei", "\5FAE\8F6F\96C5\9ED1" !important;
}
.fc-bs1 {
  color: #587ed1;
}
.fc-bs2 {
  color: #4778c7;
}
.fc-bs3 {
  color: #1eadf3;
}
.fc-bs4 {
  color: #78a7ff;
}
.fc-bs5 {
  color: #c4e4ef;
}
.fc-bs6 {
  color: #1b2737;
}
.fc-bs6 {
  color: #1b2737;
}
.fc-bs7 {
  color: #2b3953;
}
.fc-bs8 {
  color: #3d444a;
}
.bc-bs1 {
  background-color: #1b2737;
}
.bc-bs2 {
  background-color: #2b3953;
}
.bc-bs3 {
  background-color: #3d444a;
}
.bc-bs4 {
  background-color: #999999;
}
.bc-bs5 {
  background-color: #f5f5f5;
}
.bc-bs6 {
  background-color: #587ed1;
}
.bc-bs7 {
  background-color: #4778c7;
}
.bc-bs8 {
  background-color: #1eadf3;
}
.bc-bs9 {
  background-color: #78a7ff;
}
.bc-bs10 {
  background-color: #1976d2;
}
.bc-bs11 {
  background-color: #2487e8;
}

.table {
  thead tr td {
    padding: 12px 10px;
    background-color: #f5f6f6;
    font-weight: bold;
    font-size: 13px;
    color: #888;
  }
  tbody tr td {
    padding: 11px 10px;
    border-bottom: 1px solid #f2f2f2;
  }
  tbody tr {
    color: #555;
    &:hover {
      background-color: #f2f2f2;
      color: #000;
      cursor: pointer;
    }
  }
}
.active {
  &:hover {
    color: #1eadf3;
  }
}
.module-dialog {
  .el-dialog__headerbtn {
    top: 10px;
    right: 10px;
    font-size: 22px;
  }
  .el-dialog__header {
    padding: 10px 15px 0;
  }
  .el-dialog__body {
    padding: 15px;
  }
  .el-dialog__footer {
    padding: 0 15px 10px;
  }
}
.dialog-table {
  tr td {
    padding: 5px;
    border: 1px solid #f2f2f2;
  }
}
</style>
