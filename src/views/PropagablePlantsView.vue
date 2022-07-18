<template>
  <div>
    <section class="hero is-small is-secondary" spaced="true">
      <div class="hero-body">
        <p class="title is-4 is-black" >¡Bienvenide!</p>
        <p class="subtitle is-6">Pedí esquejes, creá tu inventario, y juntes, llenemos la ciudad de plantitas.</p>
      </div>
    </section>
    <!-- <section>
      <router-link :to="{ name: 'createInventory' }">
        <button type="button" class="button is-primary">Crear inventario</button>
      </router-link>
    </section> -->
    <section class="section">
      <div class="container">
        <h1 class="title has-text-centered is-black">
          Plantas propagables
        </h1>
        <div class="">
          <propagable-plant v-for="plant in propagablePlants" :key="plant._id" :plant="plant" />
        </div>

      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import PropagablePlant from "../components/PropagablePlant.vue";

export default {
  name: 'PropagablePlantsView',
  mounted() {
    this.getPropagablePlants();
  },
  data() {
    return {
      isLoading: false,
    }
  },
  components: {
    PropagablePlant
  },
  computed: {
    /* propagablePlants(){
      return this.$store.getters.propagablePlants;
    }, */
    ...mapGetters({
      propagablePlants: "plant/propagablePlants"
    })
  },
  methods: {
    async getPropagablePlants() {
      this.isLoading = true;
      try {
          await this.$store.dispatch("plant/getPropagablePlants");
          this.$toast.success(`Plantas propagables cargadas`);
        } catch (error) {
          this.$toast.error(error.message);
        } finally {
          this.isLoading = false;
        }
    }
  }
}
</script>

<style lang="scss" scoped>
.hero-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-start;
  text-align: start;
  margin-left: 1em;
}
.title{
  //color: $light !important;
}
.subtitle{
  color: $light !important;
}
</style>
