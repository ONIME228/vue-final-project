import { createStore } from "vuex";
import Service from "../services/CharacterService";
//Modules
import details from "./modules/details";
import favourites from "./modules/favourites";
/* eslint-disable*/
const store = createStore({
    modules: {
        details,
        favourites
    },
    state: {
        listOfCards: [],
        lastPage: null,
        isLoading: true,
    },
    mutations: {
        addCards(state, arrayOfItems) {
            state.listOfCards = [...arrayOfItems];
        },
        updateLastPage(state, value) {
            state.lastPage = value;
        },
        setLoading(state, value) {
            state.isLoading = value;
        },
    },
    actions: {
        async fetchAllCards(state, payload) {
            state.commit('setLoading', true);
            const response = await Service.getCharacters(payload)
            const cards = response.data && response.data.results;
            state.commit('addCards', cards);
            if (!state.lastPage) {
                const lastPage = response.data && response.data.info && response.data.info.pages;
                state.commit('updateLastPage', lastPage);
            }
            state.commit('setLoading', false);
        },
    },
});

export default store;