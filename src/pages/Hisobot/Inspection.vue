<template>
  <b-container fluid id="tables">
    <div class="header-title">
      <h4>Текширув ҳисоботи</h4>
    </div>
    <b-row class="text-center d-flex ">
      <div class="search-header">
        <div class="search-header_item">
          <input
            class="form-control ShifokrSverka"
            type="date"
            v-model="datas.date1"
          />
        </div>
        <div class="search-header_item">
          <input
            class="form-control ShifokrSverka"
            type="date"
            v-model="datas.date2"
          />
        </div>
        <div class="search-header_item">
          <v-select
            :options="filials"
            style="width: 100%;"
            :style="{ border: branchValid ? '1px solid red':'none'}"
            v-model="datas.filial_id"
            :reduce="option => option.id"
            label="name"
            placeholder="Филиал танланг..."
            @input="updateBranch"
          />
        </div>
        <div class="search-header_item">
          <b-input v-if="localUser.role == 'Loborant'" v-model="doctors" disabled>
          </b-input>
          <v-select
            :options="names"
            style="width: 100%;"
            v-model="datas.inspection_category"
            :reduce="option => option.id"
            label="name"
            placeholder="Булимни танланг..."
            v-else
          />
        </div>
        <div class="search-header_item">
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
        </div>
      </div>
    </b-row>
    <table class="table table-bordered tablee table-dark table-sm">
      <tbody>
        <tr class="text-center" style="height: 40px !important">
          <th style="width: 50px !important">№</th>
          <th style="width: 230px">Номи</th>
          <th style="width: 60px !important">Сони</th>
          <th style="width: 150px">Тушум</th>
        </tr>
      </tbody>
    </table>
    <table
      class="table table-bordered tablee table-striped table-sm table-hover"
    >
      <tbody v-for="(item, index) in results" :key="index">
        <tr class="text-center" v-on:dblclick="Clicked(item)">
          <td style="width: 50px !important">{{ index + 1 }}</td>
          <td style="width: 230px">
            <span :class="{ red: item.end_total < 0 }">{{
              item['inspection.name']
            }}</span>
          </td>
          <td style="width: 60px !important">
            <span v-if="item.total_kirim != 0">{{ item.count }}</span>
            <span v-else>0</span>
          </td>
          <td style="width: 150px">
            <span :class="{ red: item.end_total < 0 }">{{
              (item.total_kirim - item.total_chiqim) | numFormat
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
          <td class="width: 20px !important" style="width: 340px" id="jami">
            Жами
          </td>
          <td style="width: 150px">
            <span :class="{ reds: jami_sum < 0 }">{{
              jami_sum | numFormat
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
        inspection_category: null,
        filial_id: JSON.parse(localStorage.getItem('filial_id')),
      },
      doctors: null,
      names: [],
      branchValid: false,
      filials:[],
      jami_sum: 0,
      kirim_summ: 0,
      chiqim_summ: 0,
      doctor: "",
      doctorList: [],
      doctor_sverka: "",
      errors: "",
      results: [],
      index: 0,
      localUser: JSON.parse(localStorage.getItem("user"))
    };
  },
  created() {
    let self = this;
    if (self.localUser.role == "Loborant") {
      if (localStorage.getItem("user") != null) {
        self.datas.inspection_category = self.localUser.inspecton.id;
        self.doctors = self.localUser.inspecton.name;
        // self.Send();
      }
    } else {
      if (localStorage.getItem("inspections") != null) {
        self.datas.inspection_category = parseInt(
          localStorage.getItem("inspections")
        );
        // self.Send();
      }
    }
  },
  methods: {
    Clicked(item) {
      this.datas.inspection_category = item["inspection.id"];
      localStorage.setItem("inspec", JSON.stringify(this.datas));
      // localStorage.setItem("inspection", item["inspection.id"]);
      let route = this.$router.resolve({
        path: "inspection_sverka"
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
        inspection_category: self.datas.inspection_category,
        filial_id: self.datas.filial_id
      };
      axios({
        method: "post",
        url: "hisobot/inspection_hisobot",
        data: datas
      }).then(function(response) {
        if(response != undefined){
          self.results = response.data;
          self.kirim_summ = 0;
          self.chiqim_summ = 0;
          self.jami_sum = 0;
          self.results.forEach((key, value) => {
            let sum = 0,
              sum1 = 0;
            if (key.total_chiqim > 0) {
              sum1 += key.total_chiqim * -1;
            }
            sum += key.total_kirim;
            let umumiy = sum + sum1;
            self.jami_sum += umumiy;
            self.chiqim_summ += parseFloat(key.total_chiqim);
            self.kirim_summ += parseFloat(key.total_kirim);
            key.date_time = moment(new Date(key.date_time * 1000)).format(
              "YYYY.MM.DD-HH:mm:ss"
            );
          });
        }
      });
    },

    getDoctor(filial) {
      let self = this;
      axios({
        method: "post",
        url: "/inspector_category/filial_bolim",
        data:{
          filial_id:filial
        }
      }).then(res => {
          self.names = res.data.data;
      });
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

    updateBranch(filial){
      this.datas.inspection_category = null;
      this.branchValid = false;
      if(filial){
        this.getDoctor(filial)
      }else{
        this.datas.filial_id = JSON.parse(localStorage.getItem("filial_id"));
        this.branchValid = true;
        alert('Филиални танлаш мажбурий')
      }
    }

  },
  mounted() {
    this.getFilial();
    const filial_id = JSON.parse(localStorage.getItem("filial_id"));
    this.getDoctor(filial_id)
  }
};
</script>
<style scoped>
.search-header{
  width: 100%;
  padding: 8px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px,1fr));
  gap: 8px 12px;
}

.search-header_item{
  display: flex;
  align-items: center;
  gap: 8px;
}
table {
  margin: 0px 0px;
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
#tables {
  min-height: 100vh;
  width: 99% !important;
}
.reds {
  color: red;
}
th {
  color: #195fb0;
  background-color: #f4f7fb;
}
.btn {
  width: 100%;
  height: 100%;
}
.tablee tbody tr th {
  border: 1px solid rgb(209, 208, 208);
}
</style>
