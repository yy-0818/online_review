<template>
  <div style="padding:2%">
    <div id="app">
      <vue-particles
              color="#409EFF"
              :particleOpacity="0.7"
              :particlesNumber="120"
              shapeType="polygon"
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
      </vue-particles>
    </div>
    <el-row>
      <el-card class="el-card" shadow="hover">
        <el-form ref="form" :model="form" label-width="80px" size="mini">
          <el-form-item style="text-align: center" label-width="0">
            <el-upload
                    class="avatar-uploader"
                    action="/api/files/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
            >
              <img v-if="newAvatarUrl" :src="newAvatarUrl" class="avatar" />
              <img
                      v-else
                      :src="
                form.avatarUrl === '/image/avatar.png'
                  ? defaultAvatar
                  : form.avatarUrl === undefined
                  ? defaultAvatar
                  : '/api' + form.avatarUrl
              "
                      class="avatar"
              />

              <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
            </el-upload>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input
                    class="el-form-item-d"
                    v-model="form.email"
                    disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input class="el-form-item-d" v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="密码">
            <el-input
                    class="el-form-item-d"
                    v-model="form.password"
                    show-password
                    placeholder="修改密码"
            ></el-input>
          </el-form-item>

<!--          <el-form-item label="角色">-->
<!--            <el-input-->
<!--                class="el-form-item-d"-->
<!--                v-model="form.role"-->
<!--                disabled-->
<!--            ></el-input>-->
<!--          </el-form-item>-->

          <el-form-item label="研究方向">
            <el-select v-model="form.directionId" style="width:80%">
              <el-option
                      v-for="item in directionIdOptions"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="性别">
            <el-select v-model="form.gender" style="width:80%">
              <el-option
                      v-for="item in genderOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="text-align: center">
          <el-button type="primary" @click="update">保存</el-button>
        </div>
      </el-card>
    </el-row>

  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Person",
  data() {
    return {
      defaultAvatar:
        "https://paper-review-system-1253346686.cos.ap-guangzhou.myqcloud.com/img/avatar.png",
      newAvatarUrl: "", // tx: "上传头像",
      form: {
        id: "",
        email: "",
        name: "",
        gender: 0,
        password: "",
        avatarUrl: "",
        directionId: "",
        role:"",
      },
      directionIdOptions: [],
      roles: [
        { value: 1, label: "普通用户" },
        { value: 2, label: "审核员" },
        { value: 3, label: "管理员" },
        { value: 4, label: "超级管理员" },
      ],
      genderOptions: [
        { value: 1, label: "男" },
        { value: 0, label: "女" },
      ],
    };
  },
  created() {
    this.getDirections();
    let str = sessionStorage.getItem("user") || "{}";
    this.form = JSON.parse(str);
  },
  methods: {
    handleAvatarSuccess(res) {
      this.newAvatarUrl = "/api" + res.data;
      this.$message.success("上传成功");
      // this.update()
    },
    getDirections() {
      request.get("/direction").then((res) => {
        // console.log(res.data);
        this.directionIdOptions = res.data;
      });
    },
    update() {
      if (this.newAvatarUrl !== "") {
        let url = this.newAvatarUrl.replace("/api", "");
        console.log(url);
        this.form.avatarUrl = url;
      }
      request.put("/user", this.form).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "更新成功",
          });
          this.form.password = "";
          sessionStorage.setItem("user", JSON.stringify(this.form));
          // 触发Layout更新用户信息
          this.$emit("userInfo");
        } else {
          this.$message({
            type: "error",
            message: res.msg,
            // message: "保存失败",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
  #app{
    position: fixed;
  }


/* style="width: 28%; margin: 10% 30%" */
.el-card {
  width: 32%;
  /* margin: 10% 30%; */
  margin: auto;
}
.el-form-item-d {
  width: 200px;
  width: 80%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  border: 0.1px solid #cdcecf;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
