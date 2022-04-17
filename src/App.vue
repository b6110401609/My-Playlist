
<template>
  <div id="youtube_head" style="
    padding-bottom: 3px;
">
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
  <div id="normal_nav">
    <nav style="display: flex; justify-content: space-between">
      <div class="left-side" style="display: flex">
        <a class="navbar-brand" href="#">
          <router-link to="/my-playlist/" class="no-red nav-link"
            >ミMY PLAYLISTS
          </router-link>
        </a>
        <a class="nav-link" href="#">
          <router-link to="/my-playlist/" class="nav-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </router-link>
        </a>
        <a class="nav-link" href="#" v-if="isLoggedIn">
          <router-link to="/favorite" class="nav-link">
            favorite
          </router-link>
        </a>
        <a class="nav-link" href="#">
          <router-link to="/advance" class="nav-link"
            >advance search
          </router-link>
        </a>
        <a class="nav-link" href="#">
          <router-link to="/about" class="nav-link"
            >about
          </router-link>
        </a>
      </div>
      <div class="right-side" style="display: flex">
        <a class="nav-link" href="#">
          <router-link to="/login" class="nav-link" v-if="!isLoggedIn"
            >Login
          </router-link>
        </a>
        <a class="nav-link" href="#">
          <router-link to="/register" class="nav-link" v-if="!isLoggedIn"
            >Register
          </router-link>
        </a>
        <a class="nav-link" href="#">
          <router-link
            to="/register"
            class="nav-link"
            @click="handleSignOut"
            v-if="isLoggedIn"
          >
            Sign out
          </router-link>
        </a>
      </div>
    </nav>
  </div>

  <div id="small_nav">
    <nav style="">
      <div
        class="top-side"
        style="display: flex; justify-content: space-between"
      >
        <a class="navbar-brand" href="#">
          <router-link to="/my-playlist/" class="no-red nav-link"
            >ミMY PLAYLISTS
          </router-link>
        </a>
        <button id="open_collapse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
            style="margin-right: 10px"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
      </div>
      <div class="bottom-side" style="display: none">
        <a class="nav-link" href="#">
          <router-link to="/my-playlist/" class="nav-link"> search </router-link>
        </a>
        <a class="nav-link" href="#" v-if="isLoggedIn">
          <router-link to="/favorite" class="nav-link"> favorite </router-link>
        </a>
        <a class="nav-link" href="#">
          <router-link to="/advance" class="nav-link"
            >advance search
          </router-link>
        </a>
        <a class="nav-link" href="#">
          <router-link to="/about" class="nav-link"
            >about
          </router-link>
        </a>
        <a class="nav-link" href="#">
          <router-link to="/login" class="nav-link" v-if="!isLoggedIn"
            >Login
          </router-link>
        </a>
        <a class="nav-link" href="#">
          <router-link to="/register" class="nav-link" v-if="!isLoggedIn"
            >Register
          </router-link>
        </a>
        <a class="nav-link" href="#">
          <router-link
            to="/register"
            class="nav-link"
            @click="handleSignOut"
            v-if="isLoggedIn"
          >
            Sign out
          </router-link>
        </a>
      </div>
    </nav>
  </div>
  <!-- Router view -->
  <div class="wrapper">
    <div class="main-app-content">
      <router-view style=""></router-view>
      </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  mounted() {
    this.click();
  },
  methods: {
    click() {
      $(document).ready(function () {
        $(".btn1").click(function () {
          $("p").slideUp();
        });
        $(".btn2").click(function () {
          $("p").slideDown();
        });
      }),
        $("#open_collapse").click(function () {
          if ($("#open_collapse").hasClass("open")) {
            $(".bottom-side").slideUp();
            $("#open_collapse").removeClass("open");
          } else {
            $(".bottom-side").slideDown();
            $("#open_collapse").addClass("open");
          }
        });
      $(".nav-link").click(function () {
        if ($("#open_collapse").hasClass("open")) {
          $(".bottom-side").slideUp();
          $("#open_collapse").removeClass("open");
        }
      });
    },
  },
};
</script>

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
    router.push("/my-playlist");
  });
};
</script>

<style>
.main-app-content {
  margin: auto;
  padding-top: 84px;
  width: 70%;
  min-height: 100vh;
  background-color: #fff;
}
template {
  padding: 0;
  margin: 0;
}
a.navbar-brand {
  font-weight: 600;
}
a.nav-link {
  color: black;
}
a.nav-link:hover {
  color: pink;
}
a.nav-link:active {
  color: pink;
}
.router-link-active.router-link-exact-active.nav-link {
  color: red;
}
.no-red.router-link-active.router-link-exact-active.nav-link {
  color: black;
}
#youtube_head {
  background-color: red;
  padding-left: 16px;
}
#open_collapse {
  padding: 0;
  border: none;
  background: none;
}
nav {
  border-bottom: 1px solid rgb(170, 170, 170);
  background-color: white;
}
.wrapper {
  padding: 0;
  margin: 0;
  background-color: #f3f3f3;
  position: absolute;
  top: 0;
  width: 100%;
  padding-top: 84px;
  z-index: -1;
  min-height: 100vh;
  padding-top: 0;
}

@media screen and (max-width: 768px) {
  #normal_nav {
    display: none;
  }
  #small_nav {
    display: block;
  }
  .wrapper {
    background-color: white;
  }
  .content {
    width: 100%;
    background-color: white;
  }
  .main-app-content {
    width: 100%;
}
}
@media screen and (min-width: 768px) {
  #youtube_head {
    display: block;
  }
  #normal_nav {
    display: block;
  }
  #small_nav {
    display: none;
  }
}
</style>