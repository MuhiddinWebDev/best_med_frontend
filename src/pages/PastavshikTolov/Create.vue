<template>
  <div>
    <!-- <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid> -->
    <providerPay-form></providerPay-form>
    <!-- <md-card-content>
              <div class="tugmalar">
                <b-button
                  @click="createProviderPay()"
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
        </md-card-content>
      </md-card>
    </div> -->
  </div>
</template>

<script>
// import axios from "axios";
import ProviderPayForm from "./Form.vue";
// import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "ProviderPayCreate",
  components: {
    ProviderPayForm
  }
  // data() {
  //   return {
  //     providerPay: {
  //       type: "Naqt",
  //       pastavchik_id: null,
  //       price: 0,
  //       backlog: 0,
  //       date_time: new Date()
  //         .valueOf()
  //         .toString()
  //         .slice(0, 10)
  //     },
  //     errors: null
  //   };
  // },
  // validations: {
  //   // providerPay: {
  //   //   name: {
  //   //     required,
  //   //     minLength: minLength(4)
  //   //   }
  //   // }
  // },
  // methods: {
  //   createProviderPay() {
  //     let self = this;
  //     if (self.providerPay.type == "Naqt") {
  //       self.providerPay.type = 0;
  //     } else {
  //       self.providerPay.type = 1;
  //     }
  //     this.$v.$touch();
  //     if (this.$v.$invalid == false) {
  //       axios({
  //         method: "post",
  //         url: "/pastavchik_pay/create",
  //         data: self.providerPay
  //       }).then(data => {
  //         if (data != undefined) {
  //           this.$router.push("/provider/pay");
  //         }
  //       });
  //     } else {
  //       this.errors = this.$v.providerPay;
  //     }
  //   },
  //   cancel() {
  //     this.providerPay = {
  //       type: "",
  //       pastavchik_id: null,
  //       price: 0,
  //       backlog: 0,
  //       jami_summa: 100000
  //     };
  //   }
  // }
};
</script>
<style></style>
