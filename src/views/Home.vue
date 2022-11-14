<template>
  <div>
    <div id="app">
      <!-- <vue-particles
        color="#409EFF"
        :particleOpacity="0.7"
        :particlesNumber="120"
        shapeType="circle"
        :particleSize="4"
        linesColor="#409EFF"
        :linesWidth="1.5"
        :lineLinked="true"
        :lineOpacity="0.6"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles> -->
    </div>

    <div style="padding:2px">
      <div style="min-height: 40vh;"><Message></Message></div>
      <!--    <div>-->
      <!--      &lt;!&ndash; type="card",卡片化,当页面宽度方向空间空余，但高度方向空间匮乏时，可使用卡片风格 &ndash;&gt;-->
      <!--      <el-carousel-->
      <!--        indicator-position="outside"-->
      <!--        :loop="true"-->
      <!--        :autoplay="true"-->
      <!--        :interval="5000"-->
      <!--        type="card"-->
      <!--        height="300px"-->
      <!--      >-->
      <!--        <el-carousel-item v-for="item in DataImgs" :key="item">-->
      <!--          &lt;!&ndash; <el-image style="width: 100%;height: 100%;" :src="url" :fit="fit">-->
      <!--          </el-image> &ndash;&gt;-->
      <!--          <div class="grid-content">-->
      <!--            <el-col :md="20" :offset="2">-->
      <!--              <div>-->
      <!--                <img :src="item.src" style="width: 100%;height: 100%;" />-->
      <!--                &lt;!&ndash; <p class="italictext">{{ item.txt }}</p>-->
      <!--                <span class="service">{{ item.txt2 }}</span> &ndash;&gt;-->
      <!--              </div>-->
      <!--            </el-col>-->
      <!--          </div>-->
      <!--        </el-carousel-item>-->
      <!--      </el-carousel>-->
      <!--    </div>-->
      <el-row>
        <el-col
          :span="8"
          v-for="(o, index) in 1"
          :key="o"
          :offset="index > 0 ? 1 : 0"
        >
          <el-card
            style="margin-right: auto;"
            :body-style="{ padding: '0px' }"
            shadow="hover"
          >
            <!--          <img-->
            <!--            src="https://paper-review-system-1253346686.cos.ap-guangzhou.myqcloud.com/img/fc.png"-->
            <!--            class="image"-->
            <!--          />-->
            <img
              src="http://static.ivanlife.cn/img/wallhaven-l3z9rp_3840x2160.png"
              class="image"
              alt=""
            />

            <div style="padding: 14px;">
              <a
                href="http://blog.ivanlife.cn:8012/onlinePreview?url=aHR0cHM6Ly9wYXBlci1yZXZpZXctc3lzdGVtLTEyNTMzNDY2ODYuY29zLmFwLWd1YW5nemhvdS5teXFjbG91ZC5jb20vZG9jcy9FeHBsYW5hdGlvbi5kb2N4&officePreviewType=pdf"
                target="_blank"
                ><span>论文标准</span></a
              >

              <!--            <div class="bottom clearfix">-->
              <!--              <time class="time">{{ currentDate }}</time>-->
              <!--              <el-button type="text" @click="open" class="button"-->
              <!--                >操作按钮-->
              <!--              </el-button>-->
              <!--            </div>-->
            </div>
          </el-card>
        </el-col>
        <el-col
          :span="8"
          v-for="(o, index) in 1"
          :key="o"
          :offset="index > 0 ? 1 : 0"
        >
          <el-card
            style="margin-right: auto;"
            :body-style="{ padding: '0px' }"
            shadow="hover"
          >
            <!--          <img-->
            <!--            src="https://paper-review-system-1253346686.cos.ap-guangzhou.myqcloud.com/img/rl.png"-->
            <!--            class="image"-->
            <!--            alt=""-->
            <!--          />-->
            <img
              src="http://static.ivanlife.cn/img/wallhaven-9mogy1_1920x1080.png"
              class="image"
              alt=""
            />
            <div style="padding: 14px;">
              <a
                href="http://blog.ivanlife.cn:8012/onlinePreview?url=aHR0cDovL3BhcGVyLmx1bmF0aWMucmVuL2FwaS9maWxlcy83MGZjOTRmNTE0ZDU0ZTg2OTlkMGYwOTBiY2VkNWYxOV%2FmlofnjK7moIflh4YucGRm"
                target="_blank"
                ><span>文献标准</span></a
              >
              <!--            <div class="bottom clearfix">-->
              <!--              <time class="time">{{ currentDate }}</time>-->
              <!--              <el-button type="text" @click="open2" class="button"-->
              <!--                >操作按钮-->
              <!--              </el-button>-->
              <!--            </div>-->
            </div>
          </el-card>
        </el-col>
        <el-col
          :span="8"
          v-for="(o, index) in 1"
          :key="o"
          :offset="index > 0 ? 1 : 0"
        >
          <el-card
            style="margin-right: auto;"
            :body-style="{ padding: '0px' }"
            shadow="hover"
          >
            <!--            <img-->
            <!--              src="https://paper-review-system-1253346686.cos.ap-guangzhou.myqcloud.com/img/hh.png"-->
            <!--              class="image"-->
            <!--              alt="夕阳"-->
            <!--            />-->

            <img
              src="http://static.ivanlife.cn/img/wallhaven-9mo7kw_1920x1080.png"
              class="image"
              alt=""
            />

            <div style="padding: 14px;">
              <a
                href="http://blog.ivanlife.cn:8012/onlinePreview?url=aHR0cDovL3BhcGVyLmx1bmF0aWMucmVuL2FwaS9maWxlcy9kYzZhNjI5ZjkwN2I0NmY3YTdhNDRjNjZhY2NmMjJjZF%2FkuJPliKnmqKHmnb8ucGRm"
                target="_blank"
                ><span>专利模板</span></a
              >

              <!--              <div class="bottom clearfix">-->
              <!--                <time class="time">{{ currentDate }}</time>-->

              <!--                <el-button type="text" class="button" @click="open3"-->
              <!--                  >操作按钮-->
              <!--                </el-button>-->
              <!--              </div>-->
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!--    <Message></Message>-->
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { h } from "@vue/runtime-core";
import Message from "@/components/Message.vue";

