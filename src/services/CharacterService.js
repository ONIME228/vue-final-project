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
    return apiClient.get('/character', { params: { page, species, name } });
  },
  searchCharacters(query) {
    return apiClient.get('/character', { params: { name: query } });
  },
  getCharacterById(id) {
    return apiClient.get(`/character/${id}`);
  },
  getEpisodeByLink(link) {
    return axios.get(link);
  },
};
