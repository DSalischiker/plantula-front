<template>
  <article class="section">
    <div class="container">
      <!-- Left -->
      <section>
        <b-button type="is-text is-flex is-justify-content-start">
          <router-link to="/inventory">
            Volver
          </router-link>
        </b-button>
      </section>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter has-text-left">
          <h1 class="title has-text-centered">Agregar Planta</h1>
          <form @submit.prevent="createPlant">
            <div class="field pb-3">
              <label class="name">Nombre</label>
              <div class="control">
                <input
                  v-model="plantData.name"
                  type="text"
                  class="input"
                  placeholder="ej. Potus Cocina de Lionel"
                  required
                />
              </div>
            </div>

            <!-- <b-field label="Grouped">
              <b-select placeholder="Especie">
                <b-icon
                  icon="seedling"
                  size="is-small">
                </b-icon>
                <option>Desconozco</option>
                <optgroup label="De Interior">
                  <option value="Potus">Potus</option>
                  <option value="Philodendron">Philodendron</option>
                  <option value="Begonia">Begonia</option>
                  <option value="Helecho">Helecho</option>
                  <option value="Fitonia">Fitonia</option>
                </optgroup>

                <optgroup label="De Exterior">
                  <option value="Jazmín">Jazmín</option>
                  <option value="Salvia">Salvia</option>
                  <option value="Malvón">Malvón</option>
                  <option value="Menta">Menta</option>
                  <option value="Caléndula">Caléndula</option>
                  <option value="Albahaca">Albahaca</option>
                </optgroup>
              </b-select>
            </b-field> -->

            <div>
              <b-field class="mt-5 py-3 has-text-centered">
                <b-upload v-model="dropFiles"
                    multiple
                    drag-drop>
                  <section class=" section">
                    <div class="content is-flex is-align-items-center has-text-centered">
                      <p class="my-0 mr-4" >
                        <b-icon
                          icon="upload"
                          size="is-medium">
                        </b-icon>
                      </p>
                      <p>Soltá tus archivos acá o hacé click</p>
                    </div>
                  </section>
                </b-upload>
              </b-field>

              <div class="tags">
                <span v-for="(file, index) in dropFiles"
                  :key="index"
                  class="tag is-primary"
                >
                  {{file.name}}
                  <button class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)">
                  </button>
                </span>
              </div>
            </div>

            <div class="field mt-5 py-3">
              <label class="name">Descripción</label>
              <div class="control">
                <textarea
                  v-model="plantData.description"
                  class="textarea"
                  placeholder="ej. Una breve descripción de tu planta."
                  required
                ></textarea>
              </div>
            </div>

            <b-field class="mt-5 py-3" label="Estado de Crecimiento">
              <b-slider v-model="plantData.growState" :min="1" :max="5" aria-label="Estado de Crecimiento" :tooltip="false">
                  <b-slider-tick :value="1">Semilla</b-slider-tick>
                  <b-slider-tick :value="2">Germinado</b-slider-tick>
                  <b-slider-tick :value="3">Plántula</b-slider-tick>

                  <b-slider-tick :value="4">Floración</b-slider-tick>
                  <b-slider-tick :value="5">Maduración</b-slider-tick>
              </b-slider>
            </b-field>

            <b-field class="mt-5 py-3" label="Tipo de Sol">
              <b-slider v-model="plantData.sunType" :min="1" :max="3" aria-label="Tipo de Sol" :tooltip="false">
                  <b-slider-tick :value="1">Sombra</b-slider-tick>
                  <b-slider-tick :value="2">Indirecto</b-slider-tick>
                  <b-slider-tick :value="3">Directo</b-slider-tick>
              </b-slider>
            </b-field>

            <b-field class="mt-5 py-3" label="Sol">
              <b-slider v-model="plantData.sunAmount" :min="1" :max="3" aria-label="Sol" :tooltip="false">
                  <b-slider-tick :value="1">Poco</b-slider-tick>
                  <b-slider-tick :value="2">Regular</b-slider-tick>
                  <b-slider-tick :value="3">Mucho</b-slider-tick>
              </b-slider>
            </b-field>

            <b-field class="mt-5 py-3" label="Agua">
              <b-slider v-model="plantData.water" :min="1" :max="3" aria-label="Agua" :tooltip="false">
                  <b-slider-tick :value="1">Poca</b-slider-tick>
                  <b-slider-tick :value="2">Regular</b-slider-tick>
                  <b-slider-tick :value="3">Mucha</b-slider-tick>
              </b-slider>
            </b-field>

            <div class="mt-5 py-5 has-text-centered">
              <b-field class="subtitle is-5 mt-5">
                <b-checkbox name="propagable" v-model="plantData.propagable" :disabled="!isPropagableValid">La quiero propagar</b-checkbox>
              </b-field>
              <p v-if="!isPropagableValid">La planta debe haber alcanzado el estado de floración para ser propagable</p>
              <!-- <b-field>
                  <b-checkbox v-model="plantData.isPropagable">
                      No
                  </b-checkbox>
              </b-field> -->
            </div>

            <div class="field has-text-centered mt-5 pt-5">
              <div class="control">
                <button
                  type="submit"
                  class="button is-primary"
                  :class="{ 'is-loading': isLoading }"
                >
                  <strong>Agregar planta a inventario</strong>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "AddPlant",
  data() {
    return {
      isLoading: false,
      plantData: {
        name: "",
        image: "",
        propagable: false,
        growState: 0,
        sunType: 0,
        sunAmount: 0,
        water: 0,
        description: "",
      },
      dropFiles: [],
    }
  },
  computed: {
    isPropagableValid() {
      return this.plantData.growState >= 4;
    }
  },
  methods: {
    async createPlant() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("plant/addPlant", {
          name: this.plantData.name,
          image: this.plantData.image,
          propagable: !this.isPropagableValid ? false : this.plantData.propagable,
          growState: this.plantData.growState,
          sunType: this.plantData.sunType,
          sunAmount: this.plantData.sunAmount,
          water: this.plantData.water,
          description: this.plantData.description
        });
        this.$toast.success(`¡${this.plantData.name} agregada con éxito!`);
        this.plantData.name = this.plantData.image = this.plantData.description = "";
        this.plantData.propagable = false;
        this.plantData.growState = this.plantData.sunType = this.plantData.sunAmount = this.plantData.water = 0;
        this.$router.push({ name: "inventory" });
      } catch (error) {
        console.error(error.message);
        this.$toast.error(error.message);
      } finally {
        this.isLoading = false;
      }
      /* try {
        await this.$store.dispatch("inventories/createInventory", {
          name: this.inventoryData.name,
          description: this.inventoryData.description
        });
        this.$toast.success("Inventario creado");
        this.inventoryData.name = this.inventoryData.description = "";
        setTimeout(() => this.$router.push({ name: 'home' }), 1000);
      } catch (error) {
        console.error(error.message);
        this.$toast.error(error.message);
      } finally {
        this.isLoading = false;
      } */
    },
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>