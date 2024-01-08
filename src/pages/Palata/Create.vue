<template>
  <div class="md-layout ml-2">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <palata-form :palatas="palata" :errors="errors"></palata-form>
            <md-card-content>
              <div class="tugmalarb">
                <div>
                  <b-button
                    @click="creatPalata()"
                    class="mr-2 calendar"
                    variant="success"
                  >
                    <b-icon icon="calendar2-plus"></b-icon> Сақлаш
                  </b-button>
                  <b-button
                    @click="cancel()"
                    variant="danger"
                    class="calendar1"
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
import PalataForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "PalataCreate",
  components: {
    PalataForm
  },
  data() {
    return {
      palata: {
        name: "",
        price: 0,
        user_id: null,
        filial_id: null
      },
      errors: null
    };
  },
  validations: {
    palata: {
      name: {
        required,
        minLength: minLength(4)
      },
      price: {
        required
      },
      user_id: {
        required
      },
      filial_id: {
        required
      }
    }
  },
  methods: {
    creatPalata() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "post",
          url: "/palata/create",
          data: self.palata
        }).then(data => {
          if (data != undefined) {
            self.$router.push("palata");
          }
        });
      } else {
        self.errors = self.$v.palata;
      }
    },
    cancel() {
      this.palata = {
        name: "",
        price: 0,
        user_id: null,
        filial_id: null
      };
      this.$router.go(-1);
    }
  }
};
</script>
<style>
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
