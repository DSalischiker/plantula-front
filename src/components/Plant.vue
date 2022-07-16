<template>
  <!-- Plant element -->
  <div class="column is-one-third">
    <div class="card">
      <div class="card-image">
        <figure class="image is-16by9">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="Placeholder Image"
          />
          </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ plant.name }}</p>
            <p class="subtitle is-6">de {{ plant.user.email }}</p>
          </div>
        </div>
        <div class="content">
          {{ plant.description }}
        </div>
        <section>
          <b-button type="is-primary text-white">
            <a target="_blank" :href="`mailto:${plant.user.email}?subject=¿Te puedo pedir un esqueje?&body=¡Hola! Vi en Plántula que tu ${plant.name} es propagable! ¿Te puedo pedir un esqueje? ¡Gracias!`">
              Solicitar esqueje
            </a>
          </b-button>
        </section>
      </div>
    </div>
  </div>
  <!-- End of Plant element -->
</template>

<script>
export default {
  name: "Plant",
  props: {
    plant: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
a {
  color: $black;
}
</style>