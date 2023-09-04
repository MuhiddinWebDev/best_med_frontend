<template>
  <div class="containers">
    <div class="sarlovha">
      <h2>
        Соғлом Турмуш Клиникаси
      </h2>
    </div>
    <div class="loginOyna">
      <b-form v-if="show" @submit.prevent style="position: relative;">
        <p class="kirish">Кириш ойнаси</p>
        <div style="text-align: initial; color: #fff;">Филиални танланг</div>
        <v-select
          :options="all_filial"
          :reduce="options => options.id"
          @input="changeBranch"
          label="name"
          v-model="form.filial_id"
        />
        <div style="text-align: initial; color: #fff;">Ходимни танланг</div>
        <v-select
          :options="all_users"
          :reduce="options => options.user_name"
          label="user_name"
          v-model="form.login"
        />

        <b-form-group
          id="input-group-3"
          label-for="password"
          label-align="left"
        >
          <div class="password">
            <!-- <label>Parol</label> -->
            <input
              :type="passwordType"
              class="inputs"
              v-model="form.password"
            />
            <a
              href="#"
              class="password_control"
              :class="{ password_controls: passwordType == 'text' }"
              @click="korish"
            ></a>
            <span class="parol">Парол</span>
          </div>
        </b-form-group>

        <b-button type="submit" @click="Login" variant="info" class="btn"
          >Кириш
        </b-button>
        <div v-if="$store.state.errors != ''" class="error1">
          <p>Парол ёки логин хато. Илтимос қайтадан уриниб кўринг</p>
        </div>
      </b-form>
    </div>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginVue",
  components: {},
  data() {
    return {
      form: {
        login: "",
        filial_id: null,
        password: ""
      },
      show: true,
      all_users: [],
      all_filial: [],
      passwordType: "password"
    };
  },
  mounted() {
    setInterval(() => {
      if (this.$store.state.errors != "") {
        this.$store.state.errors = "";
      }
    }, 3000);
    this.getBranch();
  },
  methods: {
    korish() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },

    getUser(branch) {
      let self = this;
      axios({
        method: "post",
        url: "user/filial_user",
        data: {
          filial_id: branch
        },
      }).then(res => {
        if(res){
          self.all_users = res.data.data;
        }
      });
    },

    getBranch() {
      let self = this;
      axios({
        method: "get",
        url: "/filial/all"
      }).then(res => {
        if (res != undefined) {
          self.all_filial = res.data.data;
        }
      });
    },
    
    Login() {
      let self = this;
      axios({
        method: "post",
        url: "/user/login",
        data: self.form
      }).then(response => {
        if(response != undefined) {
          if (response.data.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data.data));
            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("filial_id", response.data.data.filial_id);
            if(response.data.expired == true){
              this.$router.push({path: '/expired-app'})
            } else {
              self.$router.push({ path: "/user" });
            }   
          }
        }  
      }).catch(e => {
        console.log(e)
      }) 
    },
    changeBranch(id){
      this.getUser(id)
    }
  }
};
</script>
<style scoped>
.containers {
  padding-top: 5%;
  width: 100%;
  height: 100vh;
  text-align: -webkit-center;
  background-image: url("../../public/future.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}
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
.sarlovha {
  width: 70%;
  color: #fff;
}
.loginOyna {
  border-radius: 15px;
  padding: 20px 0;
  width: 470px;
  background: rgb(0 105 188 / 87%);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.inputs {
  border-radius: 4px;
  font-style: normal;
  width: 400px;
  height: 38px !important;
  /* color: #9db5d1; */
  margin-top: 20px !important;
  border: 1px solid #c3c3c3;
  text-indent: 10px;
}
.b_card {
  border: none !important;
  background: white;
  padding: 50px 20px;
  border-radius: 5px;
}
/* .b_card .vs--single .vs__selected {
  width: 330px;
  height: 50px;
} */
.containers .loginOyna .vs__dropdown-menu {
  height: 40px !important;
}
.btn {
  width: 100% !important;
  height: 40px !important;
  background: #001fce !important;
  margin-top: 20px;
}
.kirish {
  font-size: 20px;
  font-weight: bolder;
  font-family: sans-serif;
  color: #fff;
  margin-bottom: 30px;
  /* display: inline-block; */
}
.password {
  position: relative;
  margin-top: 10px;
}
.password_control {
  position: absolute;
  top: 30px;
  right: 12px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("../../public/koz.png") 0 0 no-repeat;
}
.password_controls {
  position: absolute;
  top: 30px;
  right: 12px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("../../public/kozz.png") 0 0 no-repeat;
}

.parol {
  /* margin-top: 10px; */
  position: absolute;
  left: 0px;
  color: #fff;
  top: -5px;
  font-size: 16px;
  /* font-weight: lighter; */
}

.error1 {
  position: absolute;
  top: 70%;
  right: 31%;
  z-index: 2;
}
.error1 p {
  font-size: 12px;
  color: red;
}
</style>