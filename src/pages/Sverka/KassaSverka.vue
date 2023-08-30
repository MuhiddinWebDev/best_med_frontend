<template>
  <div>
      <div class="main-header">
        <h4>Касса Сверка</h4>
        <b-button
          class="navbarBtnDanger ml-3"
          variant="danger"
          @click="cancel()"
        >
          <b-icon icon="x-circle-fill"></b-icon>
        </b-button>
      </div>
    <b-container fluid id="tables">
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
          <div class="n-input-group">
            <div class="n-input-group_label" >Филиал</div>
            <div class="n-input-group_item">
              <v-select
                style="width: 100%;min-width: 280px;"
                :style="{ border: branchValid ? '1px solid red':'none'}"
                label="name"
                :options="filials"
                :reduce="option => option.id"
                v-model="datas.filial_id"
                @input="updateBranch"
              />
            </div>
          </div>
        </div>

        <div class="box-header_item">
          <div class="n-input-group">
            <div class="n-input-group_label" >Ходим</div>
            <div class="n-input-group_item">
              <v-select
                style="width: 100%;min-width: 28x`0px;"
                label="user_name"
                :options="kassers"
                :reduce="option => option.id"
                v-model="datas.user_id"
              />
            </div>
          </div>
        </div>
  
        <div class="box-header_item">
          <div style="display: flex; justify-content: flex-start;">
            <button
              type="button"
              class="btn text-white"
              style="background: #195FB0; font-size: 14px"
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
        <div class="tablesD">
          <table class="table  table-bordered table-sm table-striped">
            <tr class="bg-dark text-white">
              <th rowspan="2" style="width: 30px !important">#</th>
              <th rowspan="2" colspan="2" class="col-2">Номи</th>
              <th rowspan="2" class="col-2">
                Вақт
              </th>
              <th rowspan="2" class="col-2">
                Ф.И.Ш
              </th>
              <th rowspan="2" class="col-2">
                Изоҳ
              </th>
              <th rowspan="2" class="col-1">Бемор</th>
              <th colspan="2" class="col-3">Нақт</th>
              <th colspan="2" class="col-3">Пластик</th>
            </tr>
            <tr class="bg-dark text-white">
              <th>Кирим</th>
              <th>Чиқим</th>
              <th>Кирим</th>
              <th>Чиқим</th>
            </tr>
            <tr>
              <td colspan="6">
                Бошланғич қолдиқ
              </td>
              <td colspan="2">
                <span>{{
                  beg_sum_naqt
                }}</span>
              </td>
              <td colspan="2">
                <span>{{
                  beg_sum_plas
                }}</span>
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
                № {{ item.doctor_id }} - {{ item.doc_type }} - {{ item.place }}
              </td>
  
              <td>
                {{ item.date_time }}
              </td>
              <td>
                <span
                  v-if="
                    item.registration != null &&
                      (item.place == 'registration' || item.place == 'uplata')
                  "
                >
                  <!-- {{ item }} -->
                  {{ item.registration.patient.fullname }}
                </span>
                <span v-else>
                  {{ item.user ? item.user.user_name : "" }}
                  </span>
              </td>
              <td>
                {{ item.comment }}
              </td>
              <td>{{ item.registration ? item.registration.patient.fullname :'' }}</td>
              <td>
                <span>
                  {{ item.kirim_naqt | numFormat }}
                </span>
              </td>
              <td>
                <span>
                  {{ item.chiqim_naqt | numFormat }}
                </span>
              </td>
              <td>
                <span>
                  {{ item.kirim_plastik | numFormat }}
                </span>
              </td>
              <td>
                <span>
                  {{ item.chiqim_plastik | numFormat }}
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="7">Жами</td>
              <td>
                <span>{{
                  jami.naqt_kirim | numFormat
                }}</span>
              </td>
              <td>
                <span>{{
                  jami.naqt_chiqim | numFormat
                }}</span>
              </td>
              <td>
                <span>{{
                  jami.plas_kirim | numFormat
                }}</span>
              </td>
              <td>
                <span>{{
                  jami.plas_chiqim | numFormat
                }}</span>
              </td>
            </tr>
            <tr>
              <td colspan="7">
                Якуний қолдиқ
              </td>
              <td id="y1" colspan="2">
                <span
                  >{{
                    (end_naqt)
                      | numFormat
                  }}</span
                >
              </td>
              <td colspan="2">
                <span
                  >{{
                    (end_plas)
                      | numFormat
                  }}</span
                >
              </td>
            </tr>
          </table>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      datas: {
        date1: null,
        date2: null,
        filial_id: null,
        user_id: null
      },
      doctor_name: null,
      filials:[],
      branchValid: false,
      kassers:[],
      paytype: "",
      paytypelist: [],
      kassa: "",
      kassaList: [],
      errors: "",
      results: [],
      names: [],
      localUser: JSON.parse(localStorage.getItem("user")),
      beg_sum_naqt: 0,
      beg_sum_plas: 0,
      end_sum: 0,
      jami: {
        naqt_kirim: 0,
        naqt_chiqim: 0,
        plas_kirim: 0,
        plas_chiqim: 0
      },
      end_naqt: 0,
      end_plas: 0
    };
  },
  created() {
    let self = this;
    if (JSON.parse(localStorage.getItem("datas")) == null) {
      self.datas.date1 = new Date().toISOString().slice(0, 10);
      self.datas.date2 = new Date().toISOString().slice(0, 10);
    } else {
      self.datas.date1 = JSON.parse(localStorage.getItem("datas")).date1;
      self.datas.date2 = JSON.parse(localStorage.getItem("datas")).date2;
      localStorage.removeItem("datas");
    }
  },

  methods: {
    Send() {
      let self = this;
      self.beg_sum_naqt = 0;
      self.beg_sum_plas = 0;
      self.jami = {
        naqt_kirim: 0,
        naqt_chiqim: 0,
        plas_kirim: 0,
        plas_chiqim: 0
      },
      self.end_naqt = 0,
      self.end_plas = 0
      self;
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
          filial_id: self.datas.filial_id,
          user_id: self.datas.user_id
      };
      axios({
        method: "post",
        url: "hisobot/kassa_sverka",
        headers: {
          "Content-Type": "application/json"
        },
        data: datas
      }).then(function(response) {
        self.results =[]
        if(response != undefined){
          response.data.forEach(key => {
              if(key.pay_type == 'Naqt'){
                self.beg_sum_naqt += key.begin_total;
                self.jami.naqt_kirim += key.kirim_naqt;
                self.jami.naqt_chiqim += key.chiqim_naqt;
              }
              else{
                self.beg_sum_plas += key.begin_total;
                self.jami.plas_chiqim += key.chiqim_plastik;
                self.jami.plas_kirim += key.kirim_plastik;
              }
              self.results = response.data;
              self.end_sum += key.end_total;
              key.date_time = moment(key.date_time * 1000).format(
                "YYYY.MM.DD HH:mm:ss"
              );
            
          });
          self.end_naqt = self.jami.naqt_kirim - self.jami.naqt_chiqim;
          self.end_plas = self.jami.plas_kirim - self.jami.plas_chiqim;
        }
      });
    },

    cancel() {
      window.close();
    },

    Router(item) {
      if (item.doc_type === "Kirim" && this.datas.date1 <= this.datas.date2) {
        // this.$router.push({path: '/arxivone/' + item.doctor_id})
        axios({
          method: "get",
          url: "/registration/one/" + item.doctor_id
        }).then(res => {
          let route = this.$router.resolve({
            path: `${res != undefined ? '/user-update/':'/arxivone/'}` + item.doctor_id
          });
          window.open(route.href, "_blank");
        })
      } else if (item.place == "supplier") {
        let route = this.$router.resolve({
          path: "/provider/pay/update/" + item.doctor_id
        });
        window.open(route.href, "_blank");
      } else if (
        (item.pay_type === "naqt" || item.pay_type === "plastik") &&
        this.datas.date1 <= this.datas.date2
      ) {
        // this.$router.push({path: 'KassaDoc/' + item.doctor_id})
        let route = this.$router.resolve({
          path: "KassaDoc/" + item.doctor_id
        });
        window.open(route.href, "_blank");
      } else if (this.datas.date1 <= this.datas.date2) {
        // this.$router.push({path: 'oplataDoc/' + item.doctor_id})
        let route = this.$router.resolve({
          path: "oplataDoc/" + item.doctor_id
        });
        window.open(route.href, "_blank");
      }
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

    getKassir(filial){
      let self = this;
      axios({
        method: "post",
        url: "/user/filial_kassa",
        data:{
          filial_id: filial
        }
      }).then(res => {
        self.kassers = res.data.data;
      });
    },

    updateBranch(filial){
      this.branchValid = false;
      if(filial){
        this.getKassir(filial)
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
    this.datas.filial_id = filial_id;
    this.getKassir(filial_id);
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
  padding: 12px 20px;
  padding-bottom: 0px;
}
.n-input-group{
  display: flex;
  align-items: center;
  width: 100%;
}
.n-input-group_item{
  width: 100%;
}
.n-input-group_label{
  border: 1px solid #ccc;
  border-right: none;
  padding: 5px 8px;
  border-radius: 5px 0px 0px 5px;
}
.reds {
  color: red;
}
.tablesD {
  /* overflow-y: scroll; */
  /* overflow-x: hidden; */
  /* height: 395px; */
  width: 100%;
}
#y1 {
  width: 80px !important;
}
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
  height: 30px !important;
}
.ShifokrSverka {
  border-radius: 3px;
  background: #fff;
  border: 1px solid rgb(210, 210, 210);
}
.reds {
  color: red;
}
#tables {
  text-align: center;
  height: calc(100vh - 80px) !important;
}
th {
  color: #195fb0;
  background-color: #f4f7fb;
}
</style>
