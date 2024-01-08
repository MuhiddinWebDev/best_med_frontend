<template>
  <div class="md-layout ml-2">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <filial-form :modelvue="filial" :errors="errors"></filial-form>
            <md-card-content>
              <div class="tugmalarr">
                <div>
                  <b-button
                    @click="update()"
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
import FilialForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "FilialUpdate",
  components: {
    FilialForm
  },
  data() {
    return {
      filial: {
        id: 0,
        name: ""
      },
      errors: null
    };
  },
  validations: {
    filial: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    update() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "patch",
          url: `/filial/update/` + self.filial.id,
          data: self.filial
        }).then(data => {
          if (data != undefined) {
            self.$router.push("/filial");
          }
        });
      } else {
        self.errors = self.$v.filial;
      }
    },

    get() {
      let self = this;
      axios({
        method: "get",
        url: `/filial/One/` + self.$route.params.id
      }).then(res => {
        self.filial = res.data.data;
      });
    },
    cancel() {
      this.filial = {
        name: ""
      };
      this.$router.go(-1);
    }
  },
  mounted() {
    this.get();
  }
};
</script>
<style>
.tugmalarr {
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