export default {
  name: "App",
  components: { Message },
  data() {
    return {
      // imgSrc: {
      //   backgroundImage:
      //       "url(https://paper-review-system-1253346686.cos.ap-guangzhou.myqcloud.com/carousel/3.png)",
      //   backgroundRepeat: "no-repeat",
      // },

      fit: "cover",
      // imgs: ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg"],
      DataImgs: [
        {
          src:
            "https://paper-review-system-1253346686.cos.ap-guangzhou.myqcloud.com/carousel/1.png",
          txt: '"Keep on going never give up."',
          txt2: '"勇往直前，决不放弃！"',
        },
        {
          src:
            "https://paper-review-system-1253346686.cos.ap-guangzhou.myqcloud.com/carousel/2.png",
        },
        {
          src:
            "https://paper-review-system-1253346686.cos.ap-guangzhou.myqcloud.com/carousel/11.png",
        },
        {
          src:
            "https://paper-review-system-1253346686.cos.ap-guangzhou.myqcloud.com/carousel/4.png",
        },
        {
          src:
            "https://paper-review-system-1253346686.cos.ap-guangzhou.myqcloud.com/carousel/13.jpg",
        },
        {
          src:
            "https://paper-review-system-1253346686.cos.ap-guangzhou.myqcloud.com/carousel/12.jpg",
        },
      ],
      lay_type: 0,
      currentDate: new Date(),
    };
  },
  mounted() {
    console.log(
      "%c我佛慈悲",
      " text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em"
    );
    console.log(
      " ......................阿弥陀佛......................\n" +
        "                      _oo0oo_                      \n" +
        "                     o8888888o                     \n" +
        '                     88" . "88                     \n' +
        "                     (| -_- |)                     \n" +
        "                     0\\  =  /0                     \n" +
        "                   ___/‘---’\\___                   \n" +
        "                  .' \\|       |/ '.                 \n" +
        "                 / \\\\|||  :  |||// \\                \n" +
        "                / _||||| -卍-|||||_ \\               \n" +
        "               |   | \\\\\\  -  /// |   |              \n" +
        "               | \\_|  ''\\---/''  |_/ |              \n" +
        "               \\  .-\\__  '-'  ___/-. /              \n" +
        "             ___'. .'  /--.--\\  '. .'___            \n" +
        '         ."" ‘<  ‘.___\\_<|>_/___.’>’ "".          \n' +
        "       | | :  ‘- \\‘.;‘\\ _ /’;.’/ - ’ : | |        \n" +
        "         \\  \\ ‘_.   \\_ __\\ /__ _/   .-’ /  /        \n" +
        "    =====‘-.____‘.___ \\_____/___.-’___.-’=====     \n" +
        "                       ‘=---=’                      \n" +
        "                                                    \n" +
        "....................佛祖保佑 ,永无BUG..................."
    );
  },
  methods: {
    open() {
      this.$notify({
        title: "温馨提示",
        message: h(
          "i",
          { style: "color: teal" },
          "这是关于书写论文的相关内容(示例)"
        ),
      });
    },
    open2() {
      this.$notify({
        title: "温馨提示",
        message: h(
          "i",
          { style: "color: teal" },
          "这是关于书写论文的相关内容(要求说明)"
        ),
      });
    },
    open3() {
      this.$notify({
        title: "SAYING",
        message: h(
          "i",
          { style: "color: teal" },
          "Four short words sum up what has lifted most successful individuals above the crowd: a little bit more.\n" +
            "成功的秘诀就是四个简单的字：多一点点。"
        ),
      });
    },
  },
};
</script>

<style scoped>
/*.welcome-page {*/
/*  display: flex;*/
/*  width: 100%;*/
/*  height: 100vh;*/
/*  overflow: hidden;*/
/*  background-size: 100% 100%;*/
/*}*/

.el-card {
  min-width: 380px;
  margin-right: 20px;
  margin-top: 10px;
  transition: all 0.5s;
}

.el-card:hover {
  margin-top: -8px;
}

/* .el-row {
  padding: 10px;
} */

.el-button-t {
  padding-right: 20%;
}

.time {
  font-size: 13px;
  color: #999;
  float: right;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 15px;
}

.item {
  margin-top: 10px;
  margin-bottom: 18px;
}

.box-card {
  /* margin-top: 20x; */
  width: 568px;
}

/* a:hover {
  text-decoration: none;
  color: red;
} */
a:link {
  color: #000;
  text-decoration: none;
}

a:visited {
  color: rgb(10, 160, 247);
  text-decoration: none;
}

a:hover {
  color: #00f;
  text-decoration: none;
}

/* a:active {
  color: #fff;
  text-decoration: none;
} */

#app {
  position: fixed;
}
</style>
