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
          >新增</el-button -->

        <el-button type="primary" style="margin-left: 5px" @click="load"
        ><i class="el-icon-search"></i>查询
        </el-button
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
          :highlight-current-row="true"
          :header-cell-style="{ background: '#FFF5EE', color: '#1C1C1C' }"
        >
          <el-table-column
            prop="id"
            label="ID"
            sortable
            width="60"
            align="center"
          ></el-table-column>
          <el-table-column label="姓名">
            <template #default="scope">
              <span v-if="scope.row.name !== null">{{ scope.row.name }}</span>
              <span v-else>未知</span>
            </template>
          </el-table-column>

          <el-table-column label="性别">
            <template #default="scope">
              <span v-show="scope.row.gender === 2">女</span>
              <span v-show="scope.row.gender === 1">男</span>
              <span v-show="scope.row.gender === 0">未知</span>
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>

          <el-table-column label="角色">
            <template #default="scope">
              <span v-show="scope.row.role === 1">普通用户</span>
              <span v-show="scope.row.role === 2">初审</span>
              <span v-show="scope.row.role === 3">审稿人</span>
              <span v-show="scope.row.role === 4">终审</span>
            </template>
          </el-table-column>
          <el-table-column label="方向">
            <template #default="scope">
              <span v-show="scope.row.directionId === 1">区域风险评估与研究</span>
              <span v-show="scope.row.directionId === 2"
              >数值模拟与云计算应用</span
              >
              <span v-show="scope.row.directionId === 3">模型试验与现场研究</span>
              <span v-show="scope.row.directionId === 4"
              >监测预警系统设计与开发</span
              >
              <span v-show="scope.row.directionId === 5">算法模型研究</span>
              <span v-show="scope.row.directionId === 6">智能装备研发及应用</span>
              <span v-show="scope.row.directionId === 0">未知</span>
            </template>
          </el-table-column>


          <el-table-column label="操作" width="300">
            <template #default="scope">
              <el-button
                size="mini"
                type="warning"
                plain
                @click="showPaper(scope.row)"
              ><i class="el-icon-folder-opened"></i>查看上传文章
              </el-button
              >
              <el-button
                size="mini"
                type="success"
                plain
                @click="handleEdit(scope.row)"
              ><i class="el-icon-edit-outline"></i>编辑
              </el-button
              >
              <el-popconfirm
                title="确定删除吗？"
                @confirm="handleDelete(scope.row.id)"
              >
                <template #reference>
                  <el-button size="mini" type="danger"
                  ><i class="el-icon-delete "></i>删除
                  </el-button
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

      <el-dialog title="上传文章信息" width="90%" v-model="dialogReview">
        <el-table
          v-fit-columns
          v-loading="loading"
          :data="tableDataStu"
          border
          stripe
          style="width: 100%"
          tooltip-effect="dark"
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
                <el-form-item
                  v-show="props.row.keywordEn != null"
                  label="Keyword:"
                >
                  <span>{{ props.row.keywordEn }}</span>
                </el-form-item>
                <el-form-item label="摘要:">
                  <span>{{ props.row.summary }}</span>
                </el-form-item>
                <el-form-item
                  v-show="props.row.summaryEn != null"
                  label="Summary:"
                >
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
                <el-form-item label="ID">
                  <span>{{props.row.id}}</span>
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
            sortable
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


          <el-table-column label="操作" width="300">
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
              <el-button
                size="mini"
                type="primary"
                plain
                @click="previewOpen2(scope.row)"
              ><i class="el-icon-guide"></i>更换指导老师
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>


      <el-dialog title="用户信息" v-model="dialogVisible" width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="邮箱">
            <el-input
              v-model="form.email"
              style="width: 80%"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name" style="width: 80%"></el-input>
          </el-form-item>

          <el-form-item label="角色">
            <el-select v-model="form.role" style="width:80%">
              <el-option
                v-for="item in roles"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.value===4"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="研究方向">
            <el-select v-model="form.directionId" style="width:80%">
              <el-option
                v-for="item in directionIdOptions"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="性别">
            <el-select v-model="form.gender" style="width:80%">
              <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="update">确 定</el-button>
          </span>
        </template>
      </el-dialog>

      <el-dialog width="30%" title="请选择指导老师" v-model="reviewersVisible">
        <el-form
          ref="form"
          :model="form"
          :rules="rulesPaper"
          label-width="130px"
        >
          <el-form-item label="指导老师" prop="reviewerIds">
            <el-select multiple v-model="form.reviewerIds" placeholder="Select">
              <el-option
                v-for="item in tableDataThr"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="text-align: center;margin-top: 30px;">
          <el-button type="primary" plain @click="save"
          ><i class="el-icon-position"></i>提交
          </el-button>
        </div>
      </el-dialog>

      <!--       预览弹框-->
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
  </el-scrollbar>
</template>

