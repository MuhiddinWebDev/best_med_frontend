<template>
  <div class="parent">
    <div class="kattat">
      <span>Паставшик тўлов</span>
      <b-button class="navbarBtnDanger" variant="danger" @click="Prev()">
        <b-icon icon="x-circle-fill"></b-icon>
      </b-button>
    </div>
    <div class="pastavshi mt-4">
      <div
        class="pastav"
        :class="{ Arxive: $route.name == 'Provider Document' }"
      >
        <div style="width: 33%;">
          <label>Вақт</label>
          <date-picker
            style="width: 100%;"
            format="DD.MM.YYYY"
            v-model="providerPay.date_time"
            value-type="X"
            type="date"
            :lang="lang"
          ></date-picker>
        </div>
        <div style="width: 33%; position: relative;">
          <label>Поставщик</label>
          <button
            class="tabsBtnssPas"
            variant="success"
            v-b-modal.OpenModalPas1
          >
            ...
          </button>
          <b-modal id="OpenModalPas1" hide-footer title="Поставщик Қўшиш">
            <div class="md-layout-item md-small-size-100 md-size-100">
              <span class="shirift">
                Поставщик
              </span>
              <span style="color: red;">*</span>
              <span v-if="errorPastavshik !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errorPastavshik.name.required"
                  >Поставщик тўлдирилиши керак</span
                >
                <!-- <span
                    style="color: red; font-size: 9px"
                    v-if="!errorsHarajat.name.minLength"
                    >Harajat kamida 4 ta belgi bo'lisi kerak</span
                  > -->
              </span>
              <b-input type="text" v-model="provider.name" />
            </div>
            <div class="btnlar">
              <b-button
                class="modalBtn1"
                size="sm"
                style="height: 37px;"
                variant="danger "
                @click="cancelPastavshik()"
              >
                <b-icon icon="calendar2-x"></b-icon>
                Бекор қилиш
              </b-button>
              <b-button
                class="ml-2 modalBtn"
                variant="success"
                @click="createProvider()"
              >
                <b-icon icon="calendar2-plus"></b-icon>
                Сақлаш
              </b-button>
            </div>
          </b-modal>
          <v-select
            label="name"
            v-model="providerPay.pastavchik_id"
            @input="PastavshikId"
            :options="Pastavshik"
            :reduce="option => option.id"
          />
        </div>
        <!-- <div style="width: 33%;">
        <label>Умумий сумма</label>
        <div class="Summa">{{ providerPay.jami_summa | numFormat }}</div>
      </div> -->
        <div style="width: 33%;">
          <label>Қарздорлик</label>
          <div class="Summa">{{ providerPay.backlog | numFormat }}</div>
        </div>
      </div>
      <div
        class="ikkilik"
        :class="{ Arxive: $route.name == 'Provider Document' }"
      >
        <div style="width: 33%;">
          <label>Тўлов тури</label>
          <v-select
            label="name"
            v-model="providerPay.type"
            :reduce="option => option.id"
            :options="TolovTuri"
          />
        </div>
        <div style="width: 33%">
          <label>Сумма</label>
          <vue-numeric
            style="width: 100%; height: 35px; border: 1px solid #cbc8c8; border-radius: 5px;"
            separator="space"
            :precision="2"
            v-model="providerPay.price"
          ></vue-numeric>
        </div>
        <div style="width: 33%"></div>
      </div>
    </div>

    <div class="tugmalarf mt-2 mr-2">
      <div>
        <b-button
          @click="createProviderPay()"
          class="mr-2 calendar"
          variant="success"
        >
          <b-icon icon="calendar2-plus"></b-icon> Сақлаш
        </b-button>
        <b-button @click="cancel()" class="calendar1" variant="danger">
          <b-icon icon="calendar2-x"></b-icon> Бекор қилиш
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "reagent-form",
  components: {
    DatePicker
  },
  data() {
    return {
      providerPay: {
        type: "Naqt",
        pastavchik_id: null,
        price: 0,
        backlog: 0,
        date_time: new Date()
          .valueOf()
          .toString()
          .slice(0, 10)
      },
      provider: {
        name: ""
      },
      errors: null,
      errorPastavshik: null,
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      Pastavshik: [],
      TolovTuri: [
        { id: 0, name: "Naqt" },
        { id: 1, name: "Plastik" }
      ]
    };
  },
  validations: {
    provider: {
      name: {
        required,
        minLength: minLength(4)
      }
    },
    providerPay: {
      pastavchik_id: {
        required
      },
      price: {
        required
      }
    }
  },
  methods: {
    Prev() {
      if (this.$route.name != "Provider Document") {
        const x = window.confirm("Ростдан ҳам ойнани тарк этмоқчимисиз?");
        if (x) {
          this.$router.push("/provider/pay");
        }
      } else {
        window.close();
      }
    },
    createProviderPay() {
      let self = this;
      // if (self.providerPay.type == "Naqt") {
      //   self.providerPay.type = 0;
      // } else {
      //   self.providerPay.type = 1;
      // }
      this.$v.$touch();
      if (this.$v.providerPay.$error == false) {
        if (self.$route.name == "Provider Pay Create") {
          axios({
            method: "post",
            url: "/pastavchik_pay/create",
            data: self.providerPay
          }).then(data => {
            if (data != undefined) {
              this.$router.push("/provider/pay");
            } else {
              // if (self.providerPay.type == 0) {
              //   self.providerPay.type = "Naqt";
              // } else {
              //   self.providerPay.type = "Plastik";
              // }
            }
          });
        } else if (self.$route.name == "Provider Pay Update") {
          axios({
            method: "patch",
            url: `/pastavchik_pay/update/` + self.providerPay.id,
            data: self.providerPay
          }).then(data => {
            if (data != undefined) {
              self.$router.push("/provider/pay");
            }
          });
        }
      } else {
        self.errors = self.$v.providerPay;
      }
    },
    createProvider() {
      let self = this;
      this.$v.$touch();
      if (self.$v.provider.$error == false) {
        axios({
          method: "post",
          url: "/pastavchik/create",
          data: self.provider
        }).then(data => {
          if (data != undefined) {
            // self.$router.push("/provider");
            self.providerPay.pastavchik_id = data.data.data.id;
            self.getPastavshik();
            self.$bvModal.hide("OpenModalPas1");
            self.provider.name = "";
          }
        });
      } else {
        self.errorPastavshik = self.$v.provider;
      }
    },
    getPastavshik() {
      let self = this;
      axios({
        method: "get",
        url: "/pastavchik/all"
      }).then(res => {
        if (res != undefined) {
          self.Pastavshik = res.data.data;
        }
      });
    },
    getProviderPay() {
      let self = this;
      if (self.$route.name == "Provider Pay Update" || self.$route.name == 'Provider Document') {
        axios({
          method: "get",
          url: `/pastavchik_pay/One/` + self.$route.params.id
        }).then(res => {
          if (res != undefined) {
            if (res.data.data.type == 0) {
              res.data.data.type = "Naqt";
            } else {
              res.data.data.type = "Plastik";
            }
            self.providerPay = res.data.data;
          }
        });
      }
    },
    PastavshikId(id) {
      let self = this;
      axios({
        method: "post",
        url: "/pastavchik_pay/getPastavchik",
        data: {
          pastavchik_id: id
        }
      }).then(res => {
        if (res != undefined) {
          self.providerPay.backlog = res.data.backlog;
        }
      });
    },
    cancelPastavshik() {
      this.provider = {
        name: ""
      };
    },
    cancel() {
      this.providerPay = {
        type: "Naqt",
        pastavchik_id: null,
        price: 0,
        backlog: 0,
        jami_summa: 0
      };
    }
  },
  mounted() {
    this.getPastavshik();
    this.getProviderPay();
  }
};
</script>
<style>
.parent {
  background: #d3e4e7;
  height: 100vh;
  box-sizing: border-box;
}
.tabsBtnssPas {
  position: absolute;
  z-index: 99;
  top: 37px;
  left: calc(100% - 70px);
  color: #b1b1b1;
  font-weight: 700;
  font-size: 17px;
  border: none;
  background-color: white;
}
.pastavshi {
  width: 99%;
  margin: 0 auto;
  border-radius: 8px;
  height: calc(100vh - 170px);
  padding: 5px 0px 20px;
  background: #fff;
}
.kattat {
  margin: 0px auto;
  padding: 10px 7px;
  width: 99%;
  background: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.5);
  display: flex;
  justify-content: space-between;
  color: #3f51b5;
  font-size: 20px;
  font-weight: 700;
  line-height: 40px;
}
.btnlar {
  justify-content: right;
  display: flex;
  margin-top: 20px;
}
.ikkilik {
  display: flex;
  justify-content: space-between;
  width: 98%;
  margin: 0 auto;
}
.shirift {
  font-size: 16px;
  font-weight: 400;
}
.navbarBtnDanger {
  border: 1px solid #fff;
  box-shadow: 5px 8px 10px rgba(176, 25, 25, 0.3);
  background: #e80a18;
  border-radius: 8px;
}
.Summa {
  display: block;
  background: #fff;
  /* text-align: center; */
  padding: 5px 5px !important;
  border: 1px solid #cbc8c8;
  border-radius: 5px;
}
.pastav {
  margin: 0 auto;
  /* padding: 5px; */
  border-radius: 5px;
  /* border: 1px solid #cbc8c8; */
  width: 98%;
  display: flex;
  justify-content: space-between;
}
.oyna {
  margin: 10px 0;
  padding: 0 10px;
  position: relative;
}
.Arxive {
  pointer-events: none;
}
.tugmalarf {
  display: flex;
  justify-content: right;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
