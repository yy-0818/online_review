<template>
  <div>
    <el-menu
      style="width: 200px; min-height: calc(100vh - 50px)"
      :default-active="path"
      router
    >
      <el-menu-item index="/home">主页</el-menu-item>

      <el-menu-item index="/paper">论文上传</el-menu-item>

      <el-menu-item index="/news">资源分享</el-menu-item>

      <!-- <el-menu-item index="/im">聊天室</el-menu-item> -->

      <!-- <el-menu-item index="/message">在线留言</el-menu-item> -->

      <el-menu-item index="/see" v-if="user.role === 3 || user.role === 2"
        >审核论文</el-menu-item
      >

      <el-submenu index="1" v-if="user.role === 3 || user.role === 2">
        <template #title>系统管理</template>
        <el-menu-item index="/user">用户管理</el-menu-item>
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

<style scoped></style>
