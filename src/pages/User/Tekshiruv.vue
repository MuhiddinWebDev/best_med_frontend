<template>
  <div class="Tekshiruv" >
    <div id="my-modal" v-for="(tool,index) in inspection.inspection" :key="index"  style="page-break-before: always; margin-top: 0px;">
      <div class="mt-12">
        <div class="header">
          <div style="font-size: 17px;">
            {{ items.left_header }}
          </div>
          <div>
            <img class="tekshiruv-logo" :src="items.logo" alt="klinka">
          </div>
          <div style="font-size: 17px;">
            <div class="text-position">
              {{ items.left_header }}
            </div>
          </div>
        </div>
      </div>
      <h3 class="ShifokorTek" style="padding-top: 18px;">№{{tool.registration_id}} Лаборатория  текшируви</h3>
      <div class="BayonotChild">
        <div class="Child1" v-if="inspection.inspection != null">
          <div class="jadval">
            <span style="font-size: 17px;">Ф.И.Ш: </span>
            <div style="font-size: 17px; max-width: 400px;">{{ inspection.name ? inspection.name :'' }}</div>
          </div>
          <div class="jadval">
            <span style="font-size: 17px;">Телефон: </span>
            <div style="font-size: 17px;">{{ inspection.phone }}</div>
          </div>
          <div class="jadval">
            <span style="font-size: 17px;">Келган вақти: </span>
            <div style="font-size: 17px;">{{ inspection.create_at | moment }}</div>
          </div>
          <!-- <div class="jadval">
            <span style="font-size: 17px;">Tashxis:</span>
            <div style="font-size: 17px;">{{ inspection.text }}</div>
          </div> -->
          <!-- <div class="jadval">
            <span style="font-size: 17px;">Бемор шикояти:</span>
            <div style="font-size: 17px;" class="text-size-p" v-html="inspection.complaint"></div>
          </div> -->
        </div>

        <div class="Child2" v-if="inspection.inspection != null">
          <div class="jadval">
            <span style="font-size: 17px;">Туғилган сана: </span>
            <div style="font-size: 17px;">{{ inspection.birthday | moment }}</div>
          </div>
          <div class="jadval">
            <span style="font-size: 17px;">Паспорт серия: </span>
            <div style="font-size: 17px;">{{ inspection.passport }}</div>
          </div>
          <!-- <div class="jadval">
            <span style="font-size: 17px;">Текширув номи: </span>
            style="font-size: 17px;" <div>{{ inspection.inspection }}</div>
          </div> -->
          
          <div class="jadval">
            <span style="font-size: 17px;">Объектив кўрув: </span>
            <div style="font-size: 17px;">{{ inspection.type_service }}</div>
          </div>
        </div>
      </div>
      <h3 style="text-align: center;">{{ tool.inspection.name ? tool.inspection.name :'' }}</h3>
      <div class="padding-auto">
        <table class="table table-sm table-bordered">
          <thead id="head">
            <tr>
              <th>№</th>
              <th>Номи</th>
              <th>Натижа</th>
              <th>Норма</th>
            </tr>
          </thead>
          <tbody class="BayonotThead">
            <tr
              v-for="(item, index) in tool.registration_inspection_child"
              :key="index" 
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.name ? item.name :'' }}</td>
              <td>
                <span :style="{color: item.rang == 'qizil' ? 'red': item.rang == 'yashil' ? 'green':'#000' }">
                  {{ item.text ? remove(item.text) :"" }}
                </span>
              </td>
              <td>{{ item.norm }}</td>
            </tr>
            <!-- <span v-else-if="(item.checked == true)">
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
                <td>{{ remove(item.text) }}</td>
                <td>{{ item.norm }}</td>
                <td style="width:100px;"><img :src="item.file" alt=""></td>
              </span> -->
          </tbody>
        </table>
        <div class="d-flex-between">
          <p style="font-size: 15pt;">Текширувчи: </p>
          <p style="font-size: 15pt;">{{ tool.inspection ?  tool.inspection.User.user_name:''}}</p>
        </div>
      </div>
      <!-- <ul>
        <li>
          <b>Shifokor:</b>
          <b> {{ inspection.name }} </b>
        </li>
      </ul> -->
    </div>
    <!-- <htmlToImage /> -->
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      inspection: {},
      types: "",
      data: "",
      dataUrl: null,
      print: "false",
      rotateType: 0,
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
    this.inspection = JSON.parse(localStorage.getItem("Tekshiruvlar"));
  },
  methods: {
    remove(text) {
      if(this.inspection.inspection != null) {
        return text.replace(/(<([^>]+)>)/gi, " ");
      }
    },
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
    this.data1();
    window.print();
    setTimeout(() => {
      localStorage.removeItem("Tekshiruvlar");
      window.close();
      this.$router.push({ path: "/user" });
    }, 3000);
  }
};
</script>

<style scope>
.tekshiruv-logo{
  height: 130px !important;
  object-fit: contain !important;
}
.d-flex-between{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.d-flex-between p{
  font-weight: bold;
}
.text-size-p p{
  font-size: 15pt;
}
.padding-auto{
  padding: 6px 35px;
}
#my-modal{
  margin-top: 25px;
}
.mt-25{
  margin-top: 25px;
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
#my-node {
  width: 300px;
}
.header {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  padding-top: 00px;
}
.BayonotThead {
  background: #fff !important;
  color: black !important;
  text-align: center;
}
.header div {
  width: 330px;
  text-align: center;
}
#head {
  background: white !important;
  color: black;
  text-align: center;
}

.Tekshiruv {
  /* height: 1500px; */
  margin: 0px auto;
  padding-top: 40px;
  background: white;
  width: 94%;
}
.ShifokorTek {
  text-align: center;
  margin: 10px auto;
  margin-bottom: 0px;
}
.Tekshiruv ul {
  height: 40px !important;
  list-style: none;
  font-size: 22px;
  /* font-weight: 600; */
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
.BayonotChild {
  display: flex;
  justify-content: space-between;
  padding: 0px 50px;
}


.jadval {
  display: flex;
  margin-bottom: 8px;
}
.jadval span {
  font-weight: 600;
  font-size: 16pt;
}
.jadval div {
  font-size: 16pt;
  margin-left: 10px;
}
.table td, .table th{
  font-size: 15pt !important;
}
</style>
