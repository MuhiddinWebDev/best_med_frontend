<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <dorilar-form :modelvue="dorilar" :errors="errors"></dorilar-form>
            <md-card-content>
              <div class="tugmalard">
                <div>
                  <b-button
                    @click="updateDorilar()"
                    class="mr-2 calendar"
                    variant="success"
                  >
                    <b-icon icon="calendar2-plus"></b-icon> Saqlash
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
import DorilarForm from "./Form.vue";
export default {
  name: "DorilarUpdate",
  components: {
    DorilarForm
  },
  data() {
    return {
      dorilar: {
        id: 0,
        name: ""
      },
      errors: null
    };
  },
  validations: {
    dorilar: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    updateDorilar() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "patch",
          url: `/pill/update/` + this.dorilar.id,
          data: self.dorilar
        }).then(data => {
          this.$root.$emit("update_dorilar", this.dorilar.id, data);
          this.$router.push("/dorilar");
        });
      } else {
        this.errors = this.$v.dorilar;
      }
    },
    RowClicked(item) {
      this.$router.push({ path: "/dori-update/" + item.id });
    },
    getDorilar() {
      let self = this;
      axios({
        method: "get",
        url: `/pill/one/` + this.$route.params.id
      }).then(res => {
        self.dorilar = res.data.data;
      });
    },
    cancel() {
      this.$router.push("/dorilar");
    }
  },
  mounted() {
    this.getDorilar();
  }
};
</script>
<style>
.tugmalard {
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
