<template>
  <section id="pagination">
    <span>Page {{ this.page }} of {{ this.lastPage }}</span>
    <span class="nav-wrapper">
      <router-link
        class="arrow"
        :to="{
          name: 'Characters',
          query: { page: page - 1, ...speciesData, ...nameData },
        }"
        v-if="!isDisabled(1)"
      >
        <img
          class="arrow__icon arrow__icon--reverted"
          src="../../assets/arrow.svg"
          alt=""
        />
        Prev
      </router-link>
      <span class="arrow arrow--disabled" href="" v-else>
        <img
          class="arrow__icon arrow__icon--reverted"
          src="../../assets/arrow.svg"
          alt=""
        />
        Prev
      </span>
      <router-link
        class="arrow"
        :to="{
          name: 'Characters',
          query: { page: page + 1, ...speciesData, ...nameData },
        }"
        v-if="!isDisabled(lastPage)"
      >
        Next
        <img class="arrow__icon" src="../../assets/arrow.svg" alt="" />
      </router-link>
      <span class="arrow arrow--disabled" href="" v-else>
        Next
        <img class="arrow__icon" src="../../assets/arrow.svg" alt="" />
      </span>
    </span>
  </section>
</template>
<script>
export default {
  name: "Pagination",
  props: ["page", "species", "name", "lastPage"],
  created() {},
  computed: {
    speciesData() {
      return this.species ? { species: this.species } : {};
    },
    nameData() {
      return this.name ? { name: this.name } : {};
    },
  },
  methods: {
    isDisabled(number) {
      return this.page === number;
    },
  },
};
</script>
<style scoped>
#pagination {
  display: flex;
  background-color: white;
  position: sticky;
  bottom: 0;
}
.nav-wrapper {
  margin-left: 20px;
}
.nav-wrapper > .arrow {
  margin-left: 10px;
}
.arrow {
  text-decoration: none;
  color: inherit;
}
.arrow--disabled {
  color: grey;
}
.arrow__icon {
  vertical-align: middle;
  height: 50%;
}
.arrow__icon--reverted {
  transform: scale(-1, 1);
}
@media (max-width: 724px) {
  #pagination {
    font-size: 22px;
    justify-content: center;
  }
}
</style>
