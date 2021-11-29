const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir)
}

// 跨域配置
module.exports = {
    devServer: {
        //记住，别写错了devServer//设置本地默认端口  选填
        port: 9876,
        proxy: {
            //设置代理，必须填
            "/api": {
                //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                // target: "http://192.168.4.71:8181", //代理的目标地址
                target: "http://paper.lunatic.ren/api/",
                // target: "localhost:9090",
                changeOrigin: true, //是否设置同源，输入是的
                pathRewrite: {
                    //路径重写
                    "^/api": "", //选择忽略拦截器里面的单词
                },
                legLevel: "debug",
                onProxyReq(proxyReq, req, res) {
                    // console.log("------\n\n\n");
                    // console.log(proxyReq.path);
                    console.log(
                        " ......................阿弥陀佛......................\n" +
                        "                       _oo0oo_                      \n" +
                        "                      o8888888o                     \n" +
                        '                      88" . "88                     \n' +
                        "                      (| -_- |)                     \n" +
                        "                      0\\  =  /0                     \n" +
                        "                   ___/‘---’\\___                   \n" +
                        "                  .' \\|       |/ '.                 \n" +
                        "                 / \\\\|||  :  |||// \\                \n" +
                        "                / _||||| -卍-|||||_ \\               \n" +
                        "               |   | \\\\\\  -  /// |   |              \n" +
                        "               | \\_|  ''\\---/''  |_/ |              \n" +
                        "               \\  .-\\__  '-'  ___/-. /              \n" +
                        "             ___'. .'  /--.--\\  '. .'___            \n" +
                        '         ."" ‘<  ‘.___\\_<|>_/___.’>’ "".          \n' +
                        "       | | :  ‘- \\‘.;‘\\ _ /’;.’/ - ’ : | |        \n" +
                        "         \\  \\ ‘_.   \\_ __\\ /__ _/   .-’ /  /        \n" +
                        "    =====‘-.____‘.___ \\_____/___.-’___.-’=====     \n" +
                        "                       ‘=---=’                      \n" +
                        "                                                    \n" +
                        "....................佛祖保佑 ,永无BUG..................."
                    );
                },
            },
        },
    },

    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        devtool: 'source-map'
    },
};
