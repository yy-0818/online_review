# 科研成果审核系统

**中文** | [English](./README.md)

## 简介

基于 [vue](https://github.com/vuejs/vue) 和 [element-plus](https://github.com/element-plus/element-plus)实现🎉：

本架构使用的技术为：vue3+vite2+element-plus 的新一代的前端框架，It's fast!

使用 eslint格式校验代码,提高代码规范性和开发效率

## 更新日志

---

## 线上体验

[Access address](http://paper.lunatic.ren/login)

gitee 地址： https://gitee.com/torUntitled/paper_review_system.git

国内体线上地址：http://paper.lunatic.ren/login

## 相关项目

![image-20220107085038579](https://gitee.com/torUntitled/images/raw/master/img/notes/image-20220107085038579.png)

--


## 构建步骤

```bash
# 克隆项目
git clone https://gitee.com/torUntitled/paper_review_system.git

# 进入项目目录
cd  paper_review_system

# 安装依赖
npm install

# 启动服务
npm run serve
```

启动完成后会自动打开浏览器访问 [http://localhost:9876](http://localhost:9876/)， 你看到下面的页面就代表操作成功了

![login](https://gitee.com/torUntitled/images/raw/master/img/notes/login.png)

## 发布

```bash
# 构建测试环境
npm run build-serve

# 构建生产环境
npm run build
```

## 功能

```
- 登录 / 注册

- 权限验证
  - 页面权限
  - 指令权限
  - 权限配置

- 多环境发布
  - serve
  - build

- 全局功能
  #- 国际化多语言
  - 多种动态换肤
  - 快捷导航(标签页)
  - Svg Sprite 图标(取消)
  - Screenfull全屏
  - 自适应收缩侧边栏
  #- 动态侧边栏（支持多级路由嵌套）
  #- 动态面包屑

- 编辑器
  - 富文本
  #- Markdown

- 预览
  - pdf
  - word
  - zip等压缩包
  
- 邮件
  - 注册账号邮件
  - 审核邮件
  #- 邮件提醒
 
- 下载
  - 文件下载

- 错误页面
  - 404

- 組件
  - 头像上传
  - Dialog
  - 验证码ValidCode
  - Message

```

>注：#- --暂未实现(等待后续开发)
>

## Dependency-cruiser 

![dependencygraph](https://gitee.com/torUntitled/images/raw/master/img/notes/dependencygraph.svg)

> 项目依赖图

## 目录结构

```bash
├── public
│   ├── static
│   │   └── config.js
│   ├── favicon.ico
│   └── index.html         
├── src                    # 源代码
│   ├── assets             # 主题 字体等静态资源
│   ├── components         # 全局公用组件
│   ├── layout             # 全局 layout
│   ├── router             # 路由
│   ├── store              # 全局 store管理
│   ├── utils              # 全局公用方法
│   ├── views              # views 所有页面
│   ├── App.vue            # 入口页面
│   ├── main.js            # 入口文件 加载组件 初始化等
│   └── setting.js
├── babel.config.js
├── package-lock.json
├── package.json    
├── README-zh_CN.md
├── vue.config.js
└── webpack.config.js
```



## Git 贡献提交规范

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中



## 浏览器支持

注意：vue3不在支持IE浏览器
Modern browsers and Internet Explorer 11+.

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| IE11, Edge                                                   | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              |

## 维护者

[YOU](https://gitee.com/torUntitled)

