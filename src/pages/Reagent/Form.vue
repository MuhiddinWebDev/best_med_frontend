<template>
  <div>
    <div class="katta">
      <span>Реагент</span>
      <button
        style="padding: 4px 10px; margin-right: 10px"
        class="btn"
        @click="Prev()"
      >
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>
    <div class="oyna">
      <span>
        <span class="shirift">Номи</span>
        <span style="color: red;">*</span>
        <span v-if="errors !== null">
          <span style="color: red; font-size: 9px" v-if="!errors.name.required"
            >Номи тўлдирилиши керак</span
          >
          <span style="color: red; font-size: 9px" v-if="!errors.name.minLength"
            >Номида камида 4 та белги бўлиши керак</span
          >
        </span>
      </span>
      <b-input
        style="width: 50%; background: #fff; border: 1px solid #ced4da;"
        id="reagent-name"
        v-model="modelvue.name"
        type="text"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "reagent-form",
  props: ["modelvue", "errors"],
  methods: {
    Prev() {
      this.$router.push("/reagent");
    }
  }
};
</script>
<style>
.katta {
  background: #379056;
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
  box-shadow: 5px 8px 10px rgba(100, 100, 111, 0.2) ;
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
