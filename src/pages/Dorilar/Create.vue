<template>
  <div class="md-layout ml-2">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <dorilar-form :modelvue="dorilar" :errors="errors"></dorilar-form>
            <md-card-content>
              <div class="tugmalard">
                <div>
                  <b-button
                    @click="createDorilar()"
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
import { required, minLength } from "vuelidate/lib/validators";
import axios from "axios";
import DorilarForm from "./Form.vue";
export default {
  name: "DorilarCreate",
  components: {
    DorilarForm
  },
  data() {
    return {
      dorilar: {
        name: ""
      },
      errors: null
    };
  },
  validations: {
    dorilar: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    createDorilar() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "post",
          url: "/pill/create",
          data: self.dorilar
        }).then(data => {
          if (data !== undefined) {
            this.$router.push("dorilar");
          }
        });
      } else {
        this.errors = this.$v.dorilar;
      }
    },
    cancel() {
      this.dorilar = {
        name: ""
      };
      this.$router.go(-1);
    }
  }
};
</script>
<style>
.tugmalard {
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
