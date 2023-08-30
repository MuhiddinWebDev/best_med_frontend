<template>
  <b-container fluid id="table">
    <div class="main-header">
      <h4>Палата Сверка</h4>
      <b-button class="navbarBtnDanger ml-3" variant="danger" @click="cancel()">
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
          :style="{ border: branchValid ? '1px solid red' : 'none' }"
          :reduce="(option) => option.id"
          label="name"
          placeholder="Филиал танланг..."
          @input="updateBranch"
        />
      </div>
      <div class="box-header_item">
        <div>
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
    </div>
    <div>
      <table class="table table-bordered table-sm table-striped">
        <tr class="bg-dark text-white">
          <th>№</th>
          <th>Номи</th>
          <th>Келиш вақти</th>
          <th>Кетиш вақти</th>
          <th>Кун</th>
          <th>Бемор</th>
          <th>Хона</th>
          <th>Палата сумма</th>
          <th>Умумий сумма</th>
        </tr>
        <!-- v-for="(item, index) in results"
          :key="index" -->
        <tr
          v-on:dblclick="Clicked(item)"
          :style="Bosh"
          v-for="(item, index) in BoshPalata"
          :key="index"
        >
          <td>
            {{ index + 1 }}
          </td>
          <td>
            <div v-if="item.register_palata">
              {{ item.register_palata[0].date_to | moment }}
            </div>
          </td>
          <td>
            <div v-if="item.register_palata">
              {{ item.register_palata[0].date_do | moment }}
            </div>
          </td>
          <td>
            <div v-if="item.register_palata">
              {{ item.register_palata[0].day }}
            </div>
          </td>
          <td>
            <div v-if="item.register_palata">
              {{ item.register_palata[0].patient.fullname }}
            </div>
          </td>
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.price | numFormat }}
          </td>
          <td>
            <div
              v-if="
                item.register_palata && item.register_palata[0].registration
              "
            >
              {{ item.register_palata[0].registration.pay_summa | numFormat }}
            </div>
          </td>
        </tr>
        <tr
          v-on:dblclick="Clicked(item)"
          :style="TolaganVaqtiOtibketgan"
          v-for="(item, index) in TolaganVaqtiOtibketgans"
          :key="index"
        >
          <td>
            {{ index + 1 }}
          </td>
          <td>
            <div v-if="item.register_palata">
              № {{ item.register_palata[0].registration.id }} - Кирим - Палата
            </div>
          </td>
          <td>
            <div v-if="item.register_palata">
              {{ item.register_palata[0].date_to | moment }}
            </div>
          </td>
          <td>
            <div v-if="item.register_palata">
              {{ item.register_palata[0].date_do | moment }}
            </div>
          </td>
          <td>
            <div v-if="item.register_palata">
              {{ item.register_palata[0].day }}
            </div>
          </td>
          <td>
            <div v-if="item.register_palata">
              {{ item.register_palata[0].patient.fullname }}
            </div>
          </td>
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.price | numFormat }}
          </td>
          <td>
            <div
              v-if="
                item.register_palata && item.register_palata[0].registration
              "
            >
              {{ item.register_palata[0].registration.pay_summa | numFormat }}
            </div>
          </td>
        </tr>
        <tr
          v-on:dblclick="Clicked(item)"
          :style="OldindanTolagan"
          v-for="(item, index) in TolaganVaqtiOtibketmagans"
          :key="index"
        >
          <td>
            {{ index + 1 }}
          </td>
          <td>
            <div v-if="item.register_palata">
              {{ item.register_palata[0].date_to | moment }}
            </div>
          </td>
          <td>
            <div v-if="item.register_palata">
              {{ item.register_palata[0].date_do | moment }}
            </div>
          </td>
          <td>
            <div v-if="item.register_palata">
              {{ item.register_palata[0].day }}
            </div>
          </td>
          <td>
            <div v-if="item.register_palata">
              {{ item.register_palata[0].patient.fullname }}
            </div>
          </td>
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.price | numFormat }}
          </td>
          <td>
            <div
              v-if="
                item.register_palata && item.register_palata[0].registration
              "
            >
              {{ item.register_palata[0].registration.pay_summa | numFormat }}
            </div>
          </td>
        </tr>
        <tr
          v-on:dblclick="Clicked(item)"
          :style="VaqtiOtibKetganTolamagan"
          v-for="(item, index) in VaqtiOtibKetganTolamagans"
          :key="index"
        >
          <td>
            {{ index + 1 }}
          </td>
          <td>
            <div v-if="item.register_palata">
              {{ item.register_palata[0].date_to | moment }}
            </div>
          </td>
          <td>
            <div v-if="item.register_palata">
              {{ item.register_palata[0].date_do | moment }}
            </div>
          </td>
          <td>
            <div v-if="item.register_palata">
              {{ item.register_palata[0].day }}
            </div>
          </td>
          <td>
            <div v-if="item.register_palata">
              {{ item.register_palata[0].patient.fullname }}
            </div>
          </td>
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.price | numFormat }}
          </td>
          <td>
            <div
              v-if="
                item.register_palata && item.register_palata[0].registration
              "
            >
              {{ item.register_palata[0].registration.pay_summa | numFormat }}
            </div>
          </td>
        </tr>
        <tr
          v-on:dblclick="Clicked(item)"
          :style="YotibTolamagan"
          v-for="(item, index) in YotibTolamagans"
          :key="index"
        >
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ date_time | moment }}
          </td>
          <td>
            {{ fullname }}
          </td>
          <td>
            {{ item.price | numFormat }}
          </td>
          <td>
            {{ summa | numFormat }}
          </td>
          <td>
            {{ jam_sum | numFormat }}
          </td>
        </tr>
        <tr>
          <td colspan="5">
            Якуний қолдиқ
          </td>
          <td></td>
          <td></td>
          <td>
            <span :class="{ reds: jam_sum < 0 }">{{
              beg_sum | numFormat
            }}</span>
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
        direct_id: null,
        filial_id: JSON.parse(localStorage.getItem("filial_id")),
      },
      color: "#ff0000",
      doctor: "",
      doctorList: [],
      results: [],
      names: [],
      filials: [],
      branchValid: false,
      end_sum: null,
      beg_sum: null,
      jam_sum: 0,
      jami: null,
      fullname: "",
      summa: 0,
      TolaganVaqtiOtibketgans: [],
      TolaganVaqtiOtibketmagans: [],
      VaqtiOtibKetganTolamagans: [],
      YotibTolamagans: [],
      BoshPalata: [],
      date_time: 0,
      // select: ""
    };
  },
  computed: {
    Bosh() {
      return {
        // backgroundImage: `url(${this.sidebarBackgroundImage})`,
        background: "rgb(80 182 255)",
      };
    },
    OldindanTolagan() {
      return {
        // backgroundImage: `url(${this.sidebarBackgroundImage})`,
        background: "rgb(102 255 80)",
      };
    },
    YotibTolamagan() {
      return {
        // backgroundImage: `url(${this.sidebarBackgroundImage})`,
        background: "rgb(255 114 61)",
      };
    },
    VaqtiOtibKetganTolamagan() {
      return {
        // backgroundImage: `url(${this.sidebarBackgroundImage})`,
        background: "rgb(255 80 80)",
      };
    },
    TolaganVaqtiOtibketgan() {
      return {
        // backgroundImage: `url(${this.sidebarBackgroundImage})`,
        background: "rgb(255 225 80)",
      };
    },
  },
  created() {
    // let self = this;
    // if (localStorage.getItem("MedDirect") != null) {
    //   self.datas.date1 = JSON.parse(localStorage.getItem("MedDirect")).date1;
    //   self.datas.date2 = JSON.parse(localStorage.getItem("MedDirect")).date2;
    //   self.datas.direct_id = JSON.parse(
    //     localStorage.getItem("MedDirect")
    //   ).direct_id;
    //   self.Send();
    // } else {
    //   elf.datas.date1 = new Date().toISOString().slice(0, 10);
    //   self.datas.date2 = new Date().toISOString().slice(0, 10);
    // }
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
      self.jami = 0;
      self.summa = 0;
      self.BoshPalata = [];
      self.TolaganVaqtiOtibketgans = [];
      self.TolaganVaqtiOtibketmagans = [];
      self.VaqtiOtibKetganTolamagans = [];
      self.YotibTolamagans = [];
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
        filial_id: self.filial_id,
      };
      axios({
        method: "post",
        url: "palata/hisobot",
        data: datas,
      }).then(function(res) {
        if (res != undefined) {
          res.data.forEach((item) => {
            if (item.text == "pul tolagan vaqti tugagan lekin yotipdi") {
              self.TolaganVaqtiOtibketgans.push(item);
            } else if (item.text == "pul tolagan, vaqti tugamagan yotipdi") {
              self.TolaganVaqtiOtibketmagans.push(item);
            } else if (item.text == "pul tolamagan va vaqti otib ketgan") {
              self.VaqtiOtibKetganTolamagans.push(item);
            } else if (item.text == "pul tolamagan va vaqti otib ketmagan") {
              self.YotibTolamagans.push(item);
            } else if (item.text == "palata bo'sh") {
              self.BoshPalata.push(item);
            }
            if (item.register_palata.length > 0) {
              item.register_palata.forEach((palata) => {
                self.fullname = palata.patient.fullname;
                if (palata.registration != null) {
                  self.summa = Number(palata.registration.pay_summa);
                  self.jam_sum = Number(palata.registration.pay_summa);
                } else {
                  self.summa += 0;
                  self.jam_sum += 0;
                }
                self.end_sum += self.summa;
                self.beg_sum += self.jam_sum;
                self.date_time = palata.date_do;
              });
            }
          });
        }
      });
    },
    Clicked(item) {
      item.register_palata.forEach((child) => {
        let user_id = child.patient.id;
        axios({
          method: "post",
          url: "/registration/bemor",
          data: {
            patient_id: user_id,
          },
        }).then((res) => {
          if (res) {
            let reg_id = res.data.data.id;
            let route = this.$router.resolve({
              path: "/user-update/" + reg_id,
            });
            window.open(route.href, "_blank");
          } else {
            axios({
              method: "post",
              url: "/registration_arxiv/bemor",
              data: {
                patient_id: user_id,
              },
            }).then((res) => {
              if (res) {
                let reg_id = res.data.data.id;
                let route = this.$router.resolve({
                  path: "/arxive/" + reg_id,
                });
                window.open(route.href, "_blank");
              } 
            });
          }
        });
        // axios({
        //   method: "get",
        //   url: "/registration/arxive/" + user_id
        // }).then(res => {
        //   console.log(res)
        // });
      });
      // let route = this.$router.resolve({
      //   path: "/arxivone/" + item.id
      // });
      // window.open(route.href, "_blank");
    },
    cancel() {
      window.close();
    },
    getFilial() {
      let self = this;
      axios({
        method: "get",
        url: "/filial/all",
      }).then((res) => {
        if (res != undefined) {
          self.filials = res.data.data;
        }
      });
    },
    updateBranch(filial) {
      this.branchValid = false;
      if (!filial) {
        this.datas.filial_id = JSON.parse(localStorage.getItem("filial_id"));
        this.branchValid = true;
        alert("Филиални танлаш мажбурий");
      }
    },
  },
  filters: {
    moment: function(date) {
      if (date != null) {
        return moment.unix(date).format("DD.MM.YYYY");
      } else {
        return "";
      }
    },
  },
  mounted() {
    this.getFilial();
  },
};
</script>

<style scoped>
.box-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0px;
  flex-wrap: wrap;
}
.box-header_item {
  flex: 1 0 180px;
}
.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
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
