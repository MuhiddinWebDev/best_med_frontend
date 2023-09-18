<template>
  <div class="Bayonot">
    <div id="my-node">
      <div>
        <div class="header">
          <div style="font-size: 17pt;" >{{ items.header_left }}</div>
          <img class="tekshiruv-logo" :src="items.logo" alt="klinka">
          <div>
            <div class="text-position" style="font-size: 17pt;">
              <div class="text-position_item">
                {{ items.header_right }}
              </div>
              <!-- <div class="text-position_item">
                <b style="font-size: 14pt;" >+998 99 325 17 80</b>
                <b style="font-size: 14pt;" >+998 93 780 50 97</b>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <h3 class="ShifokorTek" v-if="data.Shifokor">№{{ data.Shifokor.registration_id }} Шифокор текшируви</h3>
      <h3 v-else class="ShifokorTek">№{{ data.Shifokor.registration_id }} Бемор шикояти</h3>
      <div class="BayonotChild">
        <div class="Child1">
          <div class="jadval">
            <span>Ф.И.Ш: </span>
            <div >{{ data.name ? data.name : '' }}</div>
          </div>
          <div class="jadval">
            <span>Телефон: </span>
            <div>{{ data.phone ? data.phone :''}}</div>
          </div>
          <div class="jadval">
            <span>Келган вақти: </span>
            <div>{{ data.create_at | moment }}</div>
          </div>
          <div class="jadval">
            <span>Назначения:</span>
            <div v-if="data.Shifokor">{{ data.Shifokor.text != null ? remove(data.Shifokor.text) : "" }}</div>
            <div v-else></div>
          </div>
          <!-- <div class="jadval">
            <span>Бемор шикояти:</span>
            <div
              class="mt-1"
              style="font-size: 16px;"
              v-html="data.complaint"
            ></div>
          </div> -->
          <div class="jadval">
            <span>Объектив кўрув: </span>
            <div>{{ data.type_service }}</div>
          </div>
        </div>

        <div class="Child2">
          <div class="jadval">
            <span>Туғилган сана: </span>
            <div>{{ data.birthday | moment }}</div>
          </div>
          <div class="jadval">
            <span>Паспорт серия: </span>
            <div>{{ data.passport }}</div>
          </div>
          <div class="jadval">
            <span>Палатага келган вақти: </span>
            <div>{{ data.date_to | moment }}</div>
          </div>
          <div class="jadval">
            <span>Палатадан кетган вақти: </span>
            <div>{{ data.date_do | moment }}</div>
          </div>
        </div>
      </div>
      <div class="BayonotTable" v-if="data.Shifokor">
        <table class="table table-sm table-bordered">
          <thead class="BayonotThead">
            <tr>
              <th>№</th>
              <th>Дори</th>
              <th>Кун</th>
              <th>Маҳал</th>
              <th>Қўшимчалар</th>
            </tr>
          </thead>
          <tbody v-if="data.Shifokor.registration_recipe">
            <tr
              v-for="(item, index) in data.Shifokor.registration_recipe"
              :key="index"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.name ? item.name: '' }}</td>
              <td>{{ item.day ? item.day :'' }}</td>
              <td>{{ item.time ? item.time :'' }}</td>
              <td>{{ item.comment ? item.comment :'' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="jadval" v-if="data.Shifokor">
        <span>Шифокор: </span>
        <div>{{ data.Shifokor.doctor.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "Print",
  data() {
    return {
      data: {},
      Dorilar: [],
      items: {}
    };
  },
  filters: {
    moment: function(date) {
      if (date != null) {
        return moment.unix(date).format("DD.MM.YYYY");
      } else {
        return "";
      }
    }
  },
  created: function() {
    this.data = JSON.parse(localStorage.getItem("Bayonot"));
    setTimeout(() => {
      window.print();
    }, 1000);
  },
  methods: {
    remove(text) {
      return text.replace(/(<([^>]+)>)/gi, " ");
    },
    data1() {
      let s = this;
      axios({
        method: "get",
        url: "/settings",
      }).then((res) => {
        if (res != undefined) {
          this.items = res.data.data;
          console.log(this.data)
          console.log(res.data.data)
        }
      });
    },
  },
  mounted() {
    this.data1()
    let self = this;
    localStorage.removeItem("Bayonot");
    setTimeout(() => {
      self.$router.push({ path: "/user" });
      window.close();
    }, 3000);
  }
};
</script>

<style>
.tekshiruv-logo{
  height: 130px !important;
  object-fit: contain !important;
}
.text-position{
  display: flex;
  align-items: center;
  flex-direction: column;
}
.text-position_item{
  display: flex;
  align-items: center;
  flex-direction: column;
}
.Bayonot {
  /* height: 1500px; */
  width: 94%;
  margin: 0px auto;
}
.BayonotChild {
  display: flex;
  justify-content: space-between;
  padding: 0px 30px;
}

.ShifokorTek {
  text-align: center;
  padding: 10px 0;
  margin: 0px auto;
}
.header {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  padding-top: 20px;
}
.header div {
  width: 330px;
  text-align: center;
}
ul li {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  margin-left: 20px;
}
ul li b {
  margin-left: 10px;
  color: black;
  font-weight: 400;
}
.jadval {
  display: flex;
  margin-bottom: 8px;
}
.jadval span {
  font-weight: 600;
  font-size: 18px;
}
.jadval div {
  font-size: 18px;
  margin-left: 10px;
}
.BayonotTable tr {
  text-align: center;
}
/* .Bayonot tr {
  height: 40px !important;
  list-style: none;
  font-size: 18px;
}  */
.BayonotThead {
  background: #fff !important;
  color: black !important;
  text-align: center;
}
.table td, .table th{
  font-size: 15pt !important;
}
</style>
