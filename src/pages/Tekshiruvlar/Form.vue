<template>
  <div>
    <div class="katta">
      <span>Текширув</span>
      <button
        style="padding: 4px 10px; margin-right: 10px"
        class="btn"
        @click="Prev()"
      >
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>
    <div class="oyna">
      <div class="inputlar">
        <div class="ustunT">
          <div class="ustunT_item">
            <span>
              <span class="shirift1">Номи</span>
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
                  >Номида камида 3 та белги бўлиши керак</span
                >
              </span>
            </span>
            <b-input
              id="tekshiruvlar-name"
              style="width: 100%; background: #fff; border: 1px solid #ced4da;"
              v-model="modelvue.name"
              type="text"
            />
          </div>

          <div class="ustunT_item">
            <span>
              <span class="shirift1">Текширув нарҳи</span>
            </span>
            <vue-numeric
              :disabled="modelvue.type"
              style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
              v-model="modelvue.price"
              separator="space"
              :precision="2"
            ></vue-numeric>
          </div>

          <div class="ustunT_item">
            <span>
              <span class="shirift1">Филиал</span>
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.user_id.required"
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

          <div class="ustunT_item">
            <span>
              <span class="shirift1">Бўлим номи</span>

              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.category_id.required"
                  >Бўлим номи тўлдирилиши керак</span
                >
              </span>
            </span>
            <v-select
              style="height: 40px"
              :options="category"
              label="name"
              :reduce="option => option.id"
              v-model="modelvue.category_id"
            />
          </div>

          <div class="ustunT_item">
            <span>
              <span class="shirift1">Ходим</span>
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.user_id.required"
                  >Ходим тўлдирилиши керак</span
                >
              </span>
            </span>
            <v-select
              label="user_name"
              :options="hodim"
              :reduce="option => option.id"
              v-model="modelvue.user_id"
            />
          </div>

          <div class="ustunT_item">
            <div style="width: 60%;">
              <span class="shirift1">Шифокор фоизи</span>
              <b-input
                id="tekshiruvlar-percent_bonus"
                style="background: #fff; border: 1px solid #ced4da;"
                v-model="modelvue.percent_bonus"
                type="number"
              />
            </div>
            <div>
              <label></label>
              <b-form-checkbox
                id="checkbox-1"
                v-model="modelvue.type"
                class="shirift1"
              >
                Кўрсатиш
              </b-form-checkbox>
            </div>
          </div>
          <!-- <div>
            <span>
              <span class="shirift1">Фуқаролиги бўлмаган нарҳ</span>
            </span>
            <vue-numeric
              :disabled="modelvue.type"
              style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
              v-model="modelvue.citizen_price"
              separator="space"
              :precision="2"
            ></vue-numeric>
          </div> -->
        </div>

      </div>
      <div class="scrol">
        <table class="table table-sm table-bordered">
          <thead>
            <tr>
              <th>№</th>
              <th>Номи</th>
              <th>Текширув нарҳи</th>
              <th>Бирлик</th>
              <th>Натижа</th>
              <th style="width: 50px"></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in modelvue.inspectionChild" :key="index">
              <td>
                {{ index + 1 }}
              </td>
              <td><b-input type="text" v-model="item.name"></b-input></td>
              <td>
                <vue-numeric
                  style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
                  v-model="item.price"
                  :disabled="!modelvue.type"
                  separator="space"
                  :precision="2"
                ></vue-numeric>
              </td>
              <td><b-input type="text" v-model="item.birlik" ></b-input></td>

              <!-- <td>
                <vue-numeric
                  style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
                  v-model="item.citizen_price"
                  :disabled="!modelvue.type"
                  separator="space"
                  :precision="2"
                ></vue-numeric>
              </td> -->
              <td><b-input type="text" v-model="item.norm"></b-input></td>
              <td>
                <b-button
                  class="trash1"
                  style=""
                  variant="outline-danger"
                  @click="daleteSubrow(index)"
                >
                  <b-icon
                    style="width: 15px;"
                    icon="trash-fill"
                    aria-hidden="true"
                  ></b-icon>
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
        <b-button
          class="qoshish_Btn"
          variant="success"
          type="number"
          @click="add($event)"
          ><b-icon icon="plus" font-scale="2" color="#fff"></b-icon
        ></b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "tekshiruvlar-form",
  props: ["modelvue", "errors"],
  data() {
    return {
      category: [],
      hodim: [],
      selectedFile: null,
      filials: [],
    };
  },
  methods: {
    add(event) {
      event.preventDefault();
      this.modelvue.inspectionChild.push({
        price: 0,
        citizen_price:0,
        file: "",
        name: "",
        norm: "",
        birlik: "",
      });
    },

    daleteSubrow(index) {
      this.modelvue.price -= this.modelvue.inspectionChild[index].price;
      this.modelvue.inspectionChild.splice(index, 1);
    },

    Prev() {
      this.$router.push("/tekshiruvlar");
    },

    getCategory(filial) {
      axios({
        method: "post",
        url: "/inspector_category/filial_bolim",
        data:{
          filial_id: filial
        }
      }).then(res => {
        this.category = res.data.data;
      });
    },

    getUser(filial) {
      axios({
        method: "post",
        url: "/user/filial_user",
        data:{
          filial_id:filial
        }
      }).then(res => {
        this.hodim = [];
        for (let index = 0; index < res.data.data.length; index++) {
          const element = res.data.data[index];
          if (element.role == "Loborant") {
            this.hodim.push(element);
          }
        }
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

    getUpdate() {
      let self = this;
      axios({
        method: "get",
        url: `/inspection/one/` + self.$route.params.id
      }).then(res => {
        if (res != undefined) {
          let filial_id = res.data.filial_id;
          this.getUser(filial_id);
          this.getCategory(filial_id);
        }
      });
    },
  
    updateFilial(filial){
      if(filial){
        this.getUser(filial);
        this.getCategory(filial);
      }else{
        this.hodim = [];
        this.category = [];
      }
    }
  },
   mounted() {
    let self = this;
    self.getFilial();
    self.updateFilial()
    let updateId = self.$route.params.id;
    if(updateId){
      this.getUpdate();
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
.oyna {
  margin: 10px 0;
  padding: 0 10px;
  position: relative;
}
.inputlar {
  margin: 8px 0px; 
}
.ustunT {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 16px;
}

.ustunT_item:nth-last-child(1){
  display: flex;
  align-items: center;
  gap: 12px;
}
.shirift1 {
  font-size: 16px;
  font-weight: 400;
}
/* .scrol{
  overflow: auto;
  height: calc(100vh - 460px);
} */
.qoshish_Btn {
  position: absolute;
  right: 13px;
  bottom: -50px;
  /* left: 990px; */
  background: #195fb0;
  /* margin-top: 5px; */
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #195fb0;
  box-shadow: 5px 8px 16px rgba(100, 100, 111, 0.2) ;
}
.trash1 {
  background: #fff;
  width: 35px;
  height: 35px;
  display: flex;
  border: 1px solid #fadddd;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>
