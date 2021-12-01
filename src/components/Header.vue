<template>
  <div class="div-header">
    <div class="div-header-a">
      在线审稿系统(OMRS)
    </div>
    <div style="flex: 1"></div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip
            effect="light"
            :content="fullscreen ? `取消全屏` : `全屏`"
            placement="bottom"
          >
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>

        <el-dropdown style="margin-top: -0px;">
          <span class="el-dropdown-link">
            <el-avatar
              :size="40"
              :src="
                user.avatarUrl === '/image/avatar.png'
                  ? defaultAvatar
                  : user.avatarUrl === undefined
                  ? defaultAvatar
                  : '/api' + user.avatarUrl
              "
              fit="scale-down"
            ></el-avatar>
            <!-- {{ user.name }}
            <i class="el-icon-arrow-down el-icon--right"></i> -->
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push('/person')"
                >个人信息
              </el-dropdown-item>

              <el-dropdown-item divided @click="$router.push('/login')"
                >退出系统
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["user"],
  data() {
    return {
      fullscreen: false,
      defaultAvatar: "/api/files/avatar.png",
    };
  },
  methods: {
    // userAvatarUrl() {
    //   let url = this.user.avatarUrl
    //
    //   if (url !== null && url !== '' && this.user.avatarUrl !== '/image/avatar.png') {
    //     return url
    //   } else return '/image/avatar.png'
    // },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
  },
};
</script>

<style scoped>
.header-right {
  float: right;
  padding-right: 15px;
}

.header-user-con {
  display: flex;
  height: 68px;
  align-items: center;
}

.btn-fullscreen {
  transform: rotate(45deg);
  margin-top: -14px;
  font-size: 25px;
}

.el-avatar {
  position: relative;
  top: -8px;
}

.div-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  background: #fefeff;
}

.div-header-a {
  width: 500px;
  padding-left: 15px;
  font-weight: bold;
  color: dodgerblue;
  font-size: 25px;
}
</style>
