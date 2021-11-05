<template>
  <div
    style="width: 100%; height: 100vh; overflow: hidden;background: linear-gradient(90deg,#be8dd8,#763ab6);"
  >
    <div style="width: 400px; margin: 100px auto">
      <el-card>
        <div style="font-size: 30px; text-align: center; padding: 30px 0">
          欢迎注册
        </div>
        <el-form ref="form" :model="form" size="normal" :rules="rules">
          <el-form-item prop="username">
            <el-input
              prefix-icon="el-icon-user-solid"
              v-model="form.username"
              placeholder="请输入用户名(邮箱)"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              v-model="form.password"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="confirm">
            <el-input
              prefix-icon="el-icon-lock"
              v-model="form.confirm"
              show-password
              placeholder="请再输入密码"
            ></el-input>
          </el-form-item>

          <el-form-item prop="code">
            <div style="display: flex">
              <el-input
                prefix-icon="el-icon-key"
                v-model="form.code"
                style="width: 75%"
                placeholder="请输入验证码"
              ></el-input>
              <el-button
                style="margin-left: 15px"
                type="primary"
                @click="getCode"
                >获取验证码</el-button
              >
            </div>
          </el-form-item>

          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="register"
              >注册</el-button
            >
            <el-form-item
              ><el-button type="text" @click="$router.push('/login')"
                >返回登录 >>
              </el-button></el-form-item
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      form: { username: "", password: "", confirm: "", code: "" },
      rules: {
        username: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        confirm: [{ required: true, message: "请确认密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    //邮箱验证
    // sendEmail() {
    //   var regEmail = /^[A-Za-z1-9]+([-_.][A-Za-z1-9]+)*@([A-Za-z1-9]+[-.])+[A-Za-z]{2,5}$/;
    //   if (this.username == "") {
    //     alert("请输入邮箱");
    //   } else if (!regEmail.test(this.username)) {
    //     alert("邮箱格式不正确");
    //   }
    // },

    getCode() {
      // var regEmail = /^[A-Za-z1-9]+([-_.][A-Za-z1-9]+)*@([A-Za-z1-9]+[-.])+[A-Za-z]{2,5}$/;
      // var _this = this;
      // console.log(_this.$store.state);
      // this.axios
      //   .post(`/sendEmail?email=${this.from.username}`)
      // .then(() => {
      request
        .post(`/api/sendEmail`, {
          email: this.form.username,
        })
        .then((response) => {
          console.log(response);
          if (response.status !== 200) {
            console.log();
            this.$message({
              type: "error",
              message: response.msg + ", " + response.data,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "请求超时，请检查网络连接",
          });
        });
    },
    goBack() {
      this.$router.push("/register"); // 这里写上你要跳转的页面
    },
    register() {
      if (this.form.password !== this.form.confirm) {
        this.$message({
          type: "error",
          message: "2次密码输入不一致！",
        });
        return;
      }
      this.$refs["form"].validate((valid) => {
        if (valid) {
          request
            .post("/user/register", {
              email: this.form.username,
              password: this.form.password,
              code: this.form.code,
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "注册成功",
                });
                this.$router.push("/login"); //登录成功之后进行页面的跳转，跳转到主页
              } else {
                this.$message({
                  type: "error",
                  message: res.msg,
                });
              }
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.el-card {
  min-width: 380px;
  margin-right: 20px;
  transition: all 0.5s;
}
.el-card:hover {
  margin-top: -5px;
}
</style>
