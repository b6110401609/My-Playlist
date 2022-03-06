import { createWebHistory, createRouter } from "vue-router";
import CreateComponent from "@/components/CreateComponent.vue";
import EditComponent from "@/components/EditComponent.vue";
import ListComponent from "@/components/ListComponent.vue";
import playlistInfo from "@/components/playlistInfo.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import AdvanceSearch from "@/components/advanceSearch.vue";
import NormalSearch from "@/components/normalSearch.vue";
import Favorite from "@/components/Favorite.vue";
import Guide from "@/components/Guide.vue";

const routes = [
  {
    path: "/my-playlist/",
    name: "home",
    component: NormalSearch,
    meta: {
      title: 'My Playlist'
    }
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
    meta: {
      title: 'My Playlist | Info'
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import('../components/Login.vue'),
    meta: {
      title: 'My Playlist | Login'
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import('../components/Register.vue'),
    meta: {
      title: 'My Playlist | Register'
    }
  },{
    path: "/advance",
    name: "advance",
    component: AdvanceSearch,
    meta: {
      title: 'My Playlist | Advance Search'
    }
  },
  {
    path: "/about",
    name: "about",
    component: CreateComponent,
  },
  {
    path: "/favorite",
    name: "favorite",
    component: Favorite,
    meta: {
      title: 'My Playlist | Favorite'
    }
  },
  {
    path: "/guide",
    name: "guide",
    component: Guide,
    meta: {
      title: 'My Playlist | Guide'
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next()
})

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