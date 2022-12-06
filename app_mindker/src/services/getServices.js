import axios from 'axios';

export const getDecks = async (id) => {
  return axios
    .get(`http://localhost:8081/api/v1/decks/${id}`)
    .then((res) => console.log(res));
};
