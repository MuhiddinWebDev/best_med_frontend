<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <reagent-form :modelvue="reagent" :errors="errors"></reagent-form>
            <md-card-content>
              <div class="tugmalarr">
                <div>
                  <b-button
                    @click="createReagent()"
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
import ReagentForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "ReagentCreate",
  components: {
    ReagentForm
  },
  data() {
    return {
      reagent: {
        name: ""
      },
      errors: null
    };
  },
  validations: {
    reagent: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    createReagent() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "post",
          url: "/reagent/create",
          data: self.reagent
        }).then(data => {
          if (data != undefined) {
            this.$router.push("/reagent");
          }
        });
      } else {
        this.errors = this.$v.reagent;
      }
    },
    cancel() {
      this.reagent = {
        name: ""
      };
    }
  }
};
</script>
<style>
.tugmalarr {
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
