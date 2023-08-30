<template>
  <div class="NavbatChek">
    <div v-for="(item, index) in this.data" :key="index" id="my-node">
      <div class="sarlovha">Бемор Ф.И.Ш</div>
      <div class="sarlovha1">{{ item.patient.fullname }}</div>
      <div class="sarlovha">Шифокор Ф.И.Ш</div>
      <div class="sarlovha1">{{ item.room.users[0].user_name }}</div>
      <div class="sarlovha">Хона рақами</div>
      <div class="sarlovha1">{{ item.room.name }}</div>
      <div class="sarlovha">Келган вақти</div>
      <div class="sarlovha1">{{ item.date_time | moment }}</div>
      <div class="sarlovha">Навбат рақами</div>
      <div class="sarlovha1 chiziq">{{ item.number }}</div>
    </div>
    <p style="align-items: center; text-align: center;">
      Сизга соғлик тилаймиз
    </p>
  </div>
</template>
<script>
import moment from "moment";
import path from "path";
export default {
  data() {
    return {
      data: []
    };
  },
  created: function() {
    // this.data = this.$store.state.Navbat;
    this.data = JSON.parse(localStorage.getItem("Navbat"));
  },
  methods: {},
  filters: {
    moment: function(date) {
      if (date != null) {
        return moment.unix(date).format("DD.MM.YYYY MM:SS");
      } else {
        return "";
      }
    }
  },
  mounted() {
    let self = this;
    localStorage.removeItem("Navbat");
    window.print();
    setTimeout(() => {
      self.$router.push({ path: "/user" });
      window.close();
    }, 3000);
  }
};
</script>
<style>
.sarlovha1 {
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  border-bottom: 1px dotted;
}
.chiziq {
  border-bottom: 2px solid;
}
.sarlovha {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}
.NavbatChek {
  position: absolute;
  left: 0px;
}
</style>
