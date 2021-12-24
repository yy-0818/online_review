<template>
  <div style="padding: 10px">
    <!--    搜索区域-->
    <div style="margin: 10px 0">
      <el-input
        v-model="search"
        placeholder="请输入关键字"
        style="width: 20%"
        clearable
      ></el-input>

      <el-button type="primary" style="margin-left: 5px" @click="load"
        ><i class="el-icon-search"></i>查询
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
      :header-cell-style="{ background: '#FFF5EE', color: '#1C1C1C' }"
    >
      <el-table-column
        prop="id"
        label="ID"
        sortable
        width="60"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="title"
        label="题目"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="titleEn"
        label="题目(英)"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="keyword"
        label="关键词"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="keywordEn"
        label="关键词(英)"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="summary"
        label="摘要"
        tooltip-effect="light"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="summaryEn"
        label="摘要(英)"
        show-overflow-tooltip
      ></el-table-column>

      <el-table-column label="方向" show-overflow-tooltip>
        <template #default="scope">
          {{ showDirections(scope.row) }}
        </template>
      </el-table-column>

      <el-table-column
        prop="user.name"
        label="上传人"
        show-overflow-tooltip
      ></el-table-column>

      <el-table-column label="审核状态" align="center">
        <template #default="scope">
          <el-tag
              size="medium"
              :type="
              scope.row.state === 1 ||
              scope.row.state === 3
                ? 'primary'
                : scope.row.state === 0
                ? 'info'
                : scope.row.state === 4 || scope.row.state === 6 || scope.row.state === 2
                ? 'danger'
                :scope.row.state === 5 ?'success':''
            "
          >{{
              scope.row.state === 1
                  ? "初审通过"
                  : "未审核" && scope.row.state === 2
                      ? "一审未通过"
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

      <el-table-column fixed="right" label="操作" width="330">
        <template #default="scope">
          <el-button
            size="mini"
            type="success"
            plain
            @click="previewOpen(scope.row)"
            ><i class="el-icon-view"></i>预览
          </el-button>

          <el-popconfirm
            title="确定下载吗？"
            @confirm="handleDownload(scope.row)"
          >
            <template #reference>
              <el-button size="mini" type="warning" plain
                ><i class="el-icon-folder-add"></i>下载
              </el-button>
            </template>
          </el-popconfirm>

          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleAdopt(scope.row)"
            ><i class="el-icon-document-checked"></i>通过
          </el-button>

          <el-button size="mini" type="danger" @click="handleEdit(scope.row)"
            ><i class="el-icon-document-delete "></i>退回
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 20px 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 论文通过意见弹窗 -->
    <el-dialog
      title="意见"
      v-model="dialogFormVisible"
      :close-on-click-modal="false"
      width="42.3%"
    >
      <el-form
        ref="formdata"
        :model="formdata"
        :rules="rulesReviewer"
        label-width="100px"
      >
        <el-form-item label="备注内容:" prop="content">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="formdata.content"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="通过缘由:" prop="opinion">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="formdata.opinion"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="修改意见:" prop="reason">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="formdata.reason"
          >
          </el-input>
        </el-form-item>
      </el-form>

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

    <!-- 论文退回意见弹窗  -->
    <el-dialog
      title="退回意见"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      width="42.3%"
    >
      <el-form
        ref="formdata"
        :model="formdata"
        :rules="rulesReviewer"
        label-width="100px"
      >
        <el-form-item label="备注内容:" prop="content">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="formdata.content"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="修改意见:" prop="opinion">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="formdata.opinion"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="退回原因:" prop="reason">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="formdata.reason"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleDele2">取 消</el-button>
          <el-button @click="save()" type="primary">确定</el-button>
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
import { fileApiURL } from "@/setting";
import jsonpath from "jsonpath";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      fileApiURL: fileApiURL,
      loading: true,
      limitNum: 1,
      formdata: {
        id: "",
        content: "",
        opinion: "",
        reason: "",
        state: "",
        url: "",
      },

      dialogVisible: false, // 弹窗
      dialogFormVisible: false,
      search: "",
      currentPage: 1,
      pageSize: 10,
      types: 0,
      total: 0,
      tableData: [],

      previewFileUrl: "",
      previewVisible: false,
      rulesReviewer: {
        content: [
          //   { required: true, message: "请输入备注内容", trigger: "blur" },
          // ],
          // opinion: [
          //   { required: true, message: "请输入内容", trigger: "blur" },
        ],
        reason: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  created() {
    this.load();
  },

  methods: {
    //查询
    load() {
      this.loading = true;
      request
        .get(
          `/paper/findByTypesThird?pageNum=${this.currentPage}&pageSize=${this.pageSize}&types=${this.types}&search=${this.search}`
        )
        .then((res) => {
          // console.log(res);
          this.loading = false;
          this.tableData = res.data.records;
          this.total = res.data.total;
          // console.table(this.tableData);
        });
    },
    //方向
    showDirections(row) {
      let directions = row.directions;
      if (directions.length === 0) {
        return "无";
      }
      const names = jsonpath.query(directions, "$..name");
      return names.join("，");
    },
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
      this.formdata.url = file.response.data;
      console.log(this.formdata.url);

      this.$message.success("文件上传成功");
    },

    handleError(err, file, fileList) {
      this.$message.error("文件上传失败");

      this.isBtn = false;
    },

    export() {
      location.href =
        // "http://" + window.server.filesUploadUrl + ":8181/user/export";
        // "/api" + "/files/editor/upload";
        "";
    },

    save() {
      this.$refs["formdata"].validate((valid) => {
        console.log(valid);
        if (valid) {
          console.log(this.formdata);
          request
            .post("/paper/failBackThird", this.formdata)
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "退回完成,邮件已发送",
                });
                this.load(); // 刷新表格的数据
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

          this.dialogVisible = false; // 关闭弹窗
        } else {
          // this.$message({
          //   type: "error",
          //   message: "aaaa",
          // });
          return false;
        }
      });
      this.$refs["formdata"].resetFields();
    },
    handleEdit(row) {
      // this.form = JSON.parse(JSON.stringify(row));
      this.formdata.id = row.id;
      console.log(this.formdata.id);
      this.dialogVisible = true;
    },
    handleDele() {
      //通过
      // 取消弹窗并清空内容
      this.dialogFormVisible = false;
      this.$refs["formdata"].resetFields();
      this.$refs["upload"].clearFiles();
    },
    handleDele2() {
      //退回弹窗
      this.dialogVisible = false;
      this.$refs["formdata"].resetFields();
      this.$refs["upload"].clearFiles();
    },

    handleAdopt(row) {
      // this.form = JSON.parse(JSON.stringify(row));
      this.formdata.id = row.id;
      this.dialogFormVisible = true;
    },
    handleSave() {
      this.$refs["formdata"].validate((valid) => {
        console.log(valid);
        if (valid) {
          request
            .post("/paper/passThird", {
              commentFileUrl: this.formdata.url,
              content: this.formdata.content,
              id: this.formdata.id,
              opinion: this.formdata.opinion,
              reason: this.formdata.reason,
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "通过完成，邮件已发送",
                });
                this.load(); // 刷新表格的数据
              } else {
                this.$message({
                  type: "error",
                  message: "请求超时",
                });
              }
            });
          this.dialogFormVisible = false; // 关闭弹窗
        }
      });

      this.$refs["formdata"].resetFields();
      this.$refs["upload"].clearFiles();
    },

    handleDownload(row) {
      const file = row.paperFiles;
      if (file.length !== 0) {
        // console.log(file);
        for (const key of file) {
          // console.log(key.typeOr);
          if (key.typeOr === 0) {
            console.log(key.url);
            const filename = key.url.replace(
              /^\/files\/([a-fA-F0-9]{32})_/,
              ""
            );
            const fileSuffix = filename.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[1];
            if (!filename || !fileSuffix) {
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
              url: key.url,
              method: "get",
              responseType: "blob",
            }).then((res) => {
              download(res, filename, fileSuffix);
            });
          }
        }
      } else {
        this.$message({
          type: "info",
          message: "未找到文件",
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
      // console.log(data);
      // console.log(data.paperFiles);
      const file = data.paperFiles;
      if (file.length != 0) {
        // console.log(file);
        for (const key of file) {
          // console.log(key.typeOr);
          if (key.typeOr === 0) {
            // console.log(key.url);
            this.previewVisible = true;
            this.previewFileUrl =
              "http://8.136.96.167:8012/onlinePreview?url=" +
              encodeURIComponent(Base64.encode(this.fileApiURL + key.url));
            console.log(this.previewFileUrl);
            console.log(this.previewVisible);
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
  background-color: #fbf7f7;
}

/* /deep/  在scoped中 可以更改外部样式 */
.previewDialog .el-dialog__body {
  height: 90%;
  padding: 0;
}
</style>
