<template>
  <div>
    <div class="katta">
      <span>Шифокор</span>
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
          <div class="ustunW_item">
            <span>
              <span class="shirift">Шифокор</span>
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.name.required"
                  >Шифокор тўлдирилиши керак</span
                >
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.name.minLength"
                  >Шифокорда камида 4 та белги бўлиши керак</span
                >
              </span>
            </span>
            <b-input
              style="height: 35px; background: #fff; border: 1px solid #ced4da;"
              id="shifokor-name"
              v-model="modelvue.name"
              type="text"
            />
          </div>

          <div class="ustunW_item">
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
                @input="updateFilial"
              />
          </div>

          <div class="ustunW_item">
            <span>
              <span class="shirift">Шифокор бўлимлари</span>
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.category_id.required"
                  >Шифокор бўлими тўлдирилиши керак</span
                >
              </span>
            </span>
            <v-select
              :options="category"
              label="name"
              :reduce="option => option.id"
              v-model="modelvue.category_id"
            />
          </div>
         
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shifokor-form",
  props: ["modelvue", "errors"],
  data() {
    return {
      filials: [],
      category: []
    };
  },
  methods: {
    home() {
      this.$router.push("/shifokor");
    },
    Prev() {
      this.$router.push("/shifokor");
    },
    getCategory(filial) {
      let self = this;
      axios({
        method: "post",
        url: "/doctor_category/filial_bolim",
        data:{
          filial_id: filial
        }
      }).then(res => {
        self.category = res.data.data;
      });
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
    updateFilial(filial){
      if(filial){
        this.getCategory(filial);
      }else{
        this.category = [];
      }
    },

    getUpdate() {
      let self = this;
      axios({
        method: "get",
        url: `/doctor/one/` + self.$route.params.id
      }).then(res => {
        if(res){
          let filial = res.data.filial_id;
          this.updateFilial(filial)
        }
      });
    },
  },
  mounted() {
    let self = this;
    self.getFilial();
    let updateId = self.$route.params.id;
    if(updateId){
      this.getUpdate();
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
.oyna1 {
  margin: 10px 0;
}
.shirift {
  font-size: 16px;
}
.ustunW {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 12px;
}
</style>
