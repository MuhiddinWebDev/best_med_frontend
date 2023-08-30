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
      <table class="table  table-bordered table-sm table-striped">
        <tr
          class="bg-dark text-white"
          style="position: sticky; top: 1px; z-index: 1; background: #fff;"
        >
          <th>№</th>
          <th>Номи</th>
          <th>Вақт</th>
          <th>Изоҳ</th>
          <th>Кирим</th>
          <th colspan="2">Чиқим</th>
        </tr>
        <tr>
          <td colspan="4">
            Бошланғич қолдиқ:
          </td>
          <td colspan="2">
            <span
              :class="{ red: parseInt(result.begin) <= 0 }"
              >{{
                (result.begin) | numFormat
              }}
            </span>
          </td>
        </tr>
        <tr
          v-for="(item, index) in results"
          :key="index"
          v-on:dblclick="Router(item)"
        >
          <td>
            {{ index + 1 }}
          </td>
          <td colspan="2">
            <span style="margin-right: 320px">
              № {{ item.doc_id }} - {{ item.place }}- {{ item.doc_type }}
            </span>
            {{ item.date_time }}
          </td>
          <td>
            {{ item.comment }}
          </td>
          <td>
            <span>
              {{ item.kirim | numFormat }}
            </span>
          </td>
          <td colspan="2">
            <span>
              {{ item.chiqim | numFormat }}
            </span>
          </td>
        </tr>
        <tr
          style="position: sticky; bottom: 34px; z-index: 1; background: #fff;"
        >
          <td colspan="4">Жами</td>
          <td>
            {{ result.kirim_cash | numFormat}} 
          </td>
          <td>
            {{ result.chiqim_cash | numFormat }}
          </td>
        </tr>
        <tr
          style="position: sticky; bottom: 1px; z-index: 1; background: #fff;"
        >
          <td colspan="4">
            Якуний қолдиқ
          </td>
          <td colspan="2">
            {{ result.end | numFormat }}
          </td>
        </tr>
      </table>
    </div>
  </b-container>
</template>

<script>
import moment from "moment";
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
      result: {},
      names: [],
      end_sum: 0,
      beg_sum: 0,
      jam_sum: 0,
      jami: 0,
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
      self.datas.doctor_id = JSON.parse(
        localStorage.getItem("datas")
      ).doctor_id;
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
        url: "hisobot/doctor_sverka",
        data: datas
      }).then(function(res) {
        if(res != undefined){
          self.results = res.data;
          if (res.data.length != 0) {
            // for (let key of res.data) {
            if (
              self.localUser.role == "Admin" ||
              self.localUser.role == "Dasturchi" ||
              self.localUser.role == "Kasser" ||
              self.localUser.role == "Shifokor"
            ) {
              self.results = res.data;
            }
            // }
          } else {
            self.results = [];
          }
          self.result = { kirim_cash: 0, chiqim_cash: 0, begin: 0, end: 0 };
          self.results.forEach(function(key, value) {
            key.date_time = moment(new Date(key.date_time * 1000)).format(
              "YYYY.MM.DD HH:mm:ss"
            );
            self.result.begin += key.begin_total;
            self.result.end += key.end_total;
            if (key.kirim) {
              self.result.kirim_cash += parseInt(key.kirim);
            } else if (key.chiqim != undefined) {
              self.result.chiqim_cash += parseInt(key.chiqim);
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
          } else {
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
/* .tablesD {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 395px;
  width: 100%;
} */
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
