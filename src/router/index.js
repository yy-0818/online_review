import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/Layout.vue";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "/home",
    children: [
      //嵌套
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/Home"),
        meta: {
          title: "首页",
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
        path: "paper",
        name: "Paper",
        component: () => import("@/views/results/Paper"),
        meta: {
          title: "论文上传",
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
        path: "Reviewer",
        name: "Reviewer",
        component: () => import("@/views/correct/reviewer1/paper/Reviewer"),
        meta: {
          title: "初审",
          keepAlive: true,
        },
      },
      {
        path: "Reviewer2",
        name: "Reviewer2",
        component: () => import("@/views/correct/reviewer2/paper/Reviewer2"),
        meta: {
          title: "终审",
          keepAlive: true,
        },
      },
      {
        path: "MyPaper",
        name: "MyPaper",
        component: () => import("@/views/MyPaper"),
        meta: {
          title: "我的论文",
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
      title: "登录_科研成果内部审核系统",
      keepAlive: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register"),
    meta: {
      title: "注册_科研成果内部审核系统",
      keepAlive: true,
    },
  },

  {
    path: "/:catchAll(.*)",
    name: "/404",
    component: () => import("../views/error/404.vue"),
    meta: {
      title: "404",
      keepAlive: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
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
      next({ path: "/login" });
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
