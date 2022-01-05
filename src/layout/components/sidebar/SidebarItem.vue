<template>
    <el-submenu :index="item.menuId" v-if="item.children.length > 0">
      <template #title>
        <i :class="item.icon"></i>
        <span>{{ item.menuName }}</span>
        <el-badge :value="getReviewCount(item)" :is-dot="false" class="item" type="danger"/>
      </template>
      <sidebar-item
          v-for="inner in item.children"
          :key="inner.menuId"
          :item="inner"
          :review-count="reviewCount"
      ></sidebar-item>
    </el-submenu>
    <el-menu-item :index="item.menuId" v-else @click="handleMenu(item)">
      <i :class="item.icon"></i>
      <span v-if="collapse">{{ item.menuName }}</span>
      <template #title>
        {{ item.menuName }}
        <el-badge :value="getReviewCount(item)" :is-dot="false" class="item" type="danger"/>
      </template>
    </el-menu-item>
</template>

<script>
import { setTabs, getTabs } from "@/utils/storage.js";
import { useStore } from "vuex";
import {watch, toRefs} from "vue";
import store from "@/store";

export default {
  name:'SidebarItem',
  props: {
    item: Object,
    collapse: Boolean,
    reviewCount: Object
  },
  data () {
    return {
    }
  },
  created() {
    console.log(this.reviewCount);
  },
  methods: {
    transZeroToNull(value) {
      if (value===0) return null
      return value
    },
    getReviewCount(item) {
      try {
        if (item.menuId === "222") {
          return this.transZeroToNull(this.reviewCount.first_paper.count + this.reviewCount.first_patent.count +this.reviewCount.first_report.count)
        } else if (item.menuId === "reviewer1") {
          return this.transZeroToNull(this.reviewCount.first_paper.count)
        }else if(item.menuId === "ReportReview1"){
          return this.transZeroToNull(this.reviewCount.first_report.count)
        }else if(item.menuId === "PatentReview1"){
          return this.transZeroToNull(this.reviewCount.first_patent.count)
        }
        if (item.menuId === "333") {
          return this.transZeroToNull(this.reviewCount.second_paper.count + this.reviewCount.second_patent.count + this.reviewCount.second_report.count)
        } else if (item.menuId === "reviewer2") {
          return this.transZeroToNull(this.reviewCount.second_paper.count)
        }else if(item.menuId === "ReportReview2"){
          return this.transZeroToNull(this.reviewCount.second_report.count)
        }else if(item.menuId === "PatentReview2"){
          return this.transZeroToNull(this.reviewCount.second_patent.count)
        }
        if (item.menuId === "444") {
          return this.transZeroToNull(this.reviewCount.third_paper.count + this.reviewCount.third_patent.count + this.reviewCount.third_report.count)
        } else if (item.menuId === "reviewer3") {
          return this.transZeroToNull(this.reviewCount.third_paper.count)
        }else if(item.menuId === "ReportReview3"){
          return this.transZeroToNull(this.reviewCount.third_report.count)
        }else if(item.menuId === "PatentReview3"){
          return this.transZeroToNull(this.reviewCount.third_patent.count)
        }


      } catch (e) {
        return null
      }
    },
    handleMenu(obj)  {
      const { menuId, menuName } = obj;
      let tabs = getTabs();
      let flag = true;
      tabs.forEach((item) => {
        if (item.id === menuId) {
          flag = false;
        }
      });
      if (flag) {
        tabs.push({
          id: menuId,
          name: menuName,
          active: true,
        });
      }
      store.commit("getActiveMenu", menuId);
      setTabs(tabs, menuId);
    },
    printReviewCount() {
      console.log(this.reviewCount);
    }

  },
  watch: {

  }
};
</script>

<style scoped>
.item {
  margin-top: -20px;
  /*margin-right: 40px;*/
}
</style>
