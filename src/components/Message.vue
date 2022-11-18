<template>
  <div>
    <div v-if="formData.role === 4">
      <el-input
        v-model="search"
        placeholder="请输入关键字"
        style="width: 20%"
        clearables
      ></el-input>
      <el-button
        type="primary"
        style="margin-left: 8px;position:relative"
        @click="add"
        ><i class="el-icon-upload2 "></i>新增</el-button
      >
      <el-button
        type="primary"
        style="margin-left: 8px;position:relative"
        @click="load"
        ><i class="el-icon-search"></i>查询</el-button
      >
    </div>

    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      style="width: 100%"
      max-height="30%"
    >
      <!--      <el-table-column prop="title" label="通知公告"> </el-table-column>-->

      <el-table-column prop="title" label="通知公告">
        <template #default="scope">
          <a
            :href="scope.row.title"
            @click.prevent="details(scope.row)"
            target="_blank"
            class="a1"
            >{{ scope.row.title }}</a
          >
        </template>
      </el-table-column>

      <el-table-column prop="name" width="80px" label="作者"> </el-table-column>
      <el-table-column
        prop="createTime"
        width="150px"
        label="时间"
        :formatter="dateFormat"
        sortable
      >
      </el-table-column>

      <el-table-column label="操作" width="120px" v-if="formData.role === 4">
        <template #default="scope">
          <!--          <el-button-->
          <!--              size="mini"-->
          <!--              type="success"-->
          <!--              plain-->
          <!--              @click="details(scope.row)"-->
          <!--          ><i class="el-icon-tickets"></i>详情</el-button-->
          <!--          >-->

          <!--                <el-button type="primary" style="margin-left: 8px" @click="add"-->
          <!--                ><i class="el-icon-upload2 "></i></el-button-->
          <!--                >-->

          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleEdit(scope.row)"
            circle
            ><i class="el-icon-edit-outline"></i
          ></el-button>
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button size="mini" type="danger" circle
                ><i class="el-icon-delete "></i
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 10px 0;position:relative">
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
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="公告详情" v-model="vis" width="50%">
      <el-card>
        <div v-html="detail.content" style="min-height: 100px"></div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import request from "@/utils/request";
import moment from "moment";
// import { borderBox1 } from '@jiaminghi/data-view'

let editor;

export default {
  name: "News",
  components: {},
  data() {
    return {
      // role:'',
      loading: true,
      form: {
        id: "",
        time: "",
        name: "",
        title: "",
        content: "",
      },
      formData: {
        id: "",
        email: "",
        name: "",
        gender: 0,
        password: "",
        avatarUrl: "",
        directionId: "",
        role: "",
      },
      dialogVisible: false,
      search: "",
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      vis: false,
      detail: {},
    };
  },
  created() {
    this.load();

    this.getDirections();
    let str = sessionStorage.getItem("user") || "{}";
    this.formData = JSON.parse(str);
    // console.log(this.formData)
  },

  methods: {
    dateFormat(row, column) {
      let date = row[column.property];
      if (date === null || date === "" || date === undefined) {
        return "";
      } else {
        return moment(date).format("YYYY-MM-DD");
      }
    },

    getDirections() {
      request.get("/direction").then((res) => {
        // console.log(res.data);
        this.directionIdOptions = res.data;
      });
    },

    details(row) {
      this.detail = row;
      this.vis = true;
    },
    filesUploadSuccess(res) {
      // console.log(res);
      this.form.cover = res.data;
    },
    load() {
      this.loading = true;
      request
        .get("/announcement/findAll", {
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
            customInsert: function(insertImgFn, result) {
              // result 即服务端返回的接口
              console.log("customInsert", result);

              // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
              insertImgFn("http://static.ivanlife.cn" + result.data[0].url);
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
        request.post("/announcement/update", this.form).then((res) => {
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
        let userStr = sessionStorage.getItem("user") || "{}";
        let user = JSON.parse(userStr);
        this.form.author = user.name;
        // console.log(this.form.author);
        request
          .post("/announcement/save", {
            uploaderId: this.formData.id,
            title: this.form.title,
            createTime: this.form.time,
            id: this.form.id,
            content: this.form.content,
          })
          .then((res) => {
            // console.log(res);
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
      // console.log(this.form.id);
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
      // console.log(id);
      request.delete("/announcement/" + id).then((res) => {
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
.a1 {
  color: #000000;
  padding: 10px;
  text-decoration: none;
  /*font: 16px '微软雅黑';*/
  background-color: #ffffff;
  border-bottom: 1px solid red;
}

.a1:active {
  background-color: #bec3c6;
}

.a2 {
  background-color: #f1efc7;
  color: #000000;
  padding: 10px;
  text-decoration: none;
  font-size: 16px;
  box-shadow: #666 0px 0px 6px;
}
.a2:active {
  background-color: #bdbc9d;
}
</style>
