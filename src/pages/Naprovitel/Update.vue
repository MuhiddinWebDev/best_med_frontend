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
              <div class="tugmalarsh">
                <div>
                  <b-button
                    @click="updateNaprovitel()"
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
  name: "NaprovitelUpdate",
  components: {
    NaprovitelForm
  },
  data() {
    return {
      naprovitel: {
        id: 0,
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
        required,
      },
      filial_id: {
        required,
      },
      // med_id: {
      //   required
      // }
    }
  },
  methods: {
    updateNaprovitel() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "patch",
          url: `/direct/update/` + self.naprovitel.id,
          data: self.naprovitel
        }).then(data => {
          if (data != undefined) {
            self.$router.push("/naprovitel");
          }
        });
      } else {
        self.errors = self.$v.naprovitel;
      }
    },
    getNaprovitel() {
      let self = this;
      axios({
        method: "get",
        url: `/direct/one/` + self.$route.params.id
      }).then(res => {
        if (res != undefined) {
          self.naprovitel = res.data.data;
        }
      });
    },
    cancel() {
      this.naprovitel = {
        name: "",
        // med_id: null,
        bonus: 0
      };
    }
  },
  mounted() {
    this.getNaprovitel();
  }
};
</script>
<style>
.tugmalarsh {
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
