<template>
  <div>
    <div class="katta">
      <span>Шифокор бўлимлари</span>
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
        <div class="ustunW">
          <span>
            <span class="shirift">Бўлим номи</span>
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.name.required"
                >Бўлим номи тўлдирилиши керак</span
              >
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.name.minLength"
                >Бўлим номида камида 3 та белги бўлиши керак</span
              >
            </span>
          </span>
          <b-input
            id="shifokorBolimi-name"
            style="background: #fff; border: 1px solid #ced4da;"
            v-model="modelvue.name"
            type="text"
          />
          <!-- <div class="ustunW"> -->
          <!-- <span>
            <span class="shirift">
              Фуқаролиги бўлмаган нарҳ
            </span>
          </span> -->
          <!-- <b-input
            id="shifokorBolimi-price"
            v-model="modelvue.price"
            type="text"
          /> -->
          <!-- <vue-numeric
            style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
            v-model="modelvue.citizen_price"
            separator="space"
            :precision="2"
          ></vue-numeric> -->
          <!-- </div> -->
        </div>
        <div class="ustunW">
          <span>
            <span class="shirift">
              Консултация нарҳи
            </span>
          </span>
          <!-- <b-input
            id="shifokorBolimi-price"
            v-model="modelvue.price"
            type="text"
          /> -->
          <vue-numeric
            style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
            v-model="modelvue.price"
            separator="space"
            :precision="2"
          ></vue-numeric>
        </div>
        <div class="ustunW">
          <span>
              <span class="shirift1">Филиал</span>
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.filial_id.required"
                  >Филиални танлашингиз керак</span
                >
              </span>
          </span>
          <v-select
            label="name"
            :options="filials"
            :reduce="option => option.id"
            v-model="modelvue.filial_id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shifokorBolimi-form",
  props: ["modelvue", "errors"],
  data(){
    return{
      filials: [],
    }
  },
  methods: {
    Prev() {
      this.$router.push("/shifokor-bolimi");
    },

    getFilial() {
      let self = this;
      axios({
        method: "get",
        url: "/filial/all"
      }).then(res => {
        self.filials = res.data.data;
      });
    },
  },
  mounted(){
    this.getFilial();
  }
};
</script>
<style>
.katta {
  background: #007bff;
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
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.5);
}
.oyna1 {
  margin: 10px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 12px;
}
.shirift {
  font-size: 16px;
}

</style>
