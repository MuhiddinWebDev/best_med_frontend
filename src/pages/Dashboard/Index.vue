<template>
  <div class="container-fluid">
    <div class="row pt-3 justify-content-center">
      <div class="col">
        <h4>Эркак ва Аёл беъморлар</h4>
        <Gender />
      </div>
      <div class="col">
        <StatsionarAmbulator />
      </div>
      <div class="col">
        <h4>Ходимлар сони</h4>
        <Employee />
      </div>
    </div>
    <div class="row pt-3">
      <div class="col">
        <h4>Текширув ўтказган шифокорлар бўйича</h4>
        <Doctor />
      </div>
    </div>
    <div class="row pt-3">
      <div class="col">
        <h4>Текширув ўтказган текчирувчилар бўйича</h4>
        <Laborant />
      </div>
    </div>
    <div class="row pt-3">
      <div class="col">
        <h4>Ойлик кўриклар сони</h4>
        <Count />
      </div>
    </div>
  </div>
</template>

<script>
CountQueuingStrategy;
import Count from "./Count.vue";
import Doctor from "./Doctor.vue";
import Gender from "./Gender.vue";
import Laborant from "./Laborant.vue";
import Region from "./Regions.vue";
import Employee from "./Employee.vue";
import StatsionarAmbulator from "./StatsionarAmbulator.vue";

export default {
  name: "Chart",
  props: {},
  components: {
    Gender,
    Region,
    Doctor,
    Laborant,
    Count,
    StatsionarAmbulator,
    Employee,
  },
  data: function() {
    return {};
  },
  computed: {},
};
</script>
