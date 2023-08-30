<template>
  <b-container fluid id="table">
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
      <b-col lg="4" xs="4" md="4" xl="4" class="my-3">
        <!-- {{results.summ}} -->
        <v-select
          :options="names"
          v-model="datas.direct_id"
          :reduce="name => name.id"
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
        <b-button
          class="navbarBtnDanger ml-3"
          variant="danger"
          @click="cancel()"
        >
          <b-icon icon="x-circle-fill"></b-icon>
        </b-button>
      </b-col>
    </b-row>
    <div>
      <table class="table table-bordered table-sm table-striped">
        <tr class="bg-dark text-white">
          <th>№</th>
          <th>Номи</th>
          <th>Вақт</th>
          <th>сумма</th>
        </tr>
        <tr
          v-for="(item, index) in results"
          :key="index"
          v-on:dblclick="Clicked(item)"
        >
          <td>
            {{ index + 1 }}
          </td>
          <td colspan="2">
            <span style="margin-right: 400px">
              № {{ item.doc_type }} {{ item.place }}</span
            >
            {{ item.date_time }}
          </td>
          <td>
            {{ item.total_kirim | numFormat }}
          </td>
        </tr>
        <tr>
          <td colspan="3">
            Якуний қолдиқ
          </td>
          <td colspan="2">
            <span :class="{ reds: jam_sum < 0 }">{{
              beg_sum | numFormat
            }}</span>
            <!-- <span :class="{ reds: jam_sum < 0 }" v-else-if="results.summ">{{
                (results.summ.kirim_cash + results.summ.chiqim_cash) | numFormat
              }}</span> -->
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
        date1: new Date().toISOString().slice(0, 8) + "01",
        date2: new Date().toISOString().slice(0, 10),
        direct_id: null
      },
      doctor: "",
      doctorList: [],
      results: [],
      names: [],
      end_sum: null,
      beg_sum: null,
      jam_sum: null,
      jami: null
      // select: ""
    };
  },
  created() {
    let self = this;
    if (localStorage.getItem("MedDirect") != null) {
      self.datas.date1 = JSON.parse(localStorage.getItem("MedDirect")).date1;
      self.datas.date2 = JSON.parse(localStorage.getItem("MedDirect")).date2;
      self.datas.direct_id = JSON.parse(
        localStorage.getItem("MedDirect")
      ).direct_id;
      self.Send();
    } else {
      elf.datas.date1 = new Date().toISOString().slice(0, 10);
      self.datas.date2 = new Date().toISOString().slice(0, 10);
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   if (localStorage.getItem("doctor") != null) {
  //     localStorage.removeItem("doctor");
  //     localStorage.removeItem("date1");
  //     localStorage.removeItem("date2");
  //   }
  //   next();
  // },
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
        direct_id: self.datas.direct_id
      };
      axios({
        method: "post",
        url: "/hisobot/med_sverka",
        data: datas
      }).then(function(res) {
        if(res != undefined){
          self.results = res.data;
          self.results.forEach(value => {
            value.date_time = moment(new Date(value.date_time * 1000)).format(
              "YYYY.MM.DD HH:mm:ss"
            );
            self.beg_sum += value.total_kirim;
          });
        }
      });
    },
    Clicked(item) {
      axios({
          method: "get",
          url: "/registration/one/" + item.doc_id
        }).then(res => {
          let route = this.$router.resolve({
            path: `${res != undefined ? '/user-update/':'/arxivone/'}` + item.doc_id
          });
          window.open(route.href, "_blank");
        })
      window.open(route.href, "_blank");
      // this.$router.push({ path: "/arxivone/" + item.id });
    },
    getDoctor() {
      let self = this;
      axios({
        method: "get",
        url: "/med_direct/all"
      }).then(res => {
        self.names = res.data.data;
      });
    },
    cancel() {
      window.close();
    }
  },
  mounted() {
    this.getDoctor();
  }
};
</script>

<style scoped>
#table {
  height: 100vh;
  width: 99% !important;
}
.table {
  margin: 0px 0px !important;
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
.navbarBtnDanger {
  border: 1px solid #fff;
  /* box-shadow: 5px 8px 10px rgba(176, 25, 25, 0.3); */
  background: #e80a18;
  border-radius: 8px;
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
</style>
