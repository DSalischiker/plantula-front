<template>
  <!-- Propagable Plant element -->
  <div class="column is-6">
    <div class="card is-secondary is-full">
      <!-- <div class="card-image">
        <figure class="image is-16by9">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="Placeholder Image"
          />
          </figure>
      </div> -->
      <div class="card-content py-0 is-full is-flex is-row is-column-mobile is-align-items-center is-justify-content-space-between">
        <div class="media is-justify-content-start">
          <div class="media-content has-text-left mt-3">
            <p class="title is-4">{{ plant.name }}</p>
            <p class="subtitle is-6 email">de {{ plant.user.email }}</p>
          </div>
        </div>
        <p class="content description is-justify-content-center is-align-items-center mt-3">
          {{ plant.description }}
        </p>
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
  name: "PropagablePlant",
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
.description {
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 2em;
  //white-space: nowrap;
}
.email {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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