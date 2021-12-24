<template>
  <div style="padding: 10px">
    <!--    功能区域-->
    <!--    <div style="margin: 10px 0">-->
    <!--      <el-button type="primary" @click="add">新增</el-button>-->
    <!--    </div>-->

    <!--    搜索 新增  查询-->
    <div style="margin: 5px 0">
      <el-input
        v-model="search"
        placeholder="请输入关键字"
        style="width: 20%"
        clearable
      ></el-input>
      <el-button type="primary" style="margin-left: 8px" @click="add"
        ><i class="el-icon-upload2 "></i>新增</el-button
      >
      <el-button type="primary" style="margin-left: 6px" @click="load"
        ><i class="el-icon-search"></i>查询</el-button
      >
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      stripe
      style="width: 100%"
    >
      <!--      <el-table-column-->
      <!--          prop="id"-->
      <!--          label="ID"-->

      <!--      >-->
      <el-table-column prop="id" label="ID" sortable> </el-table-column>
      <el-table-column prop="time" label="时间" sortable> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="author" label="作者"> </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="mini"
            type="success"
            plain
            @click="details(scope.row)"
            ><i class="el-icon-tickets"></i>详情</el-button
          >
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleEdit(scope.row)"
            ><i class="el-icon-edit-outline"></i>编辑</el-button
          >
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button size="mini" type="danger"
                ><i class="el-icon-delete "></i>删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 10px 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <el-dialog title="提示" v-model="dialogVisible" style="width:50%">
      <el-form :model="form" label-width="50px">
        <el-form-item label="标题">
          <el-input
            v-model="form.title"
            style="width: 50%"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <div id="div1"></div>
        <!--        <el-form-item label="内容">-->
        <!--          <el-input v-model="form.price" style="width: 80%"></el-input>-->
        <!--        </el-form-item>-->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="详情" v-model="vis" width="50%">
      <el-card>
        <div v-html="detail.content" style="min-height: 100px"></div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import request from "@/utils/request";

let editor;

export default {
  name: "News",
  components: {},
  data() {
    return {
      loading: true,
      form: {
        id: "",
        time: "",
        author: "",
        title: "",
      },
      dialogVisible: false,
      search: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      vis: false,
      detail: {},
    };
  },
  created() {
    this.load();
  },
  // computed: {
  //   getUserId() {
  //     let userJson = sessionStorage.getItem("user");
  //     if (!userJson) {
  //       return;
  //     }
  //     let userId = JSON.parse(userJson);
  //     console.log(userId.id);
  //     return userId.id;
  //   },
  // },
  methods: {
    details(row) {
      this.detail = row;
      this.vis = true;
    },
    filesUploadSuccess(res) {
      console.log(res);
      this.form.cover = res.data;
    },
    load() {
      this.loading = true;
      request
        .get("/news", {
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            search: this.search,
          },
        })
        .then((res) => {
          this.loading = false;
          this.tableData = res.data.records;
          // console.log(res.data);
          this.total = res.data.total;
        });
    },
    add() {
      this.dialogVisible = true;
      this.form = {};

      this.$nextTick(() => {
        // 关联弹窗里面的div，new一个 editor对象
        if (!editor) {
          editor = new E("#div1");

          // 配置 server 接口地址
          editor.config.uploadImgServer = "/api/files/editor/upload";
          // "http://" +
          // window.server.filesUploadUrl +
          // ":8181/files/editor/upload";
          editor.config.uploadFileName = "file"; // 设置上传参数名称

          editor.config.uploadImgHooks = {
            // // 上传图片之前
            // before: function(xhr) {
            //   console.log(xhr);

            //   // 可阻止图片上传;
            //   return {
            //     prevent: false,
            //     msg: "错误信息",
            //   };
            // },
            // // 图片上传并返回了结果，图片插入已成功
            // success: function(xhr) {
            //   console.log("success", xhr);
            // },
            // // 图片上传并返回了结果，但图片插入时出错了
            // fail: function(xhr, editor, resData) {
            //   console.log("fail", resData);
            // },
            // // 上传图片出错，一般为 http 请求的错误
            // error: function(xhr, editor, resData) {
            //   console.log("error", xhr, resData);
            // },
            // // 上传图片超时
            // timeout: function(xhr) {
            //   console.log("timeout");
            // },
            // 图片上传并返回了结果，想要自己把图片插入到编辑器中
            // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
            customInsert: function(insertImgFn, result) {
              // result 即服务端返回的接口
              console.log("customInsert", result);

              // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
              insertImgFn("/api" + result.data[0].url);
            },
          };
          editor.create();
        }

        editor.txt.html("");
      });
    },
    save() {
      this.form.content = editor.txt.html(); // 获取 编辑器里面的值，然后赋予到实体当中

      if (this.form.id) {
        // 更新
        request.put("/news", this.form).then((res) => {
          console.log(res);
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
        let userStr = sessionStorage.getItem("user") || "{}";
        let user = JSON.parse(userStr);
        this.form.author = user.name;
        console.log(this.form.author);
        request.post("/news", this.form).then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "新增成功",
            });
            this.load();
          } else {
            this.$message({
              type: "error",
              message: res.msg,
            });
          }

          this.dialogVisible = false; // 关闭弹窗
        });
      }
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      console.log(this.form.id);
      this.dialogVisible = true;

      this.$nextTick(() => {
        // 关联弹窗里面的div，new一个 editor对象
        if (!editor) {
          editor = new E("#div1");
          // 配置 server 接口地址
          editor.config.uploadImgServer = "/api/files/editor/upload";
          // "http://" + window.server.filesUploadUrl + "/files/editor/upload";
          // console.log(editor.config.uploadImgServe);
          editor.config.uploadFileName = "file"; // 设置上传参数名称
          editor.create();
        }

        editor.txt.html(row.content);
      });
    },
    handleDelete(id) {
      console.log(id);
      request.delete("/news/" + id).then((res) => {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.load();
        } else {
          this.$message({
            type: "error",
            message: res.msg,
          });
        }
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
/* dialog弹窗居中 */
/* .el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
} */
</style>
