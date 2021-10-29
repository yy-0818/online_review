<template>
  <div style="width: 100%; height: 100vh; overflow: hidden">
    <!-- <img src="../assets/img/fc.png" alt="fj" /> -->
    <div style="width: 400px; margin: 100px auto">
      <div style="font-size: 30px; text-align: center; padding: 30px 0">
        欢迎登录
      </div>
      <el-form ref="form" :model="form" size="normal" :rules="rules">
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="form.username"
            placeholder="请输入账号(邮箱)"
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
        <el-form-item>
          <el-radio v-model="form.role" :label="1">管理员</el-radio>
          <el-radio v-model="form.role" :label="2">普通用户</el-radio>
          <!--          <el-button @click="resetForm('ruleForm')" >重置</el-button>-->
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="login"
            >登 录</el-button
          >
        </el-form-item>
        <el-form-item
          ><el-button type="text" @click="$router.push('/register')"
            >前往注册 >>
          </el-button></el-form-item
        >
      </el-form>
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
      form: { role: 1, username: "", password: "" },
      // ruleForm: {
      // username: "lunaticzy9527@gmail.com",
      // password: "123",
      //   email: '',
      // },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
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
              email: this.form.username,
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
    // resetForm(formName) {
    //   this.$refs[formName].resetFields()
    // },
  },
};
</script>

<style scoped></style>
