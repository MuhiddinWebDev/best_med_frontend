<template>
    <div>
      <apexchart
        type="bar"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </template>
  
  <script>
  import VueApexCharts from "vue-apexcharts";
  import axios from "axios";
  export default {
    components: {
      apexchart: VueApexCharts,
    },
    data() {
      return {
        series: [],
        chartOptions: {
          chart: {
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
              endingShape: "rounded",
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
          xaxis: {
            categories: [
              "Январ",
              "Феврал",
              "Март",
              "Апрел",
              "Май",
              "Июн",
              "Июл",
              "Август",
              "Сентябр",
              "Октябр",
              "Ноябр",
              "Декабр"
            ],
          },
          yaxis: {
            title: {
              text: "Кўриклар сони",
            },
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: function(val) {
                return val;
              },
            },
          },
        },
      };
    },
    mounted() {
      this.get()
    },
    methods: {
      async get() {
        try {
          let res = await axios.post("/hisobot/tekshiruv-laborant")
          if(res.data) {
            this.series = res.data
          }
        } catch (error) {
          console.log(error)
        }
    }
    }
  };
  </script>
  
  <style lang="scss" scoped></style>
  