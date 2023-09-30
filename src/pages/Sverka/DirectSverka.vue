<template>
  <b-container fluid id="table">
    <div class="main-header">
      <h4>Вакил Сверка</h4>
      <b-button
          class="navbarBtnDanger ml-3"
          variant="danger"
          @click="cancel()"
        >
          <b-icon icon="x-circle-fill"></b-icon>
        </b-button>
    </div>
    <div class="box-header">
      <div class="box-header_item">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date1"
        />
      </div>
      <div class="box-header_item">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date2"
        />
      </div>
      <div class="box-header_item">
        <v-select
            :options="filials"
            style="width: 100%;"
            v-model="datas.filial_id"
            :style="{ border: branchValid ? '1px solid red':'none'}"
            :reduce="option => option.id"
            label="name"
            placeholder="Филиал танланг..."
            @input="updateBranch"
          />
      </div>
      <div class="box-header_item">
        <v-select
          :options="names"
          v-model="datas.direct_id"
          :reduce="name => name.id"
          label="name"
          placeholder="ходимни танланг..."
        />
      </div>
      <div class="box-header_item">
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
              № {{ item.doc_id }} - {{ item.doc_type }} - {{ item.place }}</span
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
        filial_id: JSON.parse(localStorage.getItem('filial_id')),
        direct_id: null,
      },
      doctor: "",
      doctorList: [],
      results: [],
      names: [],
      branchValid: false,
      filials:[],
      end_sum: null,
      beg_sum: null,
      jam_sum: null,
      jami: null
      // select: ""
    };
  },
  created() {
    let self = this;
    if (localStorage.getItem("direct") != null) {
      self.datas.date1 = JSON.parse(localStorage.getItem("direct")).date1;
      self.datas.date2 = JSON.parse(localStorage.getItem("direct")).date2;
      self.datas.direct_id = JSON.parse(
        localStorage.getItem("direct")
      ).direct_id;
      self.Send();
    } else {
      self.datas.date1 = new Date().toISOString().slice(0, 10);
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
        direct_id: self.datas.direct_id,
        filial_id: self.datas.filial_id
      };
      axios({
        method: "post",
        url: "hisobot/direct_sverka",
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
    getDoctor(filial) {
      let self = this;
      axios({
        method: "post",
        url: "/direct/filial_direct",
        data:{
          filial_id: filial,
        }
      }).then(res => {
        if(res != undefined) {
          self.names = res.data.data;
        }
      });
    },
    cancel() {
      window.close();
    },
    getFilial() {
      let self = this;
      axios({
        method: "get",
        url: "/filial/all"
      }).then(res => {
        if(res != undefined){
          self.filials = res.data.data;
        }
      });
    },
    updateBranch(filial){
      this.branchValid = false;
      this.datas.direct_id = null;
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
  }
};
</script>

<style scoped>
.box-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0px;
  flex-wrap: wrap;
}
.box-header_item{
  flex: 1 0 180px;
}
.main-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  padding-bottom: 0px;
}
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
