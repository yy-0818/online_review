<!--
<template>
  <el-dialog
    title="预览"
    :visible.sync="viewVisible"
    width="100%"
    height="100%"
    :before-close="closeDialog"
  >
    <div class="pdf" v-show="fileType === 'pdf'">
      <pdf :src="pdfsrc"></pdf>
    </div>
  </el-dialog>
</template>

<script>

// 引入刚才下载的 pdf
import pdf from 'vue-pdf'

  export default {


    components: {

      pdf
    },

    data() {

    	yuming: "https://xxx.xxxxxxx.xxxx/m",  // 域名  管理方便一点  /m 域名下的文件夹
    	viewVisible:false, // 弹框隐藏
   		fileType:'pdf',// 文件类型
        pdfsrc:'',  // 文件地址
    };

    created() {

      // 有时PDF文件地址会出现跨域的情况,最好先处理一下
      this.pdfsrc = pdf.createLoadingTask(this.pdfsrc)
    },

    methods: {


		handleEdit(index, row) {

        //console.log(row.wjYsmc)
        if (!/\.(pdf|PDF)$/.test(row.wjYsmc)) {

          window.open(
            "https://view.officeapps.live.com/op/view.aspx?src=" + this.yuming + "/anli?id=" + row.id,
            "_blank"
          );
          return false;
        } else {

          let url = this.yuming + "/anli?id=" + row.id
          this.viewVisible = true
          this.pdfsrc = url
        }
      },

      closeDialog(done) {

        done();
      },
	}

 }
</script>

 -->

​
