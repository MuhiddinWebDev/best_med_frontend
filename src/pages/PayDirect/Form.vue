<template>
  <div class="parent ml-2">
    <div class="kattat">
      <span>Вакил тўлов</span>
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
            v-model="providerPay.datetime"
            value-type="X"
            type="date"
            :lang="lang"
          ></date-picker>
        </div>
        <div style="width: 33%; position: relative;">
          <label>Вакил</label>
          <!-- <button
            class="tabsBtnssPas"
            variant="success"
            v-b-modal.OpenModalPas1
          >
            ...
          </button>
          <b-modal id="OpenModalPas1" hide-footer title="Вакил Қўшиш">
            <div class="md-layout-item md-small-size-100 md-size-100">
              <span class="shirift">
                Вакил
              </span>
              <span style="color: red;">*</span>
              <span v-if="errorPastavshik !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errorPastavshik.name.required"
                  >Вакил тўлдирилиши керак</span
                >
              </span>
              <b-input type="text" v-model="provider.name" />
              <label>Филиал</label>
              <v-select
                label="name"
                v-model="provider.filial_id"
                :options="filials"
                :reduce="options => options.id"
              />
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
          </b-modal> -->
          <v-select
            label="name"
            v-model="providerPay.direct_id"
            @input="PastavshikId"
            :options="Directs"
            :reduce="options => options.id"
          />
        </div>
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
            v-model="providerPay.sum"
          ></vue-numeric>
        </div>
        <div style="width: 33%">
          <label>Филиал</label>
          <v-select
            :options="filials"
            style="width: 100%;"
            v-model="providerPay.filial_id"
            label="name"
            :reduce="options => options.id"
            placeholder="Филиал танланг..."
          />
        </div>
      </div>
        <div class="row pl-3 mt-3">
          <div class="col-3">
            <label>Изоҳ</label>
          <b-form-textarea
              v-model="providerPay.comment"
              style="background: #fff; border: 1px solid #ced4da;"
              type="text">
          </b-form-textarea>
        </div>
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
        pay_type: "Naqt",
        direct_id: null,
        sum: 0,
        backlog: 0,
        comment: "",
        filial_id: null,
        datetime: new Date()
          .valueOf()
          .toString()
          .slice(0, 10)
      },
      provider: {
        name: "",
        filial_id: null
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
      Directs: [],
      filials: [],
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
      direct_id: {
        required
      },
      sum: {
        required
      },
      filial_id: {
        required
      }
    }
  },
  methods: {
    Prev() {
      this.$router.go(-1);
      if (this.$route.name != "Provider Document") {
        const x = window.confirm("Ростдан ҳам ойнани тарк этмоқчимисиз?");
        if (x) {
          this.$router.go(-1);
        }
      } else {
        window.close();
      }
    },
    createProviderPay() {
      if((this.providerPay.direct_id == null || this.providerPay.filial_id == null)) {
        alert("Филиал ва Вакилни танланг")
      }else {
        let self = this;
      if (self.providerPay.pay_type == "Naqt") {
        self.providerPay.pay_type = 0;
      } else {
        self.providerPay.pay_type = 1;
      }
      this.$v.$touch();
      if (this.$v.providerPay.$error == false) {
        if (self.$route.name == "pay-direct-create") {
          axios({
            method: "post",
            url: "/pay-direct/create",
            data: self.providerPay
          }).then(data => {
            if (data != undefined) {
              this.$router.push("/pay-direct");
            } else {
              if (self.providerPay.pay_type == 0) {
                self.providerPay.pay_type = "Naqt";
              } else {
                self.providerPay.pay_type = "Plastik";
              }
            }
          });
        } else if (self.$route.name == "pay-direct-update") {
          axios({
            method: "patch",
            url: `/pay-direct/update/` + self.providerPay.id,
            data: self.providerPay
          }).then(data => {
            if (data != undefined) {
              self.$router.push("/pay-direct");
            }
          });
        }
      } else {
        self.errors = self.$v.providerPay;
      }
      }
    },
    createProvider() {
      let self = this;
      this.$v.$touch();
      if (self.$v.provider.$error == false) {
        axios({
          method: "post",
          url: "/direct/create",
          data: self.provider
        }).then(data => {
          if (data != undefined) {
            self.providerPay.direct_id = data.data.data.id;
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
        url: "/direct/all"
      }).then(res => {
        if (res != undefined) {
          self.Directs = res.data.data;
        }
      });
    },
    getProviderPay() {
      let self = this;
      if (self.$route.name == "pay-direct-update" || self.$route.name == 'pay-direct-document') {
        axios({
          method: "get",
          url: `/pay-direct/one/` + self.$route.params.id
        }).then(res => {
          if (res != undefined) {
            if (res.data.data.type == 0) {
              res.data.data.type = "Naqt";
            } else {
              res.data.data.type = "Plastik";
            }
            self.providerPay = res.data.data;
            self.providerPay.datetime = String(res.data.data.datetime)
          }
        });
      }
    },
    PastavshikId(id) {
      let self = this;
      axios({
        method: "post",
        url: "/pay-direct/getDirect",
        data: {
          direct_id: id
        }
      }).then(res => {
        if (res != undefined) {
          self.providerPay.backlog = res.data.data;
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
        pay_type: "Naqt",
        direct_id: null,
        sum: 0,
        backlog: 0,
      };
      this.$router.go(-1);
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
    this.getPastavshik();
    this.getProviderPay();
    this.getFilial();
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
  box-shadow: 5px 8px 10px rgba(100, 100, 111, 0.2) ;
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
