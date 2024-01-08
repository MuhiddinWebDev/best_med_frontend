<template>
  <div class="md-layout ml-2">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <naprovitel-form
              :modelvue="naprovitel"
              :errors="errors"
            ></naprovitel-form>
            <md-card-content>
              <div class="tugmalarn">
                <div>
                  <b-button
                    @click="createNaprovitel()"
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
import NaprovitelForm from "./Form.vue";
export default {
  name: "NaprovitelCreate",
  components: {
    NaprovitelForm
  },
  data() {
    return {
      naprovitel: {
        name: "",
        // med_id: null,
        bonus: 0,
        filial_id: null,
      },
      errors: null
    };
  },
  validations: {
    naprovitel: {
      name: {
        required,
        minLength: minLength(4)
      },
      bonus: {
        required
      },
      filial_id: {
        required
      },
      // med_id: {
      //   required
      // }
    }
  },
  methods: {
    createNaprovitel() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "post",
          url: "/direct/create",
          data: self.naprovitel
        }).then(data => {
          if (data !== undefined) {
            self.$router.push("/naprovitel");
          }
        });
      } else {
        self.errors = self.$v.naprovitel;
      }
    },
    cancel() {
      this.naprovitel = {
        name: "",
        // med_id: null,
        bonus: 0,
        filial_id: null,
      };
      this.$router.go(-1);
    }
  }
};
</script>
<style>
.tugmalarn {
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
