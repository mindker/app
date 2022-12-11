import { Box, Flex } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import TextComponent from '../../components/TextComponent/TextComponent';
import GlobalContext from '../../context/GlobalContext';
import { getAgnostic } from '../../services/APIservice';
const PlayPage = () => {
  const { idDeck } = useContext(GlobalContext);
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  let [counter, setCounter] = useState(0);
  const [next, setNext] = useState(true);

  useEffect(() => {
    getAgnostic('decks', idDeck).then((res) => {
      setDeck(res.info.data);
      setCards(res.info.data.cards);
    });
  }, [counter]);

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
          {cards[counter].image ? (
            <img src={cards[counter].image} alt={cards[counter].question} />
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
                  }}
                  text="Very easy"
                />
                <AgnosticButton
                  variant="outline"
                  callBack={() => {
                    setNext(!next);
                    setCounter(++counter);
                  }}
                  text="Easy"
                />
                <AgnosticButton
                  variant="outline"
                  callBack={() => {
                    setNext(!next);
                    setCounter(++counter);
                  }}
                  text="Hard"
                />
                <AgnosticButton
                  variant="outline"
                  callBack={() => {
                    setNext(!next);
                    setCounter(++counter);
                  }}
                  text="Very Hard"
                />
              </Flex>
            </Flex>
          )}
        </Flex>
      ) : (
        <p>NO WAY</p>
      )}
    </Box>
  );
};

export default PlayPage;
