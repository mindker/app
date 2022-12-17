import { getAgnostic } from '../services/APIservice';

let diff;
let difficulties;

export const sorter = (cards, user) => {
  cards.forEach((card) =>
    getAgnostic('cards', card._id)
      .then((res) => (difficulties = res.info.data.difficulty))
      .then(() => (diff = difficulties.filter((diff) => diff.idUser == user._id)))
      .then(diff.length ? (card.level = diff[0].level) : (card.level = 'notPlayed')),
  );
  return cards.sort((card) =>
    card.level == ('Very Hard' | 'Hard')
      ? -1
      : card.level == ('Very Easy' | 'Easy')
      ? 1
      : 0,
  );
};
