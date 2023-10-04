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
          <th>Палата</th>
          <th>Келиш вақти</th>
          <th>Кетиш вақти</th>
          <th>Кун</th>
          <th>Бемор</th>
          <th>Палата нархи</th>
          <th>Палата сумма</th>
          <th>Умумий сумма</th>
        </tr>
        <tr
          :style="VaqtiOtibKetganTolamagan"
          v-for="(item, index) in Data2"
          :key="item.id"
          v-on:dblclick="Clicked(item)"
        >
          <td v-if="item.id">
            {{ item.id }}
          </td>
          <td v-if="item.name">
            {{ item.name }}
          </td>
          <td v-if="item.register_palata[0].date_to">
            {{ item.register_palata[0].date_to | moment }}
          </td>
          <td v-if="item.register_palata[0].date_do">
            {{ item.register_palata[0].date_do | moment }}
          </td>
          <td v-if="item.register_palata[0].day">
            {{ item.register_palata[0].day }}
          </td>
          <td v-if="item.register_palata[0].patient.fullname">
            {{ item.register_palata[0].patient.fullname }}
          </td>
          <td v-if="item.register_palata[0].price">
            {{ item.register_palata[0].price | numFormat }}
          </td>
          <td v-if="parseInt(item.register_palata[0].price) * parseInt(item.register_palata[0].day)">
            {{ (parseInt(item.register_palata[0].price) * parseInt(item.register_palata[0].day)) | numFormat }}
          </td>
          <td v-if="item.register_palata[0].registration.summa">
            {{ item.register_palata[0].registration.summa | numFormat }}
          </td>
        </tr>
        <tr
          v-for="(item, index) in Data"
          :key="item.id"
          v-on:dblclick="Clicked(item)"
        >
          <td v-if="item.id">
            {{ item.id }}
          </td>
          <td v-if="item.name">
            {{ item.name }}
          </td>
          <td v-if="item.register_palata[0].date_to">
            {{ item.register_palata[0].date_to | moment }}
          </td>
          <td v-if="item.register_palata[0].date_do">
            {{ item.register_palata[0].date_do | moment }}
          </td>
          <td v-if="item.register_palata[0].day">
            {{ item.register_palata[0].day }}
          </td>
          <td v-if="item.register_palata[0].patient.fullname">
            {{ item.register_palata[0].patient.fullname }}
          </td>
          <td v-if="item.register_palata[0].price">
            {{ item.register_palata[0].price | numFormat }}
          </td>
          <td v-if="parseInt(item.register_palata[0].price) * parseInt(item.register_palata[0].day)">
            {{ (parseInt(item.register_palata[0].price) * parseInt(item.register_palata[0].day)) | numFormat }}
          </td>
          <td v-if="item.register_palata[0].registration.summa">
            {{ item.register_palata[0].registration.summa | numFormat }}
          </td>
        </tr>
        <tr
          v-for="(item, index) in BoshPalata"
          :key="item.id"
        >
          <td v-if="item.id">
            {{ item.id }}
          </td>
          <td v-if="item.name">
            {{ item.name }}
          </td>
        </tr>
        <!-- <tr
          v-on:dblclick="Clicked(item)"
          :style="Bosh"
          v-for="(item, index) in BoshPalata"
          :key="index"
        >
          <td>
            {{ item.id }}
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
            {{ item.id }}
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
            {{ item.id }}
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
            {{ item.id }}
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
            {{ item.id }}
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
        -->
        <tr>
          <td colspan="6">
            Якуний қолдиқ
          </td>
          <td></td>
          <td></td>
          <td>
            <span :class="{ reds: jam_sum < 0 }">
            {{full_summa | numFormat}}
          </span>
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
      Data: [],
      full_summa: 0
    };
  },
  computed: {
    Bosh() {
      return {
        background: "rgb(80 182 255)",
      };
    },
    OldindanTolagan() {
      return {
        background: "rgb(102 255 80)",
      };
    },
    YotibTolamagan() {
      return {
        background: "rgb(255 114 61)",
      };
    },
    VaqtiOtibKetganTolamagan() {
      return {
        background: "rgb(255 80 80)",
      };
    },
    TolaganVaqtiOtibketgan() {
      return {
        background: "rgb(255 225 80)",
      };
    },
  },
  methods: {
    Send() {
      let self = this;
      self.end_sum = 0;
      self.beg_sum = 0;
      self.jami = 0;
      self.summa = 0;
      self.BoshPalata = [];
      self.Data = [];
      self.Data2 = [];
      self.full_summa = 0;
      self.TolaganVaqtiOtibketgans = [];
      self.TolaganVaqtiOtibketmagans = [];
      self.VaqtiOtibKetganTolamagans = [];
      self.YotibTolamagans = [];
      let datas = {
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
        filial_id: self.datas.filial_id,
      };
      axios({
        method: "post",
        url: "palata/hisobot",
        data: datas,
      }).then(function(res) {
        if(res.data) {
          res.data.forEach((item) => {
            if (item.text !== "Палата бўш" && item.text !== "qarz") {
              self.Data.push(item);
            } else if (item.text == "Палата бўш") {
              self.BoshPalata.push(item);
            }else if(item.text !== "Палата бўш" && item.text == "qarz") {
                self.Data2.push(item);
            }
          });
          let letArr = [...self.Data, ...self.Data2]
          letArr.forEach(item => {
            const { price, day } = item.register_palata[0];   
            const totalPrice = parseInt(price) * parseInt(day);  
            self.full_summa += totalPrice;
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
      this.datas.filial_id = filial;
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
