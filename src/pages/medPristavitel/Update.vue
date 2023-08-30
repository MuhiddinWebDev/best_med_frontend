<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <med-pristavitel-form
              :modelvue="medPristavitel"
              :errors="errors"
            ></med-pristavitel-form>
            <md-card-content>
              <div class="tugmalarm">
                <div>
                  <b-button
                    @click="updateMedPristavitel()"
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
import MedPristavitelForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "MedPristavitelUpdate",
  components: {
    MedPristavitelForm
  },
  data() {
    return {
      medPristavitel: {
        id: 0,
        name: "",
        bonus: 0
      },
      errors: null
    };
  },
  validations: {
    medPristavitel: {
      name: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    updateMedPristavitel() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "patch",
          url: `/med_direct/update/` + self.medPristavitel.id,
          data: self.medPristavitel
        }).then(data => {
          if (data != undefined) {
            self.$router.push("/medpritavitel");
          }
        });
      } else {
        self.errors = self.$v.medPristavitel;
      }
    },

    getMedPristavitel() {
      let self = this;
      axios({
        method: "get",
        url: `/med_direct/one/` + self.$route.params.id
      }).then(res => {
        self.medPristavitel = res.data.data;
      });
    },
    cancel() {
      this.medPristavitel = {
        name: "",
        bonus: 0
      };
    }
  },
  mounted() {
    this.getMedPristavitel();
  }
};
</script>
<style>
.tugmalarm {
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
