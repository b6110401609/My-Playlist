<template>
  <div style="display: flex; padding-top: 90px">
    <div
      class="col-7 des-text des-text-dark"
      style="
        display: flex;
        justify-content: space-between;
        flex-direction: column;
      "
    >
        MY PLAYLIST คือเว็บไซต์ที่จะช่วยให้คุณสามารถค้นหาเพลลิสต์จาก YouTube
        ได้อย่างสะดวกและรวดเร็วโดยใช้เทคโนโลยี YouTube Data API
        เพียงแค่พิมพ์สิ่งที่ต้องการหาแล้วกดค้นหา
        ระบบจะทำการแสดงเพลลิสต์ยอดนิยมของคำค้นหานั้นโดยเรียงลำดับตามความนิยม
      <div>
        <button class="btn-api"
          onclick=" window.open('https://developers.google.com/youtube','_blank')"
        >
          ไปที่ YouTube Data API
        </button>
      </div>
    </div>
    <div class="col-5 des-pic des-pic-dark">
      <img
        src="..\assets\normalSearch.png"
        alt=""
        style="width: 100%; object-fit: cover"
      />
    </div>
  </div>
  <div style="display: flex">
    <div class="col-7 des-pic des-pic-light">
      <img
        src="..\assets\advanceSearch01.png"
        alt=""
        style="width: 100%; object-fit: cover"
      />
    </div>
    <div class="col-5 des-text des-pic-light">
      หากคุณต้องใช้ตัวกรองอื่น ๆ ในการค้นหา MY PLAYLIST มีระบบ advance search
      ไว้ให้ใช้งาน
      โดยคุณสามารถเลือกได้ว่าต้องการให้แสดงเพลลิสที่คะแนนดีที่สุดในด้านอะไร
      ได้แก่ เรตติง ยอดวิวรวม และจำนวนวิดีโอในเพลลิสต์นั้น
    </div>
  </div>
  <div style="display: flex">
    <div class="col-8 des-text des-text-dark">
      การค้นหาด้วย advance search จะแสดงข้อมูลสถิติเพื่อประกอบการตัดสินใจ
      รวมถึงสามารถดูได้ด้วยว่าในเพลลิสต์นั้นมีข้อมูลภาษาไทยหรือไม่
    </div>
    <div class="col-4 des-pic des-pic-dark">
      <img
        src="..\assets\advanceSearch02.png"
        alt=""
        style="width: 100%; object-fit: cover"
      />
    </div>
  </div>
</template>

<script>
</script>

<style scope>
.des-pic {
  padding: 40px;
}
.des-text {
  padding: 40px;
}
.des-pic-dark {
  background-color: #444;
}
.des-text-dark {
  background-color: #444;
  color: #fff;
}
/* .des-pic-light {
}
.des-text-light {
} */
.btn-api {
  width: 200px;
  color: #fff;
  background-color: #F91880;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  border: solid 2px #fff;
  border-radius: 50px;
}
</style>
