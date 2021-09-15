<template>
  <nav id="nav">
    <div class="link-wrapper">
      <router-link
        to="/characters"
        :class="{
          'link-wrapper__link': true,
          'link-wrapper__link--focused': isCharacters,
        }"
      >
        Character
      </router-link>
      <router-link
        to="/favourites"
        :class="{
          'link-wrapper__link': true,
          'link-wrapper__link--focused': isFavourites,
        }"
      >
        Favourites
      </router-link>
    </div>
    <div class="image-wrapper">
      <img src="./assets/heart.svg" alt="Heart icon" />
      <span class="image-wrapper__quantity">{{ showFavQuantity }}</span>
    </div>
  </nav>
  <router-view />
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("favourites", ["listOfFavourites"]),
    isCharacters() {
      return this.$route.name === "Characters";
    },
    isFavourites() {
      return this.$route.name === "Favourites";
    },
    showFavQuantity() {
      const quantity = this.listOfFavourites.length;
      return quantity ? quantity : "";
    },
  },
};
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  background-color: black;
  color: grey;
  display: flex;
  justify-content: space-between;
  padding: 12px 40px;
}
.link-wrapper {
  display: flex;
  gap: 10px;
}
.link-wrapper__link {
  text-decoration: none;
  color: inherit;
}
.link-wrapper__link--focused {
  color: white;
}
.image-wrapper {
  display: flex;
}
.image-wrapper__quantity {
  color: white;
  font-size: 20px;
}
@media (max-width: 724px) {
  .link-wrapper__link{
    font-size: 20px;
  }
}
</style>
