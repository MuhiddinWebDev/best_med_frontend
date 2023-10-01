<template>
  <div class="md-layout ml-3">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <md-card-content>
              <tekshiruvBolimlari-form
                :modelvue="tekshiruvBolimlari"
                :errors="errors"
              ></tekshiruvBolimlari-form>
              <div class="tugmalart">
                <div>
                  <b-button
                    @click="updateTekshiruvBolimlari()"
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
import TekshiruvBolimlariForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "TekshiruvBolimlariUpdate",
  components: {
    TekshiruvBolimlariForm
  },
  data() {
    return {
      tekshiruvBolimlari: {
        id: 0,
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
    updateTekshiruvBolimlari() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "patch",
          url: `/inspector_category/update/` + self.tekshiruvBolimlari.id,
          data: self.tekshiruvBolimlari
        }).then(data => {
          if (data != undefined) {
            self.$router.push("/tekshiruv-bolimlari");
          }
        });
      } else {
        this.errors = this.$v.tekshiruvBolimlari;
      }
    },

    getTekshiruvBolimlari() {
      let self = this;
      axios({
        method: "get",
        url: `/inspector_category/one/` + this.$route.params.id
      }).then(res => {
        self.tekshiruvBolimlari = res.data.data;
      });
    },
    cancel() {
      this.tekshiruvBolimlari = {
        name: "",
        filial_id: null,
      };
    }
  },
  mounted() {
    this.getTekshiruvBolimlari();
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
