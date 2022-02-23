<template>
  <div class="fixed-top-youtube">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-youtube"
      viewBox="0 0 16 16"
    >
      <path
        d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"
      />
    </svg>
    search from youtube
  </div>
  <!-- Nav bar -->
  <nav class="navbar navbar-expand-lg fixed-top">
    <a class="navbar-brand" href="#">
      <router-link to="/my-playlist/" class="non-red nav-link">ミMY PLAYLISTS </router-link>
    </a>
    <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    <div class="collapse navbar-collapse"  id="navbarNavAltMarkup" style="display:flex;justify-content: space-between">
      <div class="navbar-nav">
        <a class="nav-item nav-link" href="#"
          ><router-link to="/search" class="nav-link"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              /></svg></router-link
        ></a>
        <a class="nav-item nav-link" href="#" v-if="isLoggedIn"
          ><router-link to="/favorite" class="nav-link"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              /></svg></router-link
        ></a>
        <a class="nav-item nav-link" href="#"
          ><router-link to="/advance" class="nav-link"
            >advance search</router-link
          ></a
        >
      </div>
      <div class="navbar-nav" style="margin-right:30px">
        <a class="nav-item nav-link" href="#"
          ><router-link to="/login" class="nav-link" v-if="!isLoggedIn"
            >Login</router-link
          ></a
        >
        <a class="nav-item nav-link" href="#"
          ><router-link to="/register" class="nav-link" v-if="!isLoggedIn"
            >Register</router-link
          ></a
        >
        <!-- <a class="nav-item nav-link active" href="#"
            ><router-link to= class="nav-link" @click="handleSignOut" v-if="isLoggedIn">Sign out</router-link></a
          > -->
          <a class="nav-item nav-link" href="#"
          ><router-link to="/register" class="nav-link" @click="handleSignOut"
          v-if="isLoggedIn"
            >Sign out</router-link
          ></a
        >
      </div>
    </div>
  </nav>
  <!-- Router view -->
  <div class="wrapper">
    <router-view></router-view>
  </div>
  <!-- <footer style="bottom:0;height:200px;background-color:#da0037"></footer> -->
</template>
<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/login");
  });
};
</script>
<style>
.navbar {
  background-color: white;
  box-shadow: 0px 1px 0px #cccccc;
}
.navbar-brand .nav-link {
  padding-left: 40px;
  font-style: normal;
  font-weight: 500;
}
.navbar {
  height: 60px;
}
.fixed-top {
  position: fixed;
  margin-top: 30px;
  right: 0;
  left: 0;
  z-index: 1030;
}
.fixed-top-youtube {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  height: 30px;
  background-color: red;
  padding-left: 20px;
}
.wrapper {
  min-height: 100vh;
  background-color: #f3f3f3;
}
a .nav-link {
  color: black;
}
a .nav-link:hover {
  color: pink;
}
a .nav-link:active {
  color: pink;
}
.router-link-active.router-link-exact-active.nav-link {
  color: red;
}
.non-red.router-link-active.router-link-exact-active.nav-link {
  color: black;
}
.navbar-brand {
  color: black;
}
</style>