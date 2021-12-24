<template>
  <el-submenu :index="item.path" v-if="item.children !== undefined && item.children.length > 0">
    <template #title>
      <i class="el-icon-s-grid"></i>
      <span>{{ item.meta.title }}</span>
    </template>
    <sidebar-item
      v-for="inner in item.children"
      :key="inner.path"
      :item="inner"
      :base-path="inner.path"
    ></sidebar-item>
  </el-submenu>
  <el-menu-item :index="resolvePath(item.path)" v-else @click="handleMenu(item)">
    <i class="el-icon-s-data"></i>
    <span v-if="collapse">{{ item.meta.title }}</span>
    <template #title>{{ item.meta.title  }}</template>
  </el-menu-item>
</template>

<script>
import { setTabs, getTabs } from "@/utils/storage.js";
import { useStore } from "vuex";
import path from "path";
import { getCurrentInstance , toRef} from 'vue'

export default {
  props: {
    item: Object,
    collapse: Boolean,

    //基础路径，用于拼接
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const basePath = toRef(props, 'basePath')

    const store = useStore();
    // 点击菜单回调
    const handleMenu = (obj) => {
      const { path, meta } = obj;
      let tabs = getTabs();
      let flag = true;
      tabs.forEach((item) => {
        if (item.id === path) {
          flag = false;
        }
      });
      if (flag) {
        tabs.push({
          id: path,
          name: meta.title,
          active: true,
        });
      }
      store.commit("getActiveMenu", path);
      setTabs(tabs, path);
    };

    let isExternal = (path) =>{
      return /^(https?:|mailto:|tel:)/.test(path)
    }

    let resolvePath = (routePath) => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(basePath.value)) {
        return basePath
      }
      const p = path.resolve(basePath.value, routePath)
      console.log(p)
      return p
    }

    return {
      handleMenu,
      resolvePath
    };
  },
};
</script>

<style></style>
