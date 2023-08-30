<template>
  <div class="malumotnoma">
    <div class="matn">
      <div class="title">МАЪЛУМОТНОМА № <input type="text" /></div>
      <div class="berildi">
        Берилди:
        <input
          style="background-color: rgb(231, 229, 229);"
          type="text"
          placeholder="berildi"
        />
      </div>
      <div class="bemor" v-for="(item, index) in data" :key="index">
        <div v-if="item != null">
          Ёши - {{ item.patient.birthday | moment }} <br />
          Яшаш жойи - {{ item.patient.region.name }}
          <div v-for="(palata, index) in item.registration_palata" :key="index">
            «Соглом турмуш»реаблитациялаш клиникаси
            {{ palata.date_do | moment }} дан
            {{ palata.date_to | moment }} йилгача стационар даволанишда булди.
          </div>
          <div
            v-for="(tashxis, index) in item.registration_inspection"
            :key="index"
          >
            <div
              v-for="(item, index) in tashxis.registration_inspection_child"
              :key="index"
            >
              Ташхис:
              <div v-html="item.text"></div>
            </div>
          </div>
          <div class="hozirgi_holati">Хозирги холати <input type="text" /></div>
          <div>
            Маълумотнома га курсатиш учун берилди.
          </div>
          <div class="nomzod">
            Тиббиёт фанлари номзоди:______________________ Ш.Х. Жалилов.
          </div>
          <button @click="Printer">Printerga Yuborish</button>
        </div>
        <div class="malumot" v-else>
          <div class="bosh">
            <b-icon icon="info-circle-fill"></b-icon>
            <div>Malumot mavjud emas</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      data: [],
      malumot: false
    };
  },
  created: function() {
    this.data.push(JSON.parse(localStorage.getItem("History")));
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
  methods: {
    Printer() {
      let btn = document.querySelector("button");
      setTimeout(() => {
        btn.classList.toggle("hide");
        window.print();
        setTimeout(() => {
          this.close();
        }, 2000);
      }, 2000);
    },
    close() {
      let self = this;
      setTimeout(() => {
        localStorage.removeItem("History");
        self.$router.push({ path: "/user" });
        window.close();
      }, 3000);
    }
  }
};
</script>
<style scoped>
.malumot {
  width: 100%;
  display: flex;
  justify-content: center;
}
.bosh {
  width: 500px;
  height: 200px;
  background: linear-gradient(
    to left,
    rgb(172, 171, 171),
    rgb(240, 239, 239),
    rgb(172, 171, 171)
  );
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hide {
  display: none;
}
.hozirgi_holati input {
  width: 80%;
  border: none;
}
.nomzod {
  width: 80%;
  border: none;
}
.malumotnoma {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
button {
  margin: 20px 0px;
  background: linear-gradient(to left, rgb(182, 219, 182), rgb(115, 143, 115));
  padding: 6px 20px;
  border-radius: 5px;
  border: none;
  color: white;
}
.matn {
  width: 70%;
}
.matn .title {
  text-align: center;
  font-weight: bold;
}
.title input {
  width: 40px;
  border: none;
}
.berildi {
  font-weight: bold;
}
.berildi input {
  width: 80%;
  border: none;
}
</style>
