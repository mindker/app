export const getDecks = async (id) => {
  return fetch(`http://localhost:8081/api/v1/decks/${id}`)
    .then((res) => res.json())
    .then((res) => res);
};
