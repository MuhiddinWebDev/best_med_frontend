<template>
  <div>
    <div class="katta">
      <span>Поставщик </span>
      <button
        style="padding: 4px 10px; margin-right: 10px"
        class="btn"
        @click="Prev()"
      >
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>
    <div class="oyna d-flex-row">
      <div class="ustun">
        <span>
          <span class="shirift">Ф.И.О</span>
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
          style="background: #fff; border: 1px solid #ced4da;"
          id="provider-name"
          v-model="modelvue.name"
          type="text"
        />
      </div>

        <!-- <div class="ustun">
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
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "provider-form",
  props: ["modelvue", "errors"],
  data(){
    return{
      filials:[],
    }
  },
  methods: {
    Prev() {
      this.$router.push("/provider");
    },
    // getFilial() {
    //   let self = this;
    //   axios({
    //     method: "get",
    //     url: "/filial/all"
    //   }).then(res => {
    //     self.filials = res.data.data;
    //   });
    // },
  },
  mounted() {
    // this.getFilial()
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
.d-flex-row{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 12px;
}
.ustun{
  flex: 1 0 350px;
}
</style>
