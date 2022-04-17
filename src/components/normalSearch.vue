<template>
  <div class="icon" style="">
    <h1
      style="
        font-style: normal;
        font-weight: 1000;
        font-size: 30px;
        width: 100%;
        text-align: center;
        padding-top:60px
        padding-bottom:20px
      "
    >
      <span class="badge badge-secondary" style="background-color: red"
        >ミ
      </span>
      MY PLAYLIST
    </h1>
  </div>
  <div class="search-box" style="padding-top: 20px">
    <input
      class="search-input"
      placeholder="search"
      type="text"
      id="fname"
      name="fname"
      v-model="searchWord"
      @keyup.enter="getPlaylistID"
    />
    <button
      style="
        margin-left: 10px;
        min-height: 40px;
        min-width: 40px;
        border-radius: 50%;
        border: none;
        color: #fff;
        background-color: #30475e;
      "
      class=""
      type="button"
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

  <div class="search-option" style="">
    <table class="table table-borderless" style="max-width: 500px">
      <thead>
        <tr>
          <th scope="col" style="width: 30%; display: none"></th>
          <th scope="col" style="width: 70%; display: none"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="row">order by</td>
          <td>
            <select
              style="width: 100%; height: 30px; margin-right: 20px"
              class="form-select form-select-sm"
              aria-label=".form-select-sm example"
              v-model="orderBy"
              @keyup.enter="getPlaylistID"
            >
              <option selected value="rating">rating</option>
              <option value="date">date</option>
              <option value="videoCount">video count</option>
            </select>
          </td>
          <td>
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
                    <span style="font-weight: 700">rating</span> - This filter will measure how the video quality was before you see. by up like or positive like
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
                  <li>
                    <span style="font-weight: 700">date</span> - Resources are
                    sorted in reverse chronological order based on the date they
                    were created.
                  </li>
                </ul>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td scope="row">max resault</td>
          <td>
            <select
              style="width: 100%; height: 30px; margin-right: 20px"
              class="form-select form-select-sm"
              aria-label=".form-select-sm example"
              v-model="maxResault"
            >
              <option selected value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </td>
        </tr>
        <tr>
          <td scope="row">only Thai playlists</td>
          <td colspan="2">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              style="width: 20px; height: 20px; margin: 0"
              v-model="onlyTH"
              @keyup.enter="getPlaylistID"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="width: 100%; display: flex; justify-content: center">
    <button
      id="show_more"
      style="
        padding-top: 10;
        border: none;
        background: none;
        padding-bottom: 5px;
        padding-top: 5px;
      "
    >
      show more options
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
  <div style="min-height: 10px; background-color: #f3f3f3"></div>
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

  <div
    v-for="(playlistArr, i) in playlistArr"
    :key="i"
    class="con"
    style="
      padding-top: 0px;
      padding-left: 0px;
      padding-right: 0px;
      padding-bottom: 0px;
    "
  >
    <router-link
      :to="{ path: '/info/' + this.playlistArr[i].playlistId }"
      style="text-decoration: none; color: inherit"
    >
      <div
        class="row"
        style="
          padding-bottom: 10px;
          padding-top: 10px;
          border-bottom: 1px solid #cccccc;
          margin-left: 0px;
          margin-right: 0px;
        "
      >
        <div class="col-md-1 rank-col">
          <div
            class="numberCircle"
            style="font-size: 25px; margin-top: 0px"
            :id="'rank_' + i"
          >
            {{ i + 1 }}
          </div>
        </div>
        <div class="col-md-5">
          <img
            class="playlist-thumbnail"
            :src="this.playlistArr[i].playlistThumbnail"
            style="width: 100%; height: 205px"
          />
        </div>
        <div class="col-md-6">
          <div class="playlist-title">
            <p>
              {{ this.playlistArr[i].playlistTitle }}
            </p>
          </div>
          <div class="playlist-channel">
            <img
              class="channel-thumbnail"
              :src="this.playlistArr[i].channelThumbnail"
            />
            <p class="channel-name">{{ this.playlistArr[i].channelTitle }}</p>
          </div>
          <div class="playlist-description">
            <p>{{ this.playlistArr[i].playlisDescription }}</p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  el: "#app",
  mounted() {
    this.click();
    this.modal();
  },
  data() {
    return {
      playlistArr: [],
      playlistIdArr: [],
      toggle: false,
      orderBy: "",
      maxResault: "",
      apiKey: "AIzaSyCsyUtrwPaX3fMUEDscUKAkRZHMHNwMKdk",
      searchWord: "",
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
    click() {
      $("#show_more").click(function () {
        if ($("#show_more").hasClass("open")) {
          $(".search-option").slideUp();
          $("#show_more").removeClass("open");
          $("#show_more").html(`
          show more options
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        `);
        } else {
          $(".search-option").slideDown();
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
    getPlaylistID() {
      const REGEX_TH = /[ก-๙]/;
      $(".icon").hide();
      $("#not_match").hide();
      if (this.maxResault == "") {
        this.maxResault = "10";
      }
      if (this.orderBy == "") {
        this.orderBy = "rating";
      }
      this.playlistArr = [];
      this.playlistIdArr = [];
      if (this.searchWord != "") {
        this.spacialCaseSearch();
        fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.searchWord.trim()}&key=${
            this.apiKey
          }&maxResults=${
            this.maxResault
          }&type=playlist&relevanceLanguage=th&order=${
            this.orderBy
          }&regionCode=TH`
        )
          .then((response) => {
            if (response.status != 200) {
              alert("API key error");
            }
            return response.json();
          })
          .then((data) => {
            JSON.stringify(data);
          });
      } else {
        alert("Type something in search box.");
      }
    },

    spacialCaseSearch(nextPageToken) {
      var html = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.searchWord.trim()}&key=${
        this.apiKey
      }&maxResults=${
        this.maxResault
      }&type=playlist&relevanceLanguage=th&order=${this.orderBy}&regionCode=TH`;
      if (nextPageToken != null) {
        html = html + `&pageToken=${nextPageToken}`;
      }
      fetch(html)
        .then((response) => {
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
                this.havePlaylistTH = true;
                this.playlistArr.push({
                  playlistTitle:
                    data["items"][playlistIndex]["snippet"]["title"],
                  playlistId: data["items"][playlistIndex]["id"]["playlistId"],
                  playlisDescription:
                    data["items"][playlistIndex]["snippet"]["description"],
                  playlistPublish: data["items"][playlistIndex]["snippet"][
                    "publishedAt"
                  ].substring(0, 10),
                  playlistThumbnail:
                    data["items"][playlistIndex]["snippet"]["thumbnails"][
                      "medium"
                    ]["url"],
                  channelTitle: "",
                  channelThumbnail: "",
                });
                this.playlistIdArr.push(
                  data["items"][playlistIndex]["id"]["playlistId"]
                );
                this.searchChannel(
                  data["items"][playlistIndex]["snippet"]["channelId"],
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
                playlistId: data["items"][playlistIndex]["id"]["playlistId"],
                playlisDescription:
                  data["items"][playlistIndex]["snippet"]["description"],
                playlistPublish: data["items"][playlistIndex]["snippet"][
                  "publishedAt"
                ].substring(0, 10),
                playlistThumbnail:
                  data["items"][playlistIndex]["snippet"]["thumbnails"][
                    "medium"
                  ]["url"],
                channelTitle: "",
                channelThumbnail: "",
              });
              this.playlistIdArr.push(
                data["items"][playlistIndex]["id"]["playlistId"]
              );
              this.searchChannel(
                data["items"][playlistIndex]["snippet"]["channelId"],
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
.search-input {
  padding-left: 20px;
  height: 40px;
  width: 100%;
  border-radius: 40px;
  background-color: rgb(240, 240, 240);
  border: none;
}
.search-input {
  width: 60%;
  min-height: 40px;
}
.search-box {
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: center;
}
.search-option {
  padding-left: 20px;
  padding-right: 20px;
  display: none;
  padding-top: 20px;
}

.playlist-channel {
  display: flex;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
}
.playlist-channel .channel-thumbnail {
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.playlist-channel .channel-name {
  margin: 0;
  margin-left: 10px;
  font-size: 14px;
}
.con {
  padding: 10px;
}
.playlist-title p {
  margin: 0;
  font-weight: 500;
  font-size: 16px;
}
.playlist-description {
  margin: 0;
  font-size: 12px;
}
@media screen and (max-width: 992px) {
  .rank-col {
    display: none;
  }
  .search-input {
    width: 100%;
  }
  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 90%;
  }
}
@media screen and (min-width: 768px) {
  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
  }
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
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 130px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.close {
  display: flex;
  justify-content: flex-end;
  color: #aaaaaa;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
