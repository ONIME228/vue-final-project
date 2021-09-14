<template>
  <article id="detailsCard" class="section">
    <div class="content-wrapper">
      <h1 class="content-wrapper__title">{{ name }}</h1>
      <span class="content-wrapper__info"> {{ species }} -- {{ status }} </span>
      <span class="content-wrapper__location">
        Last known location: {{ location }}
      </span>
      <span> First seen in : {{ episode }} </span>
      <button
        v-if="isAdded(id)"
        @click="this.$emit('on-remove-from-fav')"
        class="content-wrapper__button"
      >
        Remove Favourite
      </button>
      <button
        v-else
        @click="this.$emit('on-add-to-fav')"
        class="content-wrapper__button"
      >
        Add to Favourites
      </button>
    </div>
    <img class="content-wrapper__thumbnail" :src="image" alt="" />
  </article>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "DetailsCard",
  props: ["name", "species", "status", "location", "episode", "image", "id"],
  emits: ["on-add-to-fav", "on-remove-from-fav", "on-click"],
  computed: {
    ...mapGetters("favourites", ["isAdded"]),
    ...mapState("favourites", ["listOfFavourites"]),
  },
};
</script>
<style scoped>
#detailsCard {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  height: 200px;
  display: flex;
}
.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-basis: 70%;
  padding-left: 20px;
}
.content-wrapper__thumbnail {
  flex-basis: 30%;
  object-fit: cover;
  border-radius: 0 4px 4px 0;
}
.content-wrapper__title {
  margin: 0;
  font-size: 30px;
}
.content-wrapper__button {
  font-size: 10px;
  background-color: black;
  color: white;
  padding: 6px 4px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  width: 100px;
}
@media (max-width: 724px) {
  #detailsCard {
    flex-direction: column;
    height: 600px;
    font-size: x-large;
  }
  .content-wrapper__thumbnail {
    order: -1;
  }
  .content-wrapper__button {
    font-size: 16px;
    width: 200px;
  }
}
</style>
