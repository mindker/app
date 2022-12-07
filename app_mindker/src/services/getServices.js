export const getAgnostic = async (endpoint, param) => {
  return fetch(`http://localhost:8080/api/v1/${endpoint}/${param}`)
    .then((res) => res.json())
    .then((res) => res);
};
