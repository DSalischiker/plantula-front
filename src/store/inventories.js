import { API } from "../../axios.config";

//import { API } from '../../axios.config';
const state = {
  inventory: []
};

const getters = {
  userInventory(state) {
    return state.inventory;
  }
}

const mutations = {
  setInventory(state, inventory) {
    state.inventory = inventory;
  }
};

const actions = {
  async getUserInventory({ commit }) {
    const inventory = await API.get("/inventory");
    //console.log(inventory);
    commit("setInventory", inventory.data.data);
  }
  /*
  async getInventories({ commit }) {
    const query = db
      .collection("inventories")
      .orderBy("createdAt", "desc");

    query.onSnapshot(querySnapshot => {
      const inventories = [];
      commit("setLoading", true, { root: true });
      querySnapshot.forEach(doc => {
        let inventory = doc.data();
        inventory.id = doc.id;
        inventories.push(inventory);
      });
      commit("setLoading", false, { root: true });
      commit("setInventories", inventories);
    });
  } */
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};