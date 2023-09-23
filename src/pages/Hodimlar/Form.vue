<template>
  <div>
    <div class="katta">
      <span>Ходим</span>
      <button
        style="padding: 4px 10px; margin-right: 10px"
        class="btn"
        @click="Prev()"
      >
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>
    <div class="oyna1">
      <div class="ustun">
        <div>
          <span>
            Ф.И.Ш
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.user_name.required"
                >Ф.И.Ш тўлдирилиши керак</span
              >
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.user_name.minLength"
                >Ф.И.Ш да камида 4 та белги бўлиши керак</span
              >
            </span>
          </span>
          <b-input v-model="modelvue.user_name" type="text" />
        </div>

        <div>
          <span>
            Филиал
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.filial_id.required"
                >Филиал танлаш шарт</span
              >
            </span>
          </span>
          <v-select
            :options="filials"
            label="name"
            :reduce="option => option.id"
            v-model="modelvue.filial_id"
            @input="getXonalar"
          />
        </div>

        <div>
          <span>
            Тўлов тури
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.pay_type.required"
                >Тўлов тури тўлдирилиши керак</span
              >
            </span>
          </span>
          <v-select
            :options="tolovTuri"
            label="name"
            v-model="modelvue.pay_type"
          />
        </div>
        <div v-if="modelvue.pay_type == 'Oylik'">
          <span>Иш ҳаққи</span>
          <vue-numeric
            style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 3px;"
            v-model="modelvue.salary"
            separator="space"
            :precision="2"
          ></vue-numeric>
        </div>
        <div v-if="modelvue.pay_type == 'Foiz'">
          <span>Иш ҳаққи</span>
          <vue-numeric
            style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 3px;"
            v-model="modelvue.percent"
            separator="space"
          ></vue-numeric>
        </div>
      </div>

      <div class="ustun">
        <div>
          <span>
            Парол
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.password.required"
                >Парол тўлдирилиши керак</span
              >
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.password.minLength"
                >Паролда камида 6 та белги бўлиши керак</span
              >
            </span>
          </span>
          <b-input v-model="modelvue.password" type="password" />
        </div>

        <div>
          <span>
            Хона
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.room_id.required"
                >Хона тўлдирилиши керак</span
              >
            </span>
          </span>
          <v-select
            :options="xonalar"
            label="name"
            :reduce="option => option.id"
            v-model="modelvue.room_id"
          />
        </div>

        <div>
          <span>
            Ҳуқуқи
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.role.required"
                >Ҳуқуқи тўлдирилиши керак</span
              >
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.role.minLength"
                >Ҳуқуқида камида 4 та белги бўлиши керак</span
              >
            </span>
          </span>
          <v-select :options="category" label="name" v-model="modelvue.role" />
        </div>

        <div v-if="modelvue.role == 'Shifokor'">
          <span>Шифокор</span>
          <v-select
            :options="Shifokor"
            label="name"
            v-model="modelvue.doctor_id"
            :reduce="doctor => doctor.id"
          />
        </div>

        <div v-if="modelvue.role == 'Loborant'">
          <span>Текширув бўлимлари</span>
          <v-select
            :options="tekshiruvBolimlari"
            label="name"
            v-model="modelvue.inspection_category_id"
            :reduce="inspection => inspection.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "edit-profile-form",
  props: ["modelvue", "errors"],
  data() {
    return {
      hodimlar: [],
      Shifokor: [],
      filials: [],
      tekshiruvBolimlari: [],
      xonalar: [],
      category: ["Registrator", "Shifokor", "Loborant", "Admin", "Kasser"],
      tolovTuri: ["Foiz", "Oylik"],
      numArr:[]
    };
  },
  methods: {
    home() {
      this.modelvue = {
        user_name: "",
        pay_type: "",
        room_id: "",
        filial_id: "",
        salary: "",
        password: "",
        role: "",
        doctor_id: ""
      };
    },
    getXonalar(getId) {
      let self = this;
      axios({
        method: "post",
        url: "/room/filialById",
        data: {
          filial_id: getId ? getId : self.modelvue.filial_id 
        }
      }).then(res => {
        self.xonalar = res.data.data;
      });
    },

    getInspection_category() {
      let self = this;
      axios({
        method: "get",
        url: "/inspector_category/all"
      }).then(res => {
        self.tekshiruvBolimlari = res.data.data;
      });
    },
    Prev() {
      this.$router.push("/hodimlar");
    },
    getDoctor() {
      let self = this;
      axios({
        method: "get",
        url: "/doctor/all"
      }).then(res => {
        self.Shifokor = res.data;
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
    }
  },
   mounted() {
     this.getInspection_category();
     this.getDoctor();
     this.getFilial();
     setTimeout(()=>{
       this.getXonalar(this.modelvue.filial_id);
     },500)
  },
 
};
</script>
<style>
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
