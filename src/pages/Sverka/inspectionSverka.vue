<template>
  <div>
    <div class="main-header">
        <h4>Текширув  сверка</h4>
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
            <b-input
              v-if="localUser.role == 'Loborant'"
              v-model="doctor_name"
              disabled
            >
            </b-input>
            <v-select
              :options="names"
              v-model="datas.inspection_category"
              :reduce="option => option.id"
              label="name"
              placeholder="булимни танланг..."
              v-else
            />
          </div>
          <div class="box-header_item">
            <button
              type="button"
              class="btn text-white"
              style="background: #195FB0; width: 130px; font-size: 14px"
              @click="Send()"
              :class="{ Pointer: jami != 0 && jam_sum != 0 }"
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
              <th>Изоҳ</th>
              <th>Кирим сумма</th>
              <th>Чиқим сумма</th>
            </tr>
            <tr>
              <td colspan="4">
                Бошланғич қолдиқ:
              </td>
              <td colspan="2">
                <span
                  :class="{ red: parseInt(results.begin_total) <= 0 }"
                  >{{ (beg_sum) | numFormat  }}
                </span>
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
                <span style="margin-right: 200px">
                  № - {{ item.doc_id }}- {{ item.place }}- {{ item.doc_type }}
                </span>
                {{ item.date_time }}
              </td>
              <td>
                {{ item.comment }}
              </td>
              <td>
                <span>
                  {{ item.kirim | numFormat }}
                </span>
              </td>
    
              <td>
                <span>
                  {{ item.chiqim | numFormat }}
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                Якуний қолдиқ
              </td>
              <td colspan="2" :class="{ reds: jami - jam_sum < 0 }">
                <span>{{ end_sum | numFormat }}</span>
              </td>
            </tr>
          </table>
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
        filial_id: JSON.parse(localStorage.getItem('filial_id')),
        inspection_category: null
      },
      doctor_name: null,
      doctorList: [],
      branchValid: false,
      filials:[],
      results: [],
      names: [],
      end_sum: null,
      beg_sum: null,
      jam_sum: 0,
      jami: 0,
      localUser: JSON.parse(localStorage.getItem("user"))
      // select: ""
    };
  },
  created() {
    let self = this;
    if (JSON.parse(localStorage.getItem("inspec")) == null) {
      self.datas.date1 = new Date().toISOString().slice(0, 10);
      self.datas.date2 = new Date().toISOString().slice(0, 10);
    } else {
      self.datas.date1 = JSON.parse(localStorage.getItem("inspec")).date1;
      self.datas.date2 = JSON.parse(localStorage.getItem("inspec")).date2;
      // self.datas.inspection_category = JSON.parse(
      //   localStorage.getItem("inspec")
      // ).inspection_category;
      // self.Send();
    }
    if (self.localUser.role == "Loborant") {
      if (localStorage.getItem("user") != null) {
        // self.datas.inspection_category = self.localUser.inspecton.id;
        self.doctor_name = self.localUser.inspecton.name;
        // self.Send();
      }
    } else {
      if (localStorage.getItem("inspec").inspection_category != null) {
        self.datas.inspection_category = parseInt(
          localStorage.getItem("inspec").inspection_category
        );
        // self.Send();
      }
    }
  },
  methods: {
    Send() {
      let self = this;
      self.end_sum = 0;
      self.beg_sum = 0;
      self.jami = 0;
      let d = {
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
        url: "hisobot/inspection_sverka",
        data: d
      }).then(function(res) {
        if(res != undefined){
          if (res.data.length != 0) {
            for (let key of res.data) {
              if (
                self.localUser.role == "Loborant" &&
                res.data.length != 0 &&
                key.inspection_id == self.localUser.inspecton.id
              ) {
                self.results = res.data;
              } else if (
                (self.localUser.role == "Admin" && res.data.length != 0) ||
                self.localUser.role == "Dasturchi" ||
                self.localUser.role == "Kasser"
              ) {
                self.results = res.data;
              }
              key.date_time = moment(new Date(key.date_time * 1000)).format(
              "YYYY.MM.DD HH:mm:ss"
            );
             self.beg_sum += key.begin_total;
             self.end_sum += key.end_total;
            }
          } else {
            self.results = [];
            self.jami = 0;
          }
        }
      });
    },
    // self.jami = 0;
    Router(item) {
      if (item.doc_type === "kirim" && this.datas.date1 <= this.datas.date2) {
        axios({
          method: "get",
          url: "/registration/one/" + item.doc_id
        }).then(res => {
          let route = this.$router.resolve({
            path: `${res != undefined ? '/user-update/':'/arxivone/'}` + item.doc_id
          });
          window.open(route.href, "_blank");
        })
      } else if (this.datas.date1 <= this.datas.date2) {
        // this.$router.push({ path: "oplataDoc/" + item.doc_id });
        let route = this.$router.resolve({
          path: "oplataDoc/" + item.doc_id
        });
        window.open(route.href, "_blank");
      }
    },
    cancel() {
      window.close();
    },
    getInspection(filial) {
      let self = this;
      axios({
        method: "post",
        url: "/inspector_category/filial_bolim",
        data:{
          filial_id: filial
        }
      }).then(res => {
        if(res != undefined){
          for (let key of res.data.data) {
            if (
              self.localUser.role == "Loborant" &&
              key.id == self.localUser.inspecton.id
            ) {
              self.names.push(key);
            } else if (self.localUser.role == "Admin") {
              self.names = res.data.data;
            }
          }
        }
      });
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
      this.datas.inspection_category = null;
      this.branchValid = false;
      if(filial){
        this.getInspection(filial)
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
    this.getInspection(filial_id)
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
.Pointer {
  pointer-events: none;
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
.ShifokrSverka {
  border-radius: 3px;
  background: #fff;
  border: 1px solid rgb(210, 210, 210);
}
.navbarBtnDanger {
  border: 1px solid #fff;
  /* box-shadow: 5px 8px 10px rgba(176, 25, 25, 0.3); */
  background: #e80a18;
  border-radius: 8px;
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
</style>
