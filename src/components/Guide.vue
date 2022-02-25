<template>
  <main style="display: flex; justify-content: center">
    <div class="main-content">
      <div
        class="head-bar"
        style="margin-top: 90px; box-shadow: 0px 1px 0px #cccccc"
      >
        <h1>การสร้าง API key</h1>
      </div>
      <div class="get-api-key" style="padding: 20px">
        <p>1. ไปที่ <a href="https://console.cloud.google.com/" target="_blank">https://console.cloud.google.com/</a> </p>
        <p>2. สร้าง project ใหม่โดยกด CREATE PROJECT</p>
        <img
          src="..\assets\guide01.png"
          alt=""
          style="width: 100%; object-fit: cover"
        />
        <p>3. ใส่รายละเอียด แล้วกด create</p>
        <img
          src="..\assets\guide02.png"
          alt=""
          style="width: 100%; object-fit: cover"
        />
        <p>4. กดที่ Go to APIs overview</p>
        <img
          src="..\assets\guide03.png"
          alt=""
          style="width: 100%; object-fit: cover"
        />
        <p>5. กด + ANABLE APIS AND SERVICES ที่แถบด้านบน</p>
        <img
          src="..\assets\guide04.png"
          alt=""
          style="width: 100%; object-fit: cover"
        />
        <p>6. ค้นหา YouTube Data API v3</p>
        <p>7. กด ENABLE</p>
        <img
          src="..\assets\guide05.png"
          alt=""
          style="width: 100%; object-fit: cover"
        />
        <p>8. กด Credentials ที่แถบด้านข้าง</p>
        <img
          src="..\assets\guide06.png"
          alt=""
          style="width: 100%; object-fit: cover"
        />
        <p>9. กดที่ + CREATE CREDENTIALS จากนั้นเลือก API key</p>
        <p>10. คัดลอก key ไปใช้ตามที่ต้องการ</p>
        <img
          src="..\assets\guide07.png"
          alt=""
          style="width: 100%; object-fit: cover"
        />
      </div>
    </div>
  </main>
</template>

<script>
import $ from "jquery";
export default {
  mounted() {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scope>
.main-content {
  width: 70%;
  min-height: 100vh;
  background-color: #fff;
}
.head-bar {
  height: 80px;
  display: flex;
  justify-content: start;
  padding: 20px;
  margin-top: 60px;
  background-color: #fff;
}
.get-api-key p {
    padding: 0;
    margin: 0;
}
.get-api-key img {
    margin-top: 10px;
    margin-bottom: 30px;
    border: solid 1px #444;
}
</style>

