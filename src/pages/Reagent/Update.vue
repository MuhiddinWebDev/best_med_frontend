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
                    @click="updateReagent()"
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
  name: "ReagentUpdate",
  components: {
    ReagentForm
  },
  data() {
    return {
      reagent: {
        id: 0,
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
    updateReagent() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "patch",
          url: `/reagent/update/` + self.reagent.id,
          data: self.reagent
        }).then(data => {
          if (data != undefined) {
            self.$router.push("/reagent");
          }
        });
      } else {
        self.errors = self.$v.reagent;
      }
    },

    getReagent() {
      let self = this;
      axios({
        method: "get",
        url: `/reagent/One/` + self.$route.params.id
      }).then(res => {
        self.reagent = res.data.data;
      });
    },
    cancel() {
      this.reagent = {
        name: ""
      };
    }
  },
  mounted() {
    this.getReagent();
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
