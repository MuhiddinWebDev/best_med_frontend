<template>
  <router-view></router-view>
</template>

<script>
export default {
  provide() {
    return {
      BASE_URL: `http://localhost:4000/api/v1/admin-app/`

      // BASE_URL: "http://89.232.184.175:3003/api/v1/admin-app/"
    };
  }
};
</script>
