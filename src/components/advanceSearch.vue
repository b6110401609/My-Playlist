<template>
  <div class="search-field">
    <table class="table table-borderless">
      <thead>
        <tr>
          <th scope="col">Find pages with...</th>
          <th scope="col"></th>
          <th scope="col">To do this in the search box.</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>search word</td>
          <td style="display: flex; justify-content: center">
            <input
              type="text"
              class="form-control"
              id="validationDefault01"
              placeholder="search"
              v-model="searchWord"
              required
            />
          </td>
          <td>Type the important word</td>
        </tr>
        <tr>
          <td>order by</td>
          <td>
            <select class="form-control" v-model="orderBy">
              <option>rating</option>
              <option>videoCount</option>
              <option>viewCount</option>
            </select>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>max resault</td>
          <td>
            <select class="form-control" v-model="maxResault">
              <option>10</option>
              <option>20</option>
              <option>25</option>
              <option>50</option>
            </select>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>API key</td>
          <td>
            <input
              type="text"
              class="form-control"
              id="validationDefault02"
              placeholder="API key"
              v-model="apiKey"
              required
            />
          </td>
          <td>Ex. AIzaSyDPBFn6K38lsvibpnVVLaDAN4G7khpIXkg</td>
        </tr>
        <tr>
          <td></td>
          <td style="display: flex; justify-content: flex-end">
            <button
              class="btn btn-primary from-control"
              type="submit"
              v-on:click="getPlaylistID"
            >
              advance search
            </button>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <table class="table table-bordered" style="background-color: white">
      <thead>
        <tr>
          <th scope="col" v-on:click="sortRanks">
            rank
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-down-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
              />
            </svg>
          </th>
          <th scope="col">playlist name</th>
          <th scope="col">thumbnail</th>
          <th scope="col" v-on:click="sortViews">
            views
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-down-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
              />
            </svg>
          </th>
          <th scope="col" v-on:click="sortLikes">
            likes
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-down-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
              />
            </svg>
          </th>
          <th scope="col" v-on:click="sortVideos">
            videos
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-down-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
              />
            </svg>
          </th>
          <th scope="col">other</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(playlistArr, i) in playlistArr" :key="i">
          <th scope="row">{{ this.playlistArr[i].index }}</th>
          <td style="width: 400px">
            <router-link
              :to="{ path: '/info/' + this.playlistArr[i].playlistId }"
              >{{ this.playlistArr[i].playlistTitle }}</router-link
            >
          </td>
          <td style="width: 240px">
            <img
              class="playlist-thumbnail"
              :src="this.playlistArr[i].playlistThumbnail"
            />
          </td>
          <!-- <td>
            <p class="stat-info">total view: {{ this.playlistArr[i].sumViewCount }}</p>
            <p class="stat-info">total like: {{ this.playlistArr[i].sumLikeCount }}</p>
            <p class="stat-info">total video: {{ this.playlistArr[i].videos.length }}</p>
            <p class="stat-info">
              number of thai title name: {{ this.playlistArr[i].sumTitleTH }}
            </p>
            <p class="stat-info">
              number of thai description: {{ this.playlistArr[i].sumDesTH }}
            </p>
          </td> -->

          <td>
            <p class="stat-info">{{ this.playlistArr[i].sumViewCount }}</p>
          </td>
          <td>
            <p class="stat-info">{{ this.playlistArr[i].sumLikeCount }}</p>
          </td>
          <td>
            <p class="stat-info">{{ this.playlistArr[i].videos.length }}</p>
          </td>
          <td>
            <p class="stat-info">
              published: {{ this.playlistArr[i].playlistPublish }}
            </p>
            <p class="stat-info">
              playlist ID: {{ this.playlistArr[i].playlistId }}
            </p>
          </td>

          <!-- <td>
            <p class="stat-info">total view: {{ this.playlistArr[i].sumViewCount }}</p>
          </td>
          <td>
            <p class="stat-info">total like: {{ this.playlistArr[i].sumLikeCount }}</p>
          </td>
          <td>
            <p class="stat-info">total video: {{ this.playlistArr[i].videos.length }}</p>
          </td>
          <td>
            <p class="stat-info">published: {{ this.playlistArr[i].playlistPublish }}</p>
            <p class="stat-info">playlist ID: {{ this.playlistArr[i].playlistId }}</p>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "HelloWorld",
      searchWord: "",
      apiKey: "",
      orderBy: "",
      maxResault: "",
      playlistArr: [],
    };
  },
  methods: {
    logInfo() {
      console.log(this.playlistArr);
    },
    getPlaylistID() {
      this.playlistArr = [];
      if (
        this.searchWord != null &&
        this.apiKey != null &&
        this.orderBy != null &&
        this.maxResault != null
      ) {
        fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.searchWord}&key=${this.apiKey}&maxResults=${this.maxResault}&type=playlist&relevanceLanguage=th&order=${this.orderBy}&regionCode=TH`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            JSON.stringify(data);
            for (var playlistIndex in data["items"]) {
              var playlistId = data["items"][playlistIndex]["id"]["playlistId"];
              this.playlistArr.push({
                playlistTitle: data["items"][playlistIndex]["snippet"]["title"],
                playlistPublish:
                  data["items"][playlistIndex]["snippet"]["publishedAt"],
                playlistThumbnail:
                  data["items"][playlistIndex]["snippet"]["thumbnails"][
                    "medium"
                  ]["url"],
                index: parseInt(playlistIndex)+1,
                playlistId: playlistId,
                videos: [],
                sumViewCount: 0,
                sumLikeCount: 0,
                sumTitleTH: 0,
                sumDesTH: 0,
              });
              this.getVideoID(playlistId, playlistIndex);
            }
          });
      } else {
        alert("invalid data");
      }
    },
    getVideoID(playlistId, playlistIndex, nextPageToken) {
      var html = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${this.apiKey}&playlistId=${playlistId}&maxResults=50`;
      if (nextPageToken != null) {
        html = html + `&pageToken=${nextPageToken}`;
      }
      fetch(html)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          JSON.stringify(data);
          for (var videoIndex in data["items"]) {
            var videoId =
              data["items"][videoIndex]["snippet"]["resourceId"]["videoId"];
            this.playlistArr[playlistIndex].videos.push({
              videoId: videoId,
              videoInfo: [],
            });
          }
          if (data["nextPageToken"]) {
            this.getVideoID(playlistId, playlistIndex, data["nextPageToken"]);
          } else {
            for (var index in this.playlistArr[playlistIndex].videos) {
              this.getVideoInfo(playlistIndex, index);
            }
          }
        });
    },
    getVideoInfo(playlistIndex, videoIndex) {
      var videoId =
        this.playlistArr[playlistIndex]["videos"][videoIndex]["videoId"];
      fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${this.apiKey}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const REGEX_TH = /[ก-๙]/;
          var title = data["items"][0]["snippet"]["title"];
          var description = data["items"][0]["snippet"]["description"];
          var viewCount = parseInt(data["items"][0]["statistics"]["viewCount"]);
          var likeCount = parseInt(data["items"][0]["statistics"]["likeCount"]);
          var commentCount = parseInt(
            data["items"][0]["statistics"]["commentCount"]
          );
          var titleTH = false;
          var desTH = false;
          if (REGEX_TH.test(title)) {
            titleTH = true;
          }
          if (REGEX_TH.test(description)) {
            desTH = true;
          }
          this.playlistArr[playlistIndex]["videos"][videoIndex][
            "videoInfo"
          ].push({
            title: title,
            viewCount: viewCount,
            likeCount: likeCount,
            commentCount: commentCount,
            titleTH: titleTH,
            desTH: desTH,
          });
          this.summary(playlistIndex, videoIndex);
        });
    },
    summary(playlistIndex, videoIndex) {
      this.playlistArr[playlistIndex].sumViewCount +=
        this.playlistArr[playlistIndex].videos[
          videoIndex
        ].videoInfo[0].viewCount;
      this.playlistArr[playlistIndex].sumLikeCount +=
        this.playlistArr[playlistIndex].videos[
          videoIndex
        ].videoInfo[0].likeCount;
      if (
        this.playlistArr[playlistIndex].videos[videoIndex].videoInfo[0].titleTH
      ) {
        this.playlistArr[playlistIndex].sumTitleTH += 1;
      }
      if (
        this.playlistArr[playlistIndex].videos[videoIndex].videoInfo[0].desTH
      ) {
        this.playlistArr[playlistIndex].sumDesTH += 1;
      }
      // this.playlistArr.sort((firstItem, secondItem) => secondItem.sumViewCount - firstItem.sumViewCount);
    },
    sortViews() {
      this.playlistArr.sort(
        (firstItem, secondItem) =>
          secondItem.sumViewCount - firstItem.sumViewCount
      );
    },
    sortLikes() {
      this.playlistArr.sort(
        (firstItem, secondItem) =>
          secondItem.sumLikeCount - firstItem.sumLikeCount
      );
    },
    sortVideos() {
      this.playlistArr.sort(
        (firstItem, secondItem) =>
          secondItem.videos.length - firstItem.videos.length
      );
    },
    sortRanks() {
      this.playlistArr.sort(
        (firstItem, secondItem) =>
          firstItem.index - secondItem.index
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-field {
  width: 100%;
  margin-top: 60px;
}
.playlist-thumbnail {
  max-width: 240px;
  max-height: 150px;
}
.stat-info {
  margin: 0;
  font-size: 12px;
  line-height: 21px;
  color: #4e4e4e;
}
</style>
