<template>
  <div class="welcome-page" :style="imgSrc">
<!--    <vue-particles-->
<!--      color="#409EFF"-->
<!--      :particleOpacity="0.7"-->
<!--      :particlesNumber="80"-->
<!--      shapeType="circle"-->
<!--      :particleSize="4"-->
<!--      linesColor="#409EFF"-->
<!--      :linesWidth="1"-->
<!--      :lineLinked="true"-->
<!--      :lineOpacity="0.4"-->
<!--      :linesDistance="150"-->
<!--      :moveSpeed="3"-->
<!--      :hoverEffect="true"-->
<!--      hoverMode="grab"-->
<!--      :clickEffect="true"-->
<!--      clickMode="remove"-->
<!--    >-->
<!--    </vue-particles>-->
<!--    <div>-->
<!--      <Bgcanvas />-->
<!--    </div>-->
    <vue-particles />
    <div class="main">
      <el-card shadow="hover">
        <div id="todo">
          欢迎登录
        </div>
        <el-form
          ref="form"
          :model="form"
          size="normal"
          :rules="rules"
          @keyup.enter.native="login"
        >
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
              <ValidCode
                style="margin-left: 8px"
                @input="createValidCode"
                :refresh="refreshNumber"
              />
            </div>
          </el-form-item>

          <el-form-item>
            <el-row>
              <el-button
                style="width: 100%"
                type="primary"
                v-loading="loading"
                @click="login"
                >登 录
              </el-button>
              <el-col :span="16">
                <el-button type="text" @click="forgetPassword">
                  忘记密码？
                </el-button>
              </el-col>
              <el-col :span="5">
                <el-button type="text" @click="register">前往注册>></el-button>
              </el-col>
              <el-col :span="3">
                <el-button type="text" @click="resetForm('form')"
                  ><i class="el-icon-refresh "></i>重置
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import ValidCode from "@/components/ValidCode";
import { setUser } from "@/utils/storage";
import { h } from "vue";
// import Bgcanvas from "@/components/Bgcanvas";

export default {
  name: "Login",
  components: {
    ValidCode,
  },
  data() {
    return {
      loading: false,
      imgSrc: {
        backgroundImage:
        "url(http://static.ivanlife.cn//imges/wallhaven-bg.png)",
        // width: "100vw",
        backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
      },
      refreshNumber: 0,

      form: { role: "", email: "", password: "" },

      rules: {
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
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
            this.refreshNumber += 1;
            return;
          }
          this.loading = true;
          // this.$message.success("Loading...");
          request
            .post("/user/login", {
              email: this.form.email,
              password: this.form.password,
            })
            .then((res) => {
              if (res.status === 200) {
                // this.$message({
                //   type: "success",
                //   message: "登录成功",
                // });
                this.$notify({
                  title: "登录成功",
                  message: h("i", { style: "color: teal" }, "你好，欢迎回来！"),
                  duration: "5000",
                  offset: 100,
                });
                setUser(res.data); // 缓存用户信息
                this.$router.push("/"); //登录成功之后进行页面的跳转，跳转到主页
              } else {
                const that = this;
                setTimeout(function() {
                  that.loading = false;
                }, 1000);
                // this.loading = false;
                this.$message({
                  type: "error",
                  message: res.msg,
                });
                this.$notify({
                  title: "警告",
                  type: "error",
                  message: h(
                    "i",
                    { style: "color: teal" },
                    "失败过多会导致账号暂时封禁"
                  ),
                  duration: "5000",
                  offset: 100,
                });
              }
            });
        }
      });
    },
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    forgetPassword() {
      // console.log(";;;;;;;")
      this.$router.push("/forget");
    },
    register() {
      // console.log("=======");
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.el-card {
  max-width: 420px;
  max-height: 420px;
  /* margin-right: 20px; */

  transition: all 0.25s;
}
/* .el-card:hover {
  margin-top: -5px;
} */
.welcome-page {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-size: 100% 100%;
}

.main {
  background-color: #fff;
  border-radius: 20px;
  width: 410px;
  height: 410px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

#todo {
  /*font-size: 60px "华文行楷";*/
  text-align: center;
  font: 50px "华文行楷";
  color: #4d4d4d;
  padding: 30px 0;
  background-image: linear-gradient(25deg, #00337e, #13548f, #1576a1, #009ab2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
