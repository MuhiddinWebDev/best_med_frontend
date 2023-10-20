<template>
  <div id="chart">
    <apexchart
      type="pie"
      width="380"
      :options="chartOptions"
      :series="series"
    ></apexchart>
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

        labels: ["Kassir", "Laborant", ],

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
        let res = await axios.post("/hisobot/countworker");
        if (res.data) {
          console.log(res.data)
          // this.series = [res.data.maleCount, res.data.femaleCount];
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
