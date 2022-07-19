<template>
  <!-- Inventory Item element -->
  <div class="column">
    <div class="card">
      <!-- <div class="card-image">
        <figure class="image is-square">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
        </figure>
      </div> -->
      <div class="card-content ml-2">
        <div class="is-flex is-justify-content-start">
          <p class="title is-4 has-text-dark">
            {{item.name}}
          </p>
        </div>

        <p class="content subtitle has-text-left is-flex is-justify-content-start">
          {{item.description}}
          <br>
          <!-- <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> -->
        </p>

        <div class="content has-text-left is-flex is-flex-direction-column is-justify-content-start">
          <p>{{`Estado de crecimiento: ${getGrowStateString()}`}}</p>
          <p>{{`Tipo de Sol: ${getSunTypeString()}`}}</p>
          <p>{{`Cantidad de Sol: ${getSunAmountString()}`}}</p>
          <p>{{`Agua: ${getWaterString()}`}}</p>
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
        <router-link :to="{ name: 'editPlant', params: {plant: JSON.stringify(item)} }" class="card-footer-item edit">Editar</router-link>
        <a @click="deletePlant" class="card-footer-item remove">Borrar</a>
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
    },
    getGrowStateString() {
      let growStateString = "-";
      switch (this.item.growState) {
        case 1:
          growStateString = "Semilla";
          break;
        case 2:
          growStateString = "Germinado";
          break;
        case 3:
          growStateString = "Plántula";
          break;
        case 4:
          growStateString = "Floración";
          break;
        case 5:
          growStateString = "Maduración";
          break;
        default:
          growStateString = "-";
          break;
      }
      return growStateString;
    },
    getSunTypeString() {
      let sunTypeString = "-";
      switch (this.item.sunType) {
        case 1:
          sunTypeString = "Sombra";
          break;
        case 2:
          sunTypeString = "Indirecto";
          break;
        case 3:
          sunTypeString = "Directo";
          break;
        default:
          sunTypeString = "-";
          break;
      }
      return sunTypeString;
    },
    getSunAmountString() {
      let sunAmountString = "-";
      switch (this.item.sunAmount) {
        case 1:
          sunAmountString = "Poco";
          break;
        case 2:
          sunAmountString = "Regular";
          break;
        case 3:
          sunAmountString = "Mucho";
          break;
        default:
          sunAmountString = "-";
          break;
      }
      return sunAmountString;
    },
    getWaterString() {
      let waterString = "-";
      switch (this.item.water) {
        case 1:
          waterString = "Poca";
          break;
        case 2:
          waterString = "Regular";
          break;
        case 3:
          waterString = "Mucha";
          break;
        default:
          waterString = "-";
          break;
      }
      return waterString;
    },
  },
}
</script>

<style lang="scss">
a {
  color: $black;
}

.content {
  p{
    text-align: left !important;
    justify-content: start !important;
  }

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
.card-footer-item {
  &.edit:hover{
    background-color: $primary-light !important;
  }
  &.remove:hover {
    background-color: $danger-light !important;
  }
}
</style>