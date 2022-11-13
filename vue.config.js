const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = "在线审稿系统"; // page title

// 跨域配置
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"), // This line must in sass option
      },
    },
  },
  devServer: {
    //设置本地默认端口  选填
    port: 9876,
    proxy: {
      //设置代理，必须填
      "/api": {
        //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
        target: "http://10.190.3.103:8181", //代理的目标地址
        // target: "http://paper.lunatic.ren/api/",
        changeOrigin: true, //是否设置同源，输入是的
        pathRewrite: {
          //路径重写
          "^/api": "", //选择忽略拦截器里面的单词
        },
        legLevel: "debug",
        onProxyReq(proxyReq, req, res) {
          // console.log("------\n\n\n");
          // console.log(proxyReq.path);
        },
      },
    },
  },
  productionSourceMap: false,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    devtool: "source-map",
  },
};
