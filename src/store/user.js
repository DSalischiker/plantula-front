import { API } from '../../axios.config';
//import axios from 'axios';
//import { auth } from "../firebase.js";
const state = {
  user: null,
  session: {
    logged: false,
    token: ''
  }
}

const getters = {
  token: state => state.session,
  email: state => state.user,
}

const mutations = {
  setUser(state, user) {
    state.user = user ? user.data : null;
    state.session.logged = user ? true : false;
    state.session.token = user ? user.data.token : '';
  },
  setUserFromLocal(state, localUser) {
    state.user = localUser;
    state.session.logged = true;
    state.session.token = localUser.token;
  }
}

const actions = {
  async doLogin({ commit }, {email, password}) {
    console.log(email, password);
    const user = await API.post("/login", { email: email , password: password });
    console.log(user);
    commit("setUser", user);
    console.log(state.session.token);
    localStorage.setItem('user', JSON.stringify(state.user));
  },
  async doRegister({ commit }, {email, password}) {
    const user = await API.post("/signup", {email, password});
    commit("setUser", user);
  },
  async doLogout({ commit }) {
    commit("setUser", null);
    localStorage.setItem('user', '');
  },
  /* getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(
        user => {
          unsubscribe();
          resolve(user);
        },
        () => {
          reject();
        }
      );
    });
  },
  async updateProfile({ commit }, { username, email, password, phone, neighbourhood }) {
    const user = auth.currentUser;
    if (username) {
      await user.updateProfile({
        displayName: username
      });
    }

    if (email) {
      await user.updateEmail(email);
    }

    if (password) {
      await user.updatePassword(password);
    }

    if (phone) {
      await user.updatePhone(phone);
    }

    if (neighbourhood) {
      await user.updateNeighbourhood(neighbourhood);
    }

    commit("setUser", user);
  },
  async doLogin({ commit }, {email, password}) {
    await auth.signInWithEmailAndPassword(email, password);
    commit("setUser", auth.currentUser);
  },
  async doRegister({ commit }, {username, email, password, phone, neighbourhood}) {
    await auth.createUserWithEmailAndPassword(email, password);
    const user = auth.currentUser;
    await user.updateProfile({
      displayName: username,
      phone: phone,
      neighbourhood: neighbourhood
    });
    commit("setUser", user);
  },
  async doLogout({ commit }) {
    await auth.signOut();
    commit("setUser", null);
  },
  async doReset(context, email) {
    await auth.sendPasswordResetEmail(email);
  } */
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};