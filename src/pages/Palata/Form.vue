<template>
  <div>
    <div class="katta">
      <span>Палата</span>
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
            <span class="shirift">Номи</span>
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.name.required"
                >Номи тўлдирилиши керак</span
              >
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.name.minLength"
                >Номи камида 4 та белги бўлиши керак</span
              >
            </span>
          </span>
          <b-input
            style="background: #fff; border: 1px solid #ced4da;"
            id="palata-name"
            v-model="palatas.name"
            type="text"
          />
          <span class="shirift">Филиал</span>
          <v-select
            :options="bino"
            label="name"
            :reduce="option => option.id"
            v-model="palatas.filial_id"
            @input="updateBranch"
          />
        </div>
        <div class="ustun">
          <span class="shirift">Ходим</span>
          <v-select
            :options="hodim"
            label="user_name"
            :reduce="option => option.id"
            v-model="palatas.user_id"
          />
          <span>
            <span class="shirift">Нарҳи</span>
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.price.required"
                >Нарҳи тўлдирилиши керак
              </span>
            </span>
          </span>
          <vue-numeric
            style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
            v-model="palatas.price"
            separator="space"
            :precision="2"
          ></vue-numeric>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "palata-form",
  props: ["palatas", "errors"],
  data() {
    return {
      bino: [],
      hodim: []
    };
  },
  methods: {
    home() {
      this.$router.push("/palata");
    },
    Prev() {
      this.$router.push("/palata");
    },
    gethodim(filial) {
      let self = this;
      axios({
        method: "post",
        url: "user/filial_user",
        data:{
          filial_id: filial
        }
      }).then(res => {
        self.hodim = res.data.data;
      });
    },
    getFilial() {
      let self = this;
      axios({
        method: "get",
        url: "/filial/all"
      }).then(res => {
        self.bino = res.data.data;
      });
    },
    updateBranch(filial){
      this.palatas.user_id = null;
      this.branchValid = false;
      if(filial){
        this.gethodim(filial)
      }else{
        this.palatas.filial_id = JSON.parse(localStorage.getItem("filial_id"));
        this.branchValid = true;
      }
    }
  },
  mounted() {
    this.getFilial();
    const filial_id = JSON.parse(localStorage.getItem("filial_id"));
    this.gethodim(filial_id);
    if(this.$route.name == 'PalataCreate'){
      this.palatas.filial_id = filial_id;
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
.oyna1 {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}
.shirift {
  font-size: 16px;
}
.ustun {
  width: 49%;
}
</style>
