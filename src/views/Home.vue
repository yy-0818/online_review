<template>
  <div style="padding:10px">
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
          <img src="../assets/img/fc.png" class="image" />

          <div style="padding: 14px;">
            <a
              href="http://8.136.96.167:8012/onlinePreview?url=aHR0cDovLzQ5LjIzNC41MS4yMjA6MTIzNDUvZmlsZXMvZGIxMWMyMGIzZTRlNDk4MmJmOTY4YmQyMTcwZGU3NThfUGFwZXIgZm9ybWF0IChwcmVsaW1pbmFyeSBkcmFmdCkuZG9jeA%3D%3D&officePreviewType=pdf"
              target="_blank"
              ><span>Paper format (preliminary draft) </span></a
            >

            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" @click="open" class="button"
                >操作按钮</el-button
              >
            </div>
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
          <img src="../assets/img/rl.png" class="image" alt="" />
          <div style="padding: 14px;">
            <a
              href="http://8.136.96.167:8012/onlinePreview?url=aHR0cDovLzQ5LjIzNC41MS4yMjA6MTIzNDUvZmlsZXMvMmUyZDgxYzFmM2U0NGNlY2JkYTg2ZGIzNmUxOTliYWRfRXhwbGFuYXRpb24uZG9jeA%3D%3D&officePreviewType=pdf"
              target="_blank"
              ><span>Explanation </span></a
            >
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" @click="open2" class="button"
                >操作按钮</el-button
              >
            </div>
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
          <img src="../assets/img/hh.png" class="image" />
          <div style="padding: 14px;">
            <span>园翁莫把秋荷折，因与游鱼盖夕阳宋。</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>

              <el-button type="text" class="button" @click="open3"
                >操作按钮</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--    <el-row style="margin-top: 10px;">-->
    <!--      <el-card class="box-card" shadow="hover">-->
    <!--        <template #header>-->
    <!--          <div class="card-header">-->
    <!--            <span style="  font-size: 20px;">入站详情</span>-->
    <!--            &lt;!&ndash; <el-button class="button" type="text">操作按钮</el-button> &ndash;&gt;-->
    <!--          </div>-->
    <!--        </template>-->
    <!--        <div v-for="o in 4" :key="o" class="text item">-->
    <!--          {{ " " + o }}-->
    <!--        </div>-->
    <!--      </el-card>-->
    <!--    </el-row>-->
  </div>
</template>

<script>
import request from "@/utils/request";
import { h } from "@vue/runtime-core";

export default {
  data() {
    return {
      currentDate: new Date(),
    };
  },
  methods: {
    open() {
      this.$notify({
        title: "温馨提示",
        message: h(
          "i",
          { style: "color: teal" },
          "这是关于书写论文的相关内容(格式)"
        ),
      });
    },
    open2() {
      this.$notify({
        title: "温馨提示",
        message: h(
          "i",
          { style: "color: teal" },
          "这是关于书写论文的相关内容(注释)"
        ),
      });
    },
    open3() {
      this.$notify({
        title: "温馨提示",
        message: h(
          "i",
          { style: "color: teal" },
          "这是什么也不是这是什么也不是这是什么也不是这是什么也不是" +
            "这是什么也不是这是什么也不是这是什么也不是这是什么也不是"
        ),
      });
    },
  },
};
</script>

<style scoped>
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
</style>
