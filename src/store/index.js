import Vue from 'vue'
import Vuex from 'vuex'

import user from "./user";
import inventories from "./inventories";
import plant from "./plant";
import utils from "./utils";

//import { auth } from "../firebase.js";


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoading: true,
  },
  mutations: {
    setLoading(state, loading) {
      state.isLoading = loading;
    }
  },
  actions: {
    checkAuth({ commit }) {
      const localUser = JSON.parse(localStorage.getItem('user'));
      if (localUser && localUser !== '') {
        commit("user/setUserFromLocal", localUser);
        /* commit("user/setUser", localUser); */
      } else {
        commit("user/setUser", null);
      }
    }
  },
  modules: {
    user,
    inventories,
    plant,
    utils
  }
})

export default store;

//Initial load
store.dispatch("checkAuth");