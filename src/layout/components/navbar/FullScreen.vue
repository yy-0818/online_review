<template>
  <!-- <el-tooltip
    class="item"
    effect="dark"
    :content="fullscreen ? '退出全屏' : '全屏'"
    placement="bottom"
  >
    <svg-icon
      v-if="!fullscreen"
      name="full-screen-max"
      @click="handleFullScreen"
    ></svg-icon>
    <svg-icon
      :sss="fullscreen"
      v-else
      name="full-screen-min"
      @click="handleFullScreen"
    ></svg-icon>
  </el-tooltip> -->

  <!-- 全屏显示 -->
  <div class="btn-fullscreen" @click="handleFullScreen">
    <el-tooltip
      effect="light"
      :content="fullscreen ? '退出全屏' : '全屏'"
      placement="bottom"
    >
      <i class="el-icon-rank"></i>
    </el-tooltip>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { changeFullScreen, listenerEvent } from "./fullScreen";
export default {
  // setup() {
  //   const data = reactive({
  //     fullscreen: false,
  //   });
  //   listenerEvent(() => {
  //     data.fullscreen = !data.fullscreen;
  //   }, data);
  //   // 全屏切换
  //   const handleFullScreen = () => changeFullScreen(data);
  //   const params = toRefs(data);
  //   return {
  //     ...params,
  //     handleFullScreen,
  //   };
  // },

  data() {
    return {
      fullscreen :false
    }
  },

  methods: {
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
.btn-fullscreen {
  transform: rotate(45deg);
  margin-top: 0;
  font-size: 22px;
}
</style>
