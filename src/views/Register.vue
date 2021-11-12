<template>
  <div class="af">
    <div style="width: 400px; margin: 100px auto">
      <el-card>
        <div id="todoapp">
          欢迎注册
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
                :class="{ 'disabled-style': getCodeBtnDisable }"
                :disabled="getCodeBtnDisable"
                >{{ codeBtnWord }} ></el-button
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
              </el-button>
              <el-button
                style="padding-left:30vh"
                type="text"
                @click="resetForm('form')"
                >重置</el-button
              ></el-form-item
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
// import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      form: { email: "", password: "", confirm: "", code: "" },
      rules: {
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        confirm: [{ required: true, message: "请确认密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      codeBtnWord: "获取验证码", // 获取验证码按钮文字
      waitTime: 61, // 获取验证码按钮失效时间
    };
  },
  methods: {
    //邮箱验证
    // sendEmail() {
    //   var regEmail = /^[A-Za-z1-9]+([-_.][A-Za-z1-9]+)*@([A-Za-z1-9]+[-.])+[A-Za-z]{2,5}$/;
    //   if (this.email == "") {
    //     alert("请输入邮箱");
    //   } else if (!regEmail.test(this.email)) {
    //     alert("邮箱格式不正确");
    //   }
    // },
    computed: {
      emailStyle() {
        let reg = /^[A-Za-z1-9]+([-_.][A-Za-z1-9]+)*@([A-Za-z1-9]+[-.])+[A-Za-z]{2,5}$/;
        if (!reg.test(this.form.email)) {
          return false;
        }
        return true;
      },
      // 控制获取验证码按钮是否可点击
      getCodeBtnDisable: {
        get() {
          if (this.waitTime == 61) {
            if (this.form.emai) {
              return false;
            }
            return true;
          }
          return true;
        },
        // 注意：因为计算属性本身没有set方法，不支持在方法中进行修改，而下面我要进行这个操作，所以需要手动添加
        set() {},
      },
    },

    getCode() {
      request
        .post(`/api/sendEmail`, {
          email: this.form.email,
        })
        .then((response) => {
          // console.log(response);
          if (response.status == 200) {
            // console.log();
            this.$message({
              type: "success",
              // message: response.msg + ", " + response.data,
              message: "验证码已发送，请稍候...",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "请求超时，请检查网络连接",
          });
        });

      let that = this;
      that.waitTime--;
      that.getCodeBtnDisable = true;
      this.codeBtnWord = `${this.waitTime}s 后重新获取`;
      let timer = setInterval(function() {
        if (that.waitTime > 1) {
          that.waitTime--;
          that.codeBtnWord = `${that.waitTime}s 后重新获取`;
        } else {
          clearInterval(timer);
          that.codeBtnWord = "获取验证码";
          that.getCodeBtnDisable = false;
          that.waitTime = 61;
        }
      }, 1000);
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
              email: this.form.email,
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
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(90deg, #8dbed6, #2918c0);
}

#todoapp {
  font-size: 60px "华文行楷";
  text-align: center;
  font: 50px "华文行楷";
  color: #4d4d4d;
  padding: 30px 0;
}

.el-button.disabled-style {
  background-color: #eeeeee;
  color: #cccccc;
}
</style>
