nes (68 sloc)  2.4 KB
   
<template>
  <!-- <div class="sidenav" style="padding: 20px">
    <h1>show only</h1>
  </div>
  <div class="main" style="padding-top: 100px">
    <div class="container">
      <div class="row">
        <div class="col-sm-5"  v-for="(playlistArr, i) in playlistArr" :key="i">
          {{ this.playlistArr[i].x }}
          <router-link style="height:200px;background-color:pink"></router-link>
        </div>
      </div>
    </div>
  </div> -->

  <!-- <div class="row justify-content-center">
        <div class="col-md-12">
            <h1>Show students</h1>
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-striped">
                        <thead class="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="student in Students" :key="student._id">
                                <td>{{ student.name }}</td>
                                <td>{{ student.email }}</td>
                                <td>{{ student.phone }}</td>
                                <td>
                                    <router-link :to="{name: 'edit', params: {id: student._id}}" class="btn btn-success">
                                        Edit
                                    </router-link>
                                    <button @click.prevent="deleteStudent(student._id)" class="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div> -->
    <div></div>
</template>

<script>
// export default {
//   data() {
//     return {
//       playlistArr: [{x:"1"},{x:"2"},{x:"3"}],
//     };
//   },
// };
</script>

<style scoped>
/* .sidenav {
  height: 100%;
  width: 300px;
  position: fixed;
  z-index: 1;
  top: 90px;
  left: 0;
  background-color: #444444;
  overflow-x: hidden;
  padding-top: 110px;
}
.main {
  padding-top: 100px;
  margin-left: 500px;
  min-height: 100vh;
  padding: 10px;
} */
</style>