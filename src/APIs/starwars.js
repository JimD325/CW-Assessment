import axios from "axios";

const starwars = {
  getPeople: async () => {
    try {
      const response = await axios.get("https://swapi.dev/api/people");
      return response.data.results;
    } catch (error) {
      return error;
    }
  },
  getAllPeople: async () => {
    let page = 1;
    let response;
    let holder = [];
    try {
      while (page <= 9) {
        response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
        page++;
        holder=[...holder, ...response.data.results]
      }
      return holder;
    } catch (error) {
      console.error(error);
    }
  },
  getPlanets: async () => {
    try {
      const response = await axios.get("https://swapi.dev/api/planets");
      return response.data.results;
    } catch (error) {
      return error;
    }
  },
  getStarships: async () => {
    try {
      const response = await axios.get("https://swapi.dev/api/starships");
      return response.data.results;
    } catch (error) {
      return error;
    }
  }
};

export default starwars;
