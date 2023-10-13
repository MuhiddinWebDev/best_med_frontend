<template>
  <router-view></router-view>
</template>

<script>
export default {
  provide() {
    return {
      BASE_URL: `http://localhost:4000/api/v1/admin-app/`

      // BASE_URL: "http://81.95.226.11:64005/api/v1/admin-app/"
    };
  }
};
</script>
