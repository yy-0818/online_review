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
              href="https://api.idocv.com/view/lNoZBQw?type=html "
              target="_blank"
              ><span>Paper format (preliminary draft) </span></a
            >

            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <!-- <el-button type="text" class="button" 
                >操作按钮</el-button
              > -->
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
          <img src="../assets/img/fc.png" class="image" />
          <div style="padding: 14px;">
            <a
              href="https://api.idocv.com/view/bWhilgw?type=imgall"
              target="_blank"
              ><span>Explanation </span></a
            >
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <!-- <el-button type="text" class="button">操作按钮</el-button> -->
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
          <img src="../assets/img/fc.png" class="image" />
          <div style="padding: 14px;">
            <span>园翁莫把秋荷折，因与游鱼盖夕阳宋。</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <!-- <el-button type="text" class="button">操作按钮</el-button> -->
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row> </el-row>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      currentDate: new Date(),
    };
  },
  methods: {},
};
</script>

<style scoped>
.el-card {
  min-width: 380px;
  margin-right: 20px;
  transition: all 0.5s;
}
.el-card:hover {
  margin-top: -8px;
}

/* .el-row {
  padding: 12px;
} */

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
  padding: 0px;
  float: right;
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
</style>
