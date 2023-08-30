<template>
  <div class="malumotnoma">
    <div class="header">
      <div class="table">
        <div>Ўзбекистон Республмкаси Согликни саклаш вазирлиги</div>
        <div>
          Муассаса номи «Соғлом турмуш» маъсулияти чекланган жамияти клиникаси
        </div>
      </div>
      <div class="tab">
        Тиббий хужжатлар <br />
        Шакл № 027 у <br />
        Ўзбекистон Республикаси Соғликни саклаш вазирлиги томонидан тасдиқланган
      </div>
    </div>
    <div class="title">
      <p class="p1">К Ў Ч И Р М А № 9942</p>
      <p class="p2">Амбулатор картадан</p>
    </div>
    <div class="about" v-for="(item, index) in data" :key="index">
      <ol v-if="item">
        <li><span>Беморнинг исми-шарифи:</span> {{ item.patient.fullname }}</li>
        <li>
          <span>Туғилган вақти:</span> {{ item.patient.birthday | moment }}
        </li>
        <li><span>Уй манзили:</span> {{ item.patient.region.name }}</li>
        <li><span>Саналар:</span> {{ item.created_at | moment }}</li>
        <li><span>Қабул қилинган:</span> {{ item.created_at | moment }}</li>
        <li><span>Чиқарилган:</span></li>
        <li>
          <span
            >Тўла ташхис: Марказий нерв системаси туғма ривожланиши нуқсони.
            Микроцефалия. Талваса синдроми.
          </span>
        </li>
      </ol>
      <div class="shikoyat">
        <span>Бемор келгандаги шикоятлари:</span> Онасини сўзидан: 2 кунлигида 1
        марта талваса бўлишига, боши кичкиналигига, йиғлаганида кўкариб
        қолишига, уйқуси яхшимаслигига, қўлларини харакати сустлигига, бошини
        орқага ташлашига, инжиқ қайсарлигига, умумий қувватсизликка.
      </div>
      <div>
        <span>Анамнези:</span> Онасини сўзидан: касаллиги туғилганидан бошланган
      </div>
      <div>
        <span>Кўрикда:</span> беморнинг умумий ахволи: ўртача, Холати: пассив,
        териси тоза Тери ва шиллиқ пардалар ранги окиш. Периферик лимфа
        тугунлари катталашмаган. Таянч-харакат системаси деформациясиз. Шишлар
        йўқ. Нафас олиш бурун оркали равон, Юрак уриши маромли, Юрак тонлари
        аниқ; Пулс 121 та, ЮКС 121 та, Тил нам Тоза; Қорин юмшок, Қорин
        оғриқсиз; Жигар катталашмаган, Талок катталашмаган Ич келиши бир суткада
        <input type="text" placeholder="toldir" /> махал, қабзиятга мойил.
        Пастернацкий белгиси <input type="text" placeholder="toldir" /> томондан
        манфий. Сийиши равон меъёрида. катталашмаган. Ич келиши бир суткада
        <input type="text" placeholder="toldir" /> махал, қабзиятга мойил эмас.
        Пастернацкий белгиси <br />
        <input type="text" placeholder="toldir" /> томондан манфий. Сийиш равон
        меъёрида
      </div>
      <div>
        <span>Неврологик статус:</span> БМН-кўз қорачиғлари бир хил эмас,
        Ёруғликка фото реакцияси сақланган, Икки ёнбошга қараганда нистагм йўқ,
        Унг бурун лаб бурмаси силликлашмаган.
      </div>
      <div v-if="item">
        <div
          v-for="(tekshir, index) in item.registration_inspection"
          :key="index"
        >
          <span class="span">Лаб. Текширувлари: </span>
          <div
            v-for="(child, index) in tekshir.registration_inspection_child"
            :key="index"
          >
            <span class="span"> {{ child.name }}: </span>
            <span v-html="child.text"></span>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="tit">Бош шифокор:</div>
        <div>
          т.ф.н: &nbsp; &nbsp; &nbsp; Жалилов Ш.Х. <br />
          Хомидова Н. <br />
          Ахмадалиева М.
        </div>
      </div>
    </div>
    <button @click="Printer">Printerga Yuborish</button>
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
        btn.innerHTML = "";
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
      }, 2000);
    }
  }
};
</script>
<style scoped>
button {
  margin: 20px 0px;
  background: linear-gradient(to left, rgb(182, 219, 182), rgb(115, 143, 115));
  padding: 6px 20px;
  border-radius: 5px;
  border: none;
  color: white;
}
input {
  background-color: rgb(231, 229, 229);
  border: none;
  width: 30px;
  text-indent: 10px;
}
.malumotnoma {
  width: 90%;
  padding: 0px 20px;
}
table tr td {
  padding: 10px;
}
.title {
  text-align: center;
}
.span,
span {
  font-weight: bold;
}
.title .p1 {
  font-size: 30px;
  font-weight: bold;
}
.footer {
  display: flex;
  justify-content: space-around;
}
.header {
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 20px;
}
.table div {
  border: 1px solid black;
  width: 400px;
  padding: 10px;
}
.header .tab {
  border: 1px solid black;
  width: 500px;
}
.title .p2 {
  font-size: 28px;
  font-weight: bold;
}
.about ol li span {
  font-weight: bold;
}
.span {
  font-weight: bold;
}
</style>
