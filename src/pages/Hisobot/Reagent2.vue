<template>
    <b-container fluid id="tables" class="ml-2">
      <div class="header-title">
        <h4>Реагент ҳисобот</h4>
      </div>
      <b-row class="text-center d-flex">
        <div class="search-header">
          <div class="search-header_item">
            <input 
              class="form-control" 
              type="date" 
              v-model="datas.date1"
             />
          </div>
          <div class="search-header_item">
            <input 
              class="form-control" 
              type="date" 
              v-model="datas.date2" 
            />
          </div>
          <div class="search-header_item">
            <button
              type="button"
              class="btn text-white"
              style="background: #195FB0; width: 130px; font-size: 14px"
              @click="Send()"
            >
              <img
                src="../../../public/Vector.png"
                alt=""
                style="margin-right: 5px"
              />
              Кўриш
            </button>
          </div>
        </div>
      </b-row>
      <table class="table table-striped table-bordered" style="width: 100%;">
        <thead>
          <tr class="text-center" style="height: 40px !important;">
            <th style="width: 20px">№</th>
            <th>Реагент</th>
            <th>Вақт</th>
            <th>Сони</th>
            <th>Тури</th>
            <th>Бўлим</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center"
            v-for="(item, index) in results"
            :key="index"
          >
            <td style="width:20px">{{ index + 1 }}</td>
            <td>{{ item.reagent.name }}</td>
            <td>{{ item.datetime | moment }}</td>
            <td>{{ item.count }}</td>
            <td>{{ item.department ? "Бўлимга тарқатилди" : "Сотиб олинди" }}</td>
            <td>{{ item.department ? item.department.name : ""  }}</td>
            <td>{{ item.summa }}</td>
          </tr>
          <tr>
            <td colspan="6">Умумий сумма</td>
            <td class="text-center">{{ summa }}</td>
          </tr>
        </tbody>
      </table>
    </b-container>
  </template>
  
<script>
import moment from "moment";
export default {
data() {
    return {
    datas: {
        date1: new Date().toISOString().slice(0, 8) + "01",
        date2: new Date().toISOString().slice(0, 10),
    },
    errors: "",
    index: 0,
    results: [],
    summa: 0
    };
},
methods: {
    Send() {
    let self = this;
    var datas = {
        datetime1: parseInt(
        new Date(self.datas.date1)
            .valueOf()
            .toString()
            .slice(0, 10)
        ),
        datetime2:
        parseInt(
            new Date(self.datas.date2)
            .valueOf()
            .toString()
            .slice(0, 10)
        ) + 86399,
    };
    axios({
        method: "get",
        url: "/reagent_department/hisobot",
        data: datas,
    }).then(function(response) {
        if(response != undefined){
            self.summa = 0
            self.results = response.data.data;
            self.results.forEach((key, value) => {
                if(key.summa != undefined && key.summa) {
                    self.summa += parseFloat(key.summa);
                }
            });
        }
    });
    }
},
filters: {
    moment: function(date) {
    if (date != null) {
        return moment.unix(date).format("DD.MM.YYYY");
    } else {
        return "";
    }
},
},
};
</script>

<style scoped>
.search-header {
width: 100%;
padding: 8px 20px;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
gap: 6px 10px;
}

.search-header_item {
display: flex;
align-items: center;
gap: 8px;
}
.hisobotselect .vs__selected-options span:first-child {
width: 90% !important;
overflow: hidden !important;
text-overflow: ellipsis !important;
white-space: nowrap !important;
}
table {
margin: 0px 0px;
width: 1050px;
}

label,
td,
th,
tr {
font-family: "Times New Roman", Times, serif;
font-weight: bolder;
text-transform: capitalize;
font-size: 15px;
height: 30px !important;
}
#tables {
min-height: 100vh;
width: 99% !important;
}
.reds {
color: red;
}
#bosh {
width: 50px !important;
}
th {
color: #195fb0;
background-color: #f4f7fb;
}
</style>
  