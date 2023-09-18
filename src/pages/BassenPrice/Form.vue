<template>
  <div>
    <div class="katta">
      <span>Бассейн нархи</span>
      <button
        style="padding: 4px 10px; margin-right: 10px"
        class="btn"
        @click="Prev()"
      >
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>
    <div>
      <div class="oyna1">
        <div class="ustun">
          <span>
            <span class="shirift">Бассейн нархи</span>
          </span>
          <vue-numeric
            style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
            v-model="modelvue.price"
            separator="space"
            :precision="2">
          </vue-numeric>
        
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shifokorBolimi-form",
  props: ["modelvue", "errors"],
  methods: {
    Prev() {
      this.$router.push("/bassen-price");
    },
  },
};
</script>
<style>
.katta {
  background: #379056;
  margin-top: -25px;
  height: 40px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  line-height: 40px;
  border-radius: 8px;
  color: #fff;
  text-indent: 15px;
  box-shadow: 5px 8px 10px rgba(100, 100, 111, 0.2) ;
}
.oyna1 {
  margin: 10px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.shirift {
  font-size: 16px;
}

</style>
