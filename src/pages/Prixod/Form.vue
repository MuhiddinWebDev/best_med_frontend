<template>
  <div class="parent">
    <div class="kattaPrixod">
      <span>Приход</span>
      <b-button class="navbarBtnDanger" variant="danger" @click="Prev()">
        <b-icon icon="x-circle-fill"></b-icon>
      </b-button>
    </div>
    <div
      class="pastavshik"
      :class="{ Arxive: $route.name == 'Prixod Document' }"
    >
      <div style="width: 24%;">
        <label>Вақт</label>
        <date-picker
          style="width: 100%;"
          format="DD.MM.YYYY"
          v-model="prixod.date_time"
          value-type="X"
          type="date"
          :lang="lang"
        ></date-picker>
      </div>
      <div style="width: 24%; position: relative;">
        <label>Поставщик</label>
        <button
          class="tabsBtnss"
          variant="success"
          v-b-modal.OpenModalPastavshik
        >
          ...
        </button>
        <b-modal id="OpenModalPastavshik" hide-footer title="Поставщик Қўшиш">
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
          class="qidiruvselect"
          v-model="prixod.pastavchik_id"
          :options="Pastavshik"
          :reduce="option => option.id"
        />
      </div>
      <div style="width: 24%;">
        <label>Сумма</label>
        <vue-numeric
          style="width: 100%; height: 38px; background: #fff; border-radius: 4px; border: 1px solid #ced4da;"
          :disabled="true"
          separator="space"
          :precision="2"
          v-model="prixod.umumiy_summa"
        ></vue-numeric>
      </div>
      <div style="width: 24%;">
        <label>Изох</label>
        <b-input
          type="text"
          style="background: #fff; border: 1px solid #ced4da;"
          v-model="prixod.comment"
        ></b-input>
      </div>
    </div>
    <div
      class="pastavshiktable"
      :class="{ Arxive: $route.name == 'Prixod Document' }"
    >
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th>№</th>
            <th style="width: 300px;">Махсулот</th>
            <th>Нархи</th>
            <th>Сони</th>
            <th>Умумий сумма</th>
            <th style="width: 50px;">#</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in prixod.prixod_table" :key="index">
            <td>{{ index + 1 }}</td>
            <td style="position: relative;">
              <button
                class="tabsBtnsstd"
                variant="success"
                v-b-modal.OpenModalReagent
              >
                ...
              </button>
              <b-modal id="OpenModalReagent" hide-footer title="Махсулот Қўшиш">
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <span class="shirift">
                    Махсулот
                  </span>
                  <span style="color: red;">*</span>
                  <span v-if="errorReagent !== null">
                    <span
                      style="color: red; font-size: 9px"
                      v-if="!errorReagent.name.required"
                      >Махсулот тўлдирилиши керак</span
                    >
                    <!-- <span
                    style="color: red; font-size: 9px"
                    v-if="!errorsHarajat.name.minLength"
                    >Harajat kamida 4 ta belgi bo'lisi kerak</span
                  > -->
                  </span>
                  <b-input type="text" v-model="reagent.name" />
                </div>
                <div class="btnlar">
                  <b-button
                    class="modalBtn1"
                    size="sm"
                    style="height: 37px;"
                    variant="danger "
                    @click="cancelReagent()"
                  >
                    <b-icon icon="calendar2-x"></b-icon>
                    Бекор қилиш
                  </b-button>
                  <b-button
                    class="ml-2 modalBtn"
                    variant="success"
                    @click="createReagent(item)"
                  >
                    <b-icon icon="calendar2-plus"></b-icon>
                    Сақлаш
                  </b-button>
                </div>
              </b-modal>
              <v-select
                class="qidiruvselect"
                label="name"
                v-model="item.reagent_id"
                :options="Maxsulot"
                :reduce="option => option.id"
              />
            </td>
            <td>
              <vue-numeric
                style="width: 100%; height: 38px; border: 1px solid #ced4da; border-radius: 4px;"
                @change="Yigindi(item)"
                separator="space"
                :precision="2"
                v-model="item.price"
              ></vue-numeric>
            </td>
            <td>
              <b-input
                @change="Yigindi(item)"
                style="background: #fff; border: 1px solid #ced4da;"
                v-model="item.count"
                type="number"
              ></b-input>
            </td>
            <td>
              <vue-numeric
                style="width: 100%; height: 38px; border-radius: 4px; border: 1px solid #ced4da;"
                separator="space"
                :disabled="true"
                :precision="2"
                v-model="item.summa"
              ></vue-numeric>
            </td>
            <td>
              <b-button
                class="trash1"
                style=""
                variant="outline-danger"
                @click="daleteSubrow(item, index)"
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
      <b-button class="qoshish_Btn" variant="success" @click="add"
        ><b-icon icon="plus" font-scale="2" color="#fff"></b-icon
      ></b-button>
    </div>
    <div class="tugmalar">
      <div>
        <b-button
          @click="createPrixod()"
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
import { required, minLength } from "vuelidate/lib/validators";
import "vue2-datepicker/index.css";
export default {
  name: "reagent-form",
  components: {
    DatePicker
  },
  data() {
    return {
      prixod: {
        date_time: new Date()
          .valueOf()
          .toString()
          .slice(0, 10),
        umumiy_summa: 0,
        pastavchik_id: null,
        comment: "",
        prixod_table: [
          {
            reagent_id: null,
            price: 0,
            summa: 0,
            count: 0
          }
        ]
      },
      provider: {
        name: "",
        filial_id: JSON.parse(localStorage.getItem('filial_id'))
      },
      reagent: {
        name: ""
      },
      errors: null,
      errorPastavshik: null,
      errorReagent: null,
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      Pastavshik: [],
      Maxsulot: []
    };
  },
  validations: {
    prixod: {
      umumiy_summa: {
        required
      },
      pastavchik_id: {
        required
      }
    },
    provider: {
      name: {
        required,
        minLength: minLength(4)
      }
    },
    reagent: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    Prev() {
      if (this.$route.name != "Prixod Document") {
        const x = window.confirm("Ростдан ҳам ойнани тарк этмоқчимисиз?");
        if (x) {
          this.$router.push("/prixod");
        }
      } else {
        window.close();
      }
    },
    Yigindi(item) {
      item.summa = Number(item.count) * Number(item.price);
      this.prixod.umumiy_summa += Number(item.count) * Number(item.price);
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
    createPrixod() {
      let self = this;
      if (self.prixod.type == "Naqt") {
        self.prixod.type = 0;
      } else {
        self.prixod.type = 1;
      }
      this.$v.$touch();
      if (this.$v.prixod.$error == false) {
        if (self.$route.name == "Prixod Create") {
          axios({
            method: "post",
            url: "/prixod/create",
            data: self.prixod
          }).then(data => {
            if (data != undefined) {
              this.$router.push("/prixod");
            }
          });
        } else if (self.$route.name == "Prixod Update") {
          axios({
            method: "patch",
            url: `/prixod/update/` + self.prixod.id,
            data: self.prixod
          }).then(data => {
            if (data != undefined) {
              self.$router.push("/prixod");
            }
          });
        }
      } else {
        self.errors = self.$v.prixod;
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
            self.prixod.pastavchik_id = data.data.data.id;
            self.getPastavshik();
            self.$bvModal.hide("OpenModalPastavshik");
            self.provider.name = "";
          }
        });
      } else {
        self.errorPastavshik = self.$v.provider;
      }
    },
    createReagent(item) {
      let self = this;
      this.$v.$touch();
      if (this.$v.reagent.$error == false) {
        axios({
          method: "post",
          url: "/reagent/create",
          data: self.reagent
        }).then(data => {
          if (data != undefined) {
            // this.$router.push("/reagent");
            item.reagent_id = data.data.data.id;
            self.getMaxsulot();
            self.$bvModal.hide("OpenModalReagent");
            self.reagent.name = "";
          }
        });
      } else {
        self.errorReagent = self.$v.reagent;
      }
    },
    getPrixod() {
      let self = this;
      if (self.$route.name == "Prixod Update") {
        axios({
          method: "get",
          url: `/prixod/One/` + self.$route.params.id
        }).then(res => {
          if (res != undefined) {
            if (res.data.data.type == 0) {
              res.data.data.type = "Naqt";
            } else {
              res.data.data.type = "Plastik";
            }
            self.prixod = res.data.data;
          }
        });
      }
    },
    getMaxsulot() {
      let self = this;
      axios({
        method: "get",
        url: "/reagent/all"
      }).then(res => {
        if (res != undefined) {
          self.Maxsulot = res.data.data;
        }
      });
    },
    add() {
      this.prixod.prixod_table.push({
        reagent_id: null,
        price: 0,
        summa: 0,
        count: 0
      });
    },
    cancelPastavshik() {
      this.provider = {
        name: ""
      };
    },
    cancelReagent() {
      this.reagent = {
        name: ""
      };
    },
    cancel() {
      this.prixod.umumiy_summa = 0;
      this.prixod.pastavchik_id = null;
      this.prixod.comment = "";
      this.prixod.prixod_table = [
        {
          reagent_id: null,
          price: 0,
          summa: 0,
          count: 0
        }
      ];
      // this.prixod = {
      //   umumiy_summa: 0,
      //   pastavchik_id: null,
      //   comment: "",
      //   prixod_table: [
      //     {
      //       reagent_id: null,
      //       price: 0,
      //       summa: 0,
      //       count: 0
      //     }
      //   ]
      // };
    },
    daleteSubrow(item, index) {
      this.prixod.umumiy_summa -= Number(item.count) * Number(item.price);
      this.prixod.prixod_table.splice(index, 1);
    }
  },
  mounted() {
    this.getPrixod();
    this.getPastavshik();
    this.getMaxsulot();
  }
};
</script>
<style>
.kattaPrixod {
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
  /* background: #007bff; */
  /* margin-top: -25px; */
  /* margin-left: 10px;
  margin-right: 10px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 700;
  line-height: 40px;
  border-radius: 8px;
  color: #3f51b5;
  text-indent: 15px; */
  /* box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.5); */
}
.btnlar {
  justify-content: right;
  display: flex;
  margin-top: 20px;
}
.pastavshiktable {
  width: 99%;
  margin: 0 auto;
  background: #fff;
  overflow: auto;
  height: calc(100vh - 280px);
}
.tabsBtnss {
  position: absolute;
  z-index: 99;
  top: 44px;
  left: calc(100% - 70px);
  color: #b1b1b1;
  font-weight: 700;
  font-size: 17px;
  border: none;
  background-color: white;
}
.tabsBtnsstd {
  position: absolute;
  z-index: 99;
  top: 14px;
  left: calc(100% - 70px);
  color: #b1b1b1;
  font-weight: 700;
  font-size: 17px;
  border: none;
  background-color: white;
}
.qidiruvselect .vs__dropdown-toggle {
  height: 38px;
  background: #fff;
}
.parent {
  background: #d3e4e7;
  height: 100vh;
  box-sizing: border-box;
}
.navbarBtnDanger {
  border: 1px solid #fff;
  box-shadow: 5px 8px 10px rgba(176, 25, 25, 0.3);
  background: #e80a18;
  border-radius: 8px;
}
.qoshish_Btn {
  position: absolute;
  right: 60px;
  bottom: 100px;
  /* left: 990px; */
  background: #195fb0;
  margin-top: 5px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #195fb0;
  box-shadow: 5px 8px 16px rgba(25, 95, 176, 0.5);
}
.shirift {
  font-size: 16px;
  font-weight: 400;
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
.pastavshik {
  margin: 20px auto 0;
  /* padding: 5px; */
  border-radius: 7px;
  background: #00009d;
  margin-bottom: 20px;
  padding: 7px 5px;
  /* background: #fff; */
  border: 1px solid #fff;
  width: 99%;
  display: flex;
  justify-content: space-between;
}
.pastavshik label {
  color: #ffff;
  font-size: 18px;
  font-weight: 600;
}
.Arxive {
  pointer-events: none;
}
.pastavshiktable th {
  background: #2a2aa8 !important;
  color: #fff;
}
.tugmalar {
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
  justify-content: right;
}
.calendar1 {
  box-shadow: 5px 8px 10px rgba(176, 25, 25, 0.5);
}
.calendar {
  box-shadow: 5px 8px 10px rgba(25, 176, 48, 0.5);
}
</style>
