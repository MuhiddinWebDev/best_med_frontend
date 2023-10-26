<template>
  <div class="ml-2">
    <div class="katta">
      <button
        style="padding: 4px 10px; margin-right: 10px"
        class="btn"
        @click="Prev()"
      >
        <b-icon style="color: white" icon="house-door-fill"></b-icon>
      </button>
    </div>
    <div class="card shadow mx-3 rounded settings-card">
      <div class="card-body pt-5">
        <div class="row">
          <div class="col-6">
            <div>
              <label>Номи</label>
              <input
                required
                type="text"
                v-model="datas.name"
                placeholder="Номи"
                class="form-control border-bottom-0"
              />
            </div>
            <div class="mt-2">
              <label>Boshlanish vaqti</label>
              <date-picker
                v-model="datas.date1"
                format="DD.MM.YYYY"
                value-type="X"
                type="date"
                placeholder="Вақтдан..."
                style="width: 100%"
                :disabled="true"
              ></date-picker>
            </div>
            <div class="my-2">
              <label>Сарлавҳа 1</label>
              <input
                required
                type="text"
                v-model="datas.header_left"
                placeholder="Сарлавҳа 1"
                class="form-control border-bottom-0"
              />
            </div>
            <label>
              Логотип
            </label>
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="image-fill"></b-icon>
              </b-input-group-prepend>

              <b-form-file
                id="form-image"
                v-model="files"
                @change="onFileChange"
              ></b-form-file>
            </b-input-group>
          </div>
          <div class="col-6">
            <div>
              <label>Чек ёзуви</label>
              <input
                required
                type="text"
                v-model="datas.quote"
                class="form-control border-bottom-0"
                placeholder="Чек ёзуви"
              />
            </div>
            <div class="mt-2">
              <label>Tugash vaqti</label>
              <date-picker
                v-model="datas.date2"
                format="DD.MM.YYYY"
                value-type="X"
                type="date"
                placeholder="Вақтгача..."
                style="width: 100%"
                :disabled="true"
              ></date-picker>
            </div>
            <div class="my-2">
              <label>Сарлавҳа 2</label>
              <input
                required
                type="text"
                v-model="datas.header_right"
                placeholder="Сарлавҳа 2"
                class="form-control border-bottom-0"
              />
            </div>
            <b-img
              :src="datas.logo"
              rounded
              center
              v-if="$route.params.id"
              class="logo-img1"
            >
            </b-img>
          </div>
          <div v-if="localUser.user_name == 'Dasturchi'" class="row pl-3 mt-3">
            <div class="col-9">
              <div
                class="form-check"
                v-for="rule in datas.rules"
                :key="rule.id"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  :checked="rule.checked"
                  :id="rule.id"
                  @change="toggleChecked(rule)"
                />

                <label class="form-check-label">
                  {{ rule.label + " " + rule.price.toLocaleString() }}
                </label>
              </div>
            </div>
            <div class="col mt-2">
              <h4>Umumiy {{ totalPrice  }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <md-card-content>
      <div class="tugmalarb">
        <b-button
          @click="(isUpload = true), create()"
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
import axios from "axios";
export default {
  name: "bemor-form",
  components: { DatePicker },
  inject: ["BASE_URL"],
  data() {
    return {
      datas: {
        name: null,
        logo: null,
        date1: null,
        date2: null,
        quote: null,
        header_left: null,
        header_right: null,
        rules: [],
      },
      isUpload: false,
      files: [],
      localUser: null,
    };
  },
  methods: {
    create() {
      let self = this;
      this.datas.rules = JSON.stringify(this.datas.rules)
      if (true) {
        axios.patch("/settings/id", this.datas).then((data) => {
          if (data) {
            self.$router.push("/settings");
          }
        });
      } else {
        axios.post("/settings", this.datas).then((data) => {
          if (data) {
            self.$router.push("/settings");
          }
        });
      }
    },
    cancel() {
      this.datas = {
        name: null,
        logo: null,
        date1: null,
        date2: null,
        quote: null,
        header_left: null,
        header_right: null,
        rules: [],
      };
    },
    getData() {
      let self = this;
      if (self.$route.path != "/settings/create") {
        axios.get("/settings/id/" + this.$route.params.id).then((res) => {
          if (res) {
            self.datas = res.data.data;
            this.datas.date1 = String(res.data.data.date1);
            this.datas.date2 = String(res.data.data.date2);
            if (!res.data.data.rules || res.data.data.rules == null) {
              this.datas.rules = [
                {
                  id: 1,
                  label: "Registratsiya va kassa",
                  value: "registration || kassa",
                  price: 300000,
                  checked: false,
                },
                {
                  id: 2,
                  label: "Laboratoriya",
                  value: "laboratory",
                  price: 200000,
                  checked: false,
                },
                {
                  id: 3,
                  label: "Doktor",
                  value: "doctor",
                  price: 100000,
                  checked: false,
                },
                {
                  id: 4,
                  label: "Davolanish bo'limi",
                  value: "statsionar",
                  price: 100000,
                  checked: false,
                },
              ];
            }else {
              this.datas.rules = JSON.parse(res.data.data.rules)
            }
          }
        });
      }
    },
    Prev() {
      this.$router.push("/settings");
    },
    onFileChange(e) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("href", file);
      axios.post("uploads/imgs", formData).then((res) => {
        this.datas.logo = this.BASE_URL + res.data.img;
      });
    },
    toggleChecked(rule) {
      rule.checked = !rule.checked;
    },
  },
  mounted() {
    this.getData();
    this.localUser = JSON.parse(localStorage.getItem("user"));
  },
  computed: {
  totalPrice() {
    if(this.datas.rules) {
      return this.datas.rules
        .filter(r => r.checked)
        .reduce((sum, r) => sum + r.price, 0);
    }
    return 0;
  }
}
};
</script>

<style scoped>
.katta {
  background: #379056;
  height: 40px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 700;
  line-height: 40px;
  border-radius: 8px;
  color: #fff;
  text-indent: 15px;
  box-shadow: 5px 8px 10px rgba(100, 100, 111, 0.2);
  width: 96%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  z-index: 2;
  position: relative;
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

.settings-card {
  position: relative;
  margin-top: -30px;
  z-index: 1;
  border-radius: 0.5rem !important;
}

.logo-img1 {
  max-width: 200px;
  max-height: 200px;
  display: inline-block;
  vertical-align: middle;
}
</style>
