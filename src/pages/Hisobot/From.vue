<template>
  <div class="Parent">
    <div class="Hisobotlar">
      <div
        class="HisobotChild"
        v-if="
            localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Shifokor'
        "
      >
        <label>Шифокор ҳисобот</label>
        <div>
          <sidebar-link
            v-if="localUser.role == 'Admin' || localUser.role == 'Dasturchi'"
            to="/doctor-hisobot"
          >
            <p>Шифокор ҳисобот</p>
          </sidebar-link>
          <sidebar-link
            target="_blank"
            to="/doctor_sverka"
            v-if="
              localUser.role == 'Admin' ||
                localUser.role == 'Dasturchi' ||
                localUser.role == 'Shifokor'
            "
          >
            <p>Шифокор Сверка</p>
          </sidebar-link>
        </div>
      </div>
      <div
        class="HisobotChild"
        v-if="
            localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Loborant'
        "
      >
        <label>Текширув ҳисобот</label>
        <sidebar-link
          to="/inspection_hisobot"
          v-if="localUser.role == 'Admin' || localUser.role == 'Dasturchi'"
        >
          <p>Текширув ҳисобот</p>
        </sidebar-link>
        <sidebar-link
          to="/inspection_sverka"
          target="_blank"
          v-if="
              localUser.role == 'Admin' ||
              localUser.role == 'Dasturchi' ||
              localUser.role == 'Loborant'
          "
        >
          <p>Текширув сверка</p>
        </sidebar-link>
      </div>
      <div
        v-if="
            localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser' ||
            localUser.role == 'Registrator'
        "
        class="HisobotChild"
      >
        <label>Касса ҳисобот</label>
        <!-- <sidebar-link
          to="/kassa-hisobot"
        >
          <p>Kassa Hisobot</p>
        </sidebar-link> -->

        <sidebar-link target="_blank" to="/kassa-sverka">
          <p>Касса Сверка</p>
        </sidebar-link>
      </div>
      <!-- <div class="HisobotChild">
        <label>Шифокор кўриги</label>
        <sidebar-link
          to="/kassa-hisobot"
        >
          <p>Касса Ҳисобот</p>
        </sidebar-link>

        <sidebar-link target="_blank" to="/patient-count">
          <p>Кўриклар сони</p>
        </sidebar-link>
      </div> -->
      <div
        class="HisobotChild"
        v-if="
            localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser'
        "
      >
        <label>Палата ҳисобот</label>
        <div>
          <!-- <sidebar-link
            to="/direct_hisobot"
          >
            <p>Палата ҳисобот</p>
          </sidebar-link> -->
          <sidebar-link target="_blank" to="/statsionar/sverka">
            <p>Палата Сверка</p>
          </sidebar-link>
        </div>
      </div>
      <div
        class="HisobotChild"
        v-if="
            localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser' ||
            localUser.role == 'Registrator'
        "
      >
        <label>Вакил ҳисобот</label>
        <div>
          <sidebar-link
            v-if="localUser.role == 'Admin' || localUser.role == 'Dasturchi'"
            to="/direct_hisobot"
          >
            <p>Вакил ҳисобот</p>
          </sidebar-link>
          <sidebar-link target="_blank" to="/direct_sverka">
            <p>Вакил Сверка</p>
          </sidebar-link>
        </div>
      </div>
      <!-- <div
        class="HisobotChild"
        v-if="
            localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser' ||
            localUser.role == 'Registrator'
        "
      >
        <label>Вакил ҳисобот</label>
        <div>
          <sidebar-link
            v-if="
                localUser.role == 'Admin' ||
                localUser.role == 'Dasturchi' ||
                localUser.role == 'Kasser' ||
                localUser.role == 'Registrator'
            "
            to="/med/direct/hisobot"
          >
            <p>Вакил ҳисобот</p>
          </sidebar-link>
          <sidebar-link target="_blank" to="/direct_sverka">
            <p>Вакил Сверка</p>
          </sidebar-link>
        </div>
      </div> -->
      <div
        class="HisobotChild"
        v-if="
            localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser' ||
            localUser.role == 'Registrator'
        "
      >
        <label>Поставщик ҳисобот</label>
        <div>
          <sidebar-link to="/provayder/hisobot">
            <p>Поставщик ҳисобот</p>
          </sidebar-link>
          <sidebar-link target="_blank" to="/provayder/sverka">
            <p>Поставщик Сверка</p>
          </sidebar-link>
        </div>
      </div>
      <div
        class="HisobotChild"
        v-if="
            localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi'
        "
      >
        <label>Реагент ҳисобот</label>
        <div>
          <sidebar-link target="_blank" to="/provayder/sverka">
            <p>Реагент Сверка</p>
          </sidebar-link>
        </div>
      </div>
      <!-- <div
        class="HisobotChild"
        v-if="
            localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser' ||
            localUser.role == 'Registrator'
        "
      >
        <label>Махсулот ҳисобот</label>
        <div>
          <sidebar-link to="reagent/hisobot">
            <p>Махсулот ҳисобот</p>
          </sidebar-link>
          <sidebar-link target="_blank" to="/Reagent/sverka">
            <p>Махсулот Сверка</p>
          </sidebar-link>
        </div>
      </div> -->
      <!-- <div
        class="HisobotChild"
        v-if="
            localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser' ||
            localUser.role == 'Registrator'
        "
      >
        <label>Сўри ҳисобот</label>
        <div>
          <sidebar-link to="sori/hisobot">
            <p>Сўри ҳисобот</p>
          </sidebar-link>
          <sidebar-link target="_blank" to="/sori/sverka">
            <p>Сўри Сверка</p>
          </sidebar-link>
        </div>
      </div> -->
      <!-- <div
        class="HisobotChild"
        v-if="
            localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser' ||
            localUser.role == 'Registrator'
        "
      >
        <label>Эшикдан кириш ҳисобот</label>
        <div>
          <sidebar-link target="_blank" to="/eshik/sverka">
            <p>Эшикдан кириш Сверка</p>
          </sidebar-link>
        </div>
      </div> -->
      <!-- <div
        class="HisobotChild"
        v-if="
            localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser' ||
            localUser.role == 'Registrator'
        "
      >
        <label>Бассейн ҳисобот</label>
        <div>
          <sidebar-link target="_blank" to="/bassen/sverka">
            <p>Бассейн сверка</p>
          </sidebar-link>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localUser: JSON.parse(localStorage.getItem("user"))
    };
  }
};
</script>
<style scoped>
.Parent {
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
}
.Hisobotlar {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  padding: 20px 40px;
}
.HisobotChild {
  background-color: hsla(0, 0%, 66.7%, 0.38823529411764707);
  width: 250px;
  margin: 10px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 0px 2px rgb(209, 206, 206);
  /* padding: 5px 10px; */
}
.HisobotChild label {
  font-weight: 700;
  color: #195fb0;
  border-bottom: 1px solid #a7c3db;
  width: 100%;
  padding: 5px 10px;
}
/* .HisobotChild div {
  align-items: center;
} */
.HisobotChild .md-ripple {
  text-align: center;
  padding: 0px;
}
.HisobotChild p {
  color: #195fb0;
  font-family: sans-serif;
  font-style: italic;
  font-weight: 500;
  font-size: 16px;
  align-items: center;
  text-transform: capitalize;
  text-indent: 20px;
  transition: color 0.5s ease-in-out;
}
.HisobotChild p:hover {
  color: red;
  text-decoration: underline;
}
</style>
