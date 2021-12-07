<template>
  <div>
    <el-menu
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409eff"
      style="width: 215px; min-height: calc(100vh - 50px);height:100%"
      :default-active="path"
      :unique-opened="true"
      router
    >
      <el-menu-item index="/home" class="el-menu-item-h">
        <i class="el-icon-s-home"></i>主页</el-menu-item
      >
      <!-- =================================== -->
      <el-submenu index="1">
        <template #title>
          <span class="el-menu-item-h">
            <i class="el-icon-menu"></i>成果上传</span
          >
        </template>
        <el-menu-item index="/paper" class="el-menu-item-h">
          <i class="el-icon-s-promotion"></i>论文上传</el-menu-item
        >

        <el-menu-item index="1-2" class="el-menu-item-h">
          <i class="el-icon-s-promotion"></i>专利上传</el-menu-item
        >

        <el-menu-item index="1-3" class="el-menu-item-h">
          <i class="el-icon-s-promotion"></i>项目报告</el-menu-item
        >
      </el-submenu>
      <!-- ===================================== -->
      <el-menu-item index="/news" class="el-menu-item-h">
        <i class="el-icon-document"></i>资源分享</el-menu-item
      >
      <!-- ============================================ -->
      <el-menu-item index="/MyPaper" class="el-menu-item-h">
        <i class="el-icon-star-on"></i>我的论文</el-menu-item
      >

      <!-- <el-submenu index="10">
        <template #title>
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-submenu index="1-4">
          <template #title>选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu> -->
      <!-- ================================================ -->
      <el-submenu
        index="2"
        v-if="user.role === 2 || user.role === 3 || user.role === 4"
      >
        <template #title>
          <span class="el-menu-item-h">
            <i class="el-icon-menu"></i>论文审核</span
          >
        </template>

        <el-submenu index="2-1" class="el-menu-item-h">
          <template #title><i class="el-icon-notebook-1"></i>一审</template>
          <el-menu-item index="/Reviewer" class="el-menu-item-h"
            ><i class="el-icon-notebook-1"></i>论文
          </el-menu-item>
          <el-menu-item index="/patent" class="el-menu-item-h"
            ><i class="el-icon-notebook-1"></i>专利
          </el-menu-item>
          <el-menu-item index="/report" class="el-menu-item-h"
            ><i class="el-icon-notebook-1"></i>报告
          </el-menu-item>
        </el-submenu>

        <el-submenu index="2-2" class="el-menu-item-h">
          <template #title><i class="el-icon-notebook-1"></i>二审</template>
          <el-menu-item index="/Reviewer2" class="el-menu-item-h"
            ><i class="el-icon-notebook-1"></i>论文
          </el-menu-item>
          <el-menu-item index="/patent2" class="el-menu-item-h"
            ><i class="el-icon-notebook-1"></i>专利
          </el-menu-item>
          <el-menu-item index="/report2" class="el-menu-item-h"
            ><i class="el-icon-notebook-1"></i>报告
          </el-menu-item>
        </el-submenu>

        <el-submenu index="2-3" class="el-menu-item-h">
          <template #title><i class="el-icon-notebook-1"></i>终审</template>

          <el-menu-item index="/Reviewer3" class="el-menu-item-h"
            ><i class="el-icon-notebook-1"></i>论文
          </el-menu-item>
          <el-menu-item index="/patent3" class="el-menu-item-h"
            ><i class="el-icon-notebook-1"></i>专利
          </el-menu-item>
          <el-menu-item index="/report" class="el-menu-item-h"
            ><i class="el-icon-notebook-1"></i>报告
          </el-menu-item>
        </el-submenu>
      </el-submenu>
      <!--  -->
      <el-submenu
        index="3"
        v-if="user.role === 2 || user.role === 3 || user.role === 4"
      >
        <template #title>
          <span class="el-menu-item-h">
            <i class="el-icon-s-tools"></i>系统管理</span
          >
        </template>
        <el-menu-item index="/user" class="el-menu-item-h">
          <i class="el-icon-s-custom"></i>用户管理</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Aside",
  data() {
    return {
      user: {},
      path: this.$route.path, // 设置默认高亮的菜单
    };
  },
  created() {
    let userStr = sessionStorage.getItem("user") || "{}";
    this.user = JSON.parse(userStr);

    // 请求服务端，确认当前登录用户的 合法信息
    request.get("/user/" + this.user.id).then((res) => {
      if (res.code === "0") {
        this.user = res.data;
      }
    });
  },
};
</script>

<style scoped>
.el-menu-item-h {
  font-size: 16px;
}
</style>
