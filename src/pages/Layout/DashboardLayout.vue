<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <sidebar-link to="/dashboard">
        <b-icon font-scale="2" icon="bar-chart-line-fill" class="mr-3"></b-icon>
        <p>Дашборд</p>
      </sidebar-link>
      <sidebar-link to="/royhat">
        <b-icon font-scale="2" icon="columns-gap" class="mr-3"></b-icon>
        <p>Навбатлар рўйхати</p>
      </sidebar-link>
      <sidebar-link to="/user">
        <b-icon font-scale="2" icon="person-plus" class="mr-3"></b-icon>
        <p>Регистрация</p>
      </sidebar-link>
      <sidebar-link to="/user/statsionar" v-if="ruleStatsionar">
        <b-icon font-scale="2" icon="door-closed-fill" class="mr-3"></b-icon>
        <p>Стационар</p>
      </sidebar-link>

      <b-button
        @click="showDocs = !showDocs"
        class="d-flex w-100 align-items-center bg-transparent justify-content-between border-0 outline-0 shadow-0 shadow-none pr-1 pl-4"
      >
        <span style="padding-left: 10px;">
          <b-icon icon="file-earmark-check-fill"></b-icon>
          <span style="margin-left: 18px;">
            Ҳужжатлар
          </span>
        </span>

        <span
          class="material-icons icon-large"
          style="font-size: 2.3rem;"
          :class="{ 'text-primary': showDocs }"
        >
          {{ showDocs ? "expand_less" : "expand_more" }}
        </span>
      </b-button>
      <b-collapse :visible="showDocs">
        <sidebar-link to="/arxiv">
          <b-icon font-scale="2" icon="journal-text" class="mr-3"></b-icon>
          <p>Архив</p>
        </sidebar-link>

        <sidebar-link
          to="/kassaa"
          v-if="
            localUser.role == 'Admin' ||
              localUser.role == 'Dasturchi' ||
              localUser.role == 'Kasser'
          "
        >
          <b-icon font-scale="2" icon="bank2" class="mr-3"></b-icon>
          <p>Касса чиқим</p>
        </sidebar-link>

        <sidebar-link
          to="/oplata"
          v-if="
            localUser.role == 'Admin' ||
              localUser.role == 'Dasturchi' ||
              localUser.role == 'Kasser'
          "
        >
          <b-icon font-scale="2" icon="cash-coin" class="mr-3"></b-icon>
          <p>Тўловлар</p>
        </sidebar-link>

        <sidebar-link
          to="/prixod"
          v-if="
            localUser.role == 'Admin' ||
              localUser.role == 'Dasturchi' ||
              localUser.role == 'Kasser'
          "
        >
          <b-icon font-scale="2" icon="box-arrow-in-down" class="mr-3"></b-icon>
          <p>Приход</p>
        </sidebar-link>

        <sidebar-link
          to="/provider/pay"
          v-if="
            localUser.role == 'Admin' ||
              localUser.role == 'Dasturchi' ||
              localUser.role == 'Kasser'
          "
        >
          <b-icon font-scale="2" icon="person-check-fill" class="mr-3"></b-icon>
          <p>Поставщик тўлов</p>
        </sidebar-link>

        <sidebar-link
          to="/pay-direct"
          v-if="
              localUser.role == 'Admin' ||
              localUser.role == 'Dasturchi' ||
              localUser.role == 'Kasser'
          "
        >
          <b-icon font-scale="2" icon="journal-text" class="mr-3"></b-icon>
          <p>Вакил тўлов</p>
        </sidebar-link>

        <sidebar-link
          to="/reagent/department"
          v-if="
            localUser.role == 'Admin' ||
              localUser.role == 'Dasturchi' ||
              localUser.role == 'Kasser'
          "
        >
          <b-icon font-scale="2" icon="server" class="mr-3"></b-icon>
          <p>Реагент бўлим</p>
        </sidebar-link>

      </b-collapse>

      <b-button
        @click="showData = !showData"
        class="d-flex w-100 align-items-center bg-transparent justify-content-between border-0 outline-0 shadow-0 shadow-none pr-1 pl-4"
        :class="{ active: showData }"
        >
        <span style="padding-left: 10px;">
          <b-icon icon="wallet-fill"></b-icon>
          <span style="margin-left: 18px;">Маълумотлар</span>
        </span>

        <span
          class="material-icons icon-large"
          style="font-size: 2.3rem;"
          :class="{ 'text-primary': showData }"
        >
          {{ showData ? "expand_less" : "expand_more" }}
        </span>
      </b-button>
      <b-collapse :visible="showData"  >
        <sidebar-link
          to="/bemor"
          v-if="
              localUser.role == 'Admin' ||
              localUser.role == 'Dasturchi' ||
              localUser.role == 'Registrator'
          "
        >
          <b-icon
            font-scale="2"
            icon="file-earmark-person-fill"
            class="mr-3"
          ></b-icon>
          <p>Беморлар</p>
        </sidebar-link>

        <sidebar-link
          to="/Shifokor-bolimi"
          v-if="(localUser.role == 'Admin' || localUser.role == 'Dasturchi') && ruleDoctor"
        >
          <b-icon font-scale="2" icon="journal-medical" class="mr-3"></b-icon>
          <p>Шифокор бўлими</p>
        </sidebar-link>

        <sidebar-link
          to="/shifokor"
          v-if="(localUser.role == 'Admin' || localUser.role == 'Dasturchi') && ruleDoctor"
        >
          <b-icon font-scale="2" icon="people-fill" class="mr-3"></b-icon>
          <p>Шифокорлар</p>
        </sidebar-link>

        <sidebar-link
          to="/hodimlar"
          v-if="localUser.role == 'Admin' || localUser.role == 'Dasturchi'"
        >
          <b-icon font-scale="2" icon="file-person-fill" class="mr-3"></b-icon>
          <p>Ходимлар</p>
        </sidebar-link>

        <sidebar-link
          to="/naprovitel"
          v-if="
            localUser.role == 'Admin' ||
              localUser.role == 'Dasturchi' ||
              localUser.role == 'Shifokor'
          "
        >
          <b-icon font-scale="2" icon="arrow-left-right" class="mr-3"></b-icon>
          <p>Напровител</p>
        </sidebar-link>

        <sidebar-link
          to="/provider"
          v-if="
            localUser.role == 'Admin' ||
              localUser.role == 'Dasturchi' ||
              localUser.role == 'Kasser'
          "
        >
          <b-icon font-scale="2" icon="person-lines-fill" class="mr-3"></b-icon>
          <p>Поставщик</p>
        </sidebar-link>

        <sidebar-link
          to="/dorilar"
          v-if="localUser.role == 'Admin' || localUser.role == 'Dasturchi'"
        >
          <b-icon font-scale="2" icon="grid3x2-gap-fill" class="mr-3"></b-icon>
          <p>Дорилар</p>
        </sidebar-link>

        <sidebar-link
          to="/reagent"
          v-if="
            localUser.role == 'Admin' ||
              localUser.role == 'Dasturchi' ||
              localUser.role == 'Kasser'
          "
        >
          <b-icon font-scale="2" icon="server" class="mr-3"></b-icon>
          <p>Реагент</p>
        </sidebar-link>

        <sidebar-link
          to="/palata"
          v-if="(localUser.role == 'Admin' || localUser.role == 'Dasturchi') && ruleStatsionar"
        >
          <b-icon font-scale="2" icon="door-closed-fill" class="mr-3"></b-icon>
          <p>Палата</p>
        </sidebar-link>

        <sidebar-link
          to="/tekshiruv-bolimlari"
          v-if="(localUser.role == 'Admin' || localUser.role == 'Dasturchi') && ruleLaborant"
        >
          <b-icon font-scale="2" icon="ui-checks-grid" class="mr-3"></b-icon>
          <p>Текширув бўлимлари</p>
        </sidebar-link>

        <sidebar-link
          to="/tekshiruvlar"
          v-if="(localUser.role == 'Admin' || localUser.role == 'Dasturchi') && ruleLaborant"
        >
          <b-icon font-scale="2" icon="ui-checks" class="mr-3"></b-icon>
          <p>Текширувлар</p>
        </sidebar-link>

        <sidebar-link
          to="/xonalar"
          v-if="localUser.role == 'Admin' || localUser.role == 'Dasturchi'"
        >
          <b-icon font-scale="2" icon="door-open-fill" class="mr-3"></b-icon>
          <p>Хоналар</p>
        </sidebar-link>

        <sidebar-link
          to="/filial"
          v-if="localUser.role == 'Admin' || localUser.role == 'Dasturchi'"
        >
          <b-icon font-scale="2" icon="building" class="mr-3"></b-icon>
          <p>Филиал</p>
        </sidebar-link>
      </b-collapse>

      <sidebar-link to="/hisobotlar">
        <b-icon font-scale="2" icon="calendar-range" class="mr-3"></b-icon>
        <p>Ҳисоботлар</p>
      </sidebar-link>

      

      <!-- <sidebar-link
        to="/eshikdan-kirish"
        v-if="(localUser.role == 'Admin' || localUser.role == 'Dasturchi' || localUser.role == 'Registrator') && showColumn"
      >
        <b-icon
          font-scale="2"
          icon="door-open"
          class="mr-3"
        ></b-icon>
        <p>Эшикдан кириш</p>
      </sidebar-link>
      <sidebar-link
        to="/enter-price"
        v-if="(localUser.role == 'Admin' || localUser.role == 'Dasturchi' || localUser.role == 'Kasser') && showColumn"
      >
        <b-icon
          font-scale="2"
          icon="file-spreadsheet"
          class="mr-3"
        ></b-icon>
        <p>Кириш нархи</p>
      </sidebar-link>
      <sidebar-link
        to="/bassen-kirsh"
        v-if="(localUser.role == 'Admin' || localUser.role == 'Dasturchi' || localUser.role == 'Kasser') && showColumn"
      >
        <b-icon
          font-scale="2"
          icon="water"
          class="mr-3"
        ></b-icon>
        <p>Бассейнга кириш</p>
      </sidebar-link>
      <sidebar-link
        to="/bassen-price"
        v-if="(localUser.role == 'Admin' || localUser.role == 'Dasturchi' || localUser.role == 'Kasser') && showColumn"
      >
        <b-icon
          font-scale="2"
          icon="wallet2"
          class="mr-3"
        ></b-icon>
        <p>Бассейн нархи </p>
      </sidebar-link> -->
      <!-- <sidebar-link
        to="/kirish"
        v-if="(localUser.role == 'Admin' || localUser.role == 'Dasturchi' || localUser.role == 'Registrator') && showColumn"
      >
        <b-icon
          font-scale="2"
          icon="chevron-double-right"
          class="mr-3"
        ></b-icon>
        <p>Сўрига Кириш</p>
      </sidebar-link> -->
      <!-- <sidebar-link
        to="/arxiv"
        v-if="localUser.role == 'Admin' || localUser.role == 'Dasturchi'"
      >
        <md-icon>archive</md-icon>
        <p>Arxiv</p>
      </sidebar-link> -->
      <!-- <sidebar-link
        to="/bemor"
        v-if="localUser.role == 'Admin' || localUser.role == 'Dasturchi'"
      >
        <md-icon>airline_seat_individual_suite</md-icon>
        <p>Bemor</p>
      </sidebar-link> -->
      <!-- <sidebar-link
        to="/medpritavitel"
        v-if="
          localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Shifokor'
        "
      >
        <md-icon>diversity_2</md-icon>
        <b-icon font-scale="2" icon="person-bounding-box" class="mr-3"></b-icon>
        <p>Мед Представитель</p>
      </sidebar-link> -->
      <!-- <sidebar-link
        to="/sori"
        v-if="localUser.role == 'Admin' || localUser.role == 'Dasturchi'"
      >
        <b-icon font-scale="2" icon="grid-fill" class="mr-3"></b-icon>
        <p>Сўрилар</p>
      </sidebar-link> -->

      <sidebar-link to="/settings"  
        v-if="localUser.role == 'Admin' || localUser.role == 'Dasturchi'">
        <b-icon icon="gear-fill" font-scale="2" class="mr-3"></b-icon>
        <p>Созламалар</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>
      <div
        class="notications xatoliklar alert-danger"
        style="z-index: 5"
        v-if="$store.state.errors != ''"
      >
        <button
          type="button"
          aria-hidden="true"
          class="close"
          @click="$store.state.errors = ''"
        >
          ×
        </button>
        <p><i class="fas fa-exclamation-triangle"></i>&nbsp; Хатолик</p>
        <div>{{ $store.state.errors }}</div>
      </div>

      <dashboard-content></dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
