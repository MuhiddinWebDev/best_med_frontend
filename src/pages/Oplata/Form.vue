<template>
  <div>
    <div class="katta">
      <span>Толовлар</span>
      <button
        style="padding: 4px 10px; margin-right: 10px"
        class="btn"
        @click="Prev"
      >
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>
    <div :class="{ Arxiv: $route.name == 'oplataDoc' }">
      <div class="oyna1">
        <div class="ustun">
          <div class="selekt mt-1">
            <span class="shirift">
              Ҳодим
            </span>
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.user_id.required"
                >Ҳодим танланиши керак</span
              >
            </span>
            <v-select
              :class="{ Arxiv: $route.name == 'oplataDoc' }"
              :options="User"
              label="user_name"
              :reduce="user => user.id"
              v-model="oplata.user_id"
              @input="getOneUser"
            />
          </div>
          <div>
            <span>
              <span class="shirift">Изох</span>
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.name.required"
                  >Номи тўлдирилиши керак</span
                >
              </span>
            </span>
            <b-input
              v-model="oplata.name"
              style="background: #fff; border: 1px solid #ced4da;"
              type="text"
              :class="{ Arxiv: $route.name == 'oplataDoc' }"
            ></b-input>
          </div>
          <div
            v-if="
              this.$route.name == 'Oplata Create' ||
                this.$route.name == 'oplata-update'
            "
          >
            <span class="shirift"
              >Вақти
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.date_time.required"
                >
                  Вақтни танланг</span
                >
              </span>
            </span>
            <date-picker
              style="width: 100%;"
              v-model="oplata.date_time"
              format="DD.MM.YYYY HH:mm"
              value-type="X"
              type="datetime"
              :lang="lang"
            ></date-picker>
          </div>
        </div>

        <div class="ustun">
          <div>
            <span>
              <span class="shirift">Тўлов тури</span>
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.type.required"
                  >Изоҳ тўлдирилиши керак</span
                >
              </span>
            </span>
            <v-select
              :class="{ Arxiv: $route.name == 'oplataDoc' }"
              :options="tolov_turi"
              label="name"
              v-model="oplata.type"
              :reduce="tolov_turi => tolov_turi.id"
            />
          </div>
          <div class="mt-1">
            <span class="shirift">
              Сумма
            </span>
            <vue-numeric
              style="width: 100%; height: 35px; border: 1px solid #bfbfbf; border-radius: 4px;"
              separator="space"
              v-model="oplata.price"
              :precision="2"
            ></vue-numeric>
          </div>

          <div class="mt-1" v-if="user_percent">
            <span class="shirift">Вақтлар</span>
            <div class="row">
              <div class="col">
                <input
                  class="form-control ShifokrSverka"
                  type="date"
                  v-model="datas.date1"
                  placeholder="boshlanish vaqti"
                />
              </div>
              <div class="col">
                <input
                  class="form-control ShifokrSverka"
                  type="date"
                  v-model="datas.date2"
                  placeholder="tugash vaqti"
                />
              </div>
            </div>
          </div>

          <div class="mt-1" v-if="!isAlert">
            <h6 style="text-transform: lowercase;">Ходимни % да иш хақи 0</h6>
          </div>
          
          <div class="mt-1" v-if="user_salary">
            <span class="shirift" v-if="user_salary">
              Ходим ойлиги
            </span>
            <vue-numeric
              v-if="user_salary"
              style="width: 100%; height: 35px; border: 1px solid #bfbfbf; border-radius: 4px;"
              separator="space"
              v-model="user_salary"
              :precision="2"
              disabled
            ></vue-numeric>
          </div>
          
          <div class="mt-1" v-if="user_percent">
            <span class="shirift" v-if="user_percent">
              Фоиздаги ҳаққи
            </span>
            <vue-numeric
              v-if="user_percent"
              style="width: 100%; height: 35px; border: 1px solid #bfbfbf; border-radius: 4px;"
              separator="space"
              v-model="user_percent"
              :precision="2"
              disabled
            ></vue-numeric>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "vue2-datepicker/index.css";
