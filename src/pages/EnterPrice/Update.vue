<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <kirish-narxi-form
              :modelvue="KirishNarxi"
              :errors="errors"
            ></kirish-narxi-form>
            <md-card-content>
              <div class="tugmalarsh">
                <div>
                  <b-button
                    @click="updateKirishNarxi()"
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
import KirishNarxiForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "KirishNarxiUpdate",
  components: {
    KirishNarxiForm,
  },
  data() {
    return {
      KirishNarxi: {
        id: 0,
        odam_price: 0,
        moshina_price: 0,
      },
      errors: null,
    };
  },
  validations: {
    KirishNarxi: {
      odam_price: {
        required,
        minLength: minLength(3),
      },
      moshina_price: {
        minLength: minLength(4),
      },
    },
  },
  methods: {
    updateKirishNarxi() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "patch",
          url: `/kirish_summa/update/` + self.KirishNarxi.id,
          data: self.KirishNarxi,
        }).then((data) => {
          if (data != undefined) {
            self.$router.push("/enter-price");
          }
        });
      } else {
        self.errors = self.$v.KirishNarxi;
      }
    },

    getKirishNarxi() {
      let self = this;
      axios({
        method: "get",
        url: `/kirish_summa/one/` + self.$route.params.id,
      }).then((res) => {
        self.KirishNarxi = res.data.data;
      });
    },
    cancel() {
      this.KirishNarxi = {
        odam_price: 0,
        moshina_price: 0,
      };
    },
  },
  mounted() {
    this.getKirishNarxi();
  },
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
