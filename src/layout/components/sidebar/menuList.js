const userRole = {
  student: 1,
  teacher: 2,
  auditor: 3,
  admin: 4
}

function hasPermission(roles, menu) {
  if (menu.roles) {
    return  menu.roles.includes(roles)
    // return roles.some((role) => menu.roles.includes(role))
  } else {
    return true
  }
}

function filterAsyncRoutes(menus, roles) {
  const res = []

  menus.forEach((menu) => {
    const tmp = {...menu}
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export const adminMenuList = [
  {
    menuId: "home",
    menuName: "首页",
    icon: "el-icon-s-home",
    children: [],
  },
  {
    menuId: "news",
    menuName: "资源分享",
    icon: "el-icon-s-promotion",
    children: [],
  },
  {
    menuId: "MyPapers",
    menuName: "我的文献",
    icon: "el-icon-folder-opened",
    children: [],
  },

  {
    menuId: "111",
    menuName: "成果上传",
    icon: "el-icon-upload",
    children: [
      {menuId: "paper", menuName: "论文上传", icon: "el-icon-tickets", children: []},
      {menuId: "report", menuName: "报告上传", icon: "el-icon-document", children: []},
      {menuId: "patent", menuName: "专利上传", icon: "el-icon-collection", children: []},
    ],
  },
  {
    menuId: "ArchiveArticle",
    menuName: "归档文章",
    icon: "el-icon-folder-checked",
    children: [],
  },
  {
    menuId: "222",
    menuName: "初审",
    icon: "el-icon-receiving",
    children: [
      {menuId: "reviewer1", menuName: "论文审核", icon: "el-icon-tickets", children: []},
      {menuId: "ReportReview1", menuName: "报告审核", icon: "el-icon-document", children: []},
      {menuId: "PatentReview1", menuName: "专利审核", icon: "el-icon-collection", children: []},
    ],
  },
  {
    menuId: "333",
    menuName: "二审",
    icon: "el-icon-files",
    children: [
      {menuId: "reviewer2", menuName: "论文审核", icon: "el-icon-tickets", children: []},
      {menuId: "ReportReview2", menuName: "报告审核", icon: "el-icon-document", children: []},
      {menuId: "PatentReview2", menuName: "专利审核", icon: "el-icon-collection", children: []},
    ],
  },
  {
    menuId: "444",
    menuName: "终审",
    icon: "el-icon-reading",
    children: [
      {menuId: "reviewer3", menuName: "论文审核", icon: "el-icon-tickets", children: []},
      {menuId: "ReportReview3", menuName: "报告审核", icon: "el-icon-document", children: []},
      {menuId: "PatentReview3", menuName: "专利审核", icon: "el-icon-collection", children: []},
    ],
  },

  {
    menuId: "555",
    menuName: "系统管理",
    icon: "el-icon-setting",
    children: [
      {menuId: "user", menuName: "用户管理", icon: "el-icon-user-solid", children: []},
    ],
  },
]

export const studentMenuList = [
  {
    menuId: "home",
    menuName: "首页",
    icon: "el-icon-s-home",
    children: [],
  },
  {
    menuId: "news",
    menuName: "资源分享",
    icon: "el-icon-s-promotion",
    children: [],
  },
  {
    menuId: "MyPapers",
    menuName: "我的文献",
    icon: "el-icon-folder-opened",
    children: [],
  },
  {
    menuId: "111",
    menuName: "成果上传",
    icon: "el-icon-upload",
    children: [
      {menuId: "paper", menuName: "论文上传", icon: "el-icon-tickets", children: []},
      {menuId: "report", menuName: "报告上传", icon: "el-icon-document", children: []},
      {menuId: "patent", menuName: "专利上传", icon: "el-icon-collection", children: []},
    ],
  },
  {
    menuId: "ArchiveArticle",
    menuName: "归档文章",
    icon: "el-icon-folder-checked",
    children: [],
  },


]

export const auditorMenuList = [
  {
    menuId: "home",
    menuName: "首页",
    icon: "el-icon-s-home",
    children: [],
  },
  {
    menuId: "news",
    menuName: "资源分享",
    icon: "el-icon-s-promotion",
    children: [],
  },
  {
    menuId: "MyPapers",
    menuName: "我的文献",
    icon: "el-icon-folder-opened",
    children: [],
  },
  {
    menuId: "111",
    menuName: "成果上传",
    icon: "el-icon-upload",
    children: [
      {menuId: "paper", menuName: "论文上传", icon: "el-icon-tickets", children: []},
      {menuId: "report", menuName: "报告上传", icon: "el-icon-document", children: []},
      {menuId: "patent", menuName: "专利上传", icon: "el-icon-collection", children: []},
    ],
  },
  {
    menuId: "ArchiveArticle",
    menuName: "归档文章",
    icon: "el-icon-folder-checked",
    children: [],
  },
  {
    menuId: "222",
    menuName: "初审",
    icon: "el-icon-receiving",
    children: [
      {menuId: "reviewer1", menuName: "论文审核", icon: "el-icon-tickets", children: []},
      {menuId: "ReportReview1", menuName: "报告审核", icon: "el-icon-document", children: []},
      {menuId: "PatentReview1", menuName: "专利审核", icon: "el-icon-collection", children: []},
    ],
  },
  {
    menuId: "333",
    menuName: "二审",
    icon: "el-icon-files",
    children: [
      {menuId: "reviewer2", menuName: "论文审核", icon: "el-icon-tickets", children: []},
      {menuId: "ReportReview2", menuName: "报告审核", icon: "el-icon-document", children: []},
      {menuId: "PatentReview2", menuName: "专利审核", icon: "el-icon-collection", children: []},
    ],
  },

  {
    menuId: "555",
    menuName: "系统管理",
    icon: "el-icon-setting",
    children: [
      {menuId: "user", menuName: "用户管理", icon: "el-icon-user-solid", children: []},
    ],
  },
]

export const teacherMenuList = [
  {
    menuId: "home",
    menuName: "首页",
    icon: "el-icon-s-home",
    children: [],
  },
  {
    menuId: "news",
    menuName: "资源分享",
    icon: "el-icon-s-promotion",
    children: [],
  },
  {
    menuId: "MyPapers",
    menuName: "我的文献",
    icon: "el-icon-folder-opened",
    children: [],
  },
  {
    menuId: "111",
    menuName: "成果上传",
    icon: "el-icon-upload",
    children: [
      {menuId: "paper", menuName: "论文上传", icon: "el-icon-tickets", children: []},
      {menuId: "report", menuName: "报告上传", icon: "el-icon-document", children: []},
      {menuId: "patent", menuName: "专利上传", icon: "el-icon-collection", children: []},
    ],
  },
  {
    menuId: "222",
    menuName: "初审",
    icon: "el-icon-receiving",
    children: [
      {menuId: "reviewer1", menuName: "论文审核", icon: "el-icon-tickets", children: []},
      {menuId: "ReportReview1", menuName: "报告审核", icon: "el-icon-document", children: []},
      {menuId: "PatentReview1", menuName: "专利审核", icon: "el-icon-collection", children: []},
    ],
  },
  {
    menuId: "ArchiveArticle",
    menuName: "归档文章",
    icon: "el-icon-folder-checked",
    children: [],
  },

]
