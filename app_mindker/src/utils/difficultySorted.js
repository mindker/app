/* export const sorted = (arrayCards, user, position) => {
  arrayCards = arrayCards.sort((card) => {
    if (card.difficulty === 'Hard') {
      return -1;
    } else if (card.difficulty === 'Easy') {
      return 1;
    }
  });
  user.decks[position].cards = arrayCards;
}; */

export const sorted = (arrayCards, user, position) => {
  const arrayHard = arrayCards.filter((item) => item.difficulty == 'Hard');
  const arrayMedium = arrayCards.filter((item) => item.difficulty == 'Medium');
  const arrayEasy = arrayCards.filter((item) => item.difficulty == 'Easy');

  let newDistribution = [];
  newDistribution.push(arrayHard, arrayMedium, arrayEasy);
  newDistribution = newDistribution.flat(2);
  user.decks[position].cards = newDistribution;

  return newDistribution;
};
