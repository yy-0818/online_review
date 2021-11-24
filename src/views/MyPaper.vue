<template>
  <div style="padding: 10px">
    <!--    搜索区域-->
    <div style="margin: 10px 0">
      <!-- <el-input
        v-model="search"
        placeholder="请输入关键字"
        style="width: 20%"
        clearable
      ></el-input>

      <el-button type="primary" style="margin-left: 5px" @click="load"
        >查询
      </el-button> -->
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

      <!-- <el-table-column
        prop="uploaderName"
        label="上传人"
        show-overflow-tooltip
      ></el-table-column> -->

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
                ? "待修改"
                : "未审核"
            }}</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column label="操作" width="170">
        <template #default="scope">
          <el-button
            size="mini"
            type="success"
            plain
            @click="previewOpen(scope.row)"
            ><i class="el-icon-tickets"></i>预览
          </el-button>
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
      },
      dialogVisible: false, // 弹窗

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
      return userId.id;
      // return 12;
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
    handleEdit(row) {
      // this.form = JSON.parse(JSON.stringify(row));
      this.formdata.id = row.id;
      this.dialogVisible = true;
    },
    handlesave(id) {
      console.log(id);
      request.post("/paper/passUltimate/" + id).then((res) => {
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
