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
            <span class="patent-span">论文详情</span>
          </div>
        </template>
        <div>
          <el-form
            ref="formPaper"
            :model="formPaper"
            :rules="rulesPaper"
            label-width="130px"
          >
            <el-row :gutter="20">
              <el-col :span="8">
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
              </el-col>

              <el-col :span="8" :push="4">
                <el-form-item
                  class="el-form-item-a"
                  label="标&ensp;题&ensp;(英)"
                  prop="titleEn"
                >
                  <el-input
                    class="el-form-item-d"
                    v-model="formPaper.titleEn"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
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
              </el-col>
              <el-col :span="8" :push="4">
                <el-form-item
                  class="el-form-item-a"
                  label="关键词(英)"
                  prop="keywordEn"
                >
                  <el-input
                    class="el-form-item-d"
                    v-model="formPaper.keywordEn"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item
              class="el-form-item-a"
              label="摘&ensp;要&ensp;(中)"
              prop="summary"
            >
              <el-input
                type="textarea"
                :rows="5"
                class="el-form-item-d"
                v-model="formPaper.summary"
              ></el-input>
            </el-form-item>
            <el-form-item
              class="el-form-item-a"
              label="摘&ensp;要&ensp;(英)"
              prop="summaryEn"
            >
              <el-input
                type="textarea"
                :rows="5"
                class="el-form-item-d"
                v-model="formPaper.summaryEn"
              ></el-input>
            </el-form-item>

            <el-row>
              <el-col :span="8">
                <el-form-item label="研究方向" prop="directionIds">
                  <el-select
                    multiple
                    v-model="formPaper.directionIds"
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
                    v-model="formPaper.reviewIds"
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
                  <el-select multiple v-model="formPaper.reviewerIds">
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

            <!-- </el-row> -->
            <div style="text-align: center;margin-top: 30px;">
              <el-button type="info" plain @click="newUpload"
              ><i class="el-icon-upload"></i>点击上传论文
              </el-button>

              <el-button type="primary" plain @click="save"
              ><i class="el-icon-position"></i>提交
              </el-button>
              <el-button type="success" plain @click="resetForm"
              ><i class="el-icon-refresh"></i>重置
              </el-button>
            </div>
            <div class="div-el-button" align="center">
              <el-button type="text" @click="open">Tips</el-button>
            </div>
          </el-form>
        </div>
      </el-card>
    </el-row>

    <!-- 上传弹窗 -->
    <el-dialog
      title="请选择你要上传的文件"
      v-model="dialogFormVisible"
      :close-on-click-modal="false"
      width="42.3%"
    >
      <el-row>
        <el-card style="width:100vw;" shadow="hover">
          <div type="flex" justify="center" align="middle">
            <div>
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

              <br/>

              <div
                style="display: flex;justify-content: center;align-items: center;"
              >
                <el-button
                  size="small"
                  type="primary"
                  :disabled="isBtn"
                  @click="submitUpload"
                  plain
                >上传至服务器<i class="el-icon-upload el-icon--right"></i
                ></el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-row>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleDele" type="primary">取 消</el-button>
          <el-button @click="handleDele" type="primary">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import { h } from "vue";
import { fileApiURL } from "@/setting";

export default {
  data() {
    return {
      fileApiURL: fileApiURL,
      dialogFormVisible: false,
      directionIdOptions: [],
      reviewerIdOptions: [],
      reviewIdOptions: [],
      reviewerList: [],
      formPaper: {
        types: 0,  // 表单类型  0--论文；1--专利；2--报告
        typeOr: 0, //文件上传 类型  1为老师意见
        uploaderId: "",
        title: "",
        titleEn: "",
        keyword: "",
        keywordEn: "",
        summary: "",
        summaryEn: "",
        url: "",
        directionIds: [],
        reviewerIds: [],
        reviewIds: [],
      },
      limitNum: 1, // 上传文件，同时允许上传的最大数
      fileList: [],
      length: 0, //当前上传文件个数
      isBtn: false, //控制上传按钮能否点击
      rulesPaper: {
        title: [{ required: true, message: "请输入标题(中)", trigger: "blur" }],
        titleEn: [
          { required: true, message: "请输入标题(英)", trigger: "blur" },
        ],
        keyword: [
          { required: true, message: "请输关键词(中)", trigger: "blur" },
        ],
        keywordEn: [
          { required: true, message: "请输入关键词(英)", trigger: "blur" },
        ],
        summary: [
          { required: true, message: "请输入摘要(中)", trigger: "blur" },
        ],
        summaryEn: [
          { required: true, message: "请输入摘要(英)", trigger: "blur" },
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
    // this.getReviewers();
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
      this.$message.error("文件上传失败, " + JSON.parse(err.message).data);

      this.isBtn = false;
    },
    newUpload() {
      this.dialogFormVisible = true;
    },
    handleDele() {
      //取消弹窗并清空内容  通过
      this.dialogFormVisible = false;
      this.$refs["upload"].clearFiles();
    },
    handleSave() {
      let url = this.formPaper.url;
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
          id: this.formPaper.id,
          url: this.formPaper.url,
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
      this.dialogFormVisible = false; // 关闭弹窗
      this.$refs["upload"].clearFiles();
    },


    getDirections() {
      request.get("/direction").then((res) => {
        // console.table(res.data);
        this.directionIdOptions = res.data;
      });
    },
    getReviewers() {
      // console.log("=======getReviewers=======");
      // console.log(this.formPaper.directionIds);
      request
        .post("/user/identity", this.formPaper.directionIds)
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
      this.formPaper.reviewerId = null;
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
          "注:上传压缩包文件时，最好有二级目录，否则可能会导致预览失败!"
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
          this.formPaper.directionId = this.formPaper.directionIds.join();
          this.formPaper.reviewerId = this.formPaper.reviewerIds.join()+','+this.formPaper.reviewIds;
          // this.formPaper.reviewId = this.formPaper.reviewIds.join();
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
#app {
  position: fixed;

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

.patent-span {
  font: 30px "华文";
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
