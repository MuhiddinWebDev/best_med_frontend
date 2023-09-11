<template>
  <transition mode="out-in" class="content">
    <router-view></router-view>
  </transition>
</template>
<script>
export default {};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.md-card .md-card-content {
  border-radius: 8px;
  padding: 0px;
}
.input-group > .input-group-append > .btn {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.input-group:not(.has-validation) > .form-control:not(:last-child) {
  height: 40px;
  border: 1px solid #95c2f6;
  background: #117be40b;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.table thead {
  /* background: #00009d !important; */
  background: #379056 !important;
  color: #f4f9fc;
  font-size: 17px;
}
.table-striped tbody tr:nth-of-type(odd) {
  background: #f4f9fc;
}
.table-striped tbody tr {
  border-left: 4px solid #fff;
}
.table-striped tbody tr:hover {
  background: #c5eaff;
  border-left: 4px solid #007bff;
}
.md-card {
  border-radius: 8px;
  margin-top: 25px;
  margin-bottom: 5px;
}
.container-fluid {
  padding: 10px;
}
.content {
  margin-top: -50px;
}
tr {
  cursor: pointer !important;
}
</style>
