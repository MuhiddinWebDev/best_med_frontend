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
  name: "PrixodUpdate",
  components: {
    PrixodForm
  }
  // data() {
  //   return {
  //     prixod: {
  //       date_time: 0,
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
  //   // prixod: {
  //   //   name: {
  //   //     required,
  //   //     minLength: minLength(4)
  //   //   }
  //   // }
  // },
  // methods: {
  //   updatePrixod() {
  //     let self = this;
  //     if (self.prixod.type == "Naqt") {
  //       self.prixod.type = 0;
  //     } else {
  //       self.prixod.type = 1;
  //     }
  //     this.$v.$touch();
  //     if (this.$v.$invalid == false) {
  //       axios({
  //         method: "patch",
  //         url: `/prixod/update/` + self.prixod.id,
  //         data: self.prixod
  //       }).then(data => {
  //         if (data != undefined) {
  //           self.$router.push("/prixod");
  //         }
  //       });
  //     } else {
  //       self.errors = self.$v.prixod;
  //     }
  //   },

  //   getPrixod() {
  //     let self = this;
  //     axios({
  //       method: "get",
  //       url: `/prixod/One/` + self.$route.params.id
  //     }).then(res => {
  //       if (res != undefined) {
  //         if (res.data.data.type == 0) {
  //           res.data.data.type = "Naqt";
  //         } else {
  //           res.data.data.type = "Plastik";
  //         }
  //         self.prixod = res.data.data;
  //       }
  //     });
  //   },
  //   cancel() {
  //     this.prixod = {
  //       date_time: 0,
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
  // },
  // mounted() {
  //   this.getPrixod();
  // }
};
</script>
<style>
.tugmalar {
  display: flex;
  margin-top: 50px;
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
.Arxive {
  pointer-events: none;
}
</style>
