<template>
  <div class="af" :style="imgSrc">
    <!-- <img :src="imgSrc" width="100%" height="100%" alt="" /> -->

    <div style="width: 400px; margin:auto;">
      <el-card>
        <div id="todoapp" shadow="hover">
          欢迎登录
        </div>
        <el-form ref="form" :model="form" size="normal" :rules="rules">
          <el-form-item prop="email">
            <el-input
              prefix-icon="el-icon-user-solid"
              v-model="form.email"
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

          <el-form-item>
            <div style="display: flex">
              <el-input
                prefix-icon="el-icon-key"
                v-model="form.validCode"
                style="width: 65%"
                placeholder="请输入验证码"
              ></el-input>
              <ValidCode style="margin-left: 8px" @input="createValidCode" />
            </div>
          </el-form-item>
          <el-form-item prop="role">
            <el-radio v-model="form.role" :label="3">管理员</el-radio>
            <el-radio v-model="form.role" :label="2">审核员</el-radio>
            <el-radio v-model="form.role" :label="1">普通用户</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="login"
              >登 录</el-button
            >
          </el-form-item>
          <el-form-item
            ><el-button type="text" @click="$router.push('/register')"
              >前往注册 >>
            </el-button>
            <el-button
              style="padding-left:30vh"
              type="text"
              @click="resetForm('form')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

import ValidCode from "@/components/ValidCode";

export default {
  name: "Login",
  components: {
    ValidCode,
  },
  data() {
    return {
      imgSrc: {
        backgroundImage: "url(" + require("../assets/carousel/3.png") + ")",
        height: "100vh", //这里一定要设置高度 否则背景图无法显示
        backgroundRepeat: "no-repeat",
      },

      form: { role: "", email: "", password: "" },
      // ruleForm: {
      // username: "lunaticzy9527@gmail.com",
      // password: "123",
      //   email: '',
      // },
      rules: {
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        role: [{ required: true, message: "请选择身份", trigger: "blur" }],
      },
      validCode: "",
    };
  },
  created() {
    sessionStorage.removeItem("user");
  },
  methods: {
    // 接收验证码组件提交的 4位验证码
    createValidCode(data) {
      this.validCode = data;
    },
    login() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (!this.form.validCode) {
            this.$message.error("请填写验证码");
            return;
          }
          if (
            this.form.validCode.toLowerCase() !== this.validCode.toLowerCase()
          ) {
            this.$message.error("验证码错误");
            return;
          }

          request
            .post("/user/login", {
              email: this.form.email,
              password: this.form.password,
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "登录成功",
                });
                sessionStorage.setItem("user", JSON.stringify(res.data)); // 缓存用户信息
                this.$router.push("/"); //登录成功之后进行页面的跳转，跳转到主页
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
    resetForm(form) {
      this.$refs[form].resetFields();
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

.af {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  /* background: linear-gradient(90deg, #8dbed6, #2918c0); */
}

/* .showbox :hover {
  box-shadow: 0px 12px 36px rgba(0, 0, 0, 0.1);
} */

#todoapp {
  font-size: 60px "华文行楷";
  text-align: center;
  font: 50px "华文行楷";
  color: #4d4d4d;
  padding: 30px 0;
}
</style>
