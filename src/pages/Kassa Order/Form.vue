<template>
  <div>
    <div class="katta">
      <span>Касса чиқим</span>
      <button
        style="padding: 4px 10px; margin-right: 10px"
        class="btn"
        @click="Prev"
      >
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>
    <div>
      <div class="oyna1">
        <div class="ustun">
          <div style="position: relative;">
            <span>
              <span class="shirift">Ҳаражат</span>
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.expense_id.required"
                  >Харажат тўлдирилиши керак</span
                >
              </span>
              <div>
                <button
                  :class="{ Disabled: $route.name == 'KassaDoc' }"
                  class="tabsBtnss"
                  v-b-modal.DorilarModal1
                  variant="success"
                >
                  ...
                </button>
              </div>
              <b-modal id="DorilarModal1" title="Харажат Қўшиш">
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <span class="shirift">
                    Ҳаражат номи
                  </span>
                  <span style="color: red;">*</span>
                  <span v-if="errorsHarajat !== null">
                    <span
                      style="color: red; font-size: 9px"
                      v-if="!errorsHarajat.name.required"
                      >Ҳаражат тўлдирилиши керак</span
                    >
                    <!-- <span
                          style="color: red; font-size: 9px"
                          v-if="!errorsHarajat.name.minLength"
                          >Harajat kamida 4 ta belgi bo'lisi kerak</span
                        > -->
                  </span>
                  <b-input
                    id="dorilar-name"
                    type="text"
                    v-model="Harajat.name"
                  />
                </div>
                <template #modal-footer="{ ok }">
                  <b-button
                    class="modalBtn1"
                    size="sm"
                    style="height: 37px;"
                    variant="danger "
                    @click="ok()"
                  >
                    <b-icon icon="calendar2-x"></b-icon>
                    Бекор қилиш
                  </b-button>
                  <b-button
                    class="mt-3 ml-2 modalBtn"
                    @click="HarajatSaqlash()"
                    variant="success"
                  >
                    <b-icon icon="calendar2-plus"></b-icon>
                    Сақлаш
                  </b-button>
                </template>
              </b-modal>
            </span>
            <v-select
              :class="{ Disabled: $route.name == 'KassaDoc' }"
              :options="expense"
              v-model="kassaOrder.expense_id"
              :reduce="expense => expense.id"
              label="name"
            />
            <!-- <b-input v-model="kassaOrder.expense_id" type="number"></b-input> -->
          </div>
          <div style="position: relative;">
            <span>
              <span class="shirift">Филиал</span>
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.filial_id.required"
                  >Филиал тўлдирилиши керак</span
                >
              </span>
              
            </span>
            <v-select
              :class="{ Disabled: $route.name == 'KassaDoc' }"
              :options="filial"
              v-model="kassaOrder.filial_id"
              @input = "updateFilial"
              :reduce="filial => filial.id"
              label="name"
            />
            <!-- <b-input v-model="kassaOrder.expense_id" type="number"></b-input> -->
          </div>
          <div class="mt-1">
            <span class="shirift">
              Тўлов тури
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.type.required"
                  >Тўлов турини танланг</span
                >
              </span>
            </span>
            <v-select
              :class="{ Disabled: $route.name == 'KassaDoc' }"
              :options="tolov_turi"
              label="tolov"
              v-model="kassaOrder.type"
            />
          </div>
          <div>
            <span class="shirift"
              >Пул миқдори
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.price.required"
                  >Пул миқдори тўлдирилиши керак</span
                >
              </span>
            </span>
            <vue-numeric
              :class="{ Disabled: $route.name == 'KassaDoc' }"
              :disabled="kassaOrder.pay_type != 'Oylik'"
              style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 3px;"
              v-model="kassaOrder.price"
              separator="space"
              :precision="2"
            ></vue-numeric>
          </div>
        </div>

        <div class="ustun">
          <div>
            <span>
              <span class="shirift">Изоҳ</span>
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.comment.required"
                  >Изоҳ тўлдирилиши керак</span
                >
              </span>
            </span>
            <b-input
              v-model="kassaOrder.comment"
              style="background: #fff; border: 1px solid #ced4da;"
              :class="{ Disabled: $route.name == 'KassaDoc' }"
              type="text"
            ></b-input>
          </div>
          <div>
            <span>
              <span class="shirift">Кассер</span>
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.kasser_id.required"
                  >Кассер тўлдирилиши керак</span
                >
              </span>
            </span>
          
            <v-select
              :class="{ Disabled: $route.name == 'KassaDoc' }"
              :options="kasser"
              v-model="kassaOrder.kasser_id"
              :reduce="kasser => kasser.id"
              label="user_name"
            />
          </div>
          <div>
            <span class="shirift">Куни</span>
            <date-picker
              :class="{ Disabled: $route.name == 'KassaDoc' }"
              style="width: 100%;"
              v-model="kassaOrder.date_time"
              format="DD.MM.YYYY HH:mm"
              value-type="X"
              type="datetime"
              :lang="lang"
            ></date-picker>
            <!-- <b-input v-model="kassaOrder.date_time" type="date"></b-input> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from 'moment'
