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
                    @click="updateBassenNarxi()"
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
        price: 0,
      },
      errors: null,
    };
  },
  validations: {
    KirishNarxi: {
      price: {
        required,
        minLength: minLength(3),
      },
    },
  },
  methods: {
    updateBassenNarxi() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "patch",
          url: `/bassen/update/` + self.KirishNarxi.id,
          data: self.KirishNarxi,
        }).then((data) => {
          if (data != undefined) {
            self.$router.push("/bassen-price");
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
        url: `/bassen/one/` + self.$route.params.id,
      }).then((res) => {
        self.KirishNarxi = res.data.data;
      });
    },
    cancel() {
      this.KirishNarxi = {
        price: 0,
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
