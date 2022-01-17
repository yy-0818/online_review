<template>


  <el-menu
      router
      :default-active="data.activeMenu"
      :unique-opened="true"
      :mode="mode"
      :collapse="isCollapse && mode !== 'horizontal'"
      :class="{ 'no-transition': isCollapse }"
  >
    <logo v-if="isShowLogo"></logo>
    <sidebar-item
        v-for="item in data.menuList"
        :key="item.menuId"
        :item="item"
        :collapse="collapse"
        :review-count="reviewCount"
    ></sidebar-item>
  </el-menu>

</template>

<script>
import Logo from "../Logo.vue";
import SidebarItem from "./SidebarItem.vue";
import {getTabs, getUser} from "@/utils/storage";
import {setBreadcrumb} from "@/utils/storage";
import {adminMenuList, auditorMenuList, studentMenuList, teacherMenuList} from "./menuList";
import request from "@/utils/request";
import store from "@/store";

export default {
  components: {Logo, SidebarItem},
  props: {
    mode: String,
    showLogo: Boolean,
    collapse: Boolean,
  },
  data() {
    return {
      user: getUser(),
      tabs: getTabs(),
      reviewCount: {},
      data: {
        activeMenu: "",
        menuList: []
      }
    }
  },
  methods: {
    _getParentMenu(list, id) {
      for (let i in list) {
        if (list[i].menuId === id) {
          return [list[i]];
        }
        if (list[i].children) {
          let node = this._getParentMenu(list[i].children, id);
          if (node !== undefined) {
            return node.concat(list[i]);
          }
        }
      }
    },
    async getReviewCount() {
      const { data } = await request.post("/paper/red")
      this.reviewCount = data
    }
  },
  computed: {
    menuList() {
      if (this.user.role === 1) {
        return studentMenuList
      } else if (this.user.role === 2) {
        return teacherMenuList
      } else if (this.user.role === 3) {
        return auditorMenuList
      } else if (this.user.role === 4) {
        return adminMenuList
      }
    },
    isShowLogo() {
      return this.showLogo;
    },
    isCollapse() {
      if (this.collapse) {
        return this.collapse;
      } else {
        return store.state.isCollapse;
      }
    },
  },
  created() {
    this.getReviewCount()
    this.data.menuList = this.menuList
    this.tabs.forEach((item) => {
      if (item.active) this.data.activeMenu = item.id;
    });

    setBreadcrumb(this._getParentMenu(this.data.menuList, this.data.activeMenu));

  },
  watch: {
    'store.state.activeMenu': function (value, old) {
      this.data.activeMenu = value
      setBreadcrumb(this._getParentMenu(this.data.menuList, value))
    }

  }

};
</script>

<style></style>
