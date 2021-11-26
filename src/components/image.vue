<template>
  <layout-div
    class="bg-e over-h flex-center flex"
    :width="width"
    :height="height"
    :unit="unit"
  >
    <img
      :src="src"
      @click="clickHandle"
      class="dis-n"
      ref="ddImg"
      @load="layer"
    />
    <slot />
  </layout-div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 45,
    },
    height: {
      type: Number,
      default: 45,
    },
    src: {
      type: String,
      default: "",
    },
    unit: {
      type: String,
      default: "rem",
    },
    type: {
      type: String,
      default: "auto",
    },
    fillet: {
      type: Number,
      default: 0,
    },
    stop: {
      //是否阻止冒泡
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      multiline: 100, //宽高，倍数 可根据UI的尺寸图进行设置比例 100==>相对于 750*1334
    };
  },
  methods: {
    clickHandle(e) {
      //点击事件处理
      this.stop && e.stopPropagation();
      this.$emit("click");
    },
    layer() {
      let item = this.$refs.ddImg,
        parent = item.parentNode,
        pw = parent.clientWidth,
        ph = parent.clientHeight,
        w = item.width,
        h = item.height;
      // 父级是一个正方形
      if (this.width == this.height) {
        if (w == h) {
          // 图片是正方形
          if (w >= pw) {
            item.style.width = "100%";
          } else {
            item.style.height = "100%";
          }
        } else if (w > h) {
          //图片是一个横向的矩形
          item.style.height = "100%";
        } else if (w < h) {
          //图片是一个纵向的矩形
          item.style.width = "100%";
        } else {
          item.style.height = "100%";
        }
      } else if (this.width > this.height) {
        if (w == h) {
          // 图片是正方形
          item.style.width = "100%";
        } else if (w > h) {
          //图片是一个横向的矩形
          if (w > pw) {
            if ((pw / w) * h > ph) {
              item.style.width = "100%";
            } else {
              item.style.height = "100%";
            }
          } else {
            item.style.height = "100%";
          }
        } else if (w < h) {
          //图片是一个纵向的矩形
          if ((pw / w) * h > ph) {
            item.style.width = "100%";
          } else {
            item.style.height = "100%";
          }
        } else {
          item.style.height = "100%";
        }
      }
      item.style.display = "block";
    },
  },
};
</script>

<style>
.bg-e {
  background-color: #eee;
}
.over-h {
  overflow: hidden;
}
.flex-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.posi-r {
  position: relative;
  z-index: 1;
}
.dis-n {
  display: none;
}
</style>
