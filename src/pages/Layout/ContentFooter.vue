<template>
  <div class="footer">
    <div class="container" style="height: 18px;">
      <div>Барча ҳуқуқлар ҳимояланган.</div>
      <div>
        &copy; {{ new Date().getFullYear() }} Дастур
        <a href="http://www.bdm.uz/" target="_blank">
          Бизнес Дастурлаш Маркази </a
        >томонидан ишлаб чиқарилган.
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.footer {
  position: sticky;
  margin-top: 0px;
  /* margin: -20px 0px 20px 0px; */
  height: 10px;
}
</style>
