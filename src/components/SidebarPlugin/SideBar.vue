<template>
  <div class="sidebar" :data-color="sidebarItemColor" :style="sidebarStyle">
    <div class="logo">
      <a href="#" class="simple-text logo-mini">
        <!-- <div>
          <img :src="imgLogo" alt="" />
        </div> -->
      </a>

      <a class="simple-text logo-normal logo-sarlovha">
        {{ title }}
      </a>
    </div>
    <div class="sidebar-wrapper">
      <slot name="content"></slot>
      <md-list class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot>
          <sidebar-link
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :to="link.path"
            :link="link"
          >
          </sidebar-link>
        </slot>
      </md-list>
    </div>
  </div>
</template>
<script>
import SidebarLink from "./SidebarLink.vue";

export default {
  components: {
    SidebarLink
  },
  props: {
    title: {
      type: String,
      default: "Best Med"
      // default: "РИКМИАТМФФ"
    },
    sidebarBackgroundImage: {
      type: String
      // default: 'red'
      // default: require("@/assets/img/sidebar-2.jpg")
    },
    // imgLogo: {
    //   type: String,
    //   default: require("../../../public/ssv.png")
    // },
    sidebarItemColor: {
      type: String,
      default: "blue",
      validator: value => {
        let acceptedValues = ["", "purple", "blue", "green", "orange", "red"];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      autoClose: this.autoClose
    };
  },
  computed: {
    sidebarStyle() {
      return {
        // backgroundImage: `url(${this.sidebarBackgroundImage})`,
        background: "blue"
      };
    }
  }
};
</script>
<style>
@media screen and (min-width: 991px) {
  .nav-mobile-menu {
    display: none;
  }
}
.wrapper .sidebar .nav p {
  font-size: 16px !important;
  font-weight: 600 !important;
}
.wrapper .sidebar .sidebar-wrapper {
  /* background: #379056; */
  background: #379056
}
/* .md-list-item .active {
  background-color: #003eea !important;
} */
.logo-sarlovha {
  font-size: 16px !important;
}
.wrapper .sidebar .logo {
  /* background: #379056; */
  background: #379056
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: rgba(170, 170, 170, 0.913);
}
::-webkit-scrollbar-thumb:hover {
  /* background: #379056; */
  background: #379056 !important;
}
tr {
  cursor: pointer !important;
}
.table thead {
  /* background: #379056 !important; */
  background: #379056 !important;
  color: #f4f9fc;
  font-size: 17px;
}
</style>
