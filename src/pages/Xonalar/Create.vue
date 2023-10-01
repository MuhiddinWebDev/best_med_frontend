<template>
  <div class="md-layout ml-3">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <xonalar-form :modelvue="xonalar" :errors="errors"></xonalar-form>
            <md-card-content>
              <div class="tugmalarx mt-3">
                <div>
                  <b-button
                    @click="createXonalar()"
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
import XonalarForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "XonalarCreate",
  components: {
    XonalarForm
  },
  data() {
    return {
      xonalar: {
        name: "",
        filial_id: null
      },
      errors: null
    };
  },
  validations: {
    xonalar: {
      name: {
        required,
        minLength: minLength(4)
      },
      filial_id: {
        required
      }
    }
  },
  methods: {
    createXonalar() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "post",
          url: "/room/create",
          data: self.xonalar
        }).then(data => {
          if (data != undefined) {
            this.$root.$emit("add_xonalar", data);
            this.$router.push("xonalar");
          }
        });
      } else {
        this.errors = this.$v.xonalar;
      }
    },
    cancel() {
      this.xonalar = {
        name: "",
        filial_id: null
      };
    }
  }
};
</script>
<style>
.tugmalarx {
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
