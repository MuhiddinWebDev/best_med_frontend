<template>
  <div class="md-layout ml-2">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <oplata-form :oplata="oplata" :errors="errors"></oplata-form>
            <md-card-content>
              <div class="tugmalar mt-2">
                <div>
                  <b-button
                    @click="createOplata()"
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
import OplataForm from "./Form.vue";
export default {
  name: "OplataCreate",
  components: {
    OplataForm
  },
  data() {
    return {
      oplata: {
        id: 0,
        name: "",
        user_id: null,
        doctor_id: null,
        date_time: new Date()
          .valueOf()
          .toString()
          .slice(0, 10),
        price: 0,
        type: 0
      },
      errors: null
    };
  },
  validations: {
    oplata: {
      name: {
        required,
        minLength: minLength(4)
      },
      user_id: {
        required
      },
      price: {
        required
      },
      type: {
        required
      },
      date_time: {
        required
      }
    }
  },
  methods: {
    createOplata() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "post",
          url: "/uplata/create",
          data: self.oplata
        }).then(data => {
          if (data !== undefined) {
            self.$router.push("/oplata");
          }
        });
      } else {
        self.errors = self.$v.oplata;
      }
    },
    cancel() {
      this.oplata = {
        name: "",
        user_id: null,
        doctor_id: null,
        price: 0,
        type: 0
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
