<template>
  <div>
    <el-row style="margin: 10px 12px 12px 24px;max-width:80%">
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span style="  font-size: 25px;">论文详情</span>
          </div>
        </template>
        <div>
          <el-form
              ref="formPaper"
              :model="formPaper"
              :rules="rulesPaper"
              label-width="130px"
          >
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
                    :rows="5"
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
                    :rows="5"
                    class="el-form-item-d"
                    v-model="formPaper.summaryS"
                ></el-input>
              </el-form-item>

              <div>
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
              </div>
              <div>
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
              </div>
            </el-row>
            <div style="text-align: center;margin-top: 30px;">
              <el-button type="info" plain @click="newUpload"
              ><i class="el-icon-upload"></i>点击上传论文
              </el-button>

              <el-button type="primary" plain @click="save"
              ><i class="el-icon-position"></i>提交
              </el-button
              >
              <el-button type="success" plain @click="resetForm"
              ><i class="el-icon-refresh"></i>重置
              </el-button
              >
            </div>
            <div class="div-el-button" align="center">
              <el-button type="text" @click="open">Tip</el-button>
            </div>
          </el-form>
        </div>
      </el-card>
    </el-row>
    <!-- <el-row>
      <el-card class="el-card-y" shadow="hover">
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
                可以上传PFD、Word、任意压缩包格式的文件，且不超过50M
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
                ><i class="el-icon-upload"></i>立即上传</el-button
              >
            </div>
          </div>
        </div>
      </el-card>
    </el-row> -->

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
                  :action="fileApiURL+'/files/upload'"
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
                  可以上传PFD、Word、任意压缩包格式的文件，且不超过50M
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
                >立即上传<i class="el-icon-upload el-icon--right"></i
                ></el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-row>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleDelt">取 消</el-button>
        <el-button @click="handlesave" type="primary">确定</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import {h} from "vue";
import {fileApiURL} from "@/setting";

export default {
  data() {
    return {
      fileApiURL: fileApiURL,
      dialogFormVisible: false,
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
      limitNum: 1, // 上传文件，同时允许上传的最大数
      fileList: [],
      length: 0, //当前上传文件个数
      isBtn: false, //控制上传按钮能否点击
      rulesPaper: {
        title: [{required: true, message: "请输入标题(中)", trigger: "blur"}],
        titleS: [
          {required: true, message: "请输入标题(英)", trigger: "blur"},
        ],
        keyword: [
          {required: true, message: "请输关键词(中)", trigger: "blur"},
        ],
        keywordS: [
          {required: true, message: "请输入关键词(英)", trigger: "blur"},
        ],
        summary: [
          {required: true, message: "请输入摘要(中)", trigger: "blur"},
        ],
        summaryS: [
          {required: true, message: "请输入摘要(英)", trigger: "blur"},
        ],
        directionId: [
          {required: true, message: "请选择方向", trigger: "blur"},
        ],
        reviewerId: [
          {required: true, message: "请选择老师", trigger: "blur"},
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
      this.$message.error("文件上传失败, " + JSON.parse(err.message).data);

      this.isBtn = false;
    },
    newUpload() {
      this.dialogFormVisible = true;
    },
    handleDelt() {
      //取消弹窗并清空内容  通过
      this.dialogFormVisible = false;
      this.$refs["upload"].clearFiles();
    },
    handlesave() {
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
          .post("/paper/saves/", {
            id: this.formPaper.id,
            url: this.formPaper.url,
          })
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
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
    open() {
      this.$notify({
        title: "温馨提示",
        message: h("i", {style: "color: teal"}, "请先上传论文哟！"),
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

/* .el-card {
  min-width: 380px;
  margin-right: 20px;
  transition: all 0.5s;
}
.el-card:hover {
  margin-top: -5px;
} */
</style>
