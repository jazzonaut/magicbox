import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes: readonly RouteRecordRaw[] = [
  { path: "/", name: "home", component: HomeView },
  {
    path: "/players",
    name: "players",
    component: () => import("@/views/PlayersView.vue"),
  },
  {
    path: "/play/:gameId",
    name: "setup",
    component: () => import("@/views/SetupView.vue"),
    props: true,
  },
  {
    path: "/play/:gameId/round",
    name: "round",
    component: () => import("@/views/PlayView.vue"),
    props: true,
  },
  // Unknown paths fall back to the game picker.
  { path: "/:pathMatch(.*)*", redirect: { name: "home" } },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes],
  scrollBehavior() {
    return { top: 0 };
  },
});
