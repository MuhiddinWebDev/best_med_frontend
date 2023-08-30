<template>
  <b-container fluid class="tables1">
    <b-row class="text-center d-flex justify-content-center mb-3">
      <b-col lg="3" xs="3" md="3" xl="3" class="my-3 datepicker-toggle">
        <span class="datepicker-toggle-button">
          <input
            class="form-control ShifokrSverka"
            type="date"
            v-model="datas.date1"
            placeholder="boshlanish vaqti"
          />
          <!-- <date-picker
            v-model="datas.date1"
            format="DD.MM.YYYY"
            value-type="X"
            type="date"
            :lang="lang"
          ></date-picker> -->
        </span>
      </b-col>
      <b-col lg="3" xs="3" md="3" xl="3" class="my-3">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date2"
          placeholder="tugash vaqti"
        />
      </b-col>
      <b-col lg="4" xs="4" md="4" xl="4" class="my-3">
        <b-input v-if="localUser.role == 'Shifokor'" v-model="doctors" disabled>
        </b-input>
        <v-select
          :options="names"
          class="hisobotselect"
          v-model="datas.doctor_id"
          :reduce="option => option.id"
          label="name"
          placeholder="Шифокорни танланг..."
          v-else
        />
      </b-col>
      <b-col lg="2" xs="2" md="2" xl="2" class="my-3">
        <button
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
      </b-col>
    </b-row>
    <table class="table tablee table-sm">
      <tbody>
        <tr
          class="text-center tbody"
          style="height: 40px !important; line-height: 40px"
        >
          <th style="width: 50px !important">№</th>
          <th style="width: 230px">Номи</th>
          <th style="width: 150px">Бош қолдиқ</th>
          <th style="width: 150px">Кирим</th>
          <th style="width: 150px">Чиқим</th>
          <th style="width: 150px">Якуний қолдиқ</th>
        </tr>
      </tbody>
    </table>
    <table
      class="table table-bordered tablee table-striped table-sm table-hover"
    >
      <tbody v-for="(item, index) in results" :key="index">
        <tr class="text-center" v-on:dblclick="Clicked(item)">
          <td scope="row" style="width: 50px !important">{{ index + 1 }}</td>
          <td style="width: 230px">
            <span
              :class="{ red: item.end_total < 0 }"
              v-if="datas.date1 < datas.date2"
              >{{ item["doctor.name"] }}</span
            >
            <span v-else>{{ item["doctor.name"] }}</span>
          </td>
          <td style="width: 150px">
            <span
              :class="{ red: item.end_total < 0 }"
              >{{ (item.begin_total) | numFormat }}</span
            >
          </td>
          <td style="width: 150px">
            <span
              :class="{ red: item.end_total < 0 }"
              >{{ item.total_kirim | numFormat }}</span
            >
          </td>
          <td style="width: 150px">
            <span
              :class="{ red: item.end_total < 0 }"
              >{{ item.total_chiqim | numFormat }}</span
            >
          </td>
          <td style="width: 150px;">
            <span :class="{ reds: item.end_total < 0 }">{{
              (item.end_total) | numFormat
            }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <table
      class="table table-bordered  table-striped table-hover table-sm"
      id="table"
    >
      <tbody>
        <tr class="text-center">
          <td class="width: 20px !important" style="width: 280px" id="jami">
            Жами
          </td>
          <td style="width: 150px">
            <span
              :class="{ red: bosh_summ < 0 }"
              >{{ bosh_summ | numFormat }}</span
            >
          </td>
          <td style="width: 150px">
            <span
              :class="{ red: kirim_summ < 0 }"
              >{{ kirim_summ | numFormat }}</span
            >
          </td>
          <td style="width: 150px">
            <span
              :class="{ red: chiqim_summ < 0 }"
              >{{ chiqim_summ | numFormat }}</span
            >
          </td>
          <td style="width: 150px">
            <span :class="{ red: summ < 0 }">{{ summ | numFormat }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>
// import DatePicker from "vue2-datepicker"
import "vue2-datepicker/index.css";
import moment from "moment";
export default {
  components: {
    // DatePicker
  },
  data() {
    return {
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      datas: {
        date1: new Date().toISOString().slice(0, 8) + "01",
        date2: new Date().toISOString().slice(0, 10),
        doctor_id: null
      },
      localUser: JSON.parse(localStorage.getItem("user")),
      doctors: null,
      summ: 0,
      names: [],
      bosh_summ: 0,
      kirim_summ: 0,
      chiqim_summ: 0,
      doctor: "",
      doctorList: [],
      doctor_sverka: "",
      errors: "",
      results: [],
      index: 0
    };
  },
  filters: {
    moment: function(date) {
      if (date != null) {
        return moment.unix(date).format("DD.MM.YYYY");
      } else {
        return "";
      }
    }
  },
  created() {
    let self = this;
    if (self.localUser.role == "Shifokor") {
      if (this.localUser != null) {
        self.datas.doctor_id = self.localUser.doctor.id;
        self.doctors = self.localUser.doctor.name;
        self.Send();
      }
    }
  },
  methods: {
    Clicked(item) {
      this.datas.doctor_id = item["doctor.id"];
      localStorage.setItem("datas", JSON.stringify(this.datas));
      localStorage.setItem("doctor", JSON.stringify(item["doctor.id"]));
      // this.$router.push({ path: "doctor_sverka" });
      let route = this.$router.resolve({
        path: "doctor_sverka"
      });
      window.open(route.href, "_blank");
    },
    Send() {
      let self = this;
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
        url: "hisobot/doctor_hisobot",
        data: datas
      }).then(function(response) {
        if(response != undefined){
          self.results = response.data;
          self.summ = 0;
          self.bosh_summ = 0;
          self.kirim_summ = 0;
          self.chiqim_summ = 0;
          self.results.forEach((key, value) => {
            self.bosh_summ += parseFloat(key.begin_total);
            self.kirim_summ += parseFloat(key.total_kirim);
            self.chiqim_summ += parseFloat(key.total_chiqim);
            self.summ += parseFloat(key.end_total);
            key.date_time = moment(new Date(key.date_time * 1000)).format(
              "YYYY.MM.DD-HH:mm:ss"
            );
          });
        }
      });
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
            self.localUser.doctor.id == key.id
          ) {
            self.names.push(key);
          } else if (
            self.localUser.role == "Admin" ||
            self.localUser.role == "Dasturchi" ||
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
.hisobotselect .vs__selected-options span:first-child {
  width: 90% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
table {
  margin: 0px 0px;
  border: none;
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
}
.ShifokrSverka {
  border-radius: 3px;
  background: #fff;
  border: 1px solid rgb(210, 210, 210);
}
.tables1 {
  min-height: 100vh;
  width: calc(100% - 10px) !important;
}
.btns {
  background: #f4f7fb;
  width: 100%;
  height: 100%;
}
.btns:hover {
  background: #c5eaff;
}
.reds {
  color: red;
}
th {
  color: #195fb0;
  background-color: #f4f7fb;
}
.tbody {
  border-radius: 10px !important;
}
.tablee tbody tr th {
  border: 1px solid rgb(209, 208, 208);
}
</style>
