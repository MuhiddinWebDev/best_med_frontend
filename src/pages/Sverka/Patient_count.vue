<template>
  <b-container fluid id="tables">
    <b-row class="d-flex justify-content-center text-center">
      <b-col lg="3" xs="3" md="3" xl="3" class="my-3">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date1"
        />
      </b-col>
      <b-col lg="3" xs="3" md="3" xl="3" class="my-3">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date2"
        />
      </b-col>
      <b-col lg="3" xs="4" md="4" xl="4" class="my-3">
        <!-- {{names}} -->
        <b-input v-if="localUser.role == 'Shifokor'" v-model="doctor" disabled>
        </b-input>
        <v-select
          :options="names"
          v-model="datas.doctor_id"
          :reduce="option => option.id"
          label="name"
          placeholder="Шифокорни танланг..."
          v-else
        />
      </b-col>
      <b-col xs="2" md="2" xl="2" class="my-3">
        <button
          type="button"
          class="btn text-white"
          style="background: #195FB0; width: 130px; font-size: 14px"
          @click="Send()"
        >
          <img
            src="../../../public/Vector.png"
            alt=""
            style="margin-right: 5px"
          />
          Кўриш
        </button>
        <b-button
          class="navbarBtnDanger ml-3"
          variant="danger"
          @click="cancel()"
        >
          <b-icon icon="x-circle-fill"></b-icon>
        </b-button>
      </b-col>
      <!-- <b-col>
          
        </b-col> -->
    </b-row>
    <div class="tablesD">
      <table class="table table-bordered table-sm table-striped">
        <tr
          class="bg-dark text-white"
          style="position: sticky; top: 1px; z-index: 1; background: #fff;"
        >
          <th>№</th>
          <th>Номи</th>
          <th>Вақт</th>
          <th>Сони</th>
        </tr>
        <!-- <tr>
            <td colspan="4">
              Boshlang'ich qoldiq:
            </td>
            <td colspan="2">
              <span
                :class="{ red: parseInt(results.begin_total) <= 0 }"
                v-if="datas.date1 > datas.date2"
                >{{
                  (results.summ.kirim_cash - results.summ.chiqim_cash) | numFormat
                }}
              </span>
              <span v-else>{{ 0 | numFormat }}</span>
            </td>
          </tr> -->
        <tr
          v-for="(item, index) in results"
          :key="index"
          class="dropdowntr"
          @click="Dropdown(item)"
          v-b-modal.modal-lg
        >
          <td>
            {{ index + 1 }}
          </td>
          <td colspan="2">
            <span style="margin-right: 320px">
              {{ item.place }}- {{ item.doc_type }}
            </span>
            {{ item.date_time }}
          </td>
          <td>
            {{ item.count }}
          </td>
          <b-modal id="modal-lg" size="lg" title="Кўриклар рўйхати" hide-footer>
            <b-table
              id="bemor-table"
              ref="refBemorTable"
              hover
              sort-icon-left
              striped
              primary-key="id"
              :items="doctorList"
              :fields="fields"
              @row-clicked="Router"
              stacked="md"
              show-empty
              small
            >
              <template #cell(№)="data">
                {{ data.index + 1 }}
              </template>
            </b-table>
            <b-collapse :id="'collapse' + index" class="mt-2 colleps">
              <b-card style="background: #195FB0;">
                <table
                  class="table  table-bordered table-sm table-striped"
                  style="background: #fff;"
                >
                  <tr
                    @click="Router(itemn)"
                    v-for="(itemn, index) in doctorList"
                    :key="index"
                  >
                    <td>{{ itemn.doc_id }}</td>
                    <td>{{ itemn.place }}</td>
                    <td>{{ itemn.price | numFormat }} so'm</td>
                  </tr>
                </table>

                <!-- <b-collapse class="mt-2" > -->
                <!-- <b-card>{{ itemn.place }}</b-card> -->
                <!-- </b-collapse> -->
              </b-card>
            </b-collapse>
          </b-modal>

          <!-- <ul v-if="Show" class="dropdown">
            <li
              style="height: 30px;"
              v-for="(itemn, index) in doctorList"
              :key="index"
              @click="Router(itemn)"
            >
              <span class="docId">{{ itemn.doc_id }}</span>
              <span class="place">{{ itemn.place }}</span>
              <span class="price">{{ itemn.price }}so'm</span>
            </li>
          </ul> -->
        </tr>
        <!-- <tr
            style="position: sticky; bottom: 34px; z-index: 1; background: #fff;"
          >
            <td colspan="4">Jami</td>
            <td>
              <span v-if="results.summ && datas.date1 <= datas.date2">{{
                results.summ.kirim_cash | numFormat
              }}</span>
            </td>
            <td>
              <span v-if="results.summ && datas.date1 <= datas.date2">{{
                results.summ.chiqim_cash | numFormat
              }}</span>
            </td>
          </tr> -->
        <tr
          style="position: sticky; bottom: 1px; z-index: 1; background: #fff;"
        >
          <td colspan="3">
            Сони
          </td>
          <td>{{ jami }}</td>
          <!-- <td colspan="2">
              <span :class="{ reds: jam_sum < 0 }" v-if="!results.summ">{{
                beg_sum | numFormat
              }}</span>
              <span :class="{ reds: jam_sum < 0 }" v-else-if="results.summ">{{
                (results.summ.kirim_cash - results.summ.chiqim_cash) | numFormat
              }}</span>
            </td> -->
        </tr>
      </table>
    </div>
  </b-container>
