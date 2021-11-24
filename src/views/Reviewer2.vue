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

      <el-button
        type="primary"
        plain
        style="margin-left: 5px"
        @click="loadPaperAll"
        ><i class="el-icon-paperclip"></i>查看其它论文
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
      <!--      <el-table-column label="性别">-->
      <!--        <template #default="scope">-->
      <!--          <span v-if="scope.row.gender === 1">男</span>-->
      <!--          <span v-if="scope.row.gender === 0">女</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!-- <el-table-column prop="email" label="邮箱"></el-table-column> -->

      <!-- <el-table-column prop="name" label="姓名"> </el-table-column> -->

      <el-table-column
        prop="title"
        label="题目"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="titleS"
        label="题目(英)"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="keyword"
        label="关键词"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="keywordS"
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
        prop="summaryS"
        label="摘要(英)"
        show-overflow-tooltip
      ></el-table-column>

      <el-table-column label="方向" show-overflow-tooltip>
        <template #default="scope">
          <span v-if="scope.row.directionId === 1">区域风险评估与研究</span>
          <span v-if="scope.row.directionId === 2">数值模拟与云计算应用</span>
          <span v-if="scope.row.directionId === 3">模型试验与现场研究</span>
          <span v-if="scope.row.directionId === 4">监测预警系统设计与开发</span>
          <span v-if="scope.row.directionId === 5">算法模型研究</span>
          <span v-if="scope.row.directionId === 6">智能装备研发及应用</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="uploaderName"
        label="上传人"
        show-overflow-tooltip
      ></el-table-column>

      <!-- <el-table-column prop="state" label="状态">
        <template #default="scope">
          <span v-if="scope.row.state === 0" style="color:#909399">未审核</span>
          <span v-if="scope.row.state === 1" style="color:#e49724"
            >初审通过</span
          >
          <span v-if="scope.row.state === 2" style="color:#F56C6C"
            >初审未通过</span
          >
          <span v-if="scope.row.state === 3" style="color:#67C23A">通过</span>
        </template>
      </el-table-column> -->

      <el-table-column label="审核状态" align="center">
        <template #default="scope">
          <el-tag
            size="medium"
            :type="
              scope.row.state === 1
                ? 'primary'
                : scope.row.state === 0
                ? 'info'
                : scope.row.state === 3
                ? 'success'
                : 'danger'
            "
            >{{
              scope.row.state === 1
                ? "初审通过"
                : "未审核" && scope.row.state === 3
                ? "终审通过"
                : "未审核" && scope.row.state === 2
                ? "初审未通过"
                : "未审核"
            }}</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column label="操作" width="330">
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
            @confirm="handleDownlaod(scope.row)"
          >
            <template #reference>
              <el-button size="mini" type="warning" plain
                ><i class="el-icon-folder-add"></i>下载</el-button
              >
            </template>
          </el-popconfirm>

          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleEdit1(scope.row)"
            ><i class="el-icon-circle-check"></i>通过
          </el-button>

          <el-button size="mini" type="danger" @click="handleEdit(scope.row)"
            ><i class="el-icon-circle-close"></i>退回
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 20px 0">
      <!-- <el-pagination
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination> -->
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
        <el-form-item label="备注内容：" prop="content">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="formdata.content"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="修改意见：" prop="opinion">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="formdata.opinion"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="退回原因：" prop="reason">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="formdata.reason"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center" align="middle">
        <el-card style="display: flex;" shadow="hover">
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
                  >立即上传<i class="el-icon-upload el-icon--right"></i
                ></el-button>

                <!-- <el-button size="small" plain> 取消 </el-button> -->
              </div>
            </div>
          </div>
        </el-card>
      </el-row>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button @click="handlesave" type="primary">确定</el-button>
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
        <el-form-item label="备注内容：" prop="content">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="formdata.content"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="修改意见：" prop="opinion">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="formdata.opinion"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="退回原因：" prop="reason">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="formdata.reason"
          >
          </el-input>
        </el-form-item>
        <!-- <el-row type="flex" justify="center" align="middle">
          <el-card style="display: flex;" shadow="hover">
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
                    >立即上传<i class="el-icon-upload el-icon--right"></i
                  ></el-button>

                  <el-button size="small" plain> 取消 </el-button>
                </div>
              </div>
            </div>
          </el-card>
        </el-row> -->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button @click="save" type="primary">确定</el-button>
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
import { encode } from "js-base64";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      loading: true,

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
      total: 0,
      tableData: [],

      previewFileUrl: "",
      previewVisible: false,
      rulesReviewer: {
        // content: [
        //   { required: true, message: "请输入备注内容", trigger: "blur" },
        // ],
        // opinion: [
        //   { required: true, message: "请输入备注内容", trigger: "blur" },
        // ],
        reason: [{ required: true, message: "请输入内容", trigger: "blur" }],
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
      return userId.id;
      // return 12;
    },
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
      this.formdata.url = file.response.data;
      console.log(this.formdata.url);

      this.$message.success("文件上传成功");
    },

    handleError(err, file, fileList) {
      this.$message.error("文件上传失败");

      this.isBtn = false;
    },
    //查询
    load() {
      this.loading = true;
      request
        .get("/paper/teacher/" + this.getUserId, {
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            search: this.search,
          },
        })
        .then((res) => {
          console.log(res);
          this.loading = false;
          this.tableData = res.data.records;
          this.total = res.data.total;
        });
    },
    loadPaperAll() {
      this.loading = true;
      request
        .post("/paper/allpassPrimary/", {
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            search: this.search,
          },
        })
        .then((res) => {
          console.log(res);
          this.loading = false;
          this.tableData = res.data.records;
          this.total = res.data.total;
        });
    },
    // handleUploadSuccess(res) {
    //   if (res.status === 200) {
    //     this.$message.success("导入成功");
    //     this.load();
    //   }
    // },
    expoert() {
      location.href =
        // "http://" + window.server.filesUploadUrl + ":8181/user/export";
        // "/api" + "/files/editor/upload";
        "";
    },

    save() {
      console.log("====================================");
      this.$refs["formdata"].validate((valid) => {
        console.log(valid);
        if (valid) {
          console.log(this.formdata);
          request
            .post("/paper/failEmail", this.formdata)
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "退回成功",
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

          this.dialogVisible = false; // 关闭弹窗
          this.load(); // 刷新表格的数据
        }
      });
      this.$refs["formdata"].resetFields();
    },

    handleDownlaod(row) {
      let url = row.url;
      let filename = url.replace(/^\/files\/([a-fA-F0-9]{32})_/, "");

      request.get(url, {}, { responseType: "arraybuffer" }).then((res) => {
        fileDownload(res, filename);
      });
    },
    handleEdit(row) {
      // this.form = JSON.parse(JSON.stringify(row));
      this.formdata.id = row.id;
      this.dialogVisible = true;
    },
    handleEdit1(row) {
      // this.form = JSON.parse(JSON.stringify(row));
      this.formdata.id = row.id;
      this.dialogFormVisible = true;
    },
    handlesave(id) {
      console.log(id);
      request
        .post("/paper/passUltimate/", {
          id: this.formdata.id,
          commentFileUrl: this.formdata.url,
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "通过成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "请求超时",
            });
          }
          this.load();
        });
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
      // console.log(data.file);
      if (data.url) {
        console.log(data.url);
        this.previewVisible = true;
        this.previewFileUrl =
          "http://8.136.96.167:8012/onlinePreview?url=" +
          encodeURIComponent(encode("http://49.234.51.220:12345" + data.url)) +
          "&officePreviewType=pdf";
        // this.previewFileUrl =
        //   "https://view.officeapps.live.com/op/view.aspx?src=" + data.url;
        console.log(this.previewFileUrl);
        console.log(this.previewVisible);
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
</style>
