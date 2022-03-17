<template>
  <div class="advance-search-area">
    <div class="con" style="padding: 10px">
      <div class="row" style="padding-top: 0px">
        <div class="col-md-3 advance-search-des" style="font-weight: 500">
          Find playlists with...
        </div>
        <div class="col-md-5 hide-col-search advance-search-des"></div>
        <div
          class="col-md-4 hide-col-search advance-search-des"
          style="font-weight: 500"
        >
          To do this in the search box.
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 advance-search-des">
          search word <span style="color: red">*</span>
        </div>
        <div class="col-md-5 advance-search-des">
          <input
            type="text"
            class="form-control"
            id="validationDefault01"
            placeholder="search"
            v-model="searchWord"
            required
            @keyup.enter="getPlaylistID"
          />
        </div>
        <div class="col-md-4 hide-col-search advance-search-des">
          Type the important word
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 advance-search-des">
          API key <span style="color: red">*</span>
        </div>
        <div class="col-md-5 advance-search-des">
          <input
            type="text"
            class="form-control"
            id="validationDefault02"
            placeholder="API key"
            v-model="apiKey"
            required
            @keyup.enter="getPlaylistID"
          />
        </div>
        <div class="col-md-4 hide-col-search advance-search-des">
          <div>Ex. AIzaSyBB_b0Ad-qSXNfnbwba9COxvkJcow1sacc</div>
          <router-link to="/guide"
            >how to get API key
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              fill="currentColor"
              class="bi bi-box-arrow-up-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
              />
              <path
                fill-rule="evenodd"
                d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
              /></svg
          ></router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 advance-search-des">order by</div>
        <div class="col-md-5 advance-search-des">
          <select
            style="width: 100%; height: 30px; margin-right: 20px"
            class="form-select form-select-sm"
            aria-label=".form-select-sm example"
            v-model="orderBy"
            id="validationDefault03"
          >
            <option value="rating">rating</option>
            <option value="viewCount">view count</option>
            <option value="videoCount">video count</option>
          </select>
        </div>
        <div class="col-md-4">
          <!-- Trigger/Open The Modal -->
          <svg
            id="myBtn"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-info-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
            />
          </svg>
          
          <!-- The Modal -->
          <div id="myModal" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
              <span class="close"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                  /></svg
              ></span>
              <ul>
                <li>
                  <span style="font-weight: 700">rating</span> - Resources are
                  sorted from highest to lowest rating.
                </li>
                <li>
                  <span style="font-weight: 700">video count</span> - Channels
                  are sorted in descending order of their number of uploaded
                  videos.
                </li>
                <li>
                  <span style="font-weight: 700">view count</span> - Resources
                  are sorted from highest to lowest number of views.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-4 hide-col-search advance-search-des"></div>
      </div>
      <div class="row">
        <div class="col-md-3 advance-search-des">max resault</div>
        <div class="col-md-5 advance-search-des">
          <select
            style="width: 100%; height: 30px; margin-right: 20px"
            class="form-select form-select-sm"
            aria-label=".form-select-sm example"
            v-model="maxResault"
            id="validationDefault04"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div class="col-md-4 hide-col-search advance-search-des"></div>
      </div>
      <div class="row">
        <div class="col-md-3 advance-search-des">only Thai playlists</div>
        <div class="col-md-5 advance-search-des">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            style="width: 20px; height: 20px; margin: 0"
            v-model="onlyTH"
            @keyup.enter="getPlaylistID"
          />
        </div>
        <div class="col-md-4 hide-col-search advance-search-des"></div>
      </div>
      <div class="row">
        <div class="col-md-3 advance-search-des"></div>
        <div class="col-md-5 advance-search-des">
          <button
            class="btn btn-secondary from-control"
            type="submit"
            v-on:click="getPlaylistID"
          >
            advance search
          </button>
        </div>
        <div class="col-md-4 hide-col-search advance-search-des"></div>
      </div>
    </div>
  </div>
  <div style="min-height: 10px; background-color: #f3f3f3"></div>
  <div class="advance-search-bar-resault">
    <table class="table table-bordered" style="background-color: white">
      <thead>
        <tr>
          <th scope="col" v-on:click="sortRanks" style="width: 90px">
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
          <th scope="col" style="max-width: 150px" class="hide-col">
            thumbnail
          </th>
          <th scope="col" v-on:click="sortViews" style="width: 90px">
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
          <th scope="col" v-on:click="sortLikes" style="width: 90px">
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
          <th scope="col" v-on:click="sortVideos" style="width: 90px">
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
          <th scope="col" style="width: 110px" class="hide-col">published</th>
          <th scope="col" style="width: 60px; text-align: center">TH</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(playlistArr, i) in playlistArr" :key="i">
          <th scope="row">{{ this.playlistArr[i].index }}</th>
          <td>
            <router-link
              style="color: inherit"
              :to="{ path: '/info/' + this.playlistArr[i].playlistId }"
              >{{ this.playlistArr[i].playlistTitle }}</router-link
            >
          </td>
          <td class="hide-col">
            <img
              style="max-width: 150px"
              class="playlist-thumbnail"
              :src="this.playlistArr[i].playlistThumbnail"
            />
          </td>
          <td>
            <p class="stat-info">{{ this.playlistArr[i].sumViewCount }}</p>
          </td>
          <td>
            <p class="stat-info">{{ this.playlistArr[i].sumLikeCount }}</p>
          </td>
          <td>
            <p class="stat-info">{{ this.playlistArr[i].videos.length }}</p>
          </td>
          <td class="hide-col">
            <p class="stat-info">
              {{ this.playlistArr[i].playlistPublish }}
            </p>
          </td>
          <td style="text-align: center">
            <svg
              v-if="!this.playlistArr[i].TH"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-x-circle"
              viewBox="0 0 16 16"
              style="color: #ff3333"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
            <svg
              v-if="this.playlistArr[i].TH"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-check-circle-fill"
              viewBox="0 0 16 16"
              style="color: #0bda51"
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
              />
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="display: none" id="not_match">
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 30px;
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-exclamation-diamond"
        viewBox="0 0 16 16"
      >
        <path
          d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"
        />
        <path
          d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
        />
      </svg>
      <h6 style="">Your search did not match any documents.</h6>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  mounted() {
    this.modal();
  },
  data() {
    return {
      name: "HelloWorld",
      searchWord: "",
      apiKey: "",
      orderBy: "",
      maxResault: "",
      playlistArr: [],
      playlistIdArr: [],
      onlyTH: false,
    };
  },

  methods: {
    modal() {
      var modal = document.getElementById("myModal");

      // Get the button that opens the modal
      var btn = document.getElementById("myBtn");

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];

      // When the user clicks the button, open the modal
      btn.onclick = function () {
        modal.style.display = "block";
      };

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        modal.style.display = "none";
      };

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    },
    getPlaylistID() {
      $("#not_match").hide();
      console.log(this.searchWord, this.orderBy, this.maxResault, this.apiKey);
      this.playlistArr = [];
      this.playlistIdArr = [];
      if (this.searchWord.trim() != "" && this.apiKey != "") {
        $("#validationDefault01").css("background-color", "#FFF");
        $("#validationDefault02").css("background-color", "#FFF");
        $("#validationDefault03").css("background-color", "#FFF");
        $("#validationDefault04").css("background-color", "#FFF");
        if (this.maxResault == "") {
          this.maxResault = "10";
        }
        if (this.orderBy == "") {
          this.orderBy = "rating";
        }
        this.spacialCaseSearch();
        // fetch(
        //   `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.searchWord.trim()}&key=${
        //     this.apiKey
        //   }&maxResults=${
        //     this.maxResault
        //   }&type=playlist&relevanceLanguage=th&order=${
        //     this.orderBy
        //   }&regionCode=TH`
        // )
        // .then((response) => {
        //   if (response.status != 200) {
        //     alert("API key error");
        //   }
        //   return response.json();
        // });
        // .then((data) => {
        //   JSON.stringify(data);
        //   const REGEX_TH = /[ก-๙]/;
        //   for (var playlistIndex in data["items"]) {
        //     if (this.onlyTH) {
        //       if (
        //         REGEX_TH.test(
        //           data["items"][playlistIndex]["snippet"]["title"]
        //         ) ||
        //         REGEX_TH.test(
        //           data["items"][playlistIndex]["snippet"]["description"]
        //         )
        //       ) {
        //         this.playlistArr.push({
        //           playlistTitle:
        //             data["items"][playlistIndex]["snippet"]["title"],
        //           playlistPublish: data["items"][playlistIndex]["snippet"][
        //             "publishedAt"
        //           ].substring(0, 10),
        //           playlistThumbnail:
        //             data["items"][playlistIndex]["snippet"]["thumbnails"][
        //               "medium"
        //             ]["url"],
        //           index: parseInt(playlistIndex) + 1,
        //           playlistId:
        //             data["items"][playlistIndex]["id"]["playlistId"],
        //           videos: [],
        //           sumViewCount: 0,
        //           sumLikeCount: 0,
        //           TH: false,
        //         });
        //         this.getVideoID(
        //           data["items"][playlistIndex]["id"]["playlistId"],
        //           this.playlistArr.length - 1
        //         );
        //       }
        //     }
        //     if (!this.onlyTH) {
        //       this.playlistArr.push({
        //         playlistTitle:
        //           data["items"][playlistIndex]["snippet"]["title"],
        //         playlistPublish: data["items"][playlistIndex]["snippet"][
        //           "publishedAt"
        //         ].substring(0, 10),
        //         playlistThumbnail:
        //           data["items"][playlistIndex]["snippet"]["thumbnails"][
        //             "medium"
        //           ]["url"],
        //         index: parseInt(playlistIndex) + 1,
        //         playlistId: data["items"][playlistIndex]["id"]["playlistId"],
        //         videos: [],
        //         sumViewCount: 0,
        //         sumLikeCount: 0,
        //         TH: false,
        //       });
        //       this.getVideoID(
        //         data["items"][playlistIndex]["id"]["playlistId"],
        //         this.playlistArr.length - 1
        //       );
        //     }
        //   }
        //   if (this.playlistArr.length == 0) {
        //     $("#not_match").show();
        //   }
        // });
      } else {
        alert("invalid data");
        if (this.searchWord.trim() == "") {
          $("#validationDefault01").css("background-color", "#FFFCDC");
        }
        if (this.apiKey == "") {
          $("#validationDefault02").css("background-color", "#FFFCDC");
        }
      }
    },
    spacialCaseSearch(nextPagePlaylist) {
      var html = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.searchWord.trim()}&key=${
        this.apiKey
      }&maxResults=50&type=playlist&relevanceLanguage=th&order=${
        this.orderBy
      }&regionCode=TH`;
      if (nextPagePlaylist != null) {
        html = html + `&pageToken=${nextPagePlaylist}`;
      }
      fetch(html)
        .then((response) => {
          if (response.status != 200) {
            alert("API key error");
          }
          return response.json();
        })
        .then((data) => {
          JSON.stringify(data);
          const REGEX_TH = /[ก-๙]/;
          for (var playlistIndex in data["items"]) {
            if (
              this.onlyTH &&
              !this.playlistIdArr.includes(
                data["items"][playlistIndex]["id"]["playlistId"]
              )
            ) {
              if (
                REGEX_TH.test(
                  data["items"][playlistIndex]["snippet"]["title"]
                ) ||
                REGEX_TH.test(
                  data["items"][playlistIndex]["snippet"]["description"]
                )
              ) {
                this.playlistArr.push({
                  playlistTitle:
                    data["items"][playlistIndex]["snippet"]["title"],
                  playlistPublish: data["items"][playlistIndex]["snippet"][
                    "publishedAt"
                  ].substring(0, 10),
                  playlistThumbnail:
                    data["items"][playlistIndex]["snippet"]["thumbnails"][
                      "medium"
                    ]["url"],
                  index: parseInt(this.playlistArr.length) + 1,
                  playlistId: data["items"][playlistIndex]["id"]["playlistId"],
                  videos: [],
                  sumViewCount: 0,
                  sumLikeCount: 0,
                  TH: false,
                });
                this.playlistIdArr.push(
                  data["items"][playlistIndex]["id"]["playlistId"]
                );
                this.getVideoID(
                  data["items"][playlistIndex]["id"]["playlistId"],
                  this.playlistArr.length - 1
                );
              }
            }
            if (
              !this.onlyTH &&
              !this.playlistIdArr.includes(
                data["items"][playlistIndex]["id"]["playlistId"]
              )
            ) {
              this.playlistArr.push({
                playlistTitle: data["items"][playlistIndex]["snippet"]["title"],
                playlistPublish: data["items"][playlistIndex]["snippet"][
                  "publishedAt"
                ].substring(0, 10),
                playlistThumbnail:
                  data["items"][playlistIndex]["snippet"]["thumbnails"][
                    "medium"
                  ]["url"],
                index: parseInt(this.playlistArr.length) + 1,
                playlistId: data["items"][playlistIndex]["id"]["playlistId"],
                videos: [],
                sumViewCount: 0,
                sumLikeCount: 0,
                TH: false,
              });
              this.playlistIdArr.push(
                data["items"][playlistIndex]["id"]["playlistId"]
              );
              this.getVideoID(
                data["items"][playlistIndex]["id"]["playlistId"],
                this.playlistArr.length - 1
              );
            }
            if (this.playlistArr.length == this.maxResault) {
              break;
            }
          }
          if (
            data["nextPageToken"] != null &&
            this.playlistArr.length < this.maxResault
          ) {
            this.spacialCaseSearch(data["nextPageToken"]);
          }
          if (data["nextPageToken"] == null && this.playlistArr.length == 0) {
            $("#not_match").show();
          }
        });
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
          var TH = false;
          if (REGEX_TH.test(title)) {
            TH = true;
          }
          if (REGEX_TH.test(description)) {
            TH = true;
          }
          this.playlistArr[playlistIndex]["videos"][videoIndex][
            "videoInfo"
          ].push({
            title: title,
            viewCount: viewCount,
            likeCount: likeCount,
            commentCount: commentCount,
            TH: TH,
          });
          this.playlistArr[playlistIndex].TH = TH;
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
      // if (
      //   this.playlistArr[playlistIndex].videos[videoIndex].videoInfo[0].titleTH
      // ) {
      //   this.playlistArr[playlistIndex].sumTitleTH += 1;
      // }
      // if (
      //   this.playlistArr[playlistIndex].videos[videoIndex].videoInfo[0].desTH
      // ) {
      //   this.playlistArr[playlistIndex].sumDesTH += 1;
      // }
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
        (firstItem, secondItem) => firstItem.index - secondItem.index
      );
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .hide-col-search {
    display: none;
  }
  .bi:not(.bi-exclamation-diamond, .bi-info-circle, .bi-x-lg) {
    width: 12px;
  }
  .bi-caret-down-fill {
    display: none;
  }
}
@media screen and (max-width: 1200px) {
  div.advance-search-bar-resault * {
    font-size: 12px;
  }
  .advance-search-des {
    font-size: 12px;
  }
  .hide-col {
    display: none;
  }
  input,
  select {
    font-size: 12px;
  }
}
@media screen and (min-width: 1200px) {
  div.advance-search-bar-resault * {
    font-size: 14px;
  }
  .advance-search-des {
    font-size: 14px;
  }
  input,
  select {
    font-size: 14px;
  }
}
.advance-search-area .con .row {
  padding-top: 10px;
}
.advance-search-bar-resault {
  padding: 10px;
}

/*  
@media screen and (max-width: 1200px) {
  .medium-advance-search-bar {
    display: none;
  }
  .small-advance-search-bar {
    display: block;
    padding: 20px;
    padding-top: 10px;
  }
  .hide-col {
    display: none;
  }
  .advance-search-bar-resault {
    padding: 20px 20px 5px 20px;
  }
}
@media screen and (min-width: 1200px) {
  .medium-advance-search-bar {
    display: block;
  }
  .small-advance-search-bar {
    display: none;
  }
}
@media screen and (max-width: 540px) {
  .small-advance-search-bar {
    padding: 10px;
  }
  .advance-search-bar-resault {
    padding: 10px 10px 5px 10px;
  }
  .bi {
    width: 12px;
  }
  .bi-caret-down-fill {
    display: none;
  }
}*/
</style>
