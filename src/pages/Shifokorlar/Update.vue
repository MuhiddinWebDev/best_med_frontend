<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <shifokor-form
              :modelvue="shifokor"
              :errors="errors"
            ></shifokor-form>
            <md-card-content>
              <div class="tugmalarsh">
                <div>
                  <b-button
                    @click="updateShifokor()"
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
import ShifokorForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "ShifokorUpdate",
  components: {
    ShifokorForm
  },
  data() {
    return {
      shifokor: {
        id: 0,
        name: "",
        category_id: null
      },
      errors: null
    };
  },
  validations: {
    shifokor: {
      name: {
        required,
        minLength: minLength(4)
      },
      category_id: {
        required
      }
    }
  },
  methods: {
    updateShifokor() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "patch",
          url: `/doctor/update/` + self.shifokor.id,
          data: self.shifokor
        }).then(data => {
          if (data != undefined) {
            self.$router.push("/shifokor");
          }
        });
      } else {
        self.errors = self.$v.shifokor;
      }
    },

    getShifokor() {
      let self = this;
      axios({
        method: "get",
        url: `/doctor/one/` + self.$route.params.id
      }).then(res => {
        self.shifokor = res.data;
      });
    },
    cancel() {
      this.shifokor = {
        name: "",
        category_id: null
      };
    }
  },
  mounted() {
    this.getShifokor();
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
