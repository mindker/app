export const getAgnostic = async (endpoint, id) => {
  return fetch(`http://localhost:8080/api/v1/${endpoint}/${id}`)
    .then((res) => res.json())
    .then((res) => res);
};
