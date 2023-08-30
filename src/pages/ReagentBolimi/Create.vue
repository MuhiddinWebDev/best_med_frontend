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
                  @click="createReagentDdepartment()"
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
  name: "ReagentDdepartmentCreate",
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
  //   createReagentDdepartment() {
  //     let self = this;
  //     this.$v.$touch();
  //     if (this.$v.$invalid == false) {
  //       axios({
  //         method: "post",
  //         url: "/reagent_department/create",
  //         data: self.reagentDdepartment
  //       }).then(data => {
  //         if (data != undefined) {
  //           this.$router.push("/reagent/department");
  //         }
  //       });
  //     } else {
  //       this.errors = this.$v.reagentDdepartment;
  //     }
  //   },
  //   cancel() {
  //     this.reagentDdepartment = {
  //       department_id: null,
  //       reagentDdepartment_id: null,
  //       count: 0
  //     };
  //   }
  // }
};
</script>
<style></style>
