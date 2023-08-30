<template>
  <ul class="nav nav-mobile-menu">
    <li>
      <a @click="logout()"
        ><i class="material-icons">logout</i>
        <p>Log Out</p></a
      >
    </li>
  </ul>
</template>
<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    beforeCreate() {
      if (!localStorage.getItem("token")) {
        this.$router.push("/login");
      }
    }
  }
};
</script>