</template>

<script>
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      datas: {
        date1: null,
        date2: null,
        doctor_id: null
      },
      doctor: "",
      doctorList: [],
      results: [],
      names: [],
      fields: [
        "№",
        { key: "doc_id", label: "Дакумент ид си" },
        { key: "place", label: "Дакумент" },
        {
          key: "price",
          label: "Сумма",
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat("ru-RU", {
              minimumFractionDigits: 2
            });
            return formatter.format(value);
          }
        }
      ],
      end_sum: 0,
      beg_sum: 0,
      jam_sum: 0,
      jami: 0,
      Show: false,
      localUser: JSON.parse(localStorage.getItem("user"))
      // select: ""
    };
  },
  created() {
    let self = this;
    if (JSON.parse(localStorage.getItem("datas")) == null) {
      self.datas.date1 = new Date().toISOString().slice(0, 10);
      self.datas.date2 = new Date().toISOString().slice(0, 10);
    } else {
      self.datas.date1 = JSON.parse(localStorage.getItem("datas")).date1;
      self.datas.date2 = JSON.parse(localStorage.getItem("datas")).date2;
      self.Send();
      localStorage.removeItem("datas");
    }
    if (self.localUser.role == "Shifokor") {
      if (localStorage.getItem("user") != null) {
        self.datas.doctor_id = self.localUser.doctor.id;
        self.doctor = self.localUser.doctor.name;
      }
      // self.Send();
    } else {
      if (localStorage.getItem("doctor") != null) {
        self.datas.doctor_id = parseInt(localStorage.getItem("doctor"));
        // self.Send();
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (localStorage.getItem("doctor") != null) {
    }
    next();
  },
  methods: {
    Dropdown(item) {
      axios({
        method: "post",
        url: "/register_doctor/doctorAll",
        data: {
          doctor_id: item.doctor_id
        }
      }).then(res => {
        this.doctorList = res.data;
      });
    },
    Send() {
      let self = this;
      self.end_sum = 0;
      self.beg_sum = 0;
      // self.jami = 0;
      var datas = {
        datetime1: parseInt(
          new Date(self.datas.date1)
            .valueOf()
            .toString()
            .slice(0, 10)
        ),
        datetime2:
          parseInt(
            new Date(self.datas.date2)
              .valueOf()
              .toString()
              .slice(0, 10)
          ) + 86399,
        doctor_id: self.datas.doctor_id
      };
      axios({
        method: "post",
        url: "register_doctor/DoctorCount",
        data: datas
      }).then(function(res) {
        if(res != undefined){
          self.jami = 0;
          self.results = res.data;
          if (res.data.length != 0) {
            if (
              self.localUser.role == "Shifokor" ||
              self.localUser.role == "Admin" ||
              self.localUser.role == "Dasturchi" ||
              self.localUser.role == "Kasser"
            ) {
              self.results = res.data;
            }
          } else {
            self.results = [];
          }
          self.results.summ = { kirim_cash: 0, chiqim_cash: 0 };
          self.results.forEach(function(key, value) {
            self.jami += key.count;
            key.date_time = moment(new Date(key.date_time * 1000)).format(
              "YYYY.MM.DD HH:mm:ss"
            );
            if (key.kirim) {
              self.results.summ.kirim_cash += parseInt(key.kirim);
            } else if (key.chiqim != undefined) {
              self.results.summ.chiqim_cash += parseInt(key.chiqim);
            }
          });
        }
      });
    },
    Router(item) {
      if (item.doc_type === "kirim" && this.datas.date1 <= this.datas.date2) {
        axios({
          method: "get",
          url: "/registration/one/" + item.doc_id
        }).then(res => {
          let route = this.$router.resolve({
            path: `${res != undefined ? '/user-update/':'/arxivone/'}` + item.doc_id
          });
          window.open(route.href, "_blank");
        })
      } else if (this.datas.date1 <= this.datas.date2) {
        let route = this.$router.resolve({
          path: "oplataDoc/" + item.doc_id
        });
        window.open(route.href, "_blank");
      }
    },
    cancel() {
      window.close();
    },
    getDoctor() {
      let self = this;
      axios({
        method: "get",
        url: "/doctor/all"
      }).then(res => {
        for (let key of res.data) {
          if (
            self.localUser.role == "Shifokor" &&
            self.localUser.doctor.id === key.id
          ) {
            self.names.push(key);
          } else if (
            self.localUser.role == "Admin" ||
            self.localUser.role == "Kasser"
          ) {
            self.names = res.data;
          }
        }
      });
    }
  },
  mounted() {
    this.getDoctor();
  }
};
</script>

<style scoped>
.table {
  margin: 0px 0px !important;
}
.dropdowntr {
  position: relative !important;
}
/* .tablesD {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 395px;
    width: 100%;
  } */
.docId,
.price,
.place {
  display: inline-block;
  width: 300px;
}
.colleps {
  position: absolute !important;
  top: 22px;
  left: 0px;
  z-index: 7;
  width: 100%;
}
.colleps .card-body {
  padding: 2px !important;
}
.dropdown {
  position: absolute;
  left: 0px;
  top: 30px;
  background: #e4e4e4;
  list-style: none;
  z-index: 2;
  width: 100%;
}
.dropdown li {
  /* border: 1px solid black; */
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  padding: 3px;
}
.dropdown li:nth-child(1) {
  border-top: 1px solid black;
}
label,
td,
th,
tr {
  font-family: "Times New Roman", Times, serif;
  font-weight: bolder;
  text-transform: capitalize;
  font-size: 15px;
  height: 30px !important;
  text-align: center;
}
.ShifokrSverka {
  border-radius: 3px;
  background: #fff;
  border: 1px solid rgb(210, 210, 210);
}
.navbarBtnDanger {
  border: 1px solid #fff;
  /* box-shadow: 5px 8px 10px rgba(176, 25, 25, 0.3); */
  background: #e80a18;
  border-radius: 8px;
}
.reds {
  color: red;
}
#tables {
  height: 100vh !important;
  width: 99% !important;
}
th {
  color: #195fb0;
  background-color: #f4f7fb;
}
</style>
