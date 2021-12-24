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
        v-for="item in menuList"
        :key="item.menuId"
        :item="item"
        :collapse="collapse"
    ></sidebar-item>
  </el-menu>
</template>

<script>
import {reactive, toRefs, computed, watch, onMounted, ref} from "vue";
import {useStore} from "vuex";
import Logo from "../Logo.vue";
import SidebarItem from "./SidebarItem.vue";
import {getTabs, getUser} from "@/utils/storage";
import {setBreadcrumb} from "@/utils/storage";
import {adminMenuList, auditorMenuList, studentMenuList, teacherMenuList} from "./menuList";

export default {
  components: {Logo, SidebarItem},
  props: {
    mode: String,
    showLogo: Boolean,
    collapse: Boolean,
  },
  setup(props) {
    const store = useStore();
    const collapse = props.collapse;

    const user = getUser()

    let menuList = (user) => {
      console.log(user);
      if (user.role === 0) {
        return studentMenuList
      } else if (user.role === 1) {
        return teacherMenuList
      } else if (user.role === 2) {
        return auditorMenuList
      } else if (user.role === 3) {
        return adminMenuList
      }
    }

    const data = reactive({
      activeMenu: "",
      menuList: menuList(user)
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
        if (list[i].menuId === id) {
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
    };
  },
};
</script>

<style></style>