import DatePicker from "vue2-datepicker";
import { required, minLength } from "vuelidate/lib/validators";
import axios from "axios";
import "vue2-datepicker/index.css";
export default {
  name: "KassaForm",
  props: ["kassaOrder", "errors"],
  components: {
    DatePicker
  },
  data() {
    return {
      kassa: [],
      expense: [],
      filial: [],
      kasser: [],
      tolov_turi: ["Naqd", "Plastik"],
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      Harajat: {
        name: ""
      },
      errorsHarajat: null
    };
  },
  validations: {
    Harajat: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    Prev() {
      if (this.$route.name == "KassaDoc") {
        window.close();
      } else {
        this.$router.push("/kassaa");
      }
    },
    getKassa() {
      let self = this;
      axios({
        method: "get",
        url: "/expense/all"
      }).then(res => {
        self.expense = res.data.data;
        // self.expense.date_time = value;
      });
    },
    getFilial() {
      let self = this;
      axios({
        method: "get",
        url: "/filial/all"
      }).then(res => {
        self.filial = res.data.data;
      });
    },
    getKasser(id) {
      let self = this;
      axios({
        method: "post",
        url: "/user/filial_kassa",
        data:{
          filial_id: id
        }
      }).then(res => {
        self.kasser = res.data.data;
      });
    },
    updateFilial(filial){
      if(filial){
        this.getKasser(filial)
      }else{
        this.kasser = [];
      }
    },
    HarajatSaqlash() {
      let self = this;
      this.$v.$touch();
      if (this.$v.Harajat.$error == false) {
        axios({
          method: "post",
          url: "/expense/create",
          data: self.Harajat
        }).then(data => {
          if (data !== undefined) {
            this.kassaOrder.expense_id = data.data.data.id;
            this.getKassa();
            this.$bvModal.hide("DorilarModal1");
            this.Harajat.name = "";
          }
        });
      } else {
        this.errorsHarajat = this.$v.Harajat;
      }
    },
    getUpdate() {
      let self = this;
      axios({
        method: "get",
        url: `/kassa_order/one/` + self.$route.params.id
      }).then(res => {
        if (res != undefined) {
          let filial_id = res.data.data.filial_id;
          this.updateFilial(filial_id);
        }
      });
    },
  },
  mounted() {
    let self = this;
    self.getKassa();
    self.getFilial();
    let updateId = self.$route.params.id;
    if(updateId){
      this.getUpdate()
    }
  }
};
</script>
<style>
.tabsBtnss {
  position: absolute;
  z-index: 3;
  top: 30px;
  left: calc(100% - 70px);
  color: #b1b1b1;
  font-weight: 700;
  font-size: 17px;
  border: none;
  background-color: white;
}
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
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.shirift {
  font-size: 16px;
}
.ustun {
  width: 49%;
  /* position: relative; */
}
.Disabled {
  pointer-events: none;
}
</style>
