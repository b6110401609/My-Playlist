<template>
  <div class="con small-playlist-header">
    <div class="row">
      <div class="col-sm-12">
        <h1 style="font-style: normal; font-weight: 500; font-size: 20px">
          {{ playlistName }}
          <span
            class="badge badge-secondary"
            style="background-color: black"
            v-if="this.thaiContent"
            >TH
          </span>
        </h1>
      </div>
    </div>
    <div class="row small-playlist-info" style="display: none">
      <div class="col-sm-12">
        <iframe
          class="iframe"
          width="100%"
          height="250px"
          v-bind:src="url"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
        </iframe>
      </div>
      <div class="col-sm-12">
        <div class="playlist-stat">
          <p>total views {{ totalView.toLocaleString() }}</p>
          <p>total like {{ totalLike.toLocaleString() }}</p>
          <p>total video {{ totalVideo.toLocaleString() }}</p>
        </div>
        <button
          type="button"
          class="btn btn-success btn-sm"
          v-if="isLoggedIn"
          @click="handleSubmitBookmark"
          style="margin-top: 5px"
        >
          Bookmark
        </button>
      </div>
    </div>
    <div class="col-sm-12" style="display: flex; justify-content: center">
      <button
        id="show_more"
        style="border: none; background: none; padding: 0px; color: white"
      >
        show more information
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-double-down"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
          <path
            fill-rule="evenodd"
            d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
    </div>
  </div>
  <div class="con medium-playlist-header">
    <div class="row">
      <div class="col-sm-7">
        <iframe
          class="iframe"
          width="100%"
          height="250px"
          v-bind:src="url"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
        </iframe>
      </div>
      <div class="col-sm-5">
        <h1 style="font-style: normal; font-weight: 500; font-size: 20px">
          {{ playlistName }}
          <span
            class="badge badge-secondary"
            style="background-color: black"
            v-if="this.thaiContent"
            >TH
          </span>
        </h1>
        <div class="playlist-stat">
          <p>total view {{ totalView.toLocaleString() }}</p>
          <p>total like {{ totalLike.toLocaleString() }}</p>
          <p>total video {{ totalVideo.toLocaleString() }}</p>
        </div>
        <button
          type="button"
          class="btn btn-success btn-sm"
          v-if="isLoggedIn"
          @click="handleSubmitBookmark"
          style="margin-top: 5px"
        >
          Favorite
        </button>
      </div>
    </div>
  </div>
  <div style="min-height: 10px; background-color: #f3f3f3"></div>
  <div class="con" style="padding: 0">
    <div
      class="row"
      v-for="(videoArr, i) in videosLoaded"
      :key="i"
      style="
        padding-bottom: 10px;
        padding-top: 10px;
        border-bottom: 1px solid #cccccc;
        margin-left: 0px;
        margin-right: 0px;
      "
    >
      <div class="col-md-5">
        <iframe
          class="iframe"
          width="100%"
          height="205px"
          v-bind:src="this.videoArr[i].videoUrl"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="col-md-7">
        <div class="video-title">
          <p>
            {{ this.videoArr[i].title }}
          </p>
        </div>
        <div class="video-channel">
          <img
            class="channel-thumbnail"
            :src="this.videoArr[i].channelThumbnail"
          />
          <p class="channel-name">{{ this.videoArr[i].channelTitle }}</p>
        </div>
        <div class="video-stat">
          <p class="video-stat-views">
            {{ this.videoArr[i].views.toLocaleString() }} views
          </p>
          <p class="video-stat-likes">
            {{ this.videoArr[i].likes.toLocaleString() }} likes
          </p>
        </div>
        <div class="video-description">
          <p>{{ this.videoArr[i].description }}</p>
        </div>
      </div>
    </div>
    <div style="min-height: 10px; background-color: #f3f3f3"></div>
    <div
      v-if="seen"
      class="row"
      style="
        padding-bottom: 10px;
        padding-top: 10px;
        margin-left: 0px;
        margin-right: 0px;
      "
    >
      <div class="col">
        <button class="loadMore-btn" @click="loadMore" v-if="seen">
          load more
        </button>
      </div>
    </div>
    <div style="min-height: 20px; background-color: #f3f3f3"></div>
  </div>
</template>

