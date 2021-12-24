<template>
  <el-menu
    router
    :default-active="activeMenu"
    :unique-opened="true"
    :mode="mode"
    :collapse="isCollapse && mode !== 'horizontal'"
    :class="{ 'no-transition': isCollapse }"
  >
    <logo v-if="isShowLogo"></logo>
    <sidebar-item
      v-for="item in routers[0].children"
      :key="item.path"
      :item="item"
      :collapse="collapse"
      :base-path="item.path"
    ></sidebar-item>
  </el-menu>
</template>

<script>
import { reactive, toRefs, computed, watch, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Logo from "../Logo.vue";
import SidebarItem from "./SidebarItem.vue";
import { getTabs } from "@/utils/storage";
import { setBreadcrumb } from "@/utils/storage";
import {constRoutes} from "@/router";

export default {
  components: { Logo, SidebarItem },
  props: {
    mode: String,
    showLogo: Boolean,
    collapse: Boolean,
  },
  setup(props) {
    const store = useStore();
    const collapse = props.collapse;

    const routers = ref(constRoutes)

    const data = reactive({
      activeMenu: "",
      menuList: [
        {
          menuId: "home",
          menuName: "首页",
          children: [],
        },
        {
          menuId: "news",
          menuName: "资源分享",
          children: [],
        },
        {
          menuId: "MyPapers",
          menuName: "我的文献",
          children: [
            // { menuId: "MyPapers", menuName: "我的文献", children: [] },
            // { menuId: "MyReport", menuName: "我的报告", children: [] },
            // { menuId: "MyPatent", menuName: "我的专利", children: [] },
          ],
        },
        {
          menuId: "111",
          menuName: "成果上传",
          children: [
            { menuId: "paper", menuName: "论文上传", children: [] },
            { menuId: "report", menuName: "报告上传", children: [] },
            { menuId: "patent", menuName: "专利上传", children: [] },
          ],
        },
        {
          menuId: "222",
          menuName: "初审",
          children: [
            { menuId: "reviewer1", menuName: "论文审核", children: [] },
            { menuId: "PatentReview1", menuName: "专利审核", children: [] },
            { menuId: "ReportReview1", menuName: "报告审核", children: [] },
          ],
        },
        {
          menuId: "333",
          menuName: "二审",
          children: [
            { menuId: "reviewer2", menuName: "论文审核", children: [] },
            { menuId: "PatentReview2", menuName: "专利审核", children: [] },
            { menuId: "ReportReview2", menuName: "报告审核", children: [] },
          ],
        },
        {
          menuId: "444",
          menuName: "终审",
          children: [
            { menuId: "reviewer3", menuName: "论文审核", children: [] },
            { menuId: "PatentReview3", menuName: "专利审核", children: [] },
            { menuId: "ReportReview3", menuName: "报告审核", children: [] },
          ],
        },
        {
          menuId: "555",
          menuName: "系统管理",
          children: [
            { menuId: "user", menuName: "用户管理", path: "/", children: [] },
          ],
        },
      ],
    });

    // 是否显示Logo
    const isShowLogo = computed(() => {
      return props.showLogo;
    });

    // 是否折叠菜单
    const isCollapse = computed(() => {
      if (props.collapse) {
        return collapse;
      } else {
        return store.state.isCollapse;
      }
    });

    const _tabs = getTabs();
    _tabs.forEach((item) => {
      if (item.active) data.activeMenu = item.id;
    });

    const _getParentMenu = (list, id) => {
      for (let i in list) {
        if (list[i].menuId == id) {
          return [list[i]];
        }
        if (list[i].children) {
          let node = _getParentMenu(list[i].children, id);
          if (node !== undefined) {
            return node.concat(list[i]);
          }
        }
      }
    };
    setBreadcrumb(_getParentMenu(data.menuList, data.activeMenu));

    watch(
      () => store.state.activeMenu,
      (value, old) => {
        data.activeMenu = value;
        setBreadcrumb(_getParentMenu(data.menuList, value));
      }
    );

    const params = toRefs(data);
    return {
      ...params,
      isShowLogo,
      isCollapse,
        routers
    };
  },
};
</script>

<style></style>
