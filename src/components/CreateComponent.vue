<template>
<div></div>
  <!-- <div class="search-bar">
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
        <div v-for="(playlistArr, i) in playlistArr" :key="i" class="col-12">
          <router-link
            :to="{ path: '/info/' + this.playlistArr[i].playlistId }"
            class="nav-link playlist-card"
          >
            <div :id="'rank_' + i" class="rank-number">
              {{ i + 1 }}
            </div>
            <div class="palylist-info">
              <div class="playlist-name" style="margin-bottom: 20px">
                {{ this.playlistArr[i].playlistTitle }}
              </div>
              <div class="playlist-media" style="display: flex">
                <img
                  class="playlist-thumbnail"
                  :src="this.playlistArr[i].playlistThumbnail"
                />
                <div class="playlist-static">
                  <div class="video-channel">
                    <img class="channel-thumbnail" :src="this.playlistArr[i].channelThumbnail" />
                    <p style="margin: auto;margin-left:0" class="video-view">{{ this.playlistArr[i].channelTitle }}</p>
                  </div>
                  <div class="published" style="margin-bottom: 10px">published at 
                    {{ this.playlistArr[i].playlistPublish }}
                  </div>
                  <div class="description">
                    {{ this.playlistArr[i].playlisDescription }}
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
// import $ from "jquery";
// import axios from "axios";
// export default {
//   el: "#app",
//   data() {
//     return {
//       playlistArr: [],
//       toggle: false,
//       apiKey: "AIzaSyDPBFn6K38lsvibpnVVLaDAN4G7khpIXkg",
//       searchWord: "",
//     };
//   },
//   methods: {
//     getPlaylistID() {
//       this.playlistArr = [];
//       if (this.searchWord != "") {
//         fetch(
//           `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.searchWord}&key=${this.apiKey}&maxResults=10&type=playlist&relevanceLanguage=th&order=rating&regionCode=TH`
//         )
//           .then((response) => {
//             return response.json();
//           })
//           .then((data) => {
//             JSON.stringify(data);
//             for (var playlistIndex in data["items"]) {
//               this.playlistArr.push({
//                 playlistTitle: data["items"][playlistIndex]["snippet"]["title"],
//                 playlistId: data["items"][playlistIndex]["id"]["playlistId"],
//                 playlisDescription:
//                   data["items"][playlistIndex]["snippet"]["description"],
//                 playlistPublish:
//                   data["items"][playlistIndex]["snippet"]["publishedAt"],
//                 playlistThumbnail:
//                   data["items"][playlistIndex]["snippet"]["thumbnails"][
//                     "medium"
//                   ]["url"],
//                 channelTitle: "",
//                 channelThumbnail: "",
//               });
//               this.searchChannel(
//                 data["items"][playlistIndex]["snippet"]["channelId"],
//                 playlistIndex
//               );
//             }
//           });
//       } else {
//         alert("invalid data");
//       }
//     },
//     searchChannel(channelId, playlistIndex) {
//       fetch(
//         `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${this.apiKey}`
//       )
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           JSON.stringify(data);
//           this.playlistArr[playlistIndex].channelTitle =
//             data["items"][0]["snippet"]["title"];
//           this.playlistArr[playlistIndex].channelThumbnail =
//             data["items"][0]["snippet"]["thumbnails"]["default"]["url"];
//         });
//     },
//   },
// };
</script>

<style scope>
/* .video-channel {
  margin-top: 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.channel-thumbnail {
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid #cccccc;
}
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
  width: 420px;
  height: 270px;
  border: 1px solid #ededed;
}
.palylist-info {
  padding: 15px;
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
  padding-left: 20px;
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
  border-color: #30475e; 
} */
</style>
