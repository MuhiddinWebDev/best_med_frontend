<template>
  <md-toolbar md-elevation="0" class="md-transparent navbar-top">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ localUser }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <div class="md-collapse">
          <md-list>
            <md-list-item href="" @click="logout">
              <b-icon
                font-scale="1.5"
                icon="box-arrow-right"
                style="width: 50px;"
              ></b-icon>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  beforeCreate() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      localUser: JSON.parse(localStorage.getItem("user")).user_name
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    logout() {
      const x = window.confirm("Дастурдан чиқасизми");
      if(x) {
        localStorage.removeItem("token");
        localStorage.removeItem("filial_id");
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style lang="css" scope>
.navbar-top {
  margin-bottom: 0px;
  height: 25px;
}
</style>
