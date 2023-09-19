<template>
  <div id="content">
    <h5 style="margin-bottom: 5px;">
      Бемор:
      <span><b v-if="BemorName">{{ BemorName.fullname }}</b></span
      >
    </h5>
    <ul v-for="(item, index) in Tolov" :key="index">
      <li>
        <b> {{ "Вақт" }}: </b>
        <b style="float: right;">{{ item.date_time | moment }}</b>
      </li>
      <li>
        <b>{{ "Тўлов тури" }}:</b>
        <b style="float: right;">{{ item.pay_type }}</b>
      </li>
      <li>
        <b>{{ "Тўланган сумма" }}:</b>
        <b style="float: right;">{{ item.summa | numFormat }}</b>
      </li>
      <li>
        <b>{{ "Умумий сумма" }}:</b>
        <b style="float: right;">{{ item.umumiy_sum | numFormat }}</b>
      </li>
      <li>
        <b>{{ "Қарздорлик" }}:</b>
        <b style="float: right;">{{ item.backlog | numFormat }}</b>
      </li>
      <li>
        <b>{{ "Изоҳ" }}:</b>
        <b style="float: right;">{{ item.comment }}</b>
      </li>
    </ul>
    <ul v-if="!Statsionar">
      <li>
        <h4 style="text-align: center;">Навбатлар</h4>
      </li>
      <li v-for="(item, index) in Navbat" :key="index">
        <div class="massiv">
          <b>{{ "Ф.И.Ш" }}:</b>
          <b style="float: right;"> {{ item.room ? item.room.users[0].user_name : ""}} </b>
        </div>
        <div class="massiv">
          <b>{{ "Навбат рақами" }}:</b>
          <b style="float: right;"> {{ item.number }}</b>
        </div>
        <div class="massiv">
          <b>{{ "Хона" }}:</b>
          <b style="float: right;"> {{ item.room ? item.room.name : "" }}</b>
        </div>
        <div class="massiv">
          <b>{{ "Филиал" }}:</b>
          <b style="float: right;" v-if="item.room"> {{item.room.filial ? item.room.filial.name : "" }}</b>
        </div>
      </li>
    </ul>
    <ul v-if="Statsionar">
      <li>
        <h4 style="text-align: center;">Шифокор</h4>
      </li>
      <li v-for="(item, index) in Statsionar.Shifokor.shifokor" :key="index">
        <div class="massiv">
          <b>{{ "Ф.И.Ш" }}:</b>
          <b style="float: right;"> {{ item.name ? item.name : ""  }} </b>
        </div>
        <div class="massiv">
          <b>{{ "Сумма" }}:</b>
          <b style="float: right;"> {{ item.price | numFormat }}</b>
        </div>
      </li>
    </ul>
    <ul style="margin-bottom: 0px !important;" v-if="Statsionar">
      <li>
        <h4 style="text-align: center;">Текширув</h4>
      </li>
      <li v-for="(item, index) in Statsionar.Tekshiruv.tekshiruv" :key="index">
        <div class="massiv">
          <b>{{ "Текширув" }}:</b>
          <b style="float: right;"> {{ item.name ? item.name : "" }} </b>
        </div>
        <div class="massiv">
          <b>{{ "Сумма" }}:</b>
          <b style="float: center;"> {{ item.count }}</b>
          <b style="float: right;">
            {{ (item.count * item.price) | numFormat }}</b
          >
        </div>
      </li>
    </ul>
    <ul style="margin-top: 10px !important;" v-if="Statsionar">
      <li>
        <h4 style="text-align: center;">Палата</h4>
      </li>
      <li v-for="(item, index) in Statsionar.Palata.palata" :key="index">
        <div class="massiv">
          <b>{{ "Палата" }}:</b>
          <b style="float: right;"> {{ item.name ? item.name : "" }} </b>
        </div>
        <div class="massiv">
          <b>{{ "Сумма" }}:</b>
          <b style="float: center;"> {{ item.count }} кун</b>
          <b style="float: right;">
            {{ (item.count * item.price) | numFormat }}</b
          >
        </div>
      </li>
      <div class="massiv">
        <b>{{ "Келган вақти" }}: </b>
        <b style="float: right;"> {{ Statsionar.Palata.kelgan | moment }}</b>
      </div>
      <div class="massiv">
        <b>{{ "Кетган вақти" }}: </b>
        <b style="float: right;"> {{ Statsionar.Palata.ketgan | moment }}</b>
      </div>
    </ul>
    <h5 style="text-align: center; margin-top: 30px;">
      {{items.quote }}
    </h5>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "Print",
  data() {
    return {
      BemorName: null,
      Tolov: null,
      Navbat: null,
      Statsionar: null,
      items: {}
    };
  },
  created() {
    this.BemorName = JSON.parse(localStorage.getItem("BemorName"));
    this.Tolov = JSON.parse(localStorage.getItem("ChekTolov"));
    this.Navbat = JSON.parse(localStorage.getItem("Navbat"));
    this.Statsionar = JSON.parse(localStorage.getItem("Statsionar"));
    setTimeout(() => {
      window.print();
      // this.textPrint();
    }, 1000);
  },
  filters: {
    moment: function(date) {
      if (date != null || date != undefined) {
        return moment.unix(date).format("DD.MM.YYYY HH:mm");
      } else {
        return "";
      }
    }
  },
  methods: {
    // textPrint() {
    //   let text_print = document.querySelector('#content');
    //   var printContents = document.querySelector("#content").innerHTML;
    //   text_print.style.minHeight = "400px"
    // 	var originalContents = document.body.innerHTML;
    // 	document.body.innerHTML = printContents;
    // 	window.print();
    // 	document.body.innerHTML = originalContents;
    // }
    data1() {
      let s = this;
      axios({
        method: "get",
        url: "/settings",
      }).then((res) => {
        if (res != undefined) {
          this.items = res.data.data;
        }
      });
    },
  },
  mounted() {
    this.data1()
    localStorage.removeItem("Navbat");
    localStorage.removeItem("ChekTolov");
    localStorage.removeItem("BemorName");
    localStorage.removeItem("Statsionar");

    setTimeout(() => {
      window.close();
    }, 3000);
  }
};
</script>
<style scoped>
#content {
  size: 80mm auto;
}

h5 {
  font-weight: bold;
  font-size: 40px;
  color: black;
}
h4 {
  font-weight: bold;
  font-size: 40px;
  color: black;
}
.massiv {
  padding: 13px 0px;
}

ul {
  list-style: none;
  border-bottom: 1px dotted;
  text-align: left;
  padding: 0;
  margin: 0;
  font-size: 40px;
  color: black;
}
li {
  padding: 13px 0px;
}
</style>
