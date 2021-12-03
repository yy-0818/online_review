import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/Layout.vue";

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
        component: () => import("@/views/Paper"),
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
        path: "im",
        name: "Im",
        component: () => import("@/views/Im"),
      },
      {
        path: "message",
        name: "Message",
        component: () => import("@/views/Message"),
      },
      {
        path: "Reviewer",
        name: "Reviewer",
        component: () => import("@/views/Reviewer"),
        meta: {
          title: "初审",
          keepAlive: true,
        },
      },
      {
        path: "Reviewer2",
        name: "Reviewer2",
        component: () => import("@/views/Reviewer2"),
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
    component: () => import("../views/404.vue"),
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
let limitPagePath = ["/about"];

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */

  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (limitPagePath.includes(to.path)) {
    // 判断sessionStorage是否保存了用户信息
    let userStr = sessionStorage.getItem("user") || "{}";
    let user = JSON.parse(userStr);
    if (!user.id) {
      // 跳转到登录页面
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
