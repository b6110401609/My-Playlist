<template>
  <main style="display: flex; justify-content: center">
    <div class="main-content">
      <div
        class="search-bar"
        style="margin-top: 90px; box-shadow: 0px 1px 0px #cccccc"
      >
        <input
          placeholder="search"
          type="text"
          class="from-control"
          style="
            width: 500px;
            border: none;
            background-color: rgb(240, 240, 240);
            padding: 20px;
            border-radius: 50px;
          "
          v-model="searchWord"
        />
        <button
          class="btn btn-primary from-control"
          style="border-radius: 50px"
          v-on:click="getPlaylistID"
          @click="toggle = true"
        >
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
        </button>
      </div>
      <div id="app">
        <div v-show="toggle">
          <div class="container" style="margin-top: 15px">
            <div
              v-for="(playlistArr, i) in playlistArr"
              :key="i"
            >
            <router-link :to="{ path: '/info/' + this.playlistArr[i].playlistId }" style="display:flex;text-decoration: none; color: inherit;border-bottom: 1px solid #cccccc;">
                <div style="width:90px;display:flex;justify-content:center">
                    <div class="numberCircle" style="font-size: 25px;margin-top: 18px;" :id="'rank_' + i" >{{i+1}}</div>
                </div>
                <div style="width:100%;padding:10px;margin:0;padding-bottom:20px;" class="playlist-info">
                    <div class="playlist-title" style="font-size:20px;">{{this.playlistArr[i].playlistTitle}}</div>
                    <div class="playlist-media" style="display:flex;margin-top:10px">
                        <img class="playlist-thumbnail" :src="this.playlistArr[i].playlistThumbnail" style="width: 380px;height: 220px;">
                        <div class="playlist-detail" style="margin-left:20px">
                            <div class="playlist-channel" style="display:flex;align-items:center">
                                <img class="channel-thumbnail" :src="this.playlistArr[i].channelThumbnail" style="border-radius: 50%;width:40px;height:40px;border: 0.5px solid #cccccc;"/>
                                <div class="channel-title" style="font-size:16px;margin-left:10px">{{ this.playlistArr[i].channelTitle }}</div>
                            </div>
                            <div class="playlist-publish" style="font-size:14px;margin-top:10px;">published at {{ this.playlistArr[i].playlistPublish }}</div>
                            <div class="playlist-des" style="font-size:14px;margin-top:10px;">{{ this.playlistArr[i].playlisDescription }}</div>
                        </div>
                    </div>
                </div>
            </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  el: "#app",
  data() {
    return {
      playlistArr: [],
      toggle: false,
      apiKey: "AIzaSyDPBFn6K38lsvibpnVVLaDAN4G7khpIXkg",
      searchWord: "",
    };
  },
  methods: {
    getPlaylistID() {
      this.playlistArr = [];
      if (this.searchWord != "") {
        fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.searchWord.trim()}&key=${this.apiKey}&maxResults=10&type=playlist&relevanceLanguage=th&order=rating&regionCode=TH`
        )
          .then((response) => {
            if (response.status != 200) {
              alert("API key error")
            }
            return response.json();
          })
          .then((data) => {
            JSON.stringify(data);
            for (var playlistIndex in data["items"]) {
              this.playlistArr.push({
                playlistTitle: data["items"][playlistIndex]["snippet"]["title"],
                playlistId: data["items"][playlistIndex]["id"]["playlistId"],
                playlisDescription:
                  data["items"][playlistIndex]["snippet"]["description"],
                playlistPublish:
                  data["items"][playlistIndex]["snippet"]["publishedAt"].substring(0, 10),
                playlistThumbnail:
                  data["items"][playlistIndex]["snippet"]["thumbnails"][
                    "medium"
                  ]["url"],
                channelTitle: "",
                channelThumbnail: "",
              });
              this.searchChannel(
                data["items"][playlistIndex]["snippet"]["channelId"],
                playlistIndex
              );
            }
          });
      } else {
        alert("type some thing in search box");
      }
    },
    searchChannel(channelId, playlistIndex) {
      fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${this.apiKey}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          JSON.stringify(data);
          this.playlistArr[playlistIndex].channelTitle =
            data["items"][0]["snippet"]["title"];
          this.playlistArr[playlistIndex].channelThumbnail =
            data["items"][0]["snippet"]["thumbnails"]["default"]["url"];
        });
    },
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
.btn-primary {
  color: #fff;
  background-color: #30475e;
  border-color: #30475e;
  display: flex;
  align-items: center;
  margin-left: 5px;
}
.numberCircle {
    font: 32px Arial, sans-serif;

    width: 2em;
    height: 2em;
    box-sizing: initial;
    
    background: #fff;
    border: 0.07em solid rgb(160, 160, 160);
    color: rgb(145, 145, 145);
    text-align: center;
    border-radius: 50%;    
    
    line-height: 2em;
    box-sizing: content-box;   
}
.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active,
.btn-primary.active,
.open > .dropdown-toggle.btn-primary {
  color: #fff;
  background-color: #30475e;
  border-color: #30475e;
}
textarea:hover,
input:hover,
textarea:active,
input:active,
textarea:focus,
input:focus,
button:focus,
button:active,
button:hover,
label:focus,
.btn:active,
.btn.active {
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
}
#rank_0 {
    color: #fff;
    border: none;
    background-color: #d6af36;
}
#rank_1 {
    color: #fff;
    border: none;
    background-color: #a7a7ad;
}
#rank_2 {
    color: #fff;
    border: none;
    background-color: #a77044;
}
</style>
