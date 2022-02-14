<template>
  <div class="search-bar">
    <input
      type="text"
      class="from-control"
      style="width: 500px; border-radius: 5px; border: none"
      v-model="searchWord"
    />
    <button
      class="btn btn-primary from-control"
      v-on:click="getPlaylistID"
      @click="toggle = true"
    >
      search
    </button>
  </div>
  <div id="app">
    <div v-show="toggle">
      <div class="container" style="margin-top: 15px">
        <div v-for="(title, i) in title" :key="i" class="col-12">
          <router-link
            :to="{ path: '/info/' + playlistId[i] }"
            class="nav-link playlist-card"
          >
            <div :id="'rank_' + i" class="rank-number">
              {{ i + 1 }}
            </div>
            <div class="palylist-info">
              <div class="playlist-name" style="margin-bottom:20px">
                {{ title }}
              </div>
              <div class="playlist-media" style="display: flex">
                <img class="playlist-thumbnail" :src="thumbnails[i]" />
                <div class="playlist-static">
                  <div class="published" style="margin-bottom:10px">
                    {{ publishedAt[i] }}
                  </div>
                  <div class="description">
                    {{ description[i] }}
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="row justify-content-center">
    <div class="col-md-6">

      <h1>Create Student</h1>
      <form @submit.prevent="handleSubmitForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            v-model="student.name"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            v-model="student.email"
            required
          />
        </div>
        <div class="form-group">
          <label for="phone">Phone</label>
          <input
            type="text"
            class="form-control"
            v-model="student.phone"
            required
          />
        </div>

        <div class="form-group">
          <button class="btn btn-success btn-block">Create</button>
        </div>
      </form>
    </div>
  </div> -->
</template>

<script>
// import $ from "jquery";
import axios from "axios";
export default {
  el: "#app",
  data() {
    return {
      toggle: false,
      playlistId: [],
      thumbnails: [],
      title: [],
      publishedAt: [],
      description: [],
      youtubeKey: "AIzaSyAF65tmnK9CCYfFWFUjxVgnqus49BGJ4nQ",
      searchWord: "",
      student: {
        name: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    getPlaylistID() {
      fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.searchWord}&key=${this.youtubeKey}&maxResults=10&type=playlist&relevanceLanguage=th&order=rating&regionCode=TH`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          JSON.stringify(data);
          for (var playlistIndex in data["items"]) {
            this.playlistId[playlistIndex] =
              data["items"][playlistIndex]["id"]["playlistId"];
            this.thumbnails[playlistIndex] =
              data["items"][playlistIndex]["snippet"]["thumbnails"]["medium"][
                "url"
              ];
            this.title[playlistIndex] =
              data["items"][playlistIndex]["snippet"]["title"];
            this.publishedAt[playlistIndex] =
              data["items"][playlistIndex]["snippet"]["publishedAt"];
            this.description[playlistIndex] =
              data["items"][playlistIndex]["snippet"]["description"];
          }
          this.updateData();
        });
      console.log(this.playlistName);
      console.log(this.playlistId);
      console.log(this.playlistThumbnail);
    },
    updateData() {
      console.log("works");
    },
    searchPlaylist() {
      console.log(this.className);
      // $("body").addClass(this.className);
    },
    handleSubmitForm() {
      let apiURL = "http://localhost:4000/api/create-student";
      axios
        .post(apiURL, this.student)
        .then(() => {
          this.$router.push("/view");
          this.student = {
            name: "",
            email: "",
            phone: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.search-bar {
  background-color: #cccccc;
  height: 80px;
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-top: 60px;
}
.playlist-card {
  display: flex;
  background-color: white;
  padding: 0;
  margin-bottom: 15px;
  border-radius: 15px;
  box-shadow: 3px 3px 3px #cccccc;
}
.rank-number {
  min-width: 150px;
  width: 150px;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  color: #000000;
  border-radius: 15px 0px 0px 15px;
  padding-top: 20px;
}
.playlist-thumbnail {
  /* box-sizing: border-box; */
  width: 420px;
  height: 270px;
  border: 1px solid #EDEDED;
}
.palylist-info {
  padding: 10px;
  padding-left: 15px;
}
.playlist-name {
  margin-top: 5px;
  margin-bottom: 10px;
  font-style: normal;
  font-size: 24px;
  line-height: 21px;
  color: #000000;
  max-width: 1000px;
}
.playlist-static {
  padding-left: 10px;
  font-style: normal;
  font-size: 18px;
  line-height: 21px;
  color: #4e4e4e;
}
#rank_0 {
  background: linear-gradient(180deg, #d6af36 0%, rgba(214, 175, 54, 0) 100%);
}
#rank_1 {
  background: linear-gradient(180deg, #a7a7ad 0%, rgba(167, 167, 173, 0) 100%);
}
#rank_2 {
  background: linear-gradient(180deg, #a77044 0%, rgba(167, 112, 68, 0) 100%);
}
.btn-primary {
  color: #fff;
  background-color: #30475e;
  border-color: #30475e;
  display: flex;
  align-items: center;
  margin-left: 5px;
}
.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active,
.btn-primary.active,
.open > .dropdown-toggle.btn-primary {
  color: #fff;
  background-color: #30475e;
  border-color: #30475e; /*set the color you want here*/
}
</style>
