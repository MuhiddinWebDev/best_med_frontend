<template>
  <div class="md-layout ml-3">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <tekshiruvBolimlari-form
              :modelvue="tekshiruvBolimlari"
              :errors="errors"
            ></tekshiruvBolimlari-form>
            <md-card-content>
              <div class="tugmalart">
                <div>
                  <b-button
                    @click="createTekshiruvBolimlari()"
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
import { required, minLength } from "vuelidate/lib/validators";
import TekshiruvBolimlariForm from "./Form.vue";
export default {
  name: "TekshiruvBolimlariCreate",
  components: {
    TekshiruvBolimlariForm
  },
  data() {
    return {
      tekshiruvBolimlari: {
        name: "",
        filial_id: null,
      },
      errors: null
    };
  },
  validations: {
    tekshiruvBolimlari: {
      name: {
        required,
        minLength: minLength(3)
      },
      filial_id: {
        required
      },
    }
  },
  methods: {
    createTekshiruvBolimlari() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "post",
          url: "/inspector_category/create",
          data: self.tekshiruvBolimlari
        }).then(data => {
          if (data != undefined) {
            // this.$root.$emit("add_tekshiruvBolimlari", data);
            this.$router.push("tekshiruv-bolimlari");
          }
        });
      } else {
        this.errors = this.$v.tekshiruvBolimlari;
      }
    },
    cancel() {
      this.tekshiruvBolimlari = {
        name: "",
        filial_id: null,
      };
    }
  }
};
</script>
<style>
.tugmalart {
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
