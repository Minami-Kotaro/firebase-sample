import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Login.vue";
import Todo from "../views/Task.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/todo",
    name: "About",
    component: Todo,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
