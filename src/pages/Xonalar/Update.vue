<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <xonalar-form :modelvue="xonalar" :errors="errors"></xonalar-form>
            <md-card-content>
              <div class="tugmalarx">
                <div>
                  <b-button
                    @click="updateXonalar()"
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
  name: "XonalarUpdate",
  components: {
    XonalarForm
  },
  data() {
    return {
      xonalar: {
        id: 0,
        name: ""
      },
      errors: null
    };
  },
  validations: {
    xonalar: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    updateXonalar() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "patch",
          url: `/room/update/` + self.xonalar.id,
          data: self.xonalar
        }).then(data => {
          if (data != undefined) {
            self.$router.push("/xonalar");
          }
        });
      } else {
        self.errors = self.$v.xonalar;
      }
    },

    getXonalar() {
      let self = this;
      axios({
        method: "get",
        url: `/room/one/` + this.$route.params.id
      }).then(res => {
        self.xonalar = res.data.data;
      });
    },
    cancel() {
      this.xonalar = {
        name: ""
      };
    }
  },
  mounted() {
    this.getXonalar();
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
