<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <sorilar-form :modelvue="sorilar" :errors="errors"></sorilar-form>
            <md-card-content>
              <div class="tugmalarx">
                <div>
                  <b-button
                    @click="createSori()"
                    class="mr-2 calendar"
                    variant="success"
                  >
                    <b-icon icon="calendar2-plus"></b-icon> Сақлаш
                  </b-button>
                  <b-button
                    @click="cancel()"
                    class="calendar1"
                    variant="danger"
                  >
                    <b-icon icon="calendar2-x"></b-icon> Бекор қилиш
                  </b-button>
                </div>
              </div>
            </md-card-content>
          </b-container>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SorilarForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "SorilarCreate",
  components: {
    SorilarForm
  },
  data() {
    return {
      sorilar: {
        name: "",
        price: 0
      },
      errors: null
    };
  },
  validations: {
    sorilar: {
      name: {
        required,
        minLength: minLength(4)
      },
      price: {
        required
      }
    }
  },
  methods: {
    createSori() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "post",
          url: "/sori/create",
          data: self.sorilar
        }).then(data => {
          if (data != undefined) {
            this.$root.$emit("add_sorilar", data);
          }
          this.$router.push("sori");
        });
      } else {
        this.errors = this.$v.sorilar;
      }
    },
    cancel() {
      this.sorilar = {
        name: "",
        price: 0
      };
    }
  }
};
</script>
<style>
.tugmalarx {
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
