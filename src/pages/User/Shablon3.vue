<template>
  <div class="malumotnoma">
    <div class="header">
      <div class="table">
        <div>Министерство Здравоохранении Республики Узбекистан</div>
        <div>Учреждения: клиники «Соглом турмуш» ООА</div>
      </div>
      <div class="tab">
        Медицинский Документ <br />
        Форма № 027 у <br />
        Министерством Здравоохранения Республики Узбекистан
      </div>
    </div>
    <div class="title">
      <p class="p1">Выписка № 121</p>
      <p class="p2">Из истории болезни</p>
    </div>
    <div class="about" v-for="(item, index) in data" :key="index">
      <ol v-if="item">
        <li><span>Ф.И.О:</span> {{ item.patient.fullname }}</li>
        <li><span>Год рождения:</span> {{ item.patient.birthday | moment }}</li>
        <li><span>Адрес:</span> {{ item.patient.region.name }}</li>
        <li><span>Даты</span> {{ item.created_at | moment }}</li>
        <li><span>Дата поступления:</span> {{ item.created_at | moment }}</li>
        <li><span>Дата выписки:</span></li>
        <li><span>Диагноз: Отставания умственного развития</span></li>
      </ol>
      <div class="shikoyat">
        <span>Жалобы при поступлении:</span> Со слов матери на отставание в
        психомоторном и физическом развитии, общую слабость
      </div>
      <div>
        <span>Объективно:</span> состояние удовлетворительное. Кожа и видимое
        слизистое бледно розового цвета Периферические. Лимфы узлы без
        изменений. Опорно-двигательная система без деформации. Дыхания ровное 20
        в 1 мин. Сердечные тоны ритмичные пулс 130 уд в 1 мин. Язык влажный,
        чистый; Живот мягкий, безболезненно. Печень и селезёнка не увелечена.
        Стул 1 раз сутки. Симптом пастернацкого отр. Диурез в норме.
      </div>
      <div>
        <span>Неврологический статус:</span> В сознании, к осмотру негативна.
        Обрашёную речь понимает. Инструкции выполняет. Отмечается отставание в
        психомоторном и физическом развитии. Со стороны ЧМН: Обоняние сохранено,
        предметное зрение сохранено. Глазные щели симметричные. Зрачки
        равновеликие, средней ширины, фотореакция сохранены. Корнеальные и
        конъюктивальные рефлексы сохранены. Лицо симметричное с 2-х сторон. Слух
        сохранен с 2-х сторон. Глотания и фонация не нарушены. Мягкое небо
        симметрично, глоточный рефлекс живой. Язык по средней линии, атрофии и
        фибрилляций нет. Чувствительность сохранена. <br />
      </div>
      <div v-if="item">
        <div
          v-for="(tekshir, index) in item.registration_inspection"
          :key="index"
        >
          <span class="span">Лаборатория: </span>
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
        <div class="tit">Глав. врач:</div>
        <div>
          к.м.н Жалилов Ш.Х. <br />
          Хомидова Н. <br />
          Хомидова М.
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
.malumotnoma {
  width: 90%;
  padding: 0px 20px;
}
table tr td {
  padding: 10px;
}
.span,
span {
  font-weight: bold;
}
.title {
  text-align: center;
}
.title .p1 {
  font-size: 30px;
  font-weight: bold;
}
input {
  background-color: rgb(231, 229, 229);
  border: none;
}
.footer {
  display: flex;
  justify-content: space-around;
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
</style>
