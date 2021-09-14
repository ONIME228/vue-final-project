<template>
  <article id="character-card">
    <img
      @click="navigateToDetails"
      class="image"
      :src="image"
      alt="Character picture"
    />
    <div class="content-wrapper">
      <h3 class="content-wrapper__title">{{ name }}</h3>
      <div>{{ species }} -- {{ status }}</div>
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
  </article>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "CharacterCard",
  emits: ["on-add-to-fav", "on-remove-from-fav", "on-click"],
  props: {
    id: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState("favourites", ["listOfFavourites"]),
    ...mapGetters("favourites", ["isAdded"]),
  },
  methods: {
    navigateToDetails() {
      this.$router.push({ name: "Details", params: { id: this.id } });
    },
  },
};
</script>
<style scoped>
#character-card {
  height: 220px;
  width: 196px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.image {
  cursor: pointer;
  display: block;
  height: 114px;
  width: 100%;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
  opacity: 0;
}
.image[src*="http"] {
  opacity: 1;
}
.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
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
.content-wrapper__title {
  margin: 0;
}

@media (max-width: 724px) {
  #character-card {
    height: 250px;
    width: 80%;
    justify-self: center;
    align-items: center;
  }
  .content-wrapper__button {
    font-size: 16px;
    width: 200px;
  }
}
</style>
