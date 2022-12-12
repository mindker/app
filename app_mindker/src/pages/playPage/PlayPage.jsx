import { Box, Flex } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import TextComponent from '../../components/TextComponent/TextComponent';
import GlobalContext from '../../context/GlobalContext';
import { getAgnostic, patchAgnostic, postAgnostic } from '../../services/APIservice';

const PlayPage = () => {
  const navigate = useNavigate();
  const { idDeck, user } = useContext(GlobalContext);
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState([]);
  let [counter, setCounter] = useState(0);
  const [next, setNext] = useState(true);

  useEffect(() => {
    getAgnostic('decks', idDeck)
      .then((res) => {
        setCards(res.info.data.cards);
      })
      .then(
        () =>
          cards &&
          getAgnostic('cards', cards[counter]._id).then((res) => setCard(res.info.data)),
      );
  }, [counter]);

  const updateDifficulty = (id, idCard, idUser, level) => {
    const difficultyUpdated = {
      _id: id,
      idCard: idCard,
      idUser: idUser,
      level: level,
    };
    const token = localStorage.getItem(user.nickname);
    card.difficulty.length
      ? patchAgnostic(id, 'difficulties', token, difficultyUpdated).then((res) => res)
      : postAgnostic('difficulties', { idCard: idCard, idUser: idUser, level: level });
  };

  return (
    <Box>
      {cards[counter] ? (
        <Flex
          key={cards[counter]._id}
          mt="2rem"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          gap="2rem"
        >
          <TextComponent text={cards[counter].question} />
          {cards[counter].questionFile ? (
            <img
              src={cards[counter].questionFile}
              alt={cards[counter].question}
              width="350px"
            />
          ) : null}
          {next ? (
            <AgnosticButton
              variant="outline"
              text="See Answer"
              callBack={() => setNext(!next)}
            />
          ) : (
            <Flex
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              gap="2rem"
            >
              <TextComponent text={cards[counter].answer} />
              <Flex
                justifyContent="space-between"
                flexDirection="row"
                alignItems="center"
                gap="2rem"
              >
                <AgnosticButton
                  variant="outline"
                  callBack={() => {
                    setNext(!next);
                    setCounter(++counter);
                    updateDifficulty(card._id, card.idCard, card.idUser, card.level);
                  }}
                  text="Very easy"
                />
                <AgnosticButton
                  variant="outline"
                  callBack={() => {
                    setNext(!next);
                    setCounter(++counter);
                    updateDifficulty(card._id, card.idCard, card.idUser, card.level);
                  }}
                  text="Easy"
                />
                <AgnosticButton
                  variant="outline"
                  callBack={() => {
                    setNext(!next);
                    setCounter(++counter);
                    updateDifficulty(card._id, card.idCard, card.idUser, card.level);
                  }}
                  text="Hard"
                />
                <AgnosticButton
                  variant="outline"
                  callBack={async () => {
                    setNext(!next);
                    setCounter(++counter);
                    updateDifficulty(card._id, card.idCard, card.idUser, card.level);
                  }}
                  text="Very Hard"
                />
              </Flex>
            </Flex>
          )}
        </Flex>
      ) : (
        <AgnosticButton
          variant="outline"
          text="Back"
          callBack={() => {
            navigate('/dashboard');
          }}
        />
      )}
    </Box>
  );
};

export default PlayPage;
