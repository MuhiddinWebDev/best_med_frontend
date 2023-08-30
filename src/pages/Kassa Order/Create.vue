<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <kassa-form :kassaOrder="kassa" :errors="errors"></kassa-form>
            <md-card-content>
              <div class="tugmalar">
                <div>
                  <b-button
                    @click="creatKassa()"
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
import kassaForm from "./Form.vue";
import { required } from "vuelidate/lib/validators";
import moment from "moment";
export default {
  name: "KassaCreate",
  components: {
    kassaForm
  },
  data() {
    return {
      kassa: {
        id: 0,
        expense_id: null,
        date_time: new Date()
          .valueOf()
          .toString()
          .slice(0, 10),
        type: "Naqd",
        price: 0,
        pay_type: "Oylik",
        filial_id:null,
        kasser_id: null,
        comment: "",
        user_id: localStorage.getItem('user.id')
      },
      errors: null
    };
  },
  validations: {
    kassa: {
      type: {
        required
      },
      filial_id:{
        required
      },
      kasser_id:{
        required
      },
      comment: {
        required
      },
      price: {
        required
      },
      expense_id: {
        required
      }
    }
  },
  methods: {
    creatKassa() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "post",
          url: "/kassa_order/create",
          data: self.kassa
        }).then(data => {
          if (data != undefined) {
            data.data.data.date_time = moment(
              Number(data.data.data.date_time)
            ).format("MM/DD/YYYY hh:mm");
            self.$router.push("/kassaa");
          }
        });
      } else {
        self.errors = self.$v.kassa;
      }
    },
    cancel() {
      this.kassa = {
        id: 0,
        expense_id: 0,
        date_time: new Date()
          .valueOf()
          .toString()
          .slice(0, 10),
        type: "Naqt",
        price: 0,
        filial_id: null,
        kasser_id: null,
        comment: ""
      };
    }
  }
};
</script>
<style>
.tugmalar {
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
