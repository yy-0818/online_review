<template>
  <el-dropdown>
    <div class="header-user">
      <!-- <img src="@/assets/logo.png" alt="" /> -->
      <span>
        <el-avatar
          @error="errorHandler"
          :size="33"
          :src="
            form.avatarUrl === '/image/avatar.png'
              ? defaultAvatar
              : form.avatarUrl === undefined
              ? defaultAvatar
              : ' ' + form.avatarUrl
          "
          fit="scale-down"
        ></el-avatar>
      </span>
      <span style="padding-left:8px">{{ form.name }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="el-icon-user" @click="me"
          >个人信息</el-dropdown-item
        >
        <el-dropdown-item icon="el-icon-switch-button" divided @click="loginOut"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
const errorHandler = () => true  //图片加载失败时的回退行为
export default {
  data() {
    return {
      fullscreen: false,
      defaultAvatar: "http://static.ivanlife.cn/imges/1.jpg",
      form: {
        name: "",
        avatarUrl: "",
        dialogVisible: false, //控制大图预览
      },
    };
  },
  created() {
    let str = sessionStorage.getItem("user") || "{}";
    this.form = JSON.parse(str);
  },

  methods: {
    me() {
      this.$router.push("/person");
    },
    loginOut() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.header-user {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin: 0 4px;
  cursor: pointer;
  color: #ffffff;
  // img {
  //   width: 24px;
  //   height: 24px;
  //   border-radius: 50%;
  //   margin-right: 4px;
  // }
}
</style>
