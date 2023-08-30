<template>
  <div class="cont">
    <div class="header">
      <h3 class="text-success">Навбат рўйҳати</h3>
      <button class="btn btn-info" @click="chiqish()">X</button>
    </div>
    <div>
      <b-table
        striped
        hover
        :items="items"
        :fields="fields"
        :sort-desc.sync="sortDesc"
        :sort-asc.sync="sortAsc"
        :sort-by.sync="sortBy"
        :outlined="outlined"
      >
        <template #cell(№)="data">
          {{ data.index + 1 }}
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      items: [],
      fields: [
        "№",
        { key: "patient.fullname", label: "Бемор" },
        { key: "room.name", label: "Хона рақами" },
        { key: "date_time", label: "Вақт" },
        // { key: "status", label: "Status" },
        { key: "number", label: "Навбат рақами" }
      ],
      sortBy: "number",
      sortDesc: false,
      sortAsc: true,
      outlined: true
    };
  },
  methods: {
    getData() {
      setInterval(() => {
        this.data();
      }, 5000);
    },
    data() {
      let s = this;
      axios({
        method: "get",
        url: "/registration/queue"
      }).then(res => {
        for (let key of res.data.data) {
          key.date_time = moment(new Date(key.date_time * 1000)).format(
            "YYYY.MM.DD-HH:mm:ss"
          );
        }
        s.items = res.data.data;
        s.totalRows = s.items.length;
      });
    },
    chiqish() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.data();
    this.getData();
  }
};
</script>
<style scoped>
.header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
}
</style>
