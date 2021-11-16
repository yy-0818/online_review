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
    >
      <el-table-column prop="id" label="ID" sortable></el-table-column>
      <!--      <el-table-column label="性别">-->
      <!--        <template #default="scope">-->
      <!--          <span v-if="scope.row.gender === 1">男</span>-->
      <!--          <span v-if="scope.row.gender === 0">女</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!-- <el-table-column prop="email" label="邮箱"></el-table-column> -->

      <!-- <el-table-column prop="name" label="姓名"> </el-table-column> -->

      <el-table-column prop="title" label="题目"></el-table-column>

      <el-table-column label="方向">
        <template #default="scope">
          <span v-if="scope.row.directionId === 1">区域风险评估与研究</span>
          <span v-if="scope.row.directionId === 2">数值模拟与云计算应用</span>
          <span v-if="scope.row.directionId === 3">模型试验与现场研究</span>
          <span v-if="scope.row.directionId === 4">监测预警系统设计与开发</span>
          <span v-if="scope.row.directionId === 5">算法模型研究</span>
          <span v-if="scope.row.directionId === 6">智能装备研发及应用</span>
        </template>
      </el-table-column>

      <el-table-column prop="state" label="状态">
        <template #default="scope">
          <span v-if="scope.row.state === 0" style="color:#909399">未审核</span>
          <span v-if="scope.row.state === 1" style="color:#e49724"
            >初审核通过</span
          >
          <span v-if="scope.row.state === 2" style="color:#F56C6C"
            >初审未通过</span
          >
          <span v-if="scope.row.state === 3" style="color:#67C23A">通过</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="260">
        <template #default="scope">
          <el-button
            size="mini"
            type="success"
            plain
            @click="previewOpen(scope.row)"
            >预览
          </el-button>

          <el-popconfirm
            title="确定通过吗？"
            @confirm="handlesave(scope.row.state)"
          >
            <template #reference>
              <el-button size="mini" type="primary" plain>通过</el-button>
            </template>
          </el-popconfirm>
          <!-- <el-button size="mini" type="primary" plain>编辑</el-button> -->
          <!-- <el-popconfirm
            title="确定退回吗？"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button size="mini" type="danger">退回</el-button>
            </template>
          </el-popconfirm> -->
          <el-button size="mini" type="danger" @click="handleEdit(scope.row)"
            >退回
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

    <!-- 论文批语弹窗  -->
    <el-dialog
      title="编辑"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      width="40%"
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
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <!-- <el-button type="primary" @click="save">确 定</el-button> -->
          <!-- @confirm="handleDelete(scope.row.id)" -->
          <el-popconfirm title="确定退回吗？" @confirm="save">
            <template #reference>
              <el-button type="primary">确 定</el-button>
            </template>
          </el-popconfirm>
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
        reviewerId: "",
        content: "",
        opinion: "",
        reason: "",
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
  methods: {
    load() {
      this.loading = true;

      request
        .get("/paper/all", {
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
      this.$refs["formdata"].validate((valid) => {
        console.log(valid);
        if (valid) {
          console.log(this.formdata);
          this.form.reviewerId = this.getUserId();
          request
            .post("/failMailToUser", this.formdata)
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
              this.dialogVisible = false; // 关闭弹窗
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
      // this.load(); // 刷新表格的数据
    },

    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    handlesave(state) {
      console.log(state);
    },

    handleDelete(id) {
      console.log(id);
      request.delete("/paper/" + id).then((res) => {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
        } else {
          this.$message({
            type: "error",
            message: res.msg,
          });
        }
        this.load(); // 删除之后重新加载表格的数据
      });
      dialogVisible = false; //关闭dialog
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
