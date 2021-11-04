<template>
    <div>
        <el-card style="width: 35%; margin: 10% 25%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item style="text-align: center" label-width="0">
                    <el-upload
                            class="avatar-uploader"
                            action="/api/files/upload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                    >
                        <img v-if="newAvatarUrl" :src="newAvatarUrl" class="avatar"/>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input style="width: 200px" v-model="form.email" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input style="width: 200px" v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="性别">
<!--                    <el-input v-model="form.gender"></el-input>-->
                    <el-select v-model="form.gender">
                        <el-option v-for="item in genderOptions"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">

                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="密码">
                    <el-input style="width: 200px" v-model="form.password" show-password></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center">
                <el-button type="primary" @click="update">保存</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    import request from "@/utils/request";

    export default {
        name: "Person",
        data() {
            return {
                // tx: "上传头像",
                newAvatarUrl: "",
                form: {
                    username: "",
                    nickname: "",
                    gender: 0,
                    password: "",
                    avatarUrl: "",
                },

                genderOptions: [{value: 1, label: "男"}, {value: 0, label: "女"}]
            };
        },
        created() {
            let str = sessionStorage.getItem("user") || "{}";
            this.form = JSON.parse(str);
        },
        methods: {
            handleAvatarSuccess(res) {
                this.newAvatarUrl = "/api" + res.data;
                this.$message.success("上传成功");
                // this.update()
            },
            update() {
                let url = this.newAvatarUrl.replace("/api", "");
                console.log(url);
                this.form.avatarUrl = url;
                request.put("/user", this.form).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        this.$message({
                            type: "success",
                            message: "更新成功",
                        });
                        sessionStorage.setItem("user", JSON.stringify(this.form));
                        // 触发Layout更新用户信息
                        this.$emit("userInfo");
                    } else {
                        this.$message({
                            type: "error",
                            message: res.msg,
                            // message: "保存失败",
                        });
                    }
                });
            },
        },
    };
</script>

<style>
    /* .el-card {
      min-width: 380px;
      margin-right: 20px;
      transition: all 0.5s;
    }
    .el-card:hover {
      margin-top: -5px;
    } */

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
