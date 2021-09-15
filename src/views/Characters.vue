<template>
  <div class="filter">
    <ul class="options">
      <li
        :class="{
          options__option: true,
          'options__option--focused': !this.$route.query.species,
        }"
      >
        <router-link
          class="options__link"
          :to="{ name: 'Characters', query: {} }"
        >
          All
        </router-link>
      </li>
      <li
        v-for="(item, index) in listItems"
        :key="index"
        :class="{
          options__option: true,
          'options__option--focused': this.$route.query.species === item,
        }"
      >
        <router-link
          class="options__link"
          :to="{ name: 'Characters', query: { species: item } }"
        >
          {{ item }}
        </router-link>
      </li>
    </ul>
    <div class="search">
      <input
        v-model="searchValue"
        class="search__input"
        type="search"
        placeholder="Search by name..."
        @keyup="searchOnEnter"
      />
      <button class="search__button" @click="updateOnSearch">Search</button>
    </div>
  </div>
  <PulseLoader v-if="isLoading" />
  <div class="cards-wrapper" v-else>
    <CharacterCard
      v-for="(card, index) in listOfCards"
      :key="index"
      :id="card.id"
      :image="card.image"
      :name="card.name"
      :species="card.species"
      :status="card.status"
      @onAddToFav="addFavourites([card])"
      @onRemoveFromFav="removeFavourites(card.id)"
    />
  </div>
  <Pagination
    :page="this.page"
    :species="this.species"
    :name="this.name"
    :lastPage="this.lastPage"
  />
</template>
<script>
import { mapMutations, mapActions, mapState } from "vuex";
import { watchEffect } from "vue";
//Componnets
import CharacterCard from "../components/Characters/CharacterCard.vue";
import Pagination from "../components/Characters/Pagination.vue";
// Third-party libraries
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  name: "Characters",
  components: {
    CharacterCard,
    Pagination,
    PulseLoader,
  },
  data() {
    return {
      searchValue: "",
      listItems: ["human", "animal", "alien"],
    };
  },
  props: ["page", "species", "name"],
  created() {
    watchEffect(() => {
      if (this.name) {
        this.fetchAllCards({
          page: this.page,
          name: this.name,
        }).catch(() => {
          this.$router.push({
            name: "NotFound",
            params: { catchAll: "404" },
          });
        });
      } else {
        this.fetchAllCards({
          page: this.page,
          species: this.species,
        }).catch(() => {
          this.$router.push({
            name: "NotFound",
            params: { catchAll: "404" },
          });
        });
      }
    });
  },
  computed: {
    ...mapState(["listOfCards", "lastPage", "isLoading"]),
  },
  methods: {
    ...mapActions(["fetchAllCards"]),
    ...mapMutations("favourites", ["addFavourites", "removeFavourites"]),
    updateOnSearch() {
      this.$router.push({
        name: "Characters",
        query: { page: 1, name: this.searchValue },
      });
    },
    searchOnEnter(event) {
      if (event.code === "Enter") this.updateOnSearch();
    },
  },
};
</script>
<style scoped>
.filter {
  display: flex;
  gap: 20px;
  padding: 20px 40px;
  background-color: #f1f1f1;
}
.options {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  border: 1px solid black;
  border-radius: 4px;
  text-decoration: none;
  color: inherit;
}
.options__option--focused {
  background-color: black;
  color: white;
}
.options__option:not(li:last-child) {
  border-right: 1px solid black;
}
.options__link {
  display: block;
  padding: 5px 10px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  text-transform: capitalize;
}
.search__input,
.search__button {
  height: 100%;
}
.search__input {
  border-radius: 2px 0 0 2px;
  border: 1px solid #a0a5a9;
  border-right: none;
  text-indent: 5px;
}
.search__button {
  border-radius: 0 2px 2px 0;
  border: 1px solid black;
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
  .options {
    justify-content: space-around;
  }
  .options__option {
    width: 100%;
  }
  .filter {
    flex-direction: column;
  }
  .search {
    height: 40px;
  }
  .search__input {
    width: 70%;
  }
  .cards-wrapper {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
