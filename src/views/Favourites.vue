<template>
  <section class="section" id="favourites-page">
    <div v-if="!listOfFavourites.length" class="empty-wrapper">
      No cards
      <br />
      You can add any cards you like by clicking "Add to Favourites"
    </div>
    <div class="cards-wrapper" v-else>
      <CharacterCard
        v-for="(card, index) in listOfFavourites"
        :key="index"
        :image="card.image"
        :id="card.id"
        :name="card.name"
        :species="card.species"
        :status="card.status"
        @onAddToFav="addFavourites([card])"
        @on-remove-from-fav="removeFavourites(card.id)"
      />
    </div>
  </section>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import CharacterCard from "../components/Characters/CharacterCard.vue";
export default {
  name: "Favourites",
  components: {
    CharacterCard,
  },
  computed: {
    ...mapState("favourites", ["listOfFavourites"]),
  },
  methods: {
    ...mapMutations("favourites", ["addFavourites", "removeFavourites"]),
  },
};
</script>
<style scoped>
.empty-wrapper {
  margin: 20px 0 0 20px;
  font-size: 20px;
}
.cards-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
  padding: 0 10px;
}
@media (max-width: 1024px) {
  .cards-wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 724px) {
  .cards-wrapper {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
