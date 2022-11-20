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

      <el-table-column
        prop="user.name"
        label="作者"
        width="80px"
        align="center"
        show-overflow-tooltip
      ></el-table-column>

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

      <el-table-column label="操作" width="180">
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
                ><i class="el-icon-folder-add"></i>下载
              </el-button>
            </template>
          </el-popconfirm>
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
import { fileApiURL, fileDownload ,fileViewApiURL } from "@/setting";
import jsonpath from "jsonpath";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      fileApiURL: fileApiURL,
      fileViewApiURL:fileViewApiURL,
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
  computed: {},
  methods: {
    load() {
      this.loading = true;
      request
        // .get(`/paper/findByTypesFourth?pageNum=${this.currentPage}&pageSize=${this.pageSize}&search=${this.search}`)
        .get("/paper/findByTypesFourth/", {
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

    newUpload(row) {
      // this.form = JSON.parse(JSON.stringify(row));
      this.formData.id = row.id;
      this.dialogFormVisible = true;
    },

    handleDele() {
      this.dialogFormVisible = false;
      this.$refs["uploadS"].clearFiles();
    },

    handleDownload(row) {
      const file = row.paperFiles;
      console.log(file[0]);
      if (file[0] !== undefined) {
        // console.log(file[0].url);
        const key = file[0];
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
          message: "文件下载中, 请耐心等待...",
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
        // console.log(file);
        for (const key of file) {
          // console.log(key.typeOr);
          if (key.typeOr === 0) {
            // console.log(key.url);
            this.previewVisible = true;
            this.previewFileUrl =
              "http://blog.ivanlife.cn:8012/onlinePreview?url=" +
              encodeURIComponent(Base64.encode(this.fileViewApiURL + key.url));
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
