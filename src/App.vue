<template>
  <div  style="background-color: #ededed">
    <!-- Nav bar -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <a class="navbar-brand" href="#"
        ><router-link
          to="/"
          class="nav-link"
          style="color: #000; font-size: 24px"
          >ミMY PLAYLISTS</router-link
        ></a
      >
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
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="#"
            ><router-link to="/" class="nav-link">home</router-link></a
          >
          <a class="nav-item nav-link" href="#"
            ><router-link to="/view" class="nav-link">favorite</router-link></a
          >
        </div>
      </div>
    </nav>
    <!-- Router view -->
    <div>
      <router-view></router-view>
    </div>
    <footer style="height:200px;background-color:#da0037"></footer>
  </div>
</template>

<style>
.navbar {
  background-color: #da0037;
}
.navbar-brand .nav-link {
  padding-left: 40px;
  font-style: normal;
  font-weight: 900;
}
.navbar-dark .navbar-nav .nav-link {
  color: #ffffff;
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 21px;
}
.navbar {
  height: 60px;
}
.fixed-top {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
}
body {
  background-color: #ededed;
}

</style>