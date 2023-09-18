<template>
  <div class="container">
    <div
      class="d-flex justify-content-center align-items-center align-content-center"
    >
      <lottie-animation
        class="lottie"
        :animation-data="watermelon"
        :auto-play="true"
        :loop="true"
        :speed="1"
        ref="animRef"
      />
      <div>
        <h1>Dasturdan foydalanish vaqti tugatilgan!</h1>
        <h2>Iltimos dasturga to'lovni amalga oshiring</h2>
        <div
          class="d-flex justify-content-center align-items-center align-content-center"
        >
          <button class="btn btn-primary" @click="$router.push('/login')">
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LottieAnimation from "lottie-web-vue";

export default {
  components: {
    LottieAnimation,
  },

  data() {
    return {
      watermelon: require("../../assets/animation.json"),
    };
  },

  methods: {
    removeTokens() {
    },
  },

  mounted() {
    setTimeout(() => {
      const animRef = this.$refs.animRef;
      if (animRef && animRef.goToAndPlay) {
        animRef.goToAndPlay(150, true);
      }
    }, 200);
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
}

.d-flex {
  display: flex;
}

.justify-content-center {
  justify-content: center;
}

.lottie {
  width: 300px;
}

.btn-primary {
  padding: 10px 20px;
  margin-top: 1rem;
  border: none;
  border-radius: 4px;

  color: #fff;
  background-color: #379056;
  font-size: 20px;
  cursor: pointer;
  transition: 0.2s ease-out;
}

.btn-primary:hover {
  background-color: #0062cc;
}

.btn-primary:active {
  background-color: #005cbf;
}
</style>
