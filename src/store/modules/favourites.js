const favourites = {
  namespaced: true,
  state: {
    listOfFavourites: [
      ...(localStorage.getItem("listOfFavourites") &&
        JSON.parse(localStorage.getItem("listOfFavourites"))),
    ],
  },
  getters: {
    isAdded: (state) => (id) => {
      return state.listOfFavourites.some((el) => el.id === Number(id));
    },
  },
  mutations: {
    storeFavourites(state, array) {
      localStorage.setItem("listOfFavourites", array);
    },
    addFavourites(state, array) {
      state.listOfFavourites = [...state.listOfFavourites, ...array];
      localStorage.setItem(
        "listOfFavourites",
        JSON.stringify(state.listOfFavourites)
      );
    },
    removeFavourites(state, id) {
      const index = state.listOfFavourites.findIndex((el) => el.id === +id);
      if (~index) {
        state.listOfFavourites.splice(index, 1);
        state.listOfFavourites = [...state.listOfFavourites];
        localStorage.setItem(
          "listOfFavourites",
          JSON.stringify(state.listOfFavourites)
        );
      }
    },
  },
  actions: {},
};

export default favourites;
