<template>
  <b-container fluid id="tables">
    <b-row class="d-flex text-center justify-content-around">
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
      <!-- <b-col lg="4" xs="4" md="4" xl="4" class="my-3">
        <v-select
          :options="names"
          v-model="datas.pastavchik_id"
          :reduce="options => options.id"
          label="name"
          placeholder="ходимни танланг..."
        />
      </b-col> -->
      <b-col lg="2" xs="2" md="2" xl="2" class="my-3">
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
      </b-col>
    </b-row>
    <table class="table table-bordered table-striped table-hover table-sm">
      <tr class="bg-dark text-white text-center">
        <th>#</th>
        <th style="width: 230px">Номи</th>
        <th>Бош. қолдиқ</th>
        <th>Кирим</th>
        <th>Чиқим</th>
        <th>Якуний қолдиқ</th>
      </tr>
      <tbody v-for="(item, index) in results" :key="index">
        <tr
          class="text-center"
          v-if="item.total_kirim != 0 || item.total_chiqim != 0"
          v-on:dblclick="Clicked(item)"
        >
          <td>{{ index + 1 }}</td>
          <td style="width: 230px">
            <span>
              {{ item.sori_name }}
            </span>
          </td>
          <td>
            <span v-if="item.total_chiqim == 0 && item.total_kirim == 0">
              {{ Math.abs(item.begin_total) | numFormat }}
            </span>
            <span v-else>0</span>
          </td>
          <td>
            <span>
              {{ item.total_kirim | numFormat }}
            </span>
          </td>
          <td>
            <span>
              {{ item.total_chiqim | numFormat }}
            </span>
          </td>
          <td>
            <span>
              {{ (item.total_kirim - item.total_chiqim) | numFormat }}
            </span>
          </td>
        </tr>
      </tbody>
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
        pastavchik_id: null
      },
      kassa: "",
      kassaList: [],
      doctor_name: "",
      results: [],
      names: [],
      paytype: [],
      paytypelist: []
    };
  },
  // created() {
  //   let self = this;
  //   if (localStorage.getItem("user") != null) {
  //     self.datas.date1 = localStorage.getItem("data1");
  //     self.datas.date2 = localStorage.getItem("data2");
  //     self.Send();
  //   } else {
  //     self.datas.date1 = localStorage.getItem("data1");
  //     self.datas.date2 = localStorage.getItem("data2");
  //     self.Send();
  //   }
  // },
  methods: {
    // Clicked(item) {
    //   this.datas.pastavchik_id = item.pastavchik_id;
    //   localStorage.setItem("provayder", JSON.stringify(this.datas));
    //   let route = this.$router.resolve({
    //     path: "/provayder/sverka"
    //   });
    //   window.open(route.href, "_blank");
    //   // this.$router.push({ path: "/provayder/sverka" });
    // },
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
          ) + 86399
      };
      axios({
        method: "post",
        url: "/sori/hisobot",
        headers: {
          "Content-Type": "application/json"
        },
        data: datas
      })
        .then(function(response) {
          if(response != undefined){
            self.results = response.data;
            for (let key in response.data) {
              response.data[key].date_time = moment(
                new Date(response.data[key].date_time * 1000)
              ).format("YYYY.MM.DD-HH:mm:ss");
            }
          }
        })
        .catch(function(error) {
          self.errors = error.message;
        });
    },
    getDoctor() {
      let self = this;
      axios({
        method: "get",
        url: "/pastavchik/all"
      }).then(res => {
        self.names = res.data.data;
      });
    }
  },
  mounted() {
    // this.getDoctor();
  }
};
</script>

<style scoped>
table {
  margin: 0px;
}
label,
td,
th,
tr {
  font-family: "Times New Roman", Times, serif;
  font-weight: bolder;
  text-transform: capitalize;
  font-size: 15px;
  height: 20px !important;
}
.ShifokrSverka {
  border-radius: 3px;
  background: #fff;
  border: 1px solid rgb(210, 210, 210);
}
.reds {
  color: red;
}
th {
  color: #195fb0;
  background-color: #f4f7fb;
}
#tables {
  width: 99% !important;
  height: 100vh !important;
}
/* .btn{
    width: 100%;
    height: 100%;
  } */
</style>
