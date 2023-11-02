<template>
  <div class="parent ml-2">
    <div class="kattar">
      <span>Махсулот ёналтириш</span>
      <b-button class="navbarBtnDanger" variant="danger" @click="Prev()">
        <b-icon icon="x-circle-fill"></b-icon>
      </b-button>
    </div>
    <div class="ikkilik">
      <div style="width: 32%;">
        <label>Бўлим</label>
        <v-select
          label="name"
          v-model="reagentDdepartment.department_id"
          :options="Department"
          :reduce="option => option.id"
        />
      </div>
      <div style="width: 32%; position: relative;">
        <label>Махсулот</label>
        <button class="tabsBtnsMax" variant="success" v-b-modal.OpenModalReag>
          ...
        </button>
        <b-modal id="OpenModalReag" hide-footer title="Махсулот Қўшиш">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <span class="shirift">
              Махсулот
            </span>
            <span style="color: red;">*</span>
            <span v-if="errorReagent !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errorReagent.name.required"
                >Махсулот тўлдирилиши керак</span
              >
              <!-- <span
                    style="color: red; font-size: 9px"
                    v-if="!errorsHarajat.name.minLength"
                    >Harajat kamida 4 ta belgi bo'lisi kerak</span
                  > -->
            </span>
            <b-input type="text" v-model="reagent.name" />
          </div>
          <div class="btnlar">
            <b-button
              class="modalBtn1"
              size="sm"
              style="height: 37px;"
              variant="danger "
              @click="cancelReagent()"
            >
              <b-icon icon="calendar2-x"></b-icon>
              Бекор қилиш
            </b-button>
            <b-button
              class="ml-2 modalBtn"
              variant="success"
              @click="createReagent()"
            >
              <b-icon icon="calendar2-plus"></b-icon>
              Сақлаш
            </b-button>
          </div>
        </b-modal>
        <v-select
          label="name"
          v-model="reagentDdepartment.reagent_id"
          :options="Reagent"
          :reduce="option => option.id"
          @input="getOstatkas"
        />
      </div>
      <div style="width: 32%">
        <label>Сони</label>
        <b-input
          v-model="reagentDdepartment.count"
          style="background: #fff; border: 1px solid #ced4da;"
          type="number"
        ></b-input>
      </div>
      <div style="width: 32%;">
        <label>Филиал</label>
        <v-select
            :options="filials"
            style="width: 100%;"
            v-model="reagentDdepartment.filial_id"
            :reduce="option => option.id"
            label="name"
            placeholder="Филиал танланг..."
          />
      </div>
      <div style="width: 32%;">
        <label>Изоҳ</label>
        <b-input
          v-model="reagentDdepartment.comment"
          style="background: #fff; border: 1px solid #ced4da;"
          type="number"
        ></b-input>
      </div>
      <div style="width: 32%" v-if="qoldiq">
        <label v-if="qoldiq">Қолдиқ</label>
        <b-input
          v-if="qoldiq"
          v-model="qoldiq"
          style="background: #fff; border: 1px solid #ced4da;"
          type="number"
        ></b-input>
      </div>
    </div>
    <div class="tugmalarf mt-3 mr-3">
      <div>
        <b-button
          @click="createReagentDdepartment()"
          class="mr-2 calendar"
          variant="success"
        >
          <b-icon icon="calendar2-plus"></b-icon> Сақлаш
        </b-button>
        <b-button @click="cancel()" class="calendar1" variant="danger">
          <b-icon icon="calendar2-x"></b-icon> Бекор қилиш
        </b-button>
      </div>
    </div>
    <!-- <div class="oyna">
      <span>
        <span class="shirift">Номи</span>
        <span style="color: red;">*</span>
        <span v-if="errors !== null">
          <span style="color: red; font-size: 9px" v-if="!errors.name.required"
            >Номи to'ldirilishi kerak</span
          >
          <span style="color: red; font-size: 9px" v-if="!errors.name.minLength"
            >Номида kamida 4 ta belgi bo'lisi kerak</span
          >
        </span>
      </span>
      <b-input
        style="width: 50%;"
        id="reagentDdepartment-name"
        v-model="reagentDdepartment.name"
        type="text"
      />
    </div> -->
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "reagentDdepartment-form",
  data() {
    return {
      Department: [],
      Reagent: [],
      reagentDdepartment: {
        department_id: null,
        reagent_id: null,
        filial_id: null,
        count: 0,
        datetime: Math.floor(new Date() / 1000)
      },
      reagent: {
        name: ""
      },
      errorReagent: null,
      errors: null,
      filials: [],
      qoldiq: null,
      comment: null
    };
  },
  validations: {
    reagentDdepartment: {
      department_id: {
        required
      },
      reagent_id: {
        required
      }
    },
    reagent: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    Prev() {
      this.$router.push("/reagent/department");
    },
    getDepartment() {
      let self = this;
      axios({
        method: "get",
        url: "/doctor_category/all"
      }).then(res => {
        if (res != undefined) {
          self.Department = res.data.data;
        }
      });
    },
    getReagent() {
      let self = this;
      axios({
        method: "get",
        url: "/reagent/all"
      }).then(res => {
        if (res != undefined) {
          self.Reagent = res.data.data;
        }
      });
    },
    createReagentDdepartment() {
      let self = this;
      this.$v.$touch();
      if (this.$v.reagentDdepartment.$error == false) {
        if (self.$route.name == "Reagent Department Create") {
          axios({
            method: "post",
            url: "/reagent_department/create",
            data: self.reagentDdepartment
          }).then(data => {
            if (data != undefined) {
              this.$router.push("/reagent/department");
            }
          });
        } else if (self.$route.name == "Reagent Department Update") {
          axios({
            method: "patch",
            url: `/reagent_department/update/` + self.reagentDdepartment.id,
            data: self.reagentDdepartment
          }).then(data => {
            if (data != undefined) {
              self.$router.push("reagent/department");
            }
          });
        }
      } else {
        this.errors = this.$v.reagentDdepartment;
      }
    },
    createReagent() {
      let self = this;
      this.$v.$touch();
      if (this.$v.reagent.$error == false) {
        axios({
          method: "post",
          url: "/reagent/create",
          data: self.reagent
        }).then(data => {
          if (data != undefined) {
            self.reagentDdepartment.reagent_id = data.data.data.id;
            self.getReagent();
            self.$bvModal.hide("OpenModalReag");
            self.reagent.name = "";
          }
        });
      } else {
        self.errorReagent = self.$v.reagent;
      }
    },
    getReagentDdepartment() {
      let self = this;
      if (self.$route.name == "Reagent Department Update") {
        axios({
          method: "get",
          url: `/reagent_department/One/` + self.$route.params.id
        }).then(res => {
          if (res != undefined) {
            self.reagentDdepartment = res.data.data;
          }
        });
      }
    },
    cancelReagent() {
      this.reagent = {
        name: ""
      };
    },
    cancel() {
      this.reagentDdepartment = {
        department_id: null,
        reagent_id: null,
        count: 0
      };
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
    getOstatkas(id) {
      let self = this;
      axios({
        method: "get",
        url: "reagent_department/ostatka/" + id
      }).then(res => {
        self.qoldiq = res.data.data;
      });
    }
  },
  mounted() {
    this.getReagentDdepartment();
    this.getReagent();
    this.getDepartment();
    this.getFilial();
  }
};
</script>

