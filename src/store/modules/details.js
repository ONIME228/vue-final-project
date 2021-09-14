import Service from "../../services/CharacterService";
const details = {
  namespaced: true,
  state: {
    detailsData: {},
  },
  getters: {},
  mutations: {
    updateDetailsData(state, value) {
      state.detailsData = { ...value };
    },
  },
  actions: {
    async fetchDetailsCard({ commit }, id) {
      console.log("before");
      commit("setLoading", true, { root: true });
      const responseCard = await Service.getCharacterById(id);
      const firstEpisode = responseCard.data.episode[0];
      const responseEpisode = await Service.getEpisodeByLink(firstEpisode);
      commit("updateDetailsData", {
        ...responseCard.data,
        episodeName: responseEpisode.data.name,
      });
      commit("setLoading", false, { root: true });
    },
  },
};

export default details;
