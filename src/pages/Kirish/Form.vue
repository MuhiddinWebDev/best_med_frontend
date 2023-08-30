<template>
  <div class="kirish-oyna" id="body">
    <div class="kattaPrixod">
      <span>Кириш</span>
      <b-button class="navbarBtnDanger" variant="danger" @click="Prev()">
        <b-icon icon="x-circle-fill"></b-icon>
      </b-button>
    </div>
    <!-- <div class="kirish-btn">
            <button class="navbarBtn-kirish" @click="chekPrint('summa')">
                <b-icon
                font-scale="1"
                icon="chevron-double-right"
                ></b-icon>
                Кириш
            </button>
        </div> -->
       
        <b-modal
          id="modal-suri-allow"
          :title="SuriName"
          hide-footer
        >
          <div class="m-modal-content">
            <p> Бандликни бекор қиласизми ?</p>
          </div>
          <div class="CreateName">
            <b-button
              class="modalBtn1"
              variant="danger "
              @click="allowBuys('danger')"
            >
              <b-icon icon="calendar2-x"></b-icon>
              Йўқ
            </b-button>
            <b-button
              class="modalBtn"
              variant="success"
              @click="allowBuys('success')"
            >
              <b-icon icon="calendar2-plus"></b-icon>
              Ҳа 
            </b-button>
          </div>
      </b-modal>
    <div class="sorilar mt-4">
      <div class="hompage justify-content-center" style="cursor: pointer">
        <div
          class="boxes"
          v-for="(item, index) in sorilar"
          :key="index"
        >
          <div  
          @click="chekPrint(item)"
          >
            <div class="content-icon">
              <img :src="img" alt="" />
            </div>
          </div>
          <div class="footer-text">
            <span>{{ item.name }}</span>
            <br>
            <span
            v-if="item.status"
            v-b-modal.modal-suri-allow 
            @click="solveBusy(item.id, item.name)" 
            class="badge badge-danger" >
              БАНД ҚИЛИНГАН
            </span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="print-chek">
      <div id="printer">
        <span class="float-left" style="font-size: 16pt;">
          №
        </span>
        <span class="float-right" style="font-size: 16pt;"> {{ chek.id }} </span><br />
        <hr />
        <span class="float-left" style="font-size: 16pt;">
          Вақт:
        </span>
        <span class="float-right" style="font-size: 16pt;"> {{ chek.date_time | moment }} </span><br />
        <hr />
        <span class="float-left" style="font-size: 16pt;">
          Сўри:
        </span>
        <span class="float-right" style="font-size: 16pt;"> {{ chek.sori_name }} </span><br />
        <hr />
        <span class="float-left" style="font-size: 16pt;">
          Нарх:
        </span>
        <span class="float-right" style="font-size: 16pt;">
          {{ new Intl.NumberFormat('ru-Ru',{
            style:'decimal',
            minimumFractionDigits:2,
          }).format(chek.price) }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import message from "../../assets/img/sori.png";
import moment from "moment";
export default {
  data() {
    return {
      sorilar: [],
      chek: "",
      img: message,
      SuriName: "",
      suriId: null
    };
  },
  mounted() {
    this.Sorilar();
  },
  methods: {
    Prev() {
      this.$router.go(-1)
    },
    chekPrint(data) {
      if (!data.status) {
        let self = this;
        axios({
          method: "post",
          url: "/sori/kassa",
          data: {
            sori_id: data.id
          }
        }).then(res => {
          self.chek = res.data.data;
          self.Sorilar();
          setTimeout(()=> {
            let dataHtml = document.getElementById('printer');
            document.body.style.margin = '8px 12px';
            document.body.style.padding = '12px 20px';
            document.body.innerHTML = dataHtml.innerHTML;
            window.print();
            this.$router.go()
          }, 1000)
          });
        // setTimeout(() => {
        //   var mywindow = window.open("", "PRINT", "height=600,width=800");

        //   mywindow.document.write(
        //     "<html><head><title>" + document.title + "</title>"
        //   );
        //   mywindow.document.write("</head><body >");
        //   mywindow.document.write(
        //     '<h1 class="text-center">' + document.title + "</h1>"
        //   );
        //   mywindow.document.write(document.getElementById("printer").innerHTML);
        //   mywindow.document.write("</body></html>");

        //   mywindow.document.close(); // necessary for IE >= 10
        //   mywindow.focus(); // necessary for IE >= 10*/

        //   // mywindow.print();
        //   // mywindow.close();
        //   mywindow.print({ silent: true });
        //   // mywindow.close();


        //   return true;
        // }, 1000);
       
      }
    },
    Sorilar() {
      let self = this;
      axios({
        method: "get",
        url: "/sori/all"
      }).then(res => {
        self.sorilar = res.data;
      });
    },
    solveBusy(id, s_name){
      this.SuriName = s_name + "ni";
      this.suriId = id;
    },
    allowBuys(action){
      if(action == 'danger'){
        this.$bvModal.hide("modal-suri-allow");
      }else if(action == 'success'){
        let self = this;
        axios({
          method: "post",
          url: "/sori/yechish",
          data: {
            sori_id: this.suriId
          }
        }).then(res => {
          self.Sorilar();
          this.$bvModal.hide("modal-suri-allow");
        });
      }
    }
  },
  filters: {
    moment: function(date) {
      if (date != null) {
        return moment.unix(date).format("DD.MM.YYYY HH:mm");
      } else {
        return "";
      }
    }
  }
};
</script>
<style>
.m-modal-content p{
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 10px;
}
.CreateName {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}
#printer {
  width: 420px;
  font-size: 16pt;
}
.print-chek {
  display: none;
}
.kirish-oyna {
  background: #d3e4e7;
  height: 100vh;
}
.hompage {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
.boxes {
  width: 220px;
  height: 230px;
  margin: 0px 10px 20px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #ccc;
  text-align: center;
  transition: all 0.3s;
}
.boxes:hover {
  box-shadow: -5px 5px 20px -5px #a8a6a6;
  margin-top: -5px;
}
.boxes img {
  height: 100px;
  width: 165px;
  border: 1px solid #ccc;
  border-radius: 10px;
  transition: 0.4s ease;
}
.boxes .content-icon {
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer-text {
  padding-top: 30px;
  font-size: 20px;
  font-weight: 800;
  color: #3f51b5;
  text-transform: uppercase;
  font-family: "Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.kattaPrixod {
  margin: 0px auto;
  padding: 10px 7px;
  width: 99%;
  background: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.5);
  display: flex;
  justify-content: space-between;
  color: #3f51b5;
  font-size: 20px;
  font-weight: 700;
  line-height: 40px;
}
.kirish-btn {
  width: 100%;
  align-items: center;
  text-align: center;
}
.navbarBtn-kirish {
  margin: 20px auto;
  color: #fff;
  border: 1px solid #fff;
  font-size: 30px;
  font-weight: 600;
  padding: 15px 25px;
  background: #00009d;
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.3);
  border-radius: 8px;
}
</style>
