import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getCharacters(payload) {
    const { page, species, name } = payload;
    const isSpecies = species ? `&species=${species}` : "";
    const isName = name ? `&name=${name}` : "";
    return apiClient.get(`/character/?page=${page}${isSpecies}${isName}`);
  },
  searchCharacters(query) {
    return apiClient.get(`/character/?name=${query}`);
  },
  getCharacterById(id) {
    return apiClient.get(`/character/${id}`);
  },
  getEpisodeByLink(link) {
    return axios.get(link);
  },
};
