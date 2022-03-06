<template>
  <main style="display: flex; justify-content: center">
    <div class="main-content">
      <div
        class="search-bar"
        style="margin-top: 90px; box-shadow: 0px 1px 0px #cccccc"
      >
        <button class="btn-language btn-language-clicked" id="THNA">all langauge</button>
        <button class="btn-language" id="TH">ภาษาไทย</button>
        <button class="btn-language" id="NA">except Thai</button>
      </div>
      <h3 style="padding-top:20px;padding-left:20px;margin:0">Your Liked Playlist</h3>
      <div
        v-for="(playlistArr, i) in playlistArr"
        :key="playlistArr._id"
        style="box-shadow: 0px 1px 0px #cccccc; display: flex"
        :class="'playlist ' + this.playlistArr[i].language"
      > 
        <iframe
          width="387px"
          height="225px"
          v-bind:src="this.url + this.playlistArr[i].playlistId"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <div class="favorite-info col-8" style="margin-left: 20px">
          <h4>
            {{ this.playlistArr[i].playlistTitle }}
            <span class="badge badge-secondary" style="background-color: black" v-if="this.playlistArr[i].language == 'TH'"
              >TH</span
            >
          </h4>
          <router-link :to="{ path: '/info/' + this.playlistArr[i].playlistId }"
            ><button
              type="button"
              class="btn btn-outline-secondary info-button"
              :value="this.playlistArr[i].playlistId"
              style="margin-right: 10px"
            >
              more info
            </button></router-link
          >
          <button
            type="button"
            class="btn btn-outline-danger unLike-button"
            :value="this.playlistArr[i].playlistId"
            @click.prevent="deleteFavorite(playlistArr._id)"
          >
            unlike
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  mounted() {
    // this.clickLanguage();
    let auth = getAuth();
    const isLoggedIn = false
    onAuthStateChanged(auth, (user) => {
      if (user) {
        axios.get('http://localhost:4000/api')
        .then((response) => {
        const email = user.email
        const tempArr = []
        for (let i = 0; i < response.data.length; i++) {
          if (email == response.data[i].userEmail){
            tempArr.push(response.data[i])
          }
        }
        this.playlistArr = tempArr
        })
        .catch((error) => {
          console.log(error)
        })
      } else {
        console.log("Not Log in")
      }
    });
  },
  data() {
    return {
      chooseLanguage: "",
      playlistArr: [],
      toggle: false,
      apiKey: "AIzaSyDPBFn6K38lsvibpnVVLaDAN4G7khpIXkg",
      searchWord: "",
      url: "https://www.youtube.com/embed/videoseries?list=",
    };
  },
  methods: {
    // clickLanguage() {
    //   $("#TH").click(function () {
    //     $("#TH, #THNA, #NA").removeClass("btn-language-clicked");
    //     $(this).addClass("btn-language-clicked");
    //   });
    //   $("#THNA").click(function () {
    //     $("#TH, #THNA, #NA").removeClass("btn-language-clicked");
    //     $(this).addClass("btn-language-clicked");
    //   });
    //   $("#NA").click(function () {
    //     $("#TH, #THNA, #NA").removeClass("btn-language-clicked");
    //     $(this).addClass("btn-language-clicked");
    //   });
    //   $("#TH").click(function () {
    //     $(".TH, .NA").hide();
    //     $(".TH").show();
    //   });
    //   $("#NA").click(function () {
    //     $(".TH, .NA").hide();
    //     $(".NA").show();
    //   });
    //   $("#THNA").click(function () {
    //     $(".TH, .NA").show();
    //   });
    //   $(".unLike-button").click(function () {
    //     $(this).parent('div').parent('div').hide();
    //     alert("unlike: "+ $(this).val())
    //   });
    // },
    deleteFavorite(id){
      let apiURL = `http://localhost:4000/api/delete-favorite/${id}`;
      let indexOfArrayItem = this.playlistArr.findIndex(i => i._id === id);
      if (window.confirm("Do you really want to unlike?")) {
          axios.delete(apiURL).then(() => {
              this.playlistArr.splice(indexOfArrayItem, 1);
          }).catch(error => {
              console.log(error)
          });
      }
    }
  },
};
</script>

<style scope>
.main-content {
  width: 70%;
  min-height: 100vh;
  background-color: #fff;
}
.search-bar {
  height: 80px;
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-top: 60px;
  background-color: #fff;
}
.btn-language {
  width: 200px;
  color: #30475e;
  background-color: #fff;
  border: solid 2px #30475e;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  border-radius: 50px;
}
.btn-language-clicked {
  width: 200px;
  color: #fff;
  background-color: #30475e;
  border: solid 2px #30475e;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  border-radius: 50px;
}
.playlist {
  padding: 20px;
}
</style>