<style scoped>
.parent {
  background: #d3e4e7;
  height: 100vh;
  box-sizing: border-box;
}
.tabsBtnsMax {
  position: absolute;
  z-index: 99;
  top: 37px;
  left: calc(100% - 70px);
  color: #b1b1b1;
  font-weight: 700;
  font-size: 17px;
  border: none;
  background-color: white;
}
.tugmalarf {
  display: flex;
  justify-content: right;
  margin-right: 10px;
  margin-bottom: 10px;
}
.calendar {
  box-shadow: 5px 8px 10px rgba(25, 176, 48, 0.5);
}
.calendar1 {
  box-shadow: 5px 8px 10px rgba(176, 25, 25, 0.5);
}
.btnlar {
  justify-content: right;
  display: flex;
  margin-top: 20px;
}
.kattar {
  margin: 0px auto;
  padding: 10px 7px;
  width: 99%;
  background: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 5px 8px 10px rgba(100, 100, 111, 0.2) ;
  display: flex;
  justify-content: space-between;
  color: #3f51b5;
  font-size: 20px;
  font-weight: 700;
  line-height: 40px;
  /* background: #379056;
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
  box-shadow: 5px 8px 10px rgba(100, 100, 111, 0.2) ; */
}
.ikkilik {
  display: flex;
  /* justify-content: space-between; */
  width: 98%;
  flex-wrap: wrap;
  margin: 0 auto 20px;
  margin: 20px auto 0;
  padding: 10px 15px;
  border-radius: 5px;
  /* border: 1px solid #cbc8c8; */
  width: 98%;
  background: #fff;
  display: flex;
  /* height: calc(100vh - 160px); */
  /* height:  */
  justify-content: space-between;
}
.pastavshiktable {
  width: 99%;
  margin: 0 auto;
  background: #fff;
  overflow: auto;
  height: calc(100vh - 260px);
}
.navbarBtnDanger {
  border: 1px solid #fff;
  box-shadow: 5px 8px 10px rgba(176, 25, 25, 0.3);
  background: #e80a18;
  border-radius: 8px;
}
/* .shirift {
  font-size: 16px;
  font-weight: 400;
} */
/* .oyna {
  margin: 10px 0;
  padding: 0 10px;
  position: relative;
} */
</style>
