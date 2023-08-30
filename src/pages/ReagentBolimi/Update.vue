<template>
  <div>
    <!-- <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid> -->
    <reagent-ddepartment-form></reagent-ddepartment-form>
    <!-- <md-card-content>
              <div class="tugmalar">
                <b-button
                  @click="updateReagentDdepartment()"
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
import ReagentDdepartmentForm from "./Form.vue";
// import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "ReagentDdepartmentUpdate",
  components: {
    ReagentDdepartmentForm
  }
  // data() {
  //   return {
  //     reagentDdepartment: {
  //       department_id: null,
  //       reagentDdepartment_id: null,
  //       count: 0
  //     },
  //     errors: null
  //   };
  // },
  // validations: {
  //   reagentDdepartment: {
  //     name: {
  //       required,
  //       minLength: minLength(4)
  //     }
  //   }
  // },
  // methods: {
  //   updateReagentDdepartment() {
  //     let self = this;
  //     this.$v.$touch();
  //     if (this.$v.$invalid == false) {
  //       axios({
  //         method: "patch",
  //         url: `/reagent_department/update/` + self.reagentDdepartment.id,
  //         data: self.reagentDdepartment
  //       }).then(data => {
  //         if (data != undefined) {
  //           self.$router.push("reagent/department");
  //         }
  //       });
  //     } else {
  //       self.errors = self.$v.reagentDdepartment;
  //     }
  //   },

  //   getReagentDdepartment() {
  //     let self = this;
  //     axios({
  //       method: "get",
  //       url: `/reagent_department/One/` + self.$route.params.id
  //     }).then(res => {
  //       if (res != undefined) {
  //         self.reagentDdepartment = res.data.data;
  //       }
  //     });
  //   },
  //   cancel() {
  //     this.reagentDdepartment = {
  //       department_id: null,
  //       reagentDdepartment_id: null,
  //       count: 0
  //     };
  //   }
  // },
  // mounted() {
  //   this.getReagentDdepartment();
  // }
};
</script>
<style></style>
