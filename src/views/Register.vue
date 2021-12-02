<template>
  <div class="af" :style="imgSrc">
    <div style="width: 400px; margin:auto;">
      <el-card>
        <div id="todo">
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
                :class="{ 'disabled-style': btnDisable }"
                :disabled="btnDisable"
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
                style="padding-left:22vh"
                type="text"
                @click="resetForm('form')"
                ><i class="el-icon-refresh"></i>重置</el-button
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

export default {
  name: "Register",
  data() {
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.confirm !== "") {
          this.$refs.form.validateField("confirm");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      imgSrc: {
        backgroundImage: "url(" + require("../assets/carousel/3.png") + ")",
        // height: "100vh",
        // width: "100vw",
        backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
      },
      form: { email: "", password: "", confirm: "", code: "" },
      rules: {
        email: [{ validator: checkEmail, trigger: "blur" }],
        password: [
          { validator: validatePass, trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        confirm: [
          { validator: validatePass2, trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      codeBtnWord: "获取验证码", // 获取验证码按钮文字
      waitTime: 61, // 获取验证码按钮失效时间
      btnDisable: false,
    };
  },

  methods: {
    // 控制获取验证码按钮是否可点击
    getCodeBtnDisable() {
      if (this.waitTime == 61) {
        if (this.form.email) {
          this.false;
        }
        return true;
      }
      return true;
      // 注意：因为计算属性本身没有set方法，不支持在方法中进行修改，而下面我要进行这个操作，所以需要手动添加
    },
    emailStyle() {
      // let reg = /^[A-Za-z1-9]+([-_.][A-Za-z1-9]+)*@([A-Za-z1-9]+[-.])+[A-Za-z]{2,5}$/;
      let reg = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
      if (!reg.test(this.form.email)) {
        return false;
      }
      return true;
    },

    getCode() {
      if (this.emailStyle()) {
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
        that.btnDisable = true;
        this.codeBtnWord = `${this.waitTime}s 后重新获取`;
        let timer = setInterval(function() {
          if (that.waitTime > 1) {
            that.waitTime--;
            that.codeBtnWord = `${that.waitTime}s 后重新获取`;
          } else {
            clearInterval(timer);
            that.codeBtnWord = "获取验证码";
            that.btnDisable = false;
            that.waitTime = 61;
          }
        }, 1000);
      } else {
        this.$message({
          type: "error",
          message: "邮箱填写有误，请重试...",
        });
      }
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
/* .el-card {
  min-width: 380px;
  margin-right: 20px;
  transition: all 0.25s;
}
.el-card:hover {
  margin-top: -5px;
} */

.af {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-size: 100% 100%;
  /* background-size: cover; */
  /* background: linear-gradient(90deg, #8dbed6, #2918c0); */
}

#todo {
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
