<template>
  <div
    style="
      margin: auto;
      max-width: 400px;
      padding-left: 20px;
      padding-right: 20px;
      margin-top: 50px;
    "
  >
    <h2 style="margin-bottom: 20px">Create an account</h2>
    <p>
      <input
        type="text"
        placeholder="Email"
        v-model="email"
        style="
          width: 100%;
          border-radius: 50px;
          background-color: rgb(240, 240, 240);
          border: none;
          height: 40px;
          padding-left: 20px;
        "
      />
    </p>
    <p>
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        style="
          width: 100%;
          border-radius: 50px;
          background-color: rgb(240, 240, 240);
          border: none;
          height: 40px;
          padding-left: 20px;
        "
      />
    </p>
    <p style="display: flex; justify-content: center">
      <button
        @click="register"
        class="btn btn-success"
        style="width: 100%; border-radius: 50px"
      >
        Create
      </button>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const router = useRouter();
const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully registered");
      router.push("/my-playlist/");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>

<style>
</style>