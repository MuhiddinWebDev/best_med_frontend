<template>
  <div>
    <!-- <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card> -->
    <!-- <md-card-content>
          <b-container fluid> -->
    <providerPay-form></providerPay-form>
    <!-- <md-card-content>
              <div class="tugmalar" :class="{ Arxive: $route.name == 'Provider Document' }">
                <b-button
                  @click="updateProviderPay()"
                  class="mr-2 calendar"
                  variant="success"
                >
                  <b-icon icon="calendar2-plus"></b-icon> Сақлаш
                </b-button>
                <b-button @click="cancel()" class="calendar1" variant="danger">
                  <b-icon icon="calendar2-x"></b-icon> Бекор қилиш
                </b-button>
              </div>
            </md-card-content> -->
    <!-- </b-container>
        </md-card-content> -->
    <!-- </md-card>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import ProviderPayForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "ProviderPayUpdate",
  components: {
    ProviderPayForm
  },
  data() {
    return {
      providerPay: {
        type: 0,
        pastavchik_id: null,
        price: 0,
        backlog: 0,
        date_time: 0
      },
      errors: null
    };
  },
  validations: {
    providerPay: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    updateProviderPay() {
      let self = this;
      if (self.providerPay.type == "Naqt") {
        self.providerPay.type = 0;
      } else {
        self.providerPay.type = 1;
      }
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "patch",
          url: `/pastavchik_pay/update/` + self.providerPay.id,
          data: self.providerPay
        }).then(data => {
          if (data != undefined) {
            self.$router.push("/provider/pay");
          }
        });
      } else {
        self.errors = self.$v.providerPay;
      }
    },

    getProviderPay() {
      let self = this;
      axios({
        method: "get",
        url: `/pastavchik_pay/One/` + self.$route.params.id
      }).then(res => {
        if (res != undefined) {
          if (res.data.data.type == 0) {
            res.data.data.type = "Naqt";
          } else {
            res.data.data.type = "Plastik";
          }
          self.providerPay = res.data.data;
        }
      });
    },
    cancel() {
      this.providerPay = {
        type: "",
        pastavchik_id: null,
        price: 0,
        backlog: 0,
        jami_summa: 0
      };
    }
  },
  mounted() {
    this.getProviderPay();
  }
};
</script>
<style>
.calendar {
  box-shadow: 5px 8px 10px rgba(25, 176, 48, 0.5);
}
.calendar1 {
  box-shadow: 5px 8px 10px rgba(176, 25, 25, 0.5);
}
.Arxive {
  pointer-events: none;
}
</style>