<script>
import request from "@/utils/request";
import jsonpath from "jsonpath";
import { Base64 } from "js-base64";
import download from "@/utils/download";
// import Plugin from "@/v-fit-columns";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      loading: true,
      form: {
        id: '',
        reviewerIds: []
      },
      dialogVisible: false, // 弹窗
      dialogReview: false,
      previewVisible: false,
      reviewersVisible: false,
      search: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      tableDataStu: [],
      tableDataThr: [],
      directionIdOptions: [],
      currentUserId: "",

      roles: [
        { value: 1, label: "普通用户" },
        { value: 2, label: "初审" },
        { value: 3, label: "审稿人" },
        { value: 4, label: "终审" },
      ],
      genderOptions: [
        { value: 1, label: "男" },
        { value: 2, label: "女" },
        { value: 0, label: "未知" },
      ],

      rulesPaper: {
        reviewerIds: [
          { required: true, message: "请选择老师", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.load();
    this.getDirections();
  },
  methods: {
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
          // console.log(res);
          this.loading = false;
          this.tableData = res.data.records;
          // console.table(this.tableData);
          this.total = res.data.total;
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

    showPaperReviewers(row) {
      let paperReviewers = row.paperReviewers
      if (paperReviewers.length === 0) {
        return "空";
      }
      const names = jsonpath.query(paperReviewers, "$..name");
      return names.join("，");
    },


    getDirections() {
      request.get("/direction").then((res) => {
        // console.log(res.data);
        this.directionIdOptions = res.data;
      });
    },
    export() {
      location.href =
        // "http://" + window.server.filesUploadUrl + ":8181/user/export";
        // "/api" + "/files/editor/upload";
        "";
    },
    // add() {
    //   this.dialogVisible = true; // 显示弹窗
    //   this.form = {}; // 清空表单属性
    // },

    update() {
      request.put("/user", this.form).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "更新成功",
          });

          this.load(); // 刷新表格的数据
        } else {
          this.$message({
            type: "error",
            // message: res.msg,
            message: "保存失败",
          });
        }
      });
      this.dialogVisible = false; // 关闭弹窗
    },
    // save() {
    //   if (this.form.id) {
    //     // 更新
    //     request.put("/user", this.form).then((res) => {
    //       // console.log(res);
    //       if (res.status === 200) {
    //         this.$message({
    //           type: "success",
    //           message: "更新成功",
    //         });
    //       } else {
    //         this.$message({
    //           type: "error",
    //           message: res.msg,
    //         });
    //       }
    //       this.load(); // 刷新表格的数据
    //       this.dialogVisible = false; // 关闭弹窗
    //     });
    //   } else {
    //     // 新增
    //     request.post("/user", this.form).then((res) => {
    //       // console.log(res);
    //       if (res.status === 200) {
    //         this.$message({
    //           type: "success",
    //           message: "新增成功",
    //         });
    //       } else {
    //         this.$message({
    //           type: "error",
    //           message: res.msg,
    //         });
    //       }

    //       this.load(); // 刷新表格的数据
    //       this.dialogVisible = false; // 关闭弹窗
    //     });
    //   }
    // },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      // console.log(this.form);
      this.dialogVisible = true;
    },
    showPaper(row) {
      // console.log(row.id)
      let id = row.id
      this.dialogReview = true
      this.currentUserId = id
      // this.loading = true;
      request
        .get("/paper/student/" + id, {
          // params: {
          //   pageNum: this.currentPage,
          //   pageSize: this.pageSize,
          //   search: this.search,
          // },
        })
        .then((res) => {
          // console.log(res);
          // this.loading = false;
          this.tableDataStu = res.data.records;
          // this.total = res.data.total;
          // console.table(res.data.records);
        });
    },
    handleDelete(id) {
      // console.log(id);
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

    handleDownload(row) {
      const file = row.paperFiles;
      if (file.length !== 0) {
        console.log(file);
        for (const key of file) {
          // console.log(key.typeOr);
          if (key.typeOr === 0) {
            // console.log(key.url);
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

    previewOpen2(row) {
      // this.$message({
      //   type: "info",
      //   message: "暂时不支持该功能,尽情期待(*^_^*)"
      // })

      this.form.id = row.id
      this.form.reviewerIds = jsonpath.query(row.paperReviewers, "$..id")
      this.reviewersVisible = true
      request.post("/user/findAllTeacher").then((res) => {
        // console.table(res.data)
        this.tableDataThr = res.data

      })
    },

    save() {
      this.$refs["form"].validate((valid) => {
        console.log(valid)
        if (valid) {
          request.post("/paper/changeTeacher", {
            id: this.form.id,
            reviewerId: this.form.reviewerIds.join(",")
          }).then((res) => {
            console.log(res);
            if (res.data === "OK") {
              this.$message({
                type: "success",
                message: "修改成功",
              });
            } else {
              console.log(res);
              this.$message({
                type: "error",
                message: "修改失败",
              });
              return false;
            }
          }).catch((error) => {
            console.log(error);
          });

          request
            .get("/paper/student/" + this.currentUserId)
            .then((res) => {
              this.tableDataStu = res.data.records;
            });

          this.reviewersVisible = false
        }
      })

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
              "http://8.136.96.167:8012/onlinePreview?url=" +
              encodeURIComponent(Base64.encode(this.fileApiURL + key.url));
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

.previewDialog .el-dialog__body {
  /*.dj-dialog-body {*/
  height: 90%;
  padding: 0;
  /*}*/
}


</style>
