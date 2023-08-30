<template>
  <b-container fluid id="tables">
    <b-row class="text-center d-flex justify-content-center mb-3">
      <b-col lg="3" xs="3" md="3" xl="3" class="my-3">
        <input class="form-control" type="date" v-model="datas.date1" />
      </b-col>
      <b-col lg="3" xs="3" md="3" xl="3" class="my-3">
        <input class="form-control" type="date" v-model="datas.date2" />
      </b-col>
      <b-col lg="4" xs="4" md="4" xl="4" class="my-3">
        <v-select
          :options="names"
          v-model="datas.direct_id"
          :reduce="options => options.id"
          label="name"
          placeholder="ходимни танланг..."
        />
      </b-col>
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
    <table
      class="table table-striped table-bordered"
      style="width: 1050px; margin: 0 auto;"
    >
      <thead>
        <tr class="text-center" style="height: 40px !important;">
          <th scope="col" style="width: 10% !important">№</th>
          <th style="width: 45%">Наме</th>
          <th style="width: 45%">тушум</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-center"
          v-for="(item, index) in results"
          :key="index"
          v-on:dblclick="Clicked(item.direct_id)"
        >
          <td style="width: 10% !important">{{ index + 1 }}</td>
          <td style="width: 230px">
            <span :class="{ red: item.end_total < 0 }">{{ item.place }}</span>
          </td>
          <td style="width: 150px">
            <span :class="{ red: item.end_total < 0 }">{{
              item.total_kirim | numFormat
            }}</span>
          </td>
        </tr>
        <tr class="text-center">
          <td
            class="width: 20px !important"
            style="width: 340px"
            id="jami"
            colspan="2"
          >
            Жами
          </td>
          <td style="width: 150px">
            <span :class="{ reds: jami_sum < 0 }">{{
              tushum | numFormat
            }}</span>
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
        direct_id: null
      },
      doctors: null,
      names: [],
      jami_sum: 0,
      tushum: null,
      doctor: "",
      doctorList: [],
      doctor_sverka: "",
      errors: "",
      results: [],
      index: 0
    };
  },
  created() {
    let self = this;
    if (localStorage.getItem("direct") != null) {
    }
    //  self.Send()
  },
  methods: {
    Clicked(id) {
      this.datas.direct_id = id;
      localStorage.setItem("MedDirect", JSON.stringify(this.datas));
      let route = this.$router.resolve({
        path: "/med/direct/sverka"
      });
      window.open(route.href, "_blank");
      // this.$router.push({ path: "direct_sverka" });
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
        direct_id: self.datas.direct_id
      };
      axios({
        method: "post",
        url: "/hisobot/med_hisobot",
        data: datas
      }).then(function(response) {
        if(response != undefined){
          self.results = response.data;
          self.tushum = 0;
          self.jami_sum = 0;
          self.results.forEach((key, value) => {
            self.tushum += parseFloat(key.total_kirim);
            self.jami_sum += key.total_kirim;
            // key.created_at = moment(new Date(key.created_at * 1000)).format(
            //   "YYYY.MM.DD-HH:mm:ss"
            // );
          });
        }
      });
    },
    getDoctor() {
      let self = this;
      axios({
        method: "get",
        url: "/med_direct/all"
      }).then(res => {
        if (res != undefined) {
          self.names = res.data.data;
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
table {
  margin: 0px 0px;
  width: 1050px;
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
#tables {
  min-height: 100vh;
  width: 99% !important;
}
.reds {
  color: red;
}
#bosh {
  width: 50px !important;
}
th {
  color: #195fb0;
  background-color: #f4f7fb;
}
</style>
