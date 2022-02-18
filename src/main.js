import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA9YM0e7oZiUkrRCmcnq6myXDJJBuL5kzI",
  authDomain: "my-playlist-e9e9a.firebaseapp.com",
  projectId: "my-playlist-e9e9a",
  storageBucket: "my-playlist-e9e9a.appspot.com",
  messagingSenderId: "692287765273",
  appId: "1:692287765273:web:0d2a4d5bb60d2a25372388"
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router);

app.mount('#app')