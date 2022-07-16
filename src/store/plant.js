import { API } from "../../axios.config";

//import { API } from '../../axios.config';
const state = {
  plants: [],
  propagablePlants: [],
};

const getters = {
  propagablePlants(state) {
    return state.propagablePlants.data;
  }
};

const mutations = {
  setPlant(state, plant) {
    state.plants.push(plant);
  },
  removePlant(state, id) {
    state.plants.filter((plant) => {
      plant._id !== id;
    });
  },
  setPropagablePlants(state, plants) {
    state.propagablePlants = plants;
  }
};

const actions = {
  async addPlant({ commit }, { name, image, propagable, growState, sunType, sunAmount, water, description }) {
    console.log(state);
    const plant = await API.post(
      "/plant",
      { name, image, propagable, growState, sunType, sunAmount, water, description },
      {
        /* headers: {
          'Authorization': `Basic ${state.token}`
        } */
      }
    );
    console.log(plant);
    commit("setPlant", plant);
  },
  async getPropagablePlants({ commit }) {
    const plants = await API.get("/plant/propagables");
    console.log(plants);
    commit("setPropagablePlants", plants.data);
  },
  async deletePlant({ commit }, { id }) {
    const deletedPlant = await API.delete(`/plant/${id}`);
    console.log("deleted", deletedPlant);
    commit("removePlant", id);
  }
  /* async createPlant({ rootState }, { name, description, isPropagable, stage, sunType, sunlight, water, inventory }) {
    await db
      .collection("plants")
      .add({
        name,
        description,
        propagable: isPropagable,
        stage,
        sunType,
        sunlight,
        water,
        inventory,
        createdAt: Date.now(),
        admin: rootState.user.user.uid
      })
  } */
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};