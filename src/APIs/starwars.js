import axios from "axios";

const starwars = {

  getEntityByURL: async (URL) => {
    try {
      let response = await axios.get(`${URL}`);
      console.log("get entity by URL ran", response.data)
      return response.data
    } catch (error) {
      return error;
    }
  },
  getEntitiesFromListOfURLS: async (URLArr) => {
    try {
      let holder = [];
      for (let i = 0; i < URLArr.length; i++) {
        let response = await axios.get(`${URLArr[i]}`);
        holder= [...holder, response.data]
      }

      console.log("get entity by URLArr ran", holder)
      return holder
    } catch (error) {
      return error;
    }
  },

  getEntityPage: async (entityType, page) => {
    try {
      let response = await axios.get(`https://swapi.dev/api/${entityType}?page=${page}`);
      return response.data.results;
    } catch (error) {
      return error;
    }
  },
  /**
   * Takes a string as an argument and places it in the swapi url. Returns all entities which fall under the entered category.
   * @param {string} entityType 
   * @returns {object[]}
   */
  getAllEntities: async (entityType) => {
    let page = 1;
    let holder = [];
    console.log('getAllPeopelRan')
    try {
      let response = await axios.get(`https://swapi.dev/api/${entityType}?page=${page}`);
      page++;

      holder = [...holder, ...response.data.results]
      let pageCount = Math.ceil(Number(response.data.count) / 10)
      while (page <= pageCount) {
        response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
        page++;
        holder = [...holder, ...response.data.results]
      }
      return holder;
    } catch (error) {
      console.log("error on getAllPeople", error);
    }
  },




  getStarships: async () => {
    try {
      let response = await axios.get("https://swapi.dev/api/starships");
      return response.data.results;
    } catch (error) {
      return error;
    }
  }
};

export default starwars;
