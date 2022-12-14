import { Box, Flex } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import TextComponent from '../../components/TextComponent/TextComponent';
import GlobalContext from '../../context/GlobalContext';
import { getAgnostic, patchAgnostic } from '../../services/APIservice';

const PlayPage = () => {
  const navigate = useNavigate();
  const { deck, user } = useContext(GlobalContext);
  const [cards, setCards] = useState([]);
  let [counter, setCounter] = useState(0);
  const [next, setNext] = useState(true);
  const token = window.localStorage.getItem('user');

  useEffect(() => {
    getAgnostic('decks', deck._id).then((res) => {
      setCards(res.info.data.cards);
    });
  }, [counter]);

  const updateDifficulty = (level) => {
    console.log(cards[counter]);
    cards[counter].level = level;
    patchAgnostic(cards[counter]._id, 'cards', token, cards[counter]).then((res) =>
      console.log(res),
    );
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
                    updateDifficulty('Easy');
                  }}
                  text="Easy"
                />
                <AgnosticButton
                  variant="outline"
                  callBack={() => {
                    setNext(!next);
                    setCounter(++counter);
                    updateDifficulty('Medium');
                  }}
                  text="Medium"
                />
                <AgnosticButton
                  variant="outline"
                  callBack={() => {
                    setNext(!next);
                    setCounter(++counter);
                    updateDifficulty('Hard');
                  }}
                  text="Hard"
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
