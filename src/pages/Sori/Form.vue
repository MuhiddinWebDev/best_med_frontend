<template>
  <div>
    <div class="katta">
      <span>Сўрилар</span>
      <button
        style="padding: 4px 10px; margin-right: 10px"
        class="btn"
        @click="Prev()"
      >
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>
    <div class="row">
      <div class="col-md-6 col-lg-6 my-2">
        <span>
          <span class="shirift">Сўри</span>
          <span style="color: red;">*</span>
          <span v-if="errors !== null">
            <span
              style="color: red; font-size: 9px"
              v-if="!errors.name.required"
              >Сўри тўлдирилиши керак</span
            >
            <span
              style="color: red; font-size: 9px"
              v-if="!errors.name.minLength"
              >Сўрида камида 4 та белги бўлиши керак</span
            >
          </span>
        </span>
        <b-input id="sorilar-name" v-model="modelvue.name" type="text" />
      </div>
      <div class="col-md-6 col-lg-6 my-2">
        <span>
          <span class="shirift">Нарх</span>
          <span style="color: red;">*</span>
          <span v-if="errors !== null">
            <span
              style="color: red; font-size: 9px"
              v-if="!errors.price.required"
              >Нарх тўлдирилиши керак</span
            >
          </span>
        </span>
        <b-input id="sorilar-price" v-model="modelvue.price" type="number" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sorilar-form",
  props: ["modelvue", "errors"],
  methods: {
    Prev() {
      this.$router.push("/sori");
    }
  }
};
</script>
<style>
.katta {
  background: #007bff;
  margin-top: -25px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 700;
  line-height: 40px;
  border-radius: 8px;
  color: #fff;
  text-indent: 15px;
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.5);
}
.shirift {
  font-size: 16px;
  font-weight: 400;
}
.oyna {
  margin: 10px 0;
  padding: 0 10px;
  position: relative;
}
</style>
