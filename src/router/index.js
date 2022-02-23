import { createWebHistory, createRouter } from "vue-router";
import CreateComponent from "@/components/CreateComponent.vue";
import EditComponent from "@/components/EditComponent.vue";
import ListComponent from "@/components/ListComponent.vue";
import playlistInfo from "@/components/playlistInfo.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import AdvanceSearch from "@/components/advanceSearch.vue";
import NormalSearch from "@/components/normalSearch.vue";
import Favorite from "@/components/Favorite.vue";

const routes = [
  {
    path: "/my-playlist/",
    name: "home",
    component: CreateComponent,
  },
  {
    path: "/view",
    name: "view",
    component: ListComponent,
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: EditComponent,
  },
  {
    path: "/info/:id",
    name: "info",
    component: playlistInfo,
  },
  {
    path: "/login",
    name: "login",
    component: () => import('../components/Login.vue'),
  },
  {
    path: "/register",
    name: "register",
    component: () => import('../components/Register.vue'),
  },{
    path: "/advance",
    name: "advance",
    component: AdvanceSearch,
  },
  {
    path: "/search",
    name: "search",
    component: NormalSearch,
  },
  {
    path: "/favorite",
    name: "favorite",
    component: Favorite,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// const getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const removeListener = onAuthStateChanged(
//       getAuth(),
//         (user) => {
//           removeListener();
//           resolve(user);
//         },
//       reject
//     );
//   });
// }

// router.beforeEach(async(to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (await getCurrentUser()) {
//       next();
//     }
//   } else {
//     alert("you don't have access!")
//     next("/favorite");
//   }
// });

export default router;