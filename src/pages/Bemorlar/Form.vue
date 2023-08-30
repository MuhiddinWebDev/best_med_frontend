<template>
  <div>
    <div>
      <div class="katta">
        <span>Бемор</span>
        <button
          style="padding: 4px 10px; margin-right: 10px"
          class="btn"
          @click="Prev()"
        >
          <b-icon style="color: white" icon="house-door-fill"> </b-icon>
        </button>
      </div>
      <div class="oyna1">
        <div style="width: 49%;">
          <label>
            Фамилия
            <span style="color: red;">*</span>
            <span v-if="errors != null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.lastname.required"
                >Фамилия тўлдирилиши керак</span
              >
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.lastname.minLength"
                >Фамилияда камида 4 та белги бўлиши керак</span
              >
            </span>
          </label>
          <b-input
            type="text"
            style="background: #fff; border: 1px solid #ced4da;"
            v-model="bemor.lastname"
            placeholder="Фамилияни тўлдиринг"
            @input="fullName"
          ></b-input>

          <label>
            Исми
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.name.required"
                >Исми тўлдирилиши керак</span
              >
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.name.minLength"
                >Исмида камида 3 та белги бўлиши керак</span
              >
            </span>
          </label>
          <b-input
            type="text"
            style="background: #fff; border: 1px solid #ced4da;"
            v-model="bemor.name"
            placeholder="Исмини тўлдиринг"
            @input="fullName"
          >
          </b-input>

          <label>
            Отасининг исми
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.patronymic.minLength"
                >Отасининг исмида камида 3 та белги бўлиши керак</span
              >
            </span>
          </label>
          <b-input
            style="background: #fff; border: 1px solid #ced4da;"
            type="text"
            v-model="bemor.patronymic"
            placeholder="Отасининг исмини тўлдиринг"
            @input="fullName"
          ></b-input>

          <div
            style="display: flex; justify-content: space-between; width: 100%;"
          >
            <div style="width: 100%;">
              <label>
                Туғилган сана
                <span style="color: red;">*</span>
                <span v-if="errors !== null">
                  <span
                    style="color: red; font-size: 9px"
                    v-if="!errors.birthday.required"
                    >Туғилган сана тўлдирилиши керак</span
                  >
                </span>
              </label>
              <date-picker
                style="width: 100%;"
                v-model="bemor.birthday"
                placeholder="Кун.Ой.Йил"
                format="DD.MM.YYYY"
                value-type="X"
                type="date"
                :lang="lang"
              ></date-picker>
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; width: 100%;"
          >
            <div>
              <b-form-group>
                <label>
                  Жинси
                  <span style="color: red;">*</span>
                  <span v-if="errors !== null">
                    <span
                      style="color: red; font-size: 9px"
                      v-if="!errors.gender.required"
                      >Жинси танланиши керак</span
                    >
                  </span>
                </label>
                <b-row style="margin-top: -10px;">
                  <b-col>
                    <b-form-radio
                      name="some-radios"
                      v-model="bemor.gender"
                      value="Erkak"
                      >Еркак</b-form-radio
                    >
                  </b-col>

                  <b-col>
                    <b-form-radio
                      name="some-radios"
                      v-model="bemor.gender"
                      value="Ayol"
                      >Аёл</b-form-radio
                    >
                  </b-col>
                </b-row>
              </b-form-group>
            </div>
            <div style="width: 220px;">
              <span>Имтиёз</span>
              <v-select
                style="width: 100%;"
                :disabled="
                  $route.name == 'User Profile Create' &&
                    user.patient_id != null
                "
                :options="Imtiyoz"
                :components="{ Deselect }"
                label="name"
                v-model="bemor.imtiyoz_type"
              />
            </div>
            <div style="margin-top: 20px;">
              <label>
                <b-form-checkbox
                  :value="true"
                  :unchecked-value="false"
                  v-model="bemor.citizen"
                >
                  <span>Фуқаролиги</span>
                </b-form-checkbox>
              </label>
            </div>
          </div>
        </div>

        <div class="bbbbbb" style="width: 49%;">
          <label>Вилоят</label>
          <v-select
            style="background: #ffff;"
            :options="region"
            label="name"
            @input="PostRegion"
            :reduce="option => option.id"
            v-model="bemor.region_id"
            placeholder="Вилоятни тўлдиринг"
          />

          <label class="mt-1">Туман</label>
          <v-select
            style="background: #ffff;"
            :options="district"
            label="name"
            :reduce="option => option.id"
            v-model="bemor.district_id"
            placeholder="Туманни тўлдиринг"
          />
          <label>Уй</label>
          <b-input
            style="background: #fff; border: 1px solid #ced4da;"
            type="text"
            v-model="bemor.addres"
            placeholder="Уйни тўлдиринг"
          ></b-input>
          <b-row>
            <b-col>
              <label>
                Тел рақами
              </label>
              <label>
                Тел рақами
                <span style="color: red;">*</span>
                <span v-if="errors !== null">
                  <span
                    style="color: red; font-size: 9px"
                    v-if="!errors.phone.required"
                    >Тел рақами тўлдирилиши керак</span
                  >
                  <span
                    style="color: red; font-size: 9px"
                    v-if="!errors.phone.minLength"
                    >Тел рақамида камида 9 та белги бўлиши керак</span
                  >
                </span>
              </label>
              <b-input
                style="background: #fff; border: 1px solid #ced4da;"
                type="number"
                v-model="bemor.phone"
                placeholder="+998XXXXXX"
              ></b-input>
            </b-col>

            <!-- <b-col>
              <label>
                Пасспорт рақами
              </label>
              <b-input
                style="background: #fff; border: 1px solid #ced4da;"
                type="text"
                v-model="bemor.passport"
                placeholder="AB1234567"
              ></b-input>
            </b-col> -->
          </b-row>
        </div>

        <!-- <div class="ustun">
          <span>
            <span class="shirift">Dori nomi</span>
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.name.required"
                >Bemor to'ldirilishi kerak</span
              >
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.name.minLength"
                >Bemorda kamida 4 ta belgi bo'lisi kerak</span
              >
            </span>
          </span>
          <b-input id="bemor-name" v-model="bemor.name" type="text" />
        </div> -->
      </div>
    </div>
    <md-card-content>
      <div class="tugmalarb">
        <b-button
          @click="createBemor()"
          class="mr-2 calendar"
          variant="success"
        >
          <b-icon icon="calendar2-plus"></b-icon> Сақлаш
        </b-button>
        <b-button @click="cancel()" variant="danger" class="calendar1">
          <b-icon icon="calendar2-x"></b-icon> Бекор қилиш
        </b-button>
      </div>
    </md-card-content>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { required, minLength } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "bemor-form",
  components: { DatePicker },
  // props: ["bemor", "errors"],
  data() {
    return {
      bemor: {
        fullname: "",
        name: "",
        lastname: "",
        patronymic: "",
        region_id: 12,
        imtiyoz_type: "Imtiyozsiz",
        district_id: null,
        phone: "",
        passport: "",
        addres: "",
        gender: "Ayol",
        citizen: false,
        percent: 0,
        birthday: null
      },
      errors: null,
      district: [],
      region: [],
      Deselect: {
        render: createElement => createElement("span", "")
      },
      Imtiyoz: ["Imtiyozli", "Imtiyozsiz"],
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      }
    };
  },
  validations: {
    bemor: {
      lastname: {
        required,
        minLength: minLength(4)
      },
      name: {
        required,
        minLength: minLength(3)
      },
      patronymic: {
        minLength: minLength(3)
      },
      phone: {
        required,
        minLength: minLength(9)
      },
      birthday: {
        required
      },
      gender: {
        required
      },
      imtiyoz_type: {
        required
      }
    }
  },
  methods: {
    createBemor() {
      let self = this;
      this.$v.$touch();
      if (self.$v.$invalid == false) {
        if (self.$route.name == "Bemor-create") {
          axios({
            method: "post",
            url: "/patient/create",
            data: self.bemor
          }).then(data => {
            if (data) {
              self.$router.push("/bemor");
            }
          });
        } else if (self.$route.name == "Bemor-update") {
          axios({
            method: "patch",
            url: `/patient/update/` + self.bemor.id,
            data: self.bemor
          }).then(data => {
            if (data) {
              self.$router.push("/bemor");
            }
          });
        }
      } else {
        this.errors = this.$v.bemor;
      }
    },
    cancel() {
      this.bemor = {
        fullname: "",
        name: "",
        lastname: "",
        patronymic: "",
        region_id: null,
        imtiyoz_type: "Imtiyozsiz",
        district_id: null,
        phone: "",
        passport: "",
        addres: "",
        gender: "Ayol",
        citizen: false,
        percent: 0,
        birthday: null
      };
    },
    getBemor() {
      let self = this;
      if (this.$route.name == "Bemor-update") {
        axios({
          method: "get",
          url: `/patient/one/` + this.$route.params.id
        }).then(res => {
          if (res) {
            self.bemor = res.data.data;
            this.getRegion();
          }
        });
      }
    },
    getRegion() {
      let self = this;
      axios({
        method: "get",
        url: "/region/all"
      }).then(res => {
        self.region = res.data.data;
        if (self.bemor.region_id !== 0) {
          for (let index = 0; index < self.region.length; index++) {
            const element = self.region[index];
            if (element.id == self.bemor.region_id) {
              self.district = element.district;
            }
          }
        }
      });
    },
    PostRegion() {
      this.district = [];
      this.bemor.district_id = null;
      // if (this.$route.name == "User Profile Update") {
      for (let index = 0; index < this.region.length; index++) {
        const element = this.region[index];
        if (element.id == this.bemor.region_id) {
          this.district = element.district;
        }
      }
      // }
    },
    fullName() {
      this.bemor.fullname =
        this.bemor.lastname +
        " " +
        this.bemor.name +
        " " +
        this.bemor.patronymic;
    },
    Prev() {
      this.$router.push("/bemor");
    }
  },
  mounted() {
    this.getRegion();
    this.getBemor();
    // this.PostRegion()
  }
};
</script>
<style>
.katta {
  background: #007bff;
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
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.5);
}
.oyna1 {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}
.shirift {
  font-size: 16px;
}
.bbbbbb .vs__dropdown-menu {
  height: 200px;
}
.ustun {
  width: 49%;
}
.tugmalarb {
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
</style>
