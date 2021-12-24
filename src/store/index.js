import { createStore } from "vuex";
import { getThemes } from "@/utils/storage";

const navbarType = getThemes()?.navbarType ?? "左侧菜单模式";
export default createStore({
  state: {
    user: {},
    navbarType: navbarType,
    isCollapse: false,
    activeMenu: "",
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    getNavbarType(state, data) {
      state.navbarType = data;
    },

    // 获取菜单折叠
    getCollapse(state, data) {
      state.isCollapse = data;
    },

    // 获取当前选中菜单
    getActiveMenu(state, data) {
      state.activeMenu = data;
    },
  },
  actions: {
    SET_USER({ commit }, user) {
      this.state.user = user;
    },
  },
  getters: {
    getUser: (state) => state.user,
    // 获取导航栏类型
  },
});
