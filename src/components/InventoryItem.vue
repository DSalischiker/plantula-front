<template>
  <!-- Inventory Item element -->
  <div class="column">
    <div class="card">
      <!-- <div class="card-image">
        <figure class="image is-square">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
        </figure>
      </div> -->
      <div class="card-content">
        <div class="is-flex is-justify-content-start">
          <p class="title is-4 has-text-dark">
            {{item.name}}
          </p>
        </div>

        <div class="content has-text-left is-flex is-flex-direction-column is-justify-content-start">
          {{item.description}}
          <br>
          <!-- <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> -->
        </div>
      </div>
      <!-- <div>
        <button
          class="button is-primary"
          :class="{ 'is-loading': isLoading }"
        >
          <strong>Editar</strong>
        </button>
      </div> -->
      <footer class="card-footer">
        <router-link :to="{ name: 'editPlant', params: {plant: JSON.stringify(item)} }" class="card-footer-item">Editar</router-link>
        <a @click="deletePlant" class="card-footer-item">Borrar</a>
      </footer>
    </div>
  </div>
  <!-- End of Inventory Item element -->
</template>

<script>
export default {
  name: "InventoryItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    async deletePlant() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("plant/deletePlant", {_id: this.item._id });
        this.$toast.success(`¡${this.item.name} removida con éxito!`);
        await this.getUserInventory();
        //this.$router.push({ name: "inventory" });
      } catch (error) {
        console.error(error.message);
        this.$toast.error(error.message);
      } finally {
        this.isLoading = false;
      }
    },
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

<style lang="scss">
a {
  color: $black;
}
@media(max-width: 767px) { /* <== You can change this break point as per your  needs */
  .card-content {
    flex-direction: column !important;
    padding: 1em 0 !important;
    *{
      text-align: center !important;
    }

  }
}
</style>