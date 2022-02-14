<template>
  <div class="sidenav" style="padding: 20px">
    <h1 style="font-style: normal; font-weight: 500; font-size: 24px">
      {{ playlistName }}
    </h1>
    <iframe
      class="playlist"
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
        margin-top: 10px;
      "
    >
      <div class="playlist-stat">
        <p>total view {{totalView}}</p>
        <p>total like {{totalLike}}</p>
        <p>total video {{totalVideo}}</p>
      </div>
      <button type="button" class="btn btn-outline-success">Bookmark</button>
    </div>
  </div>
  <div class="main">
    <div class="video" v-for="(title, i) in title" :key="i">
      <iframe
      class="thumbnail"
        width="367px"
        height="205px"
        v-bind:src="videoUrl[i]"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div class="video-info">
        <p class="video-name">
          {{ title }}
        </p>
        <p class="video-view">{{ views[i] }} views</p>
        <p class="video-view">{{ likes[i] }} likes</p>
        <p class="video-des">
          {{ description[i] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
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
        this.searchPlaylist();
      });
  },
  data() {
    return {
      totalView: 0,
      totalLike: 0,
      totalVideo: 0,
      title: [],
      views: [],
      likes: [],
      description: [],
      videoId: [],
      videoUrl: [],
      youtubeKey: "AIzaSyAF65tmnK9CCYfFWFUjxVgnqus49BGJ4nQ",
      playlistName: "",
      url:
        "https://www.youtube.com/embed/videoseries?list=" +
        this.$route.params.id,
    };
  },
  methods: {
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
          this.totalVideo = parseInt(data["pageInfo"]["totalResults"])
          for (var videoIndex in data["items"]) {
            this.title.push(data["items"][videoIndex]["snippet"]["title"])
            this.description.push(data["items"][videoIndex]["snippet"]["description"])
            this.videoId.push(data["items"][videoIndex]["snippet"]["resourceId"]["videoId"])
            this.videoUrl.push("https://www.youtube.com/embed/" +data["items"][videoIndex]["snippet"]["resourceId"]["videoId"])
            // this.title[videoIndex] =
            //   data["items"][videoIndex]["snippet"]["title"];
            // this.description[videoIndex] =
            //   data["items"][videoIndex]["snippet"]["description"];
            // this.videoId[videoIndex] =
            //   data["items"][videoIndex]["snippet"]["resourceId"]["videoId"];
            this.searchVideo(this.videoId[this.videoId.length-1], this.videoId.length-1);
            // this.videoUrl[videoIndex] =
            //   "https://www.youtube.com/embed/" +
            // data["items"][videoIndex]["snippet"]["resourceId"]["videoId"];
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
          this.views[videoIndex] = parseInt(data["items"][0]["statistics"]["viewCount"]);
          this.totalView = this.totalView + this.views[videoIndex]

          this.likes[videoIndex] = parseInt(data["items"][0]["statistics"]["likeCount"]);
          this.totalLike = this.totalLike + this.likes[videoIndex]
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidenav {
  height: 100%;
  width: 550px;
  position: fixed;
  z-index: 1;
  top: 60px;
  left: 0;
  background-color: #ffffff;
  overflow-x: hidden;
  padding-top: 20px;
}
.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
}
.sidenav a:hover {
  color: #f1f1f1;
}
.main {
  margin-top: 60px;
  margin-left: 550px; /* Same as the width of the sidenav */
  font-size: 28px; /* Increased text to enable scrolling */
  min-height: 100vh;
  padding: 20px;
}
.video {
  display: flex;
  background-color: white;
  margin-bottom: 20px;
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
  font-size: 24px;
  line-height: 28px;
}
.video-view {
  font-style: normal;
  font-weight: 200;
  font-size: 18px;
}
.video-des {
  font-style: normal;
  font-weight: 200;
  font-size: 14px;
  line-height: 21px;
}
.playlist-stat p {
  margin: 0;
}
.thumbnail {
  min-width:367px;
        min-height:205px;
}
</style>
