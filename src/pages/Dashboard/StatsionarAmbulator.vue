<template>
  <div id="chart" v-if="series[0] || series[1]">
    <h4>Ambulator va Statsionar be'morlar</h4>
    <apexchart
      type="pie"
      width="380"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
  <div v-else>
    <h4>Registratsiya bo'sh</h4>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import axios from "axios";
export default {
  name: "GenderChart",
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

        labels: ["Ambulator", "Statsionar"],

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
    async get() {
      try {
        let res = await axios.post("/hisobot/countas");
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
};
</script>
