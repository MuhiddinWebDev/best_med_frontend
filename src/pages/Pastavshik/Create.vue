<template>
  <div class="md-layout ml-2">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <provider-form
              :modelvue="provider"
              :errors="errors"
            ></provider-form>
            <md-card-content>
              <div class="tugmalarp">
                <div>
                  <b-button
                    @click="createProvider()"
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
import ProviderForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "ProviderCreate",
  components: {
    ProviderForm
  },
  data() {
    return {
      provider: {
        name: "",
        filial_id: JSON.parse(localStorage.getItem('filial_id'))
      },
      errors: null
    };
  },
  validations: {
    provider: {
      name: {
        required,
        minLength: minLength(4)
      },
    }
  },
  methods: {
    createProvider() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "post",
          url: "/pastavchik/create",
          data: self.provider
        }).then(data => {
          if (data != undefined) {
            this.$router.push("/provider");
          }
        });
      } else {
        this.errors = this.$v.provider;
      }
    },
    cancel() {
      this.provider = {
        name: "",
      };
    }
  }
};
</script>
<style>
.tugmalarp {
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
