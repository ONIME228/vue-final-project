<template>
  <section id="detailsPage">
    <PulseLoader v-if="isLoading" />
    <DetailsCard
      v-else
      :name="detailsData.name"
      :species="detailsData.species"
      :status="detailsData.status"
      :location="detailsData.location && detailsData.location.name"
      :episode="detailsData.episodeName"
      :image="detailsData.image"
      :id="id"
      @onAddToFav="addFavourites([detailsData])"
      @onRemoveFromFav="removeFavourites(id)"
    />
  </section>
</template>
<script>
import DetailsCard from "../components/DetailsCard/DetailsCard.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  name: "Details",
  components: {
    DetailsCard,
    PulseLoader,
  },
  //You can find array style props in most of the components for the sake of the time
  props: ["id"],
  created() {
    this.fetchDetailsCard(this.id).catch(() => {
      this.$router.push({
        name: "NotFound",
        params: { catchAll: "404" },
      });
    });
  },
  computed: {
    ...mapState("details", ["detailsData"]),
    ...mapState(["isLoading"]),
  },
  methods: {
    ...mapActions("details", ["fetchDetailsCard"]),
    ...mapMutations("favourites", ["addFavourites", "removeFavourites"]),
  },
};
</script>
<style scoped>
#detailsPage {
  padding-top: 20px;
}
</style>
