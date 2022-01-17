<template>
  <div>
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
    <el-row style="margin: 20px;" justify="center" align="middle">
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span class="patent-span">报告详情</span>
          </div>
          <el-radio-group v-model="labelPosition" size="small">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="top">顶部对齐</el-radio-button>
          </el-radio-group>
        </template>
        <div style="margin: 20px;"></div>
        <el-form
          ref="formReport"
          :label-position="labelPosition"
          :rules="rulesPatent"
          :model="formReport"
        >
          <el-form-item label="标题" prop="title">
            <el-input v-model="formReport.title"></el-input>
          </el-form-item>

          <el-form-item label="摘要" prop="summary">
            <el-input
              type="textarea"
              :rows="5"
              v-model="formReport.summary"
            ></el-input>
          </el-form-item>
          <div type="flex" justify="center" align="middle">
            <el-form-item>
              <el-upload
                drag
                ref="upload"
                class="upload-demo"
                :limit="limitNum"
                :action="fileApiURL + '/files/upload'"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                accept=".pdf, .doc,.docx,.zip,.rar,.jar,.tar,.gzip"
                :file-list="fileList"
                :on-change="fileChange"
                :auto-upload="false"
                :on-exceed="exceedFile"
                :on-success="handleSuccess"
                :on-error="handleError"
              >
                <i class="el-icon-upload"></i>

                <div class="el-upload__text">
                  将Order文件拖到此处，或

                  <em>点击上传</em>
                </div>

                <div class="el-upload__tip">
                  可以上传PFD、Word以及任意压缩包格式的文件，且不超过100M
                </div>
              </el-upload>
            </el-form-item>
          </div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="研究方向" prop="directionIds">
                <el-select
                  multiple
                  v-model="formReport.directionIds"
                  @change="getReviewers"
                >
                  <el-option
                    v-for="item in directionIdOptions"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="初审" prop="reviewIds">
                <el-select
                  multiple
                  v-model="formReport.reviewIds"
                >
                  <el-option
                    v-for="item in reviewIdOptions"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="指导老师" prop="reviewerIds">
                <el-select multiple v-model="formReport.reviewerIds">
                  <el-option
                    v-for="item in reviewerList"
                    :key="item.id"
                    :label="item.userName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <div style="text-align: center;margin-top: 30px;">
            <el-button
              size="small"
              type="primary"
              :disabled="isBtn"
              @click="submitUpload"
              plain
            ><i class="el-icon-upload"></i>将文件上传至服务器
            </el-button
            >
            <el-button type="primary" plain @click="save"
            ><i class="el-icon-position"></i>提交
            </el-button>
            <el-button type="success" plain @click="resetForm"
            ><i class="el-icon-refresh"></i>重置
            </el-button>
          </div>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import request from "@/utils/request";
import { h } from "vue";
import { fileApiURL } from "../../setting";

