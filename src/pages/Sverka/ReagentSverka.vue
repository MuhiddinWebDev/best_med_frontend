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
          v-model="datas.reagent_id"
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
          <th>сумма</th>
          <th>Кирим</th>
          <th colspan="2">Чиқим</th>
        </tr>
        <tr>
          <td colspan="4">
            Бошланғич қолдиқ:
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
              № {{ item.doc_id }} - {{ item.reagent.name }}- {{ item.doc_type }}
            </span>
            {{ item.date_time }}
          </td>
          <!-- <td>{{ item.reagent_department }} {{ }}</td> -->
          <td>
            {{ item.price }}
          </td>
          <td>
            <span v-if="item.total_kirim && datas.date1 <= datas.date2">
              {{ item.total_kirim | numFormat }}
            </span>
            <span v-else>{{ 0 | numFormat }}</span>
          </td>
          <td colspan="2">
            <span v-if="item.total_chiqim && datas.date1 <= datas.date2">
              {{ item.total_chiqim | numFormat }}
            </span>
            <span v-else>{{ 0 | numFormat }}</span>
          </td>
        </tr>
        <tr
          style="position: sticky; bottom: 34px; z-index: 1; background: #fff;"
        >
          <td colspan="4">Жами</td>
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
        </tr>
        <tr
          style="position: sticky; bottom: 1px; z-index: 1; background: #fff;"
        >
          <td colspan="4">
            Якуний қолдиқ
          </td>
          <td colspan="2">
            <span :class="{ reds: jam_sum < 0 }" v-if="!results.summ">{{
              beg_sum | numFormat
            }}</span>
            <span :class="{ reds: jam_sum < 0 }" v-else-if="results.summ">{{
              (results.summ.kirim_cash - results.summ.chiqim_cash) | numFormat
            }}</span>
          </td>
        </tr>
      </table>
    </div>
    <table>
      <tr v-for="(item, index) in department" :key="index">
        <td>{{ item }}</td>
      </tr>
    </table>
  </b-container>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      datas: {
        date1: new Date().toISOString().slice(0, 8) + "01",
        date2: new Date().toISOString().slice(0, 10),
        reagent_id: null
      },
      doctor: "",
      doctorList: [],
      results: [],
      names: [],
      end_sum: 0,
      beg_sum: 0,
      jam_sum: 0,
      jami: 0,
      localUser: JSON.parse(localStorage.getItem("user")),
      department: []
      // select: ""
    };
  },
  created() {
    let self = this;
    if (JSON.parse(localStorage.getItem("Reagent")) == null) {
      self.datas.date1 = new Date().toISOString().slice(0, 10);
      self.datas.date2 = new Date().toISOString().slice(0, 10);
    } else {
      self.datas.date1 = JSON.parse(localStorage.getItem("Reagent")).date1;
      self.datas.date2 = JSON.parse(localStorage.getItem("Reagent")).date2;
      self.datas.pastavchik_id = JSON.parse(
        localStorage.getItem("Reagent")
      ).pastavchik_id;
      self.Send();
      localStorage.removeItem("Reagent");
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
        reagent_id: self.datas.reagent_id
      };
      axios({
        method: "post",
        url: "/hisobot/reagent_sverka",
        data: datas
      }).then(function(res) {
        if(res != undefined){
          self.results = res.data;
          self.results.summ = { kirim_cash: 0, chiqim_cash: 0 };
          self.results.forEach(function(key, value) {
            key.date_time = moment(new Date(key.date_time * 1000)).format(
              "YYYY.MM.DD HH:mm:ss"
            );
          });
          // self.results.forEach(function(key, value) {
          //   key.date_time = moment(new Date(key.date_time * 1000)).format(
          //     "YYYY.MM.DD-HH:mm:ss"
          //   );
          //   let {reagent_department} = key;
          //   self.department.push(reagent_department)
          //   if (key.total_kirim) {
          //     self.results.summ.kirim_cash += parseInt(key.total_kirim);
          //   } else if (key.total_chiqim != undefined) {
          //     self.results.summ.chiqim_cash += parseInt(key.total_chiqim);
          //   }
          // });
        }
      });
    },
    Router(item) {
      if (item) {
        let route = this.$router.resolve({
          path: "/prixod/document/" + item.doc_id
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
        url: "/reagent/all"
      }).then(res => {
        self.names = res.data.data;
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
