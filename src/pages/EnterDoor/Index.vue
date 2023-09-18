<template>
<div class="kirish-oyna" id="body">
    <div class="kattaPrixod">
    <span>Эшикдан кириш</span>
    <b-button class="navbarBtnDanger" variant="danger" @click="Prev()">
        <b-icon icon="x-circle-fill"></b-icon>
    </b-button>
    </div>
    <div class="print_check">
        <div id="printer">
            <div class="printer-header">
                <div class="print_check_item">
                 <label for="person_count">Одам сони</label>
                  <b-input
                     type="number"
                     id="person_count"
                     value="1"
                     :min="1"
                     v-model="counter.odam_soni"
                     style="background: #fff; border: 1px solid #ced4da;"
                     placeholder="Одам сони"
                     size="lg"
                 ></b-input>
                </div>
                <div class="print_check_item">
                 <label for="car_count">Машина сони</label>
                  <b-input
                     type="number"
                     id="car_count"
                     value="0"
                     :min="0"
                     v-model="counter.mashina_soni"
                     style="background: #fff; border: 1px solid #ced4da;"
                     placeholder="Мошина сони"
                     size="lg"
                 ></b-input>
                </div>
            </div>
            <div class="printer-footer">
               <div class="print_check_item">
                <div class="d-flex-center">
                    <button @click="chekPrint" class="ChopEtishBtn">
                        <!-- <b-spinner small ></b-spinner> -->
                        <b-spinner medium v-if="checkSpinner"></b-spinner>
                        <b-icon icon="printer-fill"></b-icon> Чек олиш
                    </button>
                </div>
               </div>
           </div>
        </div>
        <div class="check-page" style="width: 100%;">
            <div class="check-page-header"><h1 style="text-align: center;">Тоза ҳаво сиҳатгоҳи</h1></div>
            <div class="check-page-body" style="padding: 12px 35px;">
                <div class="check-page-body_item" style="text-align: center;">
                    <h2>Кириш учун тўлов</h2>
                    
                </div>
                <div class="check-page-body_item" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #000; padding: 6px 8px;">
                    <h2>Вақти :</h2>
                    <h2>{{ datas.date_time | moment }}</h2>
                </div>
                <div class="check-page-body_item" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #000; padding: 6px 8px;">
                    <h2>Одам сони :</h2>
                    <h2>
                        {{ datas.odam_soni }} *
                        {{ new Intl.NumberFormat('ru-RU',{
                            style:'decimal'
                            }).format( datas.price / datas.odam_soni)
                        }}
                        = 
                        {{ new Intl.NumberFormat('ru-RU',{
                            style:'decimal'
                            }).format(datas.price)
                        }}
                    </h2>
                </div>
                <div class="check-page-body_item" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #000; padding: 6px 8px;">
                    <h2>Машина сони :</h2>
                    <h2 v-if="datas.mashina_soni > 0">{{ datas.mashina_soni }} *
                        {{ datas.mashina_price == 0 ? 0 : ( new Intl.NumberFormat('ru-RU',{
                            style:'decimal'
                        }).format(datas.mashina_price / datas.mashina_soni)) }} 
                        = 
                        {{ new Intl.NumberFormat('ru-RU',{
                            style:'decimal'
                        }).format(datas.mashina_price)
                        }}
                    </h2>
                </div>
                <div class="check-page-body_item" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #000; padding: 6px 8px;">
                    <h2>Умумий сумма :</h2>
                    <h2>
                        {{ new Intl.NumberFormat('ru-RU',{
                            style:'decimal'
                        }).format(datas.price + datas.mashina_price)
                        }}
                    </h2>
                </div>
            </div>
            <div class="check-page-header"><h2 style="text-align: center;color: green;padding: 8px 0px;">Тўланди</h2></div>
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
        datas: {},
        counter:{
            odam_soni: 1,
            mashina_soni: 0
        },
        chek: "",
        img: message,
        SuriName: "",
        suriId: null,
        checkSpinner: false
        };
    },
    mounted() {
        // this.Sorilar();
    },
    methods: {
        Prev() {
        // if (this.$route.name != "Prixod Document") {
        //   const x = window.confirm("Ростдан ҳам ойнани тарк этмоқчимисиз?");
        //   if (x) {
        //     this.$router.push("/prixod");
        //   }
        // } else {
        //   window.close();
        // }
        this.$router.go(-1);
        },
        chekPrint() {
            if(this.checkSpinner == false){
                this.checkSpinner = true;
                let self = this;
                axios({
                method: "post",
                url: "/kirish_summa/kirish",
                data: self.counter,
                }).then(res => {
                    if(res.data){
                        this.datas = res.data;
                        setTimeout(()=> {
                            this.checkSpinner = false;
                            let dataHtml = document.querySelector('.check-page');
                            document.body.style.margin = '8px 12px';
                            document.body.style.padding = '12px 20px';
                            document.body.innerHTML = dataHtml.innerHTML;
                            window.print();
                            this.$router.go()
                        },1000)
                    }
                })
            }
           
        },
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
.check-page{
    display: none;
}

#printer {
    min-width: 500px;
    min-height: 550px;
    background: #fffefeec;
    padding: 15px 20px;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.print_check {
    height: calc(100% - 60px);
    display: grid;
    place-items: center;
}
.printer-header{
    display: grid;
    gap: 8px;
}
.print_check_item{
    margin: 8px 0px;
    font-size: 16pt;
}

.kirish-oyna {
    background: #d3e4e7;
    height: 100vh;
}
.d-flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 6px;
}
.kattaPrixod {
    margin: 0px auto;
    padding: 10px 7px;
    width: 99%;
    background: #fff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 5px 8px 10px rgba(100, 100, 111, 0.2) ;
    display: flex;
    justify-content: space-between;
    color: #3f51b5;
    font-size: 20px;
    font-weight: 700;
    line-height: 40px;
}
.navbarBtn-kirish {
    margin: 20px auto;
    color: #fff;
    border: 1px solid #fff;
    font-size: 30px;
    font-weight: 600;
    padding: 15px 25px;
    background: #379056;
    box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.3);
    border-radius: 8px;
}
.ChopEtishBtn {
  color: #fff;
  border: 1px solid #fff;
  padding: 12px 0px;
  background: #379056;
  border-radius: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
  </style>
  