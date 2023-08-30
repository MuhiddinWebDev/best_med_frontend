<template>
  <div>
    <prixod-form></prixod-form>
  </div>
</template>

<script>
// import axios from "axios";
import PrixodForm from "./Form.vue";
// import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "PrixodCreate",
  components: {
    PrixodForm
  }
  // data() {
  //   return {
  //     prixod: {
  //       date_time: new Date()
  //         .valueOf()
  //         .toString()
  //         .slice(0, 10),
  //       umumiy_summa: 0,
  //       pastavchik_id: null,
  //       comment: "",
  //       prixod_table: [
  //         {
  //           reagent_id: null,
  //           price: 0,
  //           summa: 0,
  //           count: 0
  //         }
  //       ]
  //     },
  //     errors: null
  //   };
  // },
  // validations: {
  //   prixod: {
  //     umumiy_summa: {
  //       required
  //     }
  //   }
  // },
  // methods: {
  //   createPrixod() {
  //     let self = this;
  //     this.$v.$touch();
  //     if (this.$v.$invalid == false) {
  //       axios({
  //         method: "post",
  //         url: "/prixod/create",
  //         data: self.prixod
  //       }).then(data => {
  //         if (data != undefined) {
  //           this.$router.push("/prixod");
  //         }
  //       });
  //     } else {
  //       this.errors = this.$v.prixod;
  //     }
  //   },
  //   cancel() {
  //     this.prixod = {
  //       umumiy_summa: 0,
  //       pastavchik_id: null,
  //       comment: "",
  //       prixod_table: [
  //         {
  //           reagent_id: null,
  //           price: 0,
  //           summa: 0,
  //           count: 0
  //         }
  //       ]
  //     };
  //   }
  // }
};
</script>
<!-- <style>
.tugmalar {
  display: flex;
  justify-content: right;
  margin-top: 50px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.calendar {
  box-shadow: 5px 8px 10px rgba(25, 176, 48, 0.5);
}
.calendar1 {
  box-shadow: 5px 8px 10px rgba(176, 25, 25, 0.5);
}
</style> -->