export default {
  data() {
    return {
      fileApiURL: fileApiURL,
      directionIdOptions: [],
      reviewerIdOptions: [],
      reviewIdOptions: [],
      reviewerList: [],
      labelPosition: "left",
      formReport: {
        types: 2,
        title: "",
        summary: "",
        url: "",
        directionIds: [],
        reviewerIds: [],
        reviewIds: [],
      },
      limitNum: 1,
      fileList: [],
      length: 0, //当前上传文件个数
      isBtn: false, //控制上传按钮能否点击
      rulesPatent: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],

        summary: [
          { required: true, message: "请输入摘要(中)", trigger: "blur" },
        ],

        directionIds: [
          { required: true, message: "请选择方向", trigger: "blur" },
        ],
        reviewerIds: [
          { required: true, message: "请选择老师", trigger: "blur" },
        ],
        reviewIds: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
      },
    };
  },

  mounted() {
    this.getDirections();
    this.getReviewerId()
  },

  methods: {
    submitUpload() {
      let _this = this;

      if (this.length === 0) {
        this.$message.warning("请上传文件");
      } else {
        this.$refs.upload.submit();

        this.isBtn = true;
      }
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);

      this.length = 0; // console.log(this.length)
    },

    handlePreview(file) {
      console.log(file, 111);
    }, // 文件状态改变时的钩子

    fileChange(file, fileList) {
      this.length = 1; // console.log(file.raw); // // this.fileList.push(file.raw); // console.log(this.fileList,this.length);
    }, // 文件超出个数限制时的钩子

    exceedFile(files, fileList) {
      this.$message.warning(
        `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length +
        fileList.length} 个`
      );
    }, // 文件上传成功时的钩子

    handleSuccess(res, file, fileList) {
      this.formReport.url = file.response.data;
      console.log(file.response.data);

      this.$message.success("文件上传成功");
    },

    handleError(err, file, fileList) {
      this.$message.error("文件上传失败, " + JSON.parse(err.message).data);

      this.isBtn = false;
    },

    handleSave() {
      let url = this.formReport.url;
      console.log(url);
      if (url === "" || url === null) {
        this.$message({
          type: "error",
          message: "文件不能为空",
        });
        return;
      }
      request
        .post("/paper/save/", {
          id: this.formReport.id,
          url: this.formReport.url,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "上传成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "请求超时",
            });
          }
        });
      // console.log("dialog close");
      // this.dialogFormVisible = false; // 关闭弹窗
      this.$refs["upload"].clearFiles();
    },

    getDirections() {
      request.get("/direction").then((res) => {
        // console.table(res.data);
        this.directionIdOptions = res.data;
      });
    },
    getReviewers() {
      request
        .post("/user/identity", this.formReport.directionIds)
        .then((res) => {
          // console.table(res.data);
          this.reviewerList = res.data;
        });
    },
    getReviewerId() {
      request.get("/paper/firstTeacher").then((res) => {
        // console.table(res.data);
        this.reviewIdOptions = res.data;
      });
    },

    filterReviewer(directionId) {
      this.formReport.reviewerId = null;
      // console.log(directionId);
      // this.getReviewers();
      this.reviewerIdOptions = this.reviewerList.filter((element) => {
        return element.directionId === directionId;
      });
    },
    open() {
      this.$notify({
        title: "温馨提示",
        message: h(
          "i",
          { style: "color: teal" },
          "请先上传论文哟!" +
          "\n" +
          "注:上传压缩包文件时，最好有二级目录，否则可能会导致预览失败哟!"
        ),
        offset: 50, //偏移
        // customClass: "notifyStyle", //自定义类
      });
    },
    getUserId() {
      let userJson = sessionStorage.getItem("user");
      if (!userJson) {
        return;
      }
      return JSON.parse(userJson).id;
    },
    save() {
      this.$refs["formReport"].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.formReport.uploaderId = this.getUserId();
          console.log(this.formReport);

          if (this.formReport.url === "") {
            this.$message({
              type: "error",
              message: "请将文件上传至服务器",
            });
            return;
          }
          this.formReport.directionId = this.formReport.directionIds.join();
          this.formReport.reviewerId = this.formReport.reviewerIds.join()+','+this.formReport.reviewIds;
          request
            .post("/paper/save", this.formReport)
            .then((res) => {
              console.log(res);
              if (res.data === "OK") {
                this.$message({
                  type: "success",
                  message: "上传成功",
                });
              } else {
                // console.log(res);
                this.$message({
                  type: "error",
                  message: "服务器异常，请稍后尝试（。＾▽＾）",
                });
                return false;
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
      this.$refs["formReport"].resetFields();
    },
    resetForm() {
      this.$refs["formReport"].resetFields();
    },
  },
};
</script>

<style scoped>
#app {
  position: fixed;
}

.box-card {
  width: 60vw;
}

.patent-span {
  font: 30px "华文";
}

.el-card-y {
  margin: 10px 12px 12px 14px;
  display: flex;

  /* display: flow-root; */
}

.header {
  width: 100%;
  padding: 60px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: #652c11;
  letter-spacing: 2px;
}

.content {
  /* display: flex; */
  justify-content: center;
  align-items: center;
}

.el-form-item-a {
  margin-top: 30px;
}

.el-form-item-d {
  min-width: 300px;
  /* margin-top: 30px; */
}

W.el-form-item-button {
  margin-top: 30px;
  right: 50px;
}

.div-el-button {
  /* align-content: center; */
  padding: 22px;
}

.el-upload-list {
  width: 26%;
}

.notifyStyle {
  word-wrap: break-word;
  word-break: break-all;
}

/* .el-card {
    min-width: 380px;
    margin-right: 20px;
    transition: all 0.5s;
  }
  .el-card:hover {
    margin-top: -5px;
  } */
</style>
