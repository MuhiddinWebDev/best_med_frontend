<template>
  <div id="chart" v-if="series[0] || series[1]">
    <h4>Амбулатор ва Статсионар беъморлар</h4>
    <apexchart
      type="pie"
      width="380"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
  <div v-else>
    <h4>Регистрация бўш</h4>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import axios from "axios";
export default {
  name: "GenderChart",
  props: ["filial_id"],
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [0, 0],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },

        labels: ["Амбулатор", "Статсионар"],

        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    async get(id) {
      try {
        let res = await axios.post("/hisobot/countas", {filial_id: id});
        if (res.data) {
          this.series = [res.data.ambulator, res.data.statsionar];
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.get();
  },
  watch: {
    filial_id: function(newVal, oldVal) {
      this.get(newVal)
    },
  }
};
</script>