<script>
import $ from "jquery";
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
        this.favorite.playlistTitle =
          data["items"][0]["snippet"]["localized"]["title"];

        this.searchPlaylist();
        this.click();
      });
    let auth = getAuth();
    const isLoggedIn = false;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.favorite.userEmail = user.email;
        axios
          .get("http://localhost:4000/api")
          .then((response) => {
            const email = user.email;
            const pId = this.$route.params.id;
            for (let i = 0; i < response.data.length; i++) {
              if (
                email == response.data[i].userEmail &&
                pId == response.data[i].playlistId
              ) {
                this.isLoggedIn = false;
                break;
              } else {
                this.isLoggedIn = true;
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
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
      youtubeKey: "AIzaSyCsyUtrwPaX3fMUEDscUKAkRZHMHNwMKdk",
      playlistName: "",
      url:
        "https://www.youtube.com/embed/videoseries?list=" +
        this.$route.params.id,
      favorite: {
        playlistId: this.$route.params.id,
        playlistTitle: "",
        userEmail: "",
        language: "",
      },
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
    click() {
      $("#show_more").click(function () {
        if ($("#show_more").hasClass("open")) {
          $(".small-playlist-info").slideUp();
          $("#show_more").removeClass("open");
          $("#show_more").html(`
          show more infomation
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        `);
        } else {
          $(".small-playlist-info").slideDown();
          $("#show_more").addClass("open");
          $("#show_more").html(`
          show less
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-up" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"/>
        <path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
        </svg>`);
        }
      });
    },
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
              videoId:
                data["items"][videoIndex]["snippet"]["resourceId"]["videoId"],
              videoUrl:
                "https://www.youtube.com/embed/" +
                data["items"][videoIndex]["snippet"]["resourceId"]["videoId"],
              views: 0,
              likes: 0,
              channelTitle: "",
              channelThumbnail: "",
            });
            if (
              this.REGEX_TH.test(data["items"][videoIndex]["snippet"]["title"])
            ) {
              this.thaiContent = true;
              this.favorite.language = "TH";
              this.thai = "TH";
            }
            if (
              this.REGEX_TH.test(
                data["items"][videoIndex]["snippet"]["description"]
              )
            ) {
              this.thaiContent = true;
              this.favorite.language = "TH";
              this.thai = "TH";
            } else if (this.thaiContent == false) {
              this.favorite.language = "NA";
              this.thai = "NA";
            }
            this.searchVideo(
              data["items"][videoIndex]["snippet"]["resourceId"]["videoId"],
              this.videoArr.length - 1
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

          this.videoArr[videoIndex].views = parseInt(
            data["items"][0]["statistics"]["viewCount"]
          );
          this.videoArr[videoIndex].likes = parseInt(
            data["items"][0]["statistics"]["likeCount"]
          );
          var view = data["items"][0]["statistics"]["viewCount"];
          var like = data["items"][0]["statistics"]["likeCount"];

          if (isNaN(view)) {
            view = 0;
          }
          if (isNaN(like)) {
            like = 0;
          }

          this.totalView = this.totalView + parseInt(view);
          this.totalLike = this.totalLike + parseInt(like);

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
          this.videoArr[videoIndex].channelTitle =
            data["items"][0]["snippet"]["title"];
          this.videoArr[videoIndex].channelThumbnail =
            data["items"][0]["snippet"]["thumbnails"]["default"]["url"];
        });
    },
    handleSubmitBookmark() {
      let apiURL = "http://localhost:4000/api/create-favorite";

      axios
        .post(apiURL, this.favorite)
        .then(() => {
          this.$router.push("/favorite");
          this.favorite = {
            playlistId: "",
            playlistTitle: "",
            userId: "",
            language: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 576px) {
  .playlist-info {
    display: none;
  }
  .medium-playlist-header {
    display: none;
  }
  .small-playlist-header {
    display: block;
  }
}
@media screen and (min-width: 576px) {
  .medium-playlist-header {
    display: block;
  }
  .small-playlist-header {
    display: none;
  }
}
/* Small devices (tablets, 540px and up) */
@media screen and (max-width: 768px) {
  .video-description {
    display: none;
  }
  .video-stat {
    margin-left: 40px;
  }
  .video-title p {
    font-size: 54px;
  }
}

/* Medium devices (desktops, 992px and up) */
@media screen and (max-width: 992px) {
}

/* Large devices (large desktops, 1200px and up) */
@media screen and (max-width: 1200px) {
}
.video-channel {
  display: flex;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
}
.video-channel .channel-thumbnail {
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.video-channel .channel-name {
  margin: 0;
  margin-left: 10px;
  font-size: 14px;
}

.video-stat {
  display: flex;
  align-items: center;
}
.video-stat p {
  margin: 0;
  font-size: 12px;
}
.video-stat .video-stat-likes {
  margin-left: 20px;
}
.video-description p {
  margin: 0;
  width: 100%;
  height: 100px;
  overflow-y: auto;
  overflow-x: auto;
  font-size: 12px;
}

.video-title p {
  margin: 0;
  font-weight: 500;
  font-size: 16px;
}

.con {
  padding: 10px;
}
.iframe {
  padding: 0;
  margin: 0;
}
.playlist-stat p {
  margin: 0;
}
.loadMore-btn {
  height: 50px;
  width: 100%;
  border: 0.5px solid rgb(100, 100, 100);
  color: rgb(100, 100, 100);
  background-color: white;
}
.small-playlist-header {
  background-color: #444444;
}
.medium-playlist-header {
  background-color: #444444;
}
.small-playlist-header p {
  color: white;
}
.medium-playlist-header p {
  color: white;
}
.small-playlist-header h1 {
  color: white;
}
.medium-playlist-header h1 {
  color: white;
}
</style>
