import {createRouter, createWebHistory} from "vue-router";
import Layout from "/src/layout/index.vue";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

export const constRoutes = [
  // {
  //   path: "/redirect",
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: "/redirect/:path(.*)",
  //       component: () => import("@/views/redirect/index"),
  //     },
  //   ],
  // },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/Home"),
        meta: {
          title: "首页",
          message: "欢迎您",
          keepAlive: true,
        },
      },
      {
        path: "user",
        name: "User",
        component: () => import("@/views/User"),
        meta: {
          title: "用户管理",
          keepAlive: true,
        },
      },

      {
        path: "news",
        name: "News",
        component: () => import("@/views/News"),
        meta: {
          title: "资源分享",
          keepAlive: true,
        },
      },


      {
        path: "person",
        name: "Person",
        component: () => import("@/views/Person"),
        meta: {
          title: "个人中心",
          keepAlive: true,
        },
      },
      {
        path: "paper",
        name: "Paper",
        component: () => import("@/views/FileUpload/Paper"),
        meta: {
          title: "论文上传",
          keepAlive: true,
        },
      },
      {
        path: "patent",
        name: "Patent",
        component: () => import("@/views/FileUpload/patent"),
        meta: {
          title: "专利上传",
          keepAlive: true,
        },
      },
      {
        path: "report",
        name: "Report",
        component: () => import("@/views/FileUpload/report"),
        meta: {
          title: "报告上传",
          keepAlive: true,
        },
      },



      {
        path: "/reviewer1",
        name: "Reviewer1",
        component: () => import("@/views/correct/reviewer1/paper/Reviewer"),
        meta: {
          title: "论文审核",
          keepAlive: true,
        },
      },
      {
        path: "PatentReview1",
        name: "PatentReview1",
        component: () => import("@/views/correct/reviewer1/patent/Reviewer"),
        meta: {
          title: "专利审核",
          keepAlive: true,
        },
      },
      {
        path: "ReportReview1",
        name: "ReportReview1",
        component: () => import("@/views/correct/reviewer1/report/Reviewer"),
        meta: {
          title: "报告审核",
          keepAlive: true,
        },
      },



      {
        path: "reviewer2",
        name: "Reviewer2",
        component: () => import("@/views/correct/reviewer2/paper/Reviewer2"),
        meta: {
          title: "论文审核",
          keepAlive: true,
        },
      },
      {
        path: "PatentReview2",
        name: "PatentReview2",
        component: () => import("@/views/correct/reviewer2/patent/Reviewer2"),
        meta: {
          title: "专利审核",
          keepAlive: true,
        },
      },
      {
        path: "ReportReview2",
        name: "ReportReview2",
        component: () => import("@/views/correct/reviewer2/report/Reviewer2"),
        meta: {
          title: "报告审核",
          keepAlive: true,
        },
      },

      {
        path: "reviewer3",
        name: "Reviewer3",
        component: () => import("@/views/correct/reviewer3/paper/Reviewer3"),
        meta: {
          title: "论文审核",
          keepAlive: true,
        },
      },
      {
        path: "PatentReview3",
        name: "PatentReview3",
        component: () => import("@/views/correct/reviewer3/patent/Reviewer3"),
        meta: {
          title: "专利审核",
          keepAlive: true,
        },
      },
      {
        path: "ReportReview3",
        name: "ReportReview3",
        component: () => import("@/views/correct/reviewer3/report/Reviewer3"),
        meta: {
          title: "报告审核",
          keepAlive: true,
        },
      },
      {
        path: "MyPapers",
        name: "MyPaper",
        component: () => import("@/views/MyFile/MyPapers"),
        meta: {
          title: "我的文献",
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/User"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
    meta: {
      index: 1,
      title: "登录",
      keepAlive: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register"),
    meta: {
      index: 2,
      title: "注册",
      keepAlive: true,
    },
  },

  {
    path: "/:catchAll(.*)",
    name: "/404",
    component: () => import("../views/error/404.vue"),
    meta: {
      index: 0,
      title: "404",
      keepAlive: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constRoutes,
});

// 限制某些页面禁止未登录访问
// let limitPagePath = [];
let writeList = ["/register"];

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */

  // NProgress.start()

  if (to.meta.title) {
    document.title = to.meta.title;
  }

  NProgress.start();

  if (!writeList.includes(to.path)) {
    let userStr = sessionStorage.getItem("user") || "{}";
    let user = JSON.parse(userStr);
    if (to.path !== "/login" && !user.token) {
      next({path: "/login"});
      NProgress.done();
    } else {
      if (to.path === "/login" && user.token) {
        next("/");
        NProgress.done();
      } else {
        next();
        NProgress.done();
      }
    }
  } else {
    next();
    NProgress.done();
  }
});

export default router;