// import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import SidebarLink from "../../components/SidebarPlugin/SidebarLink.vue";
// import FixedPlugin from "./Extra/FixedPlugin.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    // MobileMenu,
    SidebarLink,
    // FixedPlugin,
  },
  data() {
    return {
      sidebarBackground: "green",
      // sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
      localUser: JSON.parse(localStorage.getItem("user")),
      localBranch: JSON.parse(localStorage.getItem("filial_id")),
      showColumn: false,
      showData: false,
      showDocs: false,
      showReport: false,
      ruleStatsionar: null,
      ruleDoctor: null,
      ruleLaborant: null
    };
  },
  methods: {
    routerPush() {
      // this.$router.push('/user')
    },
    checkAllow() {
      let self = this;
      axios({
        method: "get",
        url: "/filial/all",
      }).then((res) => {
        if (res != undefined) {
          if (res.data.data[0].id == this.localBranch) {
            this.showColumn = true;
          } else {
            this.showColumn = false;
          }
        }
      });
    },
    async getSettings() {
      try {
        let res = await axios.get("/settings")
        let arr = JSON.parse(res.data.data.rules)
        this.ruleDoctor = arr[2].checked
        this.ruleLaborant = arr[1].checked
        this.ruleStatsionar = arr[3].checked
        console.log(arr)
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    this.getSettings()
    this.checkAllow();
    setInterval(() => {
      if (this.$store.state.errors != "") {
        this.$store.state.errors = "";
      }
    }, 3000);
  },
};
</script>

<style >
@keyframes animateAlert {
  0% {
    width: 0px;
    opacity: 0;
  }
  10% {
    width: 800px;
    opacity: 1;
  }
  90% {
    width: 800px;
    opacity: 1;
  }
  100% {
    width: 0px;
    opacity: 0;
  }
}

.xatoliklar {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  /* background: rgb(255, 0, 0); */
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  opacity: 0;
  animation: animateAlert 3s linear;
  pointer-events: all;
}

.md-list-item .md-ripple {
  padding: 0.5px;
}

.icon-large {
  font-size: 134px; /* Adjust the font size as needed */
}
/*  */

.nav {
  flex-wrap: nowrap !important;
}

.wrapper .sidebar .sidebar-wrapper {
  width: 276px !important;
  padding-right: 10px;
}

.md-list.md-theme-default .md-selected .md-list-item-content, .md-list.md-theme-default .router-link-active .md-list-item-content {
  color: #fff !important;
}
</style>
