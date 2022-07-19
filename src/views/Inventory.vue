<template>
  <div class="home">
    <section class="hero is-small is-secondary mb-4" spaced="true">
      <div class="hero-body is-flex is-flex-direction-column is-justify-content-start">
        <p class="title is-4 is-black" >Inventario de {{user.email}}</p>
      </div>
      <router-link
        class="button is-primary"
        :to="{ name: 'addPlant' }"
      >
        <strong>Agregar planta</strong>
      </router-link>
    </section>
      <div class="container">
        <template>
          <section class="hero is-small is-secondary" spaced="true">
          </section>
          <p v-if="isLoading">Cargando...</p>
          <div v-else class="columns is-desktop mx-2">
            <inventory-item v-for="item in userInventory.plants" :item="item" :key="item.id"/>
            <!-- <div class="column">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-square">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                  </figure>
                </div>
                <div class="card-content">
                  <div class="is-flex is-justify-content-start">
                    <p class="title is-4 has-text-dark">Fitonia</p>
                  </div>

                  <div class="content is-flex is-flex-direction-column is-justify-content-start">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.

                    <br>
                    <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </template>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import InventoryItem from "../components/InventoryItem.vue";

export default {
  name: "Inventory",
  components: {
    InventoryItem,
  },
  mounted() {
    this.getUserInventory();
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      userInventory: "inventories/userInventory",
    }),
    ...mapState("user", ["user"])
  },
  methods: {
    async getUserInventory() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("inventories/getUserInventory");
        this.$toast.success(`Inventario traído con éxito`);
      } catch (error) {
        console.error(error.message);
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
.subtitle{
  color: $light !important;
}
</style>
