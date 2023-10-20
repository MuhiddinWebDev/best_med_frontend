<template>
  <div class="container-fluid">
    <div class="row pt-3 justify-content-center">
      <div class="col">
        <h4>Erkak va Ayol be'morlar</h4>
        <Gender />
      </div>
      <div class="col">
        <StatsionarAmbulator />
      </div>
      <div class="col">
        <h4>Xodimlar soni</h4>
        <Employee />
      </div>
    </div>
    <div class="row pt-3">
      <div class="col">
        <h4>Eng ko'p tekshiruv o'tkazgan shifokorlar</h4>
        <Doctor />
      </div>
    </div>
    <div class="row pt-3">
      <div class="col">
        <h4>Eng ko'p tekshiruv o'tkazgan tekshiruvchilar</h4>
        <Laborant />
      </div>
    </div>
    <div class="row pt-3">
      <div class="col">
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
