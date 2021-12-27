import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import Plugin from "v-fit-columns";
// import "@/assets/css/global.css";
import "@/assets/css/layout.scss";
import "@/assets/css/custom.scss";
import VueParticles from "vue-particles";
import SvgIcon from "@/components/SvgIcon.vue";
import moment from 'moment'
// import VueLazyload from "vue-lazyload";

const app = createApp(App)
  .use(Plugin)
  .use(store)
  .use(router)
  .use(moment)
  .use(VueParticles)
  // .use(VueLazyload)
  .use(ElementPlus, { size: "small" })
  .component("SvgIcon", SvgIcon)
  .mount("#app");
