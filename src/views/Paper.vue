<template>
  <el-row style="margin: 10px 12px 12px 24px;">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span style="  font-size: 20px;">论文详情</span>
        </div>
      </template>
      <div>
        <el-form ref="formPaper" :model="formPaper" :rules="rulesPaper">
          <el-row>
            <el-form-item
              class="el-form-item-a"
              label="标&ensp;题&ensp;(中)"
              prop="title"
            >
              <el-input
                class="el-form-item-d"
                v-model="formPaper.title"
              ></el-input>
            </el-form-item>

            <el-form-item
              class="el-form-item-a"
              label="标&ensp;题&ensp;(英)"
              prop="titleS"
            >
              <el-input
                class="el-form-item-d"
                v-model="formPaper.titleS"
              ></el-input>
            </el-form-item>

            <el-form-item
              class="el-form-item-a"
              label="关键词(中)"
              prop="keyword"
            >
              <el-input
                class="el-form-item-d"
                v-model="formPaper.keyword"
              ></el-input>
            </el-form-item>

            <el-form-item
              class="el-form-item-a"
              label="关键词(英)"
              prop="keywordS"
            >
              <el-input
                class="el-form-item-d"
                v-model="formPaper.keywordS"
              ></el-input>
            </el-form-item>

            <el-form-item
              class="el-form-item-a"
              label="摘&ensp;要&ensp;(中)"
              prop="summary"
            >
              <el-input
                type="textarea"
                class="el-form-item-d"
                v-model="formPaper.summary"
              ></el-input>
            </el-form-item>
            <el-form-item
              class="el-form-item-a"
              label="摘&ensp;要&ensp;(英)"
              prop="summaryS"
            >
              <el-input
                type="textarea"
                class="el-form-item-d"
                v-model="formPaper.summaryS"
              ></el-input>
            </el-form-item>

            <el-form-item
              class="el-form-item-a1"
              label="研究方向"
              prop="directionId"
            >
              <el-select
                v-model="formPaper.directionId"
                :change="filterReviewer(formPaper.directionId)"
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
            <el-form-item
              class="el-form-item-a2"
              label="指导老师"
              prop="reviewerId"
            >
              <el-select v-model="formPaper.reviewerId">
                <el-option
                  v-for="item in reviewerIdOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <div style="text-align: center;margin-top: 30px;">
            <el-button type="primary" @click="save">上传</el-button>
            <el-button @click="resetForm">重置</el-button>
          </div>
        </el-form>
      </div>
    </el-card>
  </el-row>
  <el-row>
    <el-card style="margin: 10px 12px 12px 24px;display: flex;" shadow="hover">
      <div>
        <div class="header">上传文件</div>

        <div class="content">
          <div>
            <el-upload
              drag
              ref="upload"
              class="upload-demo"
              :limit="limitNum"
              action="http://49.234.51.220:12345/files/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              accept=".pdf, .doc,.docx"
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
                只能上传PFD与Word文件，且不超过10M
              </div>
            </el-upload>

            <br />

            <div
              style="display: flex;justify-content: center;align-items: center;"
            >
              <el-button
                size="small"
                type="primary"
                :disabled="isBtn"
                @click="submitUpload"
                plain
                >立即上传<i class="el-icon-upload el-icon--right"></i
              ></el-button>

              <el-button size="small" plain> 取消 </el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </el-row>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      directionIdOptions: [],
      reviewerIdOptions: [],
      reviewerList: [],
      formPaper: {
        uploaderId: "",
        title: "",
        titleS: "",
        keyword: "",
        keywordS: "",
        summary: "",
        summaryS: "",
        url: "",
        directionId: "",
        reviewerId: "",
      },
      limitNum: 1, // 上传excel时，同时允许上传的最大数
      fileList: [],
      length: 0, //当前上传文件个数
      isBtn: false, //控制上传按钮能否点击
      rulesPaper: {
        title: [{ required: true, message: "请输入标题(中)", trigger: "blur" }],
        titleS: [
          { required: true, message: "请输入标题(英)", trigger: "blur" },
        ],
        keyword: [
          { required: true, message: "请输关键词(中)", trigger: "blur" },
        ],
        keywordS: [
          { required: true, message: "请输入关键词(英)", trigger: "blur" },
        ],
        summary: [
          { required: true, message: "请输入摘要(中)", trigger: "blur" },
        ],
        summaryS: [
          { required: true, message: "请输入摘要(英)", trigger: "blur" },
        ],
        directionId: [
          { required: true, message: "请选择方向", trigger: "blur" },
        ],
        reviewerId: [
          { required: true, message: "请选择老师", trigger: "blur" },
        ],
      },
    };
  },

  // created() {
  //   this.$store.state.adminleftnavnum = "0"; //设置左侧导航2-2 active
  // },

  mounted() {
    // this.$store.state.adminleftnavnum = "0"; //设置左侧导航2-2 active
    this.getDirections();
    this.getReviewers();
    // this.load();
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
      this.formPaper.url = file.response.data;
      console.log(file.response.data);

      this.$message.success("文件上传成功");
    },

    handleError(err, file, fileList) {
      this.$message.error("文件上传失败");

      this.isBtn = false;
    },
    getDirections() {
      request.get("/direction").then((res) => {
        // console.log(res.data);
        this.directionIdOptions = res.data;
      });
    },
    getReviewers() {
      request.get("/user/identity/3").then((res) => {
        // console.log(res.data);
        this.reviewerList = res.data;
      });
    },
    filterReviewer(directionId) {
      this.formPaper.reviewerId = null;
      // console.log(directionId);
      this.reviewerIdOptions = this.reviewerList.filter((element) => {
        return element.directionId === directionId;
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
      this.$refs["formPaper"].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.formPaper.uploaderId = this.getUserId();
          console.log(this.formPaper);

          if (this.formPaper.url === "") {
            this.$message({
              type: "error",
              message: "未选择文件",
            });
            return;
          }
          request
            .post("/paper/save", this.formPaper)
            .then((res) => {
              console.log(res);
              if (res.data === "OK") {
                this.$message({
                  type: "success",
                  message: "上传成功",
                });
              } else {
                console.log(res);
                this.$message({
                  type: "error",
                  message: res.msg,
                });
                return false;
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    resetForm() {
      this.$refs["formPaper"].resetFields();
    },
  },
};
</script>

<style scoped>
.header {
  /* width: 100%; */
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-form-item-a {
  margin-top: 30px;
}
.el-form-item-a1 {
  margin-top: 30px;
  padding-left: 10px;
}
.el-form-item-a2 {
  margin-top: 30px;
  padding-left: 110px;
}

.el-form-item-d {
  min-width: 300px;
  /* margin-top: 30px; */
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
