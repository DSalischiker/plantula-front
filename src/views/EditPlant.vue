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
          <h1 class="title has-text-centered">Editar Planta</h1>
          <form @submit.prevent="updatePlant">
            <div class="field pb-3">
              <label class="name">Nombre</label>
              <div class="control">
                <input
                  v-model="plant.name"
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
                  v-model="plant.description"
                  class="textarea"
                  placeholder="ej. Una breve descripción de tu planta."
                  required
                ></textarea>
              </div>
            </div>

            <b-field class="mt-5 py-3" label="Estado de Crecimiento">
              <b-slider v-model="plant.growState" :min="1" :max="5" aria-label="Estado de Crecimiento" :tooltip="false">
                  <b-slider-tick :value="1">Semilla</b-slider-tick>
                  <b-slider-tick :value="2">Germinado</b-slider-tick>
                  <b-slider-tick :value="3">Plántula</b-slider-tick>

                  <b-slider-tick :value="4">Floración</b-slider-tick>
                  <b-slider-tick :value="5">Maduración</b-slider-tick>
              </b-slider>
            </b-field>

            <b-field class="mt-5 py-3" label="Tipo de Sol">
              <b-slider v-model="plant.sunType" :min="1" :max="3" aria-label="Tipo de Sol" :tooltip="false">
                  <b-slider-tick :value="1">Sombra</b-slider-tick>
                  <b-slider-tick :value="2">Indirecto</b-slider-tick>
                  <b-slider-tick :value="3">Directo</b-slider-tick>
              </b-slider>
            </b-field>

            <b-field class="mt-5 py-3" label="Sol">
              <b-slider v-model="plant.sunAmount" :min="1" :max="3" aria-label="Sol" :tooltip="false">
                  <b-slider-tick :value="1">Poco</b-slider-tick>
                  <b-slider-tick :value="2">Regular</b-slider-tick>
                  <b-slider-tick :value="3">Mucho</b-slider-tick>
              </b-slider>
            </b-field>

            <b-field class="mt-5 py-3" label="Agua">
              <b-slider v-model="plant.water" :min="1" :max="3" aria-label="Agua" :tooltip="false">
                  <b-slider-tick :value="1">Poca</b-slider-tick>
                  <b-slider-tick :value="2">Regular</b-slider-tick>
                  <b-slider-tick :value="3">Mucha</b-slider-tick>
              </b-slider>
            </b-field>

            <div class="mt-5 py-5 has-text-centered">
              <b-field class="subtitle is-5 mt-5">
                <b-checkbox name="propagable" v-model="plant.propagable" :disabled="!isPropagableValid">La quiero propagar</b-checkbox>
              </b-field>
              <p v-if="!isPropagableValid">La planta debe haber alcanzado el estado de floración para ser propagable</p>
              <!-- <b-field>
                  <b-checkbox v-model="plant.isPropagable">
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
  name: "EditPlant",
  data() {
    return {
      isLoading: false,
      plant: JSON.parse(this.$route.params.plant),
      dropFiles: [],
    }
  },
  computed: {
    isPropagableValid() {
      return this.plant.growState >= 4;
    }
  },
  methods: {
    async updatePlant() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("plant/updatePlant", {
          _id: this.plant._id,
          name: this.plant.name,
          image: this.plant.image,
          propagable: !this.isPropagableValid ? false : this.plant.propagable,
          growState: this.plant.growState,
          sunType: this.plant.sunType,
          sunAmount: this.plant.sunAmount,
          water: this.plant.water,
          description: this.plant.description
        });
        this.$toast.success(`¡${this.plant.name} editada con éxito!`);
        this.plant.name = this.plant.image = this.plant.description = "";
        this.plant.propagable = false;
        this.plant.growState = this.plant.sunType = this.plant.sunAmount = this.plant.water = 0;
        this.$router.push({ name: "inventory" });
      } catch (error) {
        console.error(error.message);
        this.$toast.error(error.message);
      } finally {
        this.isLoading = false;
      }
    },
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
    }
  }
}
</script>

<style>

</style>