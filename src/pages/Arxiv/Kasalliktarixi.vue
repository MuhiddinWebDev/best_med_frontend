<template>
  <div>
    <div class="data-table">
      <user-form></user-form>
    </div>
  </div>
</template>
<script>
import UserForm from "./Index.vue";
export default {
  components: {
    UserForm
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #ececec;
}
.data-table {
  border: 1px solid #ccc;
  padding: 0 15px;
}
</style>
