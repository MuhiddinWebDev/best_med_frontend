<template>
  <div>
    <div class="katta">
      <span>Текширув бўлимлари</span>
      <button
        style="padding: 4px 10px; margin-right: 10px"
        class="btn"
        @click="Prev()"
      >
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>
    <div class="d-flex-row">
      <div class="oyna">
        <span class="shirift">
          Бўлим номи
          <span style="color: red;">*</span>
          <span v-if="errors !== null">
            <span style="color: red; font-size: 9px" v-if="!errors.name.required"
              >Бўлим номи тўлдирилиши керак</span
            >
            <span style="color: red; font-size: 9px" v-if="!errors.name.minLength"
              >Бўлим номида камида 3 та белги бўлиши керак</span
            >
          </span>
        </span>
        <b-input
          style="background: #fff; border: 1px solid #ced4da;"
          id="tekshiruvBolimlari-name"
          v-model="modelvue.name"
          type="text"
        />
      </div>
      <div class="oyna">
        <span class="shirift">
          Филиал
          <span style="color: red;">*</span>
          <span v-if="errors !== null">
            <span style="color: red; font-size: 9px" v-if="!errors.name.required"
              >Филиални танлашингиз керак</span
            >
          </span>
        </span>
        <v-select
          :options="filials"
          label="name"
          :reduce="option => option.id"
          style="background: #fff; border: 1px solid #ced4da;"
          v-model="modelvue.filial_id"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tekshiruvBolimlari-form",
  props: ["modelvue", "errors"],
  data(){
    return{
      filials: [],
    }
  },
  methods: {
    Prev() {
      this.$router.push("/tekshiruv-bolimlari");
    },
    getFilial() {
      let self = this;
      axios({
        method: "get",
        url: "/filial/all"
      }).then(res => {
        self.filials = res.data.data;
      });
    }
  },
  mounted(){
    this.getFilial();
  }
};
</script>
<style>
.d-flex-row{
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
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
.oyna {
  margin: 10px 0;
}
.shirift {
  font-size: 16px;
}
</style>
