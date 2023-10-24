<template>
  <div class="container-fluid px-5">
    <div class="pl-3 filial" v-if="isAdmin && isAdmin.role == 'Admin'">
      <label>Филиал</label>
      <v-select
        :options="all_filial"
        :reduce="(options) => options.id"
        @input="changeBranch"
        label="name"
        v-model="filial_id"
      />
    </div>
    <div class="row pt-3 justify-content-center">
      <div class="col">
        <h4>Эркак ва Аёл беъморлар</h4>
        <Gender :filial_id="filial_id" />
      </div>
      <div class="col">
        <StatsionarAmbulator :filial_id="filial_id" />
      </div>
      <div class="col">
        <h4>Ходимлар сони</h4>
        <Employee :filial_id="filial_id" />
      </div>
    </div>
    <div class="row pt-3">
      <div class="col">
        <h4>Текширув ўтказган шифокорлар бўйича</h4>
        <Doctor :filial_id="filial_id" />
      </div>
    </div>
    <div class="row pt-3">
      <div class="col">
        <h4>Текширув ўтказган текчирувчилар бўйича</h4>
        <Laborant :filial_id="filial_id" />
      </div>
    </div>
    <div class="row pt-3">
      <div class="col">
        <h4>Ойлик кўриклар сони</h4>
        <Count :filial_id="filial_id" />
      </div>
    </div>
  </div>
</template>

<script>
import Count from "./Count.vue";
import Doctor from "./Doctor.vue";
import Gender from "./Gender.vue";
import Laborant from "./Laborant.vue";
import Employee from "./Employee.vue";
import StatsionarAmbulator from "./StatsionarAmbulator.vue";

export default {
  name: "Chart",
  components: {
    Gender,
    Doctor,
    Laborant,
    Count,
    StatsionarAmbulator,
    Employee,
  },
  data: function() {
    return {
      all_filial: [],
      filial_id: null,
      isAdmin: null
    };
  },
  mounted() {
    this.getBranch();
    this.isAdmin = JSON.parse(localStorage.getItem('user'));
    this.filial_id = JSON.parse(localStorage.getItem("filial_id"))
  },
  methods: {
    getBranch() {
      let self = this;
      axios({
        method: "get",
        url: "/filial/all",
      }).then((res) => {
        if (res != undefined) {
          self.all_filial = res.data.data;
        }
      });
    },
    changeBranch(id) {
      this.filial_id = id
    },
  }
};
</script>

<style scoped>
.filial {
  width: 250px;
}
</style>
