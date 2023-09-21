<template>
  <div class="ml-2">
    <div class="katta">
      <span>Напровител</span>
      <button
        style="padding: 4px 10px; margin-right: 10px"
        class="btn"
        @click="Prev()"
      >
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>
    <div class="oyna1">
      <div class="ustun">
        <span>
          <span class="shirift">Ф.И.Ш</span>
          <span style="color: red;">*</span>
          <span v-if="errors !== null">
            <span
              style="color: red; font-size: 9px"
              v-if="!errors.name.required"
              >Ф.И.Ш тўлдирилиши керак</span
            >
            <span
              style="color: red; font-size: 9px"
              v-if="!errors.name.minLength"
              >Ф.И.Ш да камида 4 та белги бўлиши керак</span
            >
          </span>
        </span>
        <b-input id="naprovitel-name" v-model="modelvue.name" type="text" />

        <!-- <span>
          <span class="shirift">Вакил</span>
          <span style="color: red;">*</span>
          <span v-if="errors !== null">
            <span
              style="color: red; font-size: 9px"
              v-if="!errors.name.required"
              >Ф.И.Ш тўлдирилиши керак</span
            >
          </span>
        </span>
        <v-select
          :options="MedPris"
          label="name"
          :reduce="option => option.id"
          v-model="modelvue.med_id"
        /> -->
      </div>

      <div class="ustun">
        <span>
          <span class="shiri">
            Фоиз
          </span>
          <span style="color: red;">*</span>
          <span v-if="errors !== null">
            <span
              style="color: red; font-size: 9px"
              v-if="!errors.bonus.required"
              >Фоиз тўлдирилиши керак</span
            >
            >
          </span>
        </span>
        <!-- <b-input id="naprovitel-bonus" v-model="modelvue.bonus" type="number" /> -->
        <vue-numeric
          style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
          v-model="modelvue.bonus"
          separator="space"
        ></vue-numeric>
      </div>

      <div class="ustun">
            <span>
              <span class="shiri">Филиал</span>
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
</template>

<script>
export default {
  name: "naprovitel-form",
  props: ["modelvue", "errors"],
  data() {
    return {
      MedPris: [],
      filials:[],
    };
  },
  methods: {
  
    Prev() {
      this.$router.push("/naprovitel");
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
  mounted() {
    this.getFilial()
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
.oyna1 {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.shirift {
  font-size: 16px;
}
.ustun {
  width: 49%;
}
</style>
