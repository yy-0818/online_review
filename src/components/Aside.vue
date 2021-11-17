<template>
  <div>
    <el-menu
      style="width: 200px; min-height: calc(100vh - 50px)"
      :default-active="path"
      router
    >
      <el-menu-item index="/home" class="el-menu-item-h">主页</el-menu-item>

      <el-menu-item index="/paper" class="el-menu-item-h"
        >论文上传</el-menu-item
      >

      <el-menu-item index="/news" class="el-menu-item-h">资源分享</el-menu-item>

      <!-- <el-menu-item index="/im" class="el-menu-item-h">聊天室</el-menu-item> -->
      <!-- <el-menu-item index="/message" class="el-menu-item-h">在线留言</el-menu-item> -->

      <!-- <el-menu-item
        index="/Reviewer"
        class="el-menu-item-h"
        v-if="user.role === 3 || user.role === 2"
        >审核论文</el-menu-item
      > -->

      <el-submenu index="1" v-if="user.role === 3 || user.role === 2">
        <template #title>
          <span class="el-menu-item-h">论文审核</span>
        </template>
        <el-menu-item
          index="/Reviewer"
          class="el-menu-item-h"
          v-if="user.role === 3 || user.role === 2"
          >初审</el-menu-item
        >
        <el-menu-item
          index="/Reviewer2"
          class="el-menu-item-h"
          v-if="user.role === 3"
          >终审</el-menu-item
        >
      </el-submenu>

      <el-submenu index="1" v-if="user.role === 3 || user.role === 2">
        <template #title>
          <span class="el-menu-item-h">系统管理</span>
        </template>
        <el-menu-item index="/user" class="el-menu-item-h"
          >用户管理</el-menu-item
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
  font-size: 18px;
}
</style>
