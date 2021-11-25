<template>
  <el-scrollbar>
    <div style="padding: 10px" class="flex-content">
      <!--    功能区域-->
      <div style="margin: 10px 0">
        <!-- <el-upload
        action="http://api/user/import"
        :on-success="handleUploadSuccess"
        :show-file-list="false"
        :limit="1"
        accept=".xlsx"
        style="display: inline-block; margin: 0 10px"
      >
        <el-button type="primary">导入</el-button>
      </el-upload>
      <el-button type="primary" @click="exportUser">导出</el-button> -->
      </div>

      <!--    搜索区域-->
      <div style="margin: 10px 0">
        <el-input
          v-model="search"
          placeholder="请输入关键字"
          style="width: 20%"
          clearable
        ></el-input>
        <!-- <el-button style="margin-left: 5px" type="primary" @click="add"
          >新增</el-button
        > -->
        <el-button type="primary" style="margin-left: 5px" @click="load"
          ><i class="el-icon-search"></i>查询</el-button
        >
      </div>
      <div>
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
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column label="性别">
            <template #default="scope">
              <span v-if="scope.row.gender === 1">男</span>
              <span v-if="scope.row.gender === 0">女</span>
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱"> </el-table-column>

          <!-- <el-table-column prop="age" label="年龄"> </el-table-column> -->
          <el-table-column label="角色">
            <template #default="scope">
              <span v-if="scope.row.role === 0">游客</span>
              <span v-if="scope.row.role === 1">学生</span>
              <span v-if="scope.row.role === 2">老师</span>
              <span v-if="scope.row.role === 3">管理员</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="title" label="题目"> </el-table-column> -->
          <el-table-column label="方向">
            <template #default="scope">
              <span v-if="scope.row.directionId === 1">区域风险评估与研究</span>
              <span v-if="scope.row.directionId === 2"
                >数值模拟与云计算应用</span
              >
              <span v-if="scope.row.directionId === 3">模型试验与现场研究</span>
              <span v-if="scope.row.directionId === 4"
                >监测预警系统设计与开发</span
              >
              <span v-if="scope.row.directionId === 5">算法模型研究</span>
              <span v-if="scope.row.directionId === 6">智能装备研发及应用</span>
            </template>
          </el-table-column>

          <!-- <el-table-column prop="state" label="状态">
            <template #default="scope">
              <span v-if="scope.row.state === 0" style="color:#9a9b9c"
                >未审核</span
              >
              <span v-if="scope.row.state === 1" style="color:#E6A23C"
                >初审核通过</span
              >
              <span v-if="scope.row.state === 2" style="color:#F56C6C"
                >初审未通过</span
              >
              <span v-if="scope.row.state === 3" style="color:#67C23A"
                >通过</span
              >
            </template>
          </el-table-column> -->

          <el-table-column label="操作" width="100">
            <template #default="scope">
              <!-- <el-button
                size="mini"
                type="success"
                plain
                @click="showPaper(scope.row)"
                ><i class="el-icon-folder-opened"></i>查看上传论文</el-button
              > -->
              <!-- <el-button
                size="mini"
                type="primary"
                plain
                @click="handleEdit(scope.row)"
                >编辑</el-button
              > -->
              <el-popconfirm
                title="确定删除吗？"
                @confirm="handleDelete(scope.row.id)"
              >
                <template #reference>
                  <el-button size="mini" type="danger"
                    ><i class="el-icon-delete el-icon--left"></i>删除</el-button
                  >
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin: 10px 0">
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

      <el-dialog title="提示" v-model="dialogVisible" width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="用户名">
            <el-input
              v-model="form.email"
              style="width: 80%"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.Name" style="width: 80%"></el-input>
          </el-form-item>

          <el-form-item label="性别">
            <el-radio v-model="form.gender" label="男">男</el-radio>
            <el-radio v-model="form.gender" label="女">女</el-radio>
            <el-radio v-model="form.gender" label="未知">未知</el-radio>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </el-scrollbar>
</template>

<script>
import request from "@/utils/request";
// import Plugin from "@/v-fit-columns";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      loading: true,
      form: {},
      dialogVisible: false, // 弹窗
      search: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    // showBooks(books) {
    //   this.bookList = books;
    //   this.bookVis = true;
    // },
    load() {
      this.loading = true;
      request
        .get("/user/all", {
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
    handleUploadSuccess(res) {
      if (res.status === 200) {
        this.$message.success("导入成功");
        this.load();
      }
    },
    expoer() {
      location.href =
        // "http://" + window.server.filesUploadUrl + ":8181/user/export";
        // "/api" + "/files/editor/upload";
        "";
    },
    add() {
      this.dialogVisible = true; // 显示弹窗
      this.form = {}; // 清空表单属性
    },
    save() {
      if (this.form.id) {
        // 更新
        request.put("/user", this.form).then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "更新成功",
            });
          } else {
            this.$message({
              type: "error",
              message: res.msg,
            });
          }
          this.load(); // 刷新表格的数据
          this.dialogVisible = false; // 关闭弹窗
        });
      } else {
        // 新增
        request.post("/user", this.form).then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "新增成功",
            });
          } else {
            this.$message({
              type: "error",
              message: res.msg,
            });
          }

          this.load(); // 刷新表格的数据
          this.dialogVisible = false; // 关闭弹窗
        });
      }
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    showPaper() {},
    handleDelete(id) {
      console.log(id);
      request.delete("/user/" + id).then((res) => {
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
  },
};
</script>

<style scoped>
/* 边框
.el-table--border,
.el-table--group {
  border-color: rgb(214, 214, 214) !important;
}
.el-table--border:after,
.el-table--group:after,
.el-table:before {
  background-color: rgb(214, 214, 214) !important;
}
.el-table td,
.el-table--border th,
.el-table th.is-leaf {
  border-bottom-color: rgb(214, 214, 214) !important;
}
.el-table--border td,
.el-table--border th {
  border-right-color: rgb(214, 214, 214) !important;
} */
</style>