import DatePicker from "vue2-datepicker";
export default {
  name: "OplataForm",
  components: {
    DatePicker  
  },
  props: ["oplata", "errors"],
  data() {
    return {
      oplata: {
        type: null,
        price: 0,
        date_time: new Date()
          .valueOf()
          .toString()
          .slice(0, 10),
        name: "",
        work_type: null,
        user_id: null,
        doctor_id: null,
        user: null
      },
      expense: [],
      User: [],
      tolov_turi: [
        { id: 0, name: "Naqt" },
        { id: 1, name: "Plastik" }
      ],
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      datas: {
        date1: new Date().toISOString().slice(0, 8) + "01",
        date2: new Date().toISOString().slice(0, 10),
      },
      user_salary: null,
      user_percent: null,
      user: null,
      isAlert: true
    };
  },
  methods: {
    Prev() {
      if (this.$route.name == "oplataDoc") {
        window.close();
      } else {
        this.$router.push("/oplata");
      }
    },
    getUser() {
      let self = this;
      axios({
        method: "get",
        url: "/user/all"
      }).then(res => {
        self.User = res.data.data;
      });
    },
    getOneUser(id) {
      let self = this;
      axios({
        method: "get",
        url: "/user/one/" +  id
      }).then(res => { 
        this.oplata.work_type = null
        if(res.data) {
          if(res.data.data.role == "Kassser" || res.data.data.role == "Registrator") {
            this.user = null
            this.user_percent = null
            this.user_salary = null
            self.user_salary = res.data.data.salary
            this.oplata.work_type = "Kasser || Registrator"
            this.isAlert = true
          }else if(res.data.data.role == "Shifokor" || res.data.data.role == "Loborant") {
            if(res.data.data.salary !== 0) {
              this.user = null
              this.user_percent = null
              this.user_salary = null
              self.user_salary = res.data.data.salary
              this.isAlert = true
            }else if(res.data.data.percent && res.data.data.role == "Shifokor") {
              try {
                this.user = null
                this.user_percent = null
                this.user_salary = null
                this.user = {}
                this.user = res.data.data
                this.getPercentSalay()
                this.oplata.work_type = "Shifokor Oylik"
                this.isAlert = true
              } catch (error) {
                console.log(error)
              }
            }else if(res.data.data.percent && res.data.data.role == "Loborant") {
              this.user = null
              this.user_percent = null
              this.user_salary = null
              this.user = {}
              this.user = res.data.data
              this.geLaborantSalay()
              this.oplata.work_type = "Loborant Oylik"
              this.isAlert = true
            }
          }
        }
      });
    },
    async getPercentSalay(id) {
      this.user_percent = null
      this.user_salary = null
      try {
        let datas = {
        datetime1: parseInt(
          new Date(this.datas.date1)
            .valueOf()
            .toString()
            .slice(0, 10)
        ),
        datetime2:
          parseInt(
            new Date(this.datas.date2)
              .valueOf()
              .toString()
              .slice(0, 10)
          ) + 86399,
        doctor_id: this.user.doctor_id
      };
      let res = await axios.post("/hisobot/doctor_hisobot", datas)
        if(res.data) {
          console.log(res.data)
          res.data.forEach(item => {
            this.user_percent += parseFloat(item.total_kirim); 
            this.user_percent -= parseFloat(item.total_chiqim); 
          })
          this.oplata.work_type = "Shifokor Percent"
        }
      this.isAlert = this.user_percent
      } catch (error) {
        console.log(error)
      }
    },
    async geLaborantSalay(id) {
      this.user_salary = null
      this.user_percent = null
      try {
        let datas = {
        datetime1: parseInt(
          new Date(this.datas.date1)
            .valueOf()
            .toString()
            .slice(0, 10)
        ),
        datetime2:
          parseInt(
            new Date(this.datas.date2)
              .valueOf()
              .toString()
              .slice(0, 10)
          ) + 86399,
          user_id: this.user.id,
          filial_id: this.user.filial_id
        };
      let res = await axios.post("/hisobot/inspection_hisobot_salary", datas)
        if(res.data) {
          console.log(res.data)
          res.data.forEach(item => {
            this.user_percent += item.total_kirim;
            this.user_percent -= item.total_chiqim;
          })
          this.oplata.work_type = "Loborant Percent"
          this.isAlert = this.user_percent
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.getUser();
  }
};
</script>

<style>
.Arxiv {
  pointer-events: none;
}
.katta {
  background: #379056;
  margin-top: -25px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 700;
  line-height: 40px;
  border-radius: 8px;
  color: #fff;
  text-indent: 15px;
  box-shadow: 5px 8px 10px rgba(100, 100, 111, 0.2) ;
}
.oyna1 .selekt .vs__dropdown-menu {
  height: 200px;
}
.oyna1 {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}
.shirift {
  font-size: 16px;
}
.ustun {
  width: 49%;
}
</style>
