<template>
  <div>
    <div class="katta">
      <span>Хоналар</span>
      <button
        style="padding: 4px 10px; margin-right: 10px"
        class="btn"
        @click="Prev()"
      >
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>
    <div class="row">
      <div class="col-md-6 col-lg-6 mt-2">
        <span>
          <span class="shirift">Хона рақами</span>
          <span style="color: red;">*</span>
          <span v-if="errors !== null">
            <span
              style="color: red; font-size: 9px"
              v-if="!errors.name.required"
              >Хона рақами тўлдирилиши керак</span
            >
            <span
              style="color: red; font-size: 9px"
              v-if="!errors.name.minLength"
              >Хона рақамида камида 4 та белги бўлиши керак</span
            >
          </span>
        </span>
        <b-input id="xonalar-name" v-model="modelvue.name" type="text" />
      </div>
      <div class="col-md-6 col-lg-6 mt-2">
        <span class="shirift">Филиал</span>
        <v-select
          :options="bino"
          label="name"
          :reduce="option => option.id"
          v-model="modelvue.filial_id"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "xonalar-form",
  props: ["modelvue", "errors"],
  data() {
    return {
      bino: []
    };
  },
  methods: {
    Prev() {
      this.$router.push("/xonalar");
    },
    getFilial() {
      let self = this;
      axios({
        method: "get",
        url: "/filial/all"
      }).then(res => {
        self.bino = res.data.data;
      });
    }
  },
  mounted() {
    this.getFilial();
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
