import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/homepage",
    component: () => import("@/views/homepage.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/teacher.vue")
      },
      {
        path: "teacher",
        component: () => import("@/views/teacher.vue")
      },
      {
        path: "reserve",
        component: () => import("@/views/reserve.vue")
      },
      {
        path: "records",
        component: () => import("@/views/reserveRecords.vue")
      }
    ]
  },
  {
    path: "/manager",
    component: () => import("@/views/manager.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/laboratoryM.vue")
      },
      {
        path: "laboratoryM",
        component: () => import("@/views/laboratoryM.vue")
      },
      {
        path: "teacherM",
        component: () => import("@/views/teacherM.vue")
      }
    ]
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;
