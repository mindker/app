export const sorted = (arrayCards) => {
  arrayCards.sort((card) => {
    if (card.difficulty === 'Hard') {
      return -1;
    } else if (card.difficulty === 'Easy') {
      return 5;
    }
  });
};
