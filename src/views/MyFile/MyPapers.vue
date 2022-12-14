<template>
  <div>
    <!-- 搜索区域-->
    <div style="margin: 10px 0">
      <el-input
        v-model="search"
        placeholder="请输入关键字"
        style="width: 20%"
        clearable
      ></el-input>

      <el-button type="primary" style="margin-left: 5px" @click="load"
        >查询
      </el-button>
    </div>
    <el-table
      v-fit-columns
      v-loading="loading"
      :data="tableData"
      border
      stripe
      style="width: 100%"
      tooltip-effect="dark"
      :highlight-current-row="true"
      :header-cell-style="{ background: '#FFF5EE', color: '#1C1C1C' }"
    >
      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="题目:">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item v-show="props.row.titleEn != null" label="Title:">
              <span>{{ props.row.titleEn }}</span>
            </el-form-item>
            <el-form-item v-show="props.row.keyword != null" label="关键词:">
              <span>{{ props.row.keyword }}</span>
            </el-form-item>
            <el-form-item v-show="props.row.keywordEn != null" label="Keyword:">
              <span>{{ props.row.keywordEn }}</span>
            </el-form-item>
            <el-form-item label="摘要:">
              <span>{{ props.row.summary }}</span>
            </el-form-item>
            <el-form-item v-show="props.row.summaryEn != null" label="Summary:">
              <span>{{ props.row.summaryEn }}</span>
            </el-form-item>
            <el-form-item label="方向:">
              <span>{{ showDirections(props.row) }}</span>
            </el-form-item>
            <el-form-item label="指导老师:">
              <span>{{ showPaperReviewers(props.row) }}</span>
            </el-form-item>

            <el-form-item label="上传时间:">
              <span>{{ props.row.createTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        prop="id"
        label="ID"
        sortable
        width="60"
        align="center"
      ></el-table-column>
      <el-table-column label="文献类型" align="center" width="100px">
        <template #default="scope">
          <el-tag
            effect="dark"
            size="mini"
            :type="
              scope.row.types === 0
                ? 'primary'
                : scope.row.types === 1
                ? 'success'
                : scope.row.types === 2
                ? 'warning'
                : 'info'
            "
          >
            {{
              scope.row.types === 0
                ? "论文"
                : "未知" && scope.row.types === 1
                ? "专利"
                : "未知" && scope.row.state === 2
                ? "未知"
                : "报告"
            }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="title"
        label="题目"
        show-overflow-tooltip
        align="center"
      ></el-table-column>

      <el-table-column
        prop="summary"
        label="摘要"
        tooltip-effect="light"
        show-overflow-tooltip
        align="center"
      ></el-table-column>

      <el-table-column label="方向" show-overflow-tooltip align="center">
        <template #default="scope">
          {{ showDirections(scope.row) }}
        </template>
      </el-table-column>

      <el-table-column label="指导老师" show-overflow-tooltip align="center">
        <template #default="scope">
          {{ showPaperReviewers(scope.row) }}
        </template>
      </el-table-column>

      <el-table-column
        prop="createTime"
        label="上传时间"
        tooltip-effect="light"
        show-overflow-tooltip
        align="center"
      ></el-table-column>

      <el-table-column label="审核状态" align="center">
        <template #default="scope">
          <el-tag
            size="medium"
            :type="
              scope.row.state === 1 || scope.row.state === 3
                ? 'primary'
                : scope.row.state === 0
                ? 'info'
                : scope.row.state === 4 ||
                  scope.row.state === 6 ||
                  scope.row.state === 2
                ? 'danger'
                : scope.row.state === 5
                ? 'success'
                : ''
            "
            >{{
              scope.row.state === 1
                ? "初审通过"
                : "未审核" && scope.row.state === 2
                ? "初审未通过"
                : "未审核" && scope.row.state === 3
                ? "二审通过"
                : "未审核" && scope.row.state === 4
                ? "二审未通过"
                : "未审核" && scope.row.state === 5
                ? "已归档"
                : "未审核" && scope.row.state === 6
                ? "终审未通过"
                : "未审核"
            }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="270">
        <template #default="scope">
          <el-button
            size="mini"
            type="success"
            plain
            @click="previewOpen(scope.row)"
            ><i class="el-icon-tickets"></i>预览
          </el-button>
          <el-popconfirm
            title="确定下载吗？"
            @confirm="handleDownload(scope.row)"
          >
            <template #reference>
              <el-button size="mini" type="warning" plain
                ><i class="el-icon-folder-add"></i>下载建议
              </el-button>
            </template>
          </el-popconfirm>
          <el-button
            size="mini"
            type="primary"
            plain
            @click="newUpload(scope.row)"
            ><i class="el-icon-upload"></i>上传
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 20px 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

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
                  >立即上传<i class="el-icon-upload el-icon--right"></i
                ></el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-row>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleDele">取 消</el-button>
          <el-button @click="handleSave" type="primary">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 预览弹框 -->
    <el-dialog
      custom-class="previewDialog"
      title="预览"
      :fullscreen="true"
      v-model="previewVisible"
      :before-close="previewClose"
    >
      <iframe class="el-iframe" :src="previewFileUrl" frameborder="0"></iframe>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Base64 } from "js-base64";
import download from "@/utils/download";
import { fileApiURL, fileDownload } from "@/setting";
import jsonpath from "jsonpath";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      fileApiURL: fileApiURL,
      loading: true,
      limitNum: 1,
      formData: {
        id: "",
        content: "",
        opinion: "",
        reason: "",
        state: "",
        url: "",
      },
      // 弹窗
      dialogFormVisible: false,

      search: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],

      previewFileUrl: "",
      previewVisible: false,
      rulesReviewer: {
        content: [
          { required: true, message: "请输入备注内容", trigger: "blur" },
        ],
        opinion: [
          { required: true, message: "请输入备注内容", trigger: "blur" },
        ],
        reason: [
          { required: true, message: "请输入退回原因", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.load();
  },
  computed: {
    getUserId() {
      let userJson = sessionStorage.getItem("user");
      if (!userJson) {
        return;
      }
      let userId = JSON.parse(userJson);
      // console.log(userId);
      return userId.id;
    },
  },
  methods: {
    load() {
      this.loading = true;
      request
        .get("/paper/student/" + this.getUserId, {
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            search: this.search,
          },
        })
        .then((res) => {
          // console.log(res);
          this.loading = false;
          this.tableData = res.data.records;
          this.total = res.data.total;
          // console.table(res.data.records);
        });
    },

    // 方向
    showDirections(row) {
      let directions = row.directions;
      if (directions.length === 0) {
        return "空";
      }
      const names = jsonpath.query(directions, "$..name");
      return names.join("，");
    },
    // 指导老师
    showPaperReviewers(row) {
      let paperReviewers = row.paperReviewers;
      if (paperReviewers.length === 0) {
        return "空";
      }
      const names = jsonpath.query(paperReviewers, "$..name");
      return names.join("，");
    },

    export() {
      location.href =
        // "http://" + window.server.filesUploadUrl + ":8181/user/export";
        // "/api" + "/files/editor/upload";
        "";
    },

    //文件上传
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
      this.length = 1;
      // console.log(file.raw);
      // this.fileList.push(file.raw);
      // console.log(this.fileList, this.length);
    }, // 文件超出个数限制时的钩子s

    exceedFile(files, fileList) {
      this.$message.warning(
        `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length +
          fileList.length} 个`
      );
    }, // 文件上传成功时的钩子

    handleSuccess(res, file, fileList) {
      this.formData.url = file.response.data;
      console.log(this.formData.url);

      this.$message.success("文件上传成功");
    },

    handleError(err, file, fileList) {
      this.$message.error("文件上传失败");

      this.isBtn = false;
    },

    newUpload(row) {
      // this.form = JSON.parse(JSON.stringify(row));
      this.formData.id = row.id;
      this.dialogFormVisible = true;
    },

    handleDele() {
      this.dialogFormVisible = false;
      this.$refs["uploadS"].clearFiles();
    },

    handleSave() {
      let url = this.formData.url;
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
          id: this.formData.id,
          url: this.formData.url,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "上传成功",
            });
            this.load(); // 刷新表格的数据
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

    // handleDelete(id) {
    //   console.log(id);
    //   request.delete("/paper/" + id).then((res) => {
    //     if (res.status === 200) {
    //       this.$message({
    //         type: "success",
    //         message: "删除成功",
    //       });
    //     } else {
    //       this.$message({
    //         type: "error",
    //         message: res.msg,
    //       });
    //     }
    //     this.load(); // 删除之后重新加载表格的数据
    //   });
    //   dialogVisible = false; //关闭dialog
    // },

    handleDownload(row) {
      const file = row.paperFiles;
      // console.log(file[1]);
      if (file[1] !== undefined) {
        // console.log(file[1].url);
        const key = file[1];
        const fileName = key.url.replace(/^\/file\/([a-fA-F0-9]{32})_/, "");
        const fileSuffix = fileName.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[1];
        if (!fileName || !fileSuffix) {
          this.$message({
            type: "error",
            message: "文件名或文件后缀错误，请检查文件!",
          });
          return;
        }
        this.$message({
          type: "success",
          message: "文件下载中, 请稍后...",
        });
        request({
          url: fileDownload + key.url,
          method: "get",
          responseType: "blob",
        }).then((res) => {
          download(res, fileName, fileSuffix);
        });
      } else {
        this.$message({
          type: "info",
          message: "暂未找到任何文件",
        });
      }
    },

    handleSizeChange(pageSize) {
      // 改变当前每页的个数触发
      this.pageSize = pageSize;
      this.load();
    },
    handleCurrentChange(pageNum) {
      // 改变当前页码触发
      this.currentPage = pageNum;
      this.load();
    },
    // 预览事件
    previewOpen(data) {
      const file = data.paperFiles;
      if (file.length !== 0) {
        console.log(file);
        for (const key of file) {
          // console.log(key.typeOr);
          if (key.typeOr === 0) {
            // console.log(key.url);
            this.previewVisible = true;
            this.previewFileUrl =
              "http://blog.ivanlife.cn:8012/onlinePreview?url=" +
              encodeURIComponent(
                Base64.encode("http://static.ivanlife.cn" + key.url)
              );
            // console.log(this.previewFileUrl);
            // console.log(this.previewVisible);
          }
        }
      } else {
        this.$message("暂无链接");
      }
    },

    previewClose() {
      this.previewVisible = false;
      this.previewFileUrl = "";
    },
  },
};
</script>

<style>
.el-iframe {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
}

/* /deep/  在scoped中 可以更改外部样式 */
.previewDialog .el-dialog__body {
  /*width: 100%;*/
  height: 90%;
  padding: 0;
}

/* .upload-demo /deep/ .el-upload-list {
  height: 120px;
  width: 100px;
  line-height: 120px;
} */

/* .el-upload-dragger {
} */

/* .el-upload-list {
  width: 26%;
} */
/* .el-upload-list__item:first-child {
  margin-top: 0;
} */

/* .content {
  margin: 0;
} */
</style>
