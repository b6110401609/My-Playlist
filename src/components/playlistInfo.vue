<template>
  <div class="sidenav" style="padding: 20px">
    <h1 style="font-style: normal; font-weight: 500; font-size: 20px">
      {{ playlistName }} <span class="badge badge-secondary" style="background-color: black" v-if="this.thaiContent"
              >TH</span
            >
    </h1>
    <iframe
      class="current-playlist"
      width="100%"
      height="330px"
      v-bind:src="url"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <div
      class="playlist-info"
      style="
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 0px;
      "
    >
      <div class="playlist-stat">
        <p>total view {{ totalView }}</p>
        <p>total like {{ totalLike }}</p>
        <p>total video {{ totalVideo }}</p>
      </div>
      <button type="button" class="btn btn-outline-success" v-if="isLoggedIn" @click="handleSubmitBookmark">Bookmark</button>
    </div>
  </div>
  <div class="main" style="padding-top:100px">
    <div class="video" v-for="(videoArr, i) in videosLoaded" :key="i">
      <iframe
        class="thumbnail"
        width="367px"
        height="205px"
        v-bind:src="this.videoArr[i].videoUrl"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div class="video-info">
        <p class="video-name">
          {{ this.videoArr[i].title }}
        </p>
        <div class="video-channel">
          <img class="channel-thumbnail" :src="this.videoArr[i].channelThumbnail" />
          <p class="video-view">{{ this.videoArr[i].channelTitle }}</p>
        </div>
        <p class="video-view">{{ this.videoArr[i].views }} views</p>
        <p class="video-view">{{ this.videoArr[i].likes }} likes</p>
        <p class="video-des">
          {{ this.videoArr[i].description }}
        </p>
      </div>
    </div>
    <button class="loadMore-button" @click="loadMore" v-if="seen">
      load more
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  mounted() {
    fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet%2Clocalizations&id=${this.$route.params.id}&fields=items(localizations%2Csnippet%2Flocalized%2Ftitle)&key=AIzaSyBsbxvOEZ8r6nDcr6xUW07MrW_pbSgePTM`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        JSON.stringify(data);
        this.playlistName = data["items"][0]["snippet"]["localized"]["title"];
        this.favorite.playlistTitle = data["items"][0]["snippet"]["localized"]["title"];

        this.searchPlaylist();
      });
    let auth = getAuth();
    const isLoggedIn = false
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.favorite.userEmail = user.email
      } else {
        this.isLoggedIn = false;
      }
    });
  },
  data() {
    return {
      seen: true,
      length: 5,
      totalView: 0,
      totalLike: 0,
      totalVideo: 0,
      thaiContent: false,
      thai: "",
      videoArr: [],
      REGEX_TH: /[ก-๙]/,
      youtubeKey: "AIzaSyDWds2Dk-t8Cmt4ILN1oPjpCsu_hXQ-jbQ",
      playlistName: "",
      url:
        "https://www.youtube.com/embed/videoseries?list=" +
        this.$route.params.id,
      favorite: {
        playlistId: this.$route.params.id,
        playlistTitle: "",
        userEmail: "",
        language: ""
      }
    };
  },
  computed: {
    videosLoaded() {
      if (this.length >= this.videoArr.length && this.videoArr.length != 0) {
        console.log(this.length, this.videoArr.length);
        this.hideButton();
      }
      return this.videoArr.slice(0, this.length);
    },
  },
  methods: {
    hideButton() {
      this.seen = false;
    },
    loadMore() {
      if (this.length > this.videoArr.length) return;
      this.length = this.length + 5;
    },
    searchPlaylist(nextPageToken) {
      var html = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${this.youtubeKey}&playlistId=${this.$route.params.id}&maxResults=50`;
      if (nextPageToken != null) {
        html = html + `&pageToken=${nextPageToken}`;
      }
      fetch(html)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          JSON.stringify(data);
          this.totalVideo = parseInt(data["pageInfo"]["totalResults"]);
          for (var videoIndex in data["items"]) {
            this.videoArr.push({
              title: data["items"][videoIndex]["snippet"]["title"],
              description: data["items"][videoIndex]["snippet"]["description"],
              videoId: data["items"][videoIndex]["snippet"]["resourceId"]["videoId"],
              videoUrl: "https://www.youtube.com/embed/" + data["items"][videoIndex]["snippet"]["resourceId"]["videoId"],
              views: 0,
              likes: 0,
              channelTitle: "",
              channelThumbnail: "",
            })
            if (this.REGEX_TH.test(data["items"][videoIndex]["snippet"]["title"])) {
              this.thaiContent = true;
              this.favorite.language = "TH";
              this.thai = "TH";
            }
            if (this.REGEX_TH.test(data["items"][videoIndex]["snippet"]["description"])) {
              this.thaiContent = true;
              this.favorite.language = "TH";
              this.thai = "TH";
            }
            else if (this.thaiContent == false){
              this.favorite.language = "NA";
              this.thai = "NA";
            }
            this.searchVideo(
              data["items"][videoIndex]["snippet"]["resourceId"]["videoId"],
              videoIndex
            );
          }
          if (data["nextPageToken"]) {
            this.searchPlaylist(data["nextPageToken"]);
          }
        });
    },
    searchVideo(videoId, videoIndex) {
      fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${this.youtubeKey}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          JSON.stringify(data);

          this.videoArr[videoIndex].views = parseInt(data["items"][0]["statistics"]["viewCount"]);
          this.videoArr[videoIndex].likes = parseInt(data["items"][0]["statistics"]["likeCount"]);

          this.totalView = this.totalView + parseInt(data["items"][0]["statistics"]["viewCount"]);
          this.totalLike = this.totalLike + parseInt(data["items"][0]["statistics"]["likeCount"]);

          this.searchChannel(
            data["items"][0]["snippet"]["channelId"],
            videoIndex
          );
        });
    },
    searchChannel(channelId, videoIndex) {
      fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${this.youtubeKey}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          JSON.stringify(data);
          this.videoArr[videoIndex].channelTitle = data["items"][0]["snippet"]["title"];
          this.videoArr[videoIndex].channelThumbnail = data["items"][0]["snippet"]["thumbnails"]["default"]["url"];
        });
    },
    handleSubmitBookmark(){
      let apiURL = 'http://localhost:4000/api/create-favorite'; 

      axios.post(apiURL, this.favorite).then(() => {
        this.$router.push("/favorite")
        this.favorite = {
          playlistId: "",
          playlistTitle: "",
          userId: "",
          language: ""
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
};
</script>

<style scoped>
.sidenav {
  height: 100%;
  width: 500px;
  position: fixed;
  z-index: 1;
  top: 90px;
  left: 0;
  background-color: #ffffff;
  overflow-x: hidden;
  padding-top: 20px;
}
/* .sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  color: #818181;
  display: block;
} */
/* .sidenav a:hover {
  color: #f1f1f1;
} */
.main {
  padding-top: 100px;
  margin-left: 500px;
  min-height: 100vh;
  padding: 10px;
}
.video {
  display: flex;
  background-color: white;
  margin-bottom: 10px;
  padding: 10px;
  box-shadow: 3px 3px 3px #cccccc;
}
.video-info {
  margin-left: 10px;
}
.video-info p {
  margin: 0;
}
.video-name {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
}
.video-view {
  font-style: normal;
  font-weight: 200;
  font-size: 14px;
}
.video-des {
  font-style: normal;
  font-weight: 200;
  font-size: 12px;
  line-height: 21px;
}
.video-channel {
  margin-top: 5px;
  display: flex;
  align-items: center;
}
.playlist-stat p {
  margin: 0;
}
.thumbnail {
  min-width: 367px;
  min-height: 205px;
}
.channel-thumbnail {
  border-radius: 50%;width:40px;height:40px;border: 0.5px solid #cccccc;
  margin-right: 10px;
}
.loadMore-button {
  height: 50px;
  width: 100%;
  border: 0.5px solid rgb(100, 100, 100);
  color: rgb(100, 100, 100);
}
</style>
