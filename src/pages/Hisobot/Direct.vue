<template>
  <b-container fluid id="tables">
    <div class="header-title">
      <h4>Напровител ҳисобот</h4>
    </div>
    <b-row class="text-center d-flex">
      <div class="search-header">
        <div class="search-header_item">
          <input 
            class="form-control" 
            type="date" 
            v-model="datas.date1"
           />
        </div>
        <div class="search-header_item">
          <input 
            class="form-control" 
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
          <v-select
            :options="names"
            style="width: 100%;"
            class="hisobotselect"
            v-model="datas.direct_id"
            :reduce="(options) => options.id"
            label="name"
            placeholder="Напровител танланг..."
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
    <table class="table table-striped table-bordered" style="width: 100%;">
      <thead>
        <tr class="text-center" style="height: 40px !important;">
          <th style="width: 20px">№</th>
          <th>Номи</th>
          <th>Напровител Ф.И.Ш</th>
          <th>Тушум</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-center"
          v-for="(item, index) in results"
          :key="index"
          v-on:dblclick="Clicked(item.direct_id)"
        >
          <td style="width:20px">{{ index + 1 }}</td>
          <td >
            <span :class="{ red: item.end_total < 0 }">№{{ item.doc_id }} - {{ item.doc_type }} - {{ item.place }}</span>
          </td>
          <td >
            <span :class="{ red: item.end_total < 0 }">{{ item.direct_name }}</span>
          </td>
          <td>
            <span :class="{ red: item.end_total < 0 }">{{
              item.total_kirim | numFormat
            }}</span>
          </td>
        </tr>
        <tr class="text-center">
          <td
            class="width: 20px !important"
            id="jami"
            colspan="3"
          >
            жами
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
        filial_id: JSON.parse(localStorage.getItem('filial_id')),
        direct_id: null,
      },
      doctors: null,
      names: [],
      branchValid: false,
      filials:[],
      jami_sum: 0,
      tushum: null,
      doctor: "",
      doctorList: [],
      doctor_sverka: "",
      errors: "",
      results: [],
      index: 0,
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
      localStorage.setItem("direct", JSON.stringify(this.datas));
      let route = this.$router.resolve({
        path: "/direct_sverka",
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
        direct_id: self.datas.direct_id,
        filial_id : self.datas.filial_id
      };
      axios({
        method: "post",
        url: "/hisobot/direct_hisobot",
        data: datas,
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
    getDoctor(filial) {
      let self = this;
      axios({
        method: "post",
        url: "/direct/filial_direct",
        data:{
          filial_id: filial,
        }
      }).then((res) => {
        if (res != undefined) {
          self.names = res.data.data;
        }
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
    const filial_id = JSON.parse(localStorage.getItem('filial_id'));
    this.getDoctor(filial_id);
  },
};
</script>
<style scoped>
.search-header {
  width: 100%;
  padding: 8px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 8px 12px;
}

.search-header_item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.hisobotselect .vs__selected-options span:first-child {
  width: 90% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
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
