export const filterDecks = (arrayUser, arrayAPI) => {
  let filteredArray = arrayAPI;
  if (arrayUser.length) {
    arrayUser = arrayUser.map((deck) => deck._id);
    for (const id of arrayUser) {
      for (const deck of arrayAPI) {
        if (id == deck._id) {
          filteredArray.splice(arrayAPI.indexOf(deck), 1);
        }
      }
    }
    return filteredArray;
  } else {
    return arrayAPI;
  }
};
