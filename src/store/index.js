import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    id: null,
    errors: "",
    User: {},
    UserError: null
  },
  mutations: {},
  actions: {},
  getters: {}
});
