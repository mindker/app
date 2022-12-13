import { Box, Flex } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import TextComponent from '../../components/TextComponent/TextComponent';
import GlobalContext from '../../context/GlobalContext';
import { getAgnostic, patchAgnostic, postDifficulty } from '../../services/APIservice';
//import { sorter } from '../../utils/difficultyFinder';

const PlayPage = () => {
  const navigate = useNavigate();
  const { idDeck, user } = useContext(GlobalContext);
  const [cards, setCards] = useState([]);
  //const [cardDifficulty, setCardDifficulty] = useState({});
  const [cardDifficulties, setCardDifficulties] = useState([]);
  let [counter, setCounter] = useState(0);
  const [next, setNext] = useState(true);
  //let sortedCards;

  useEffect(() => {
    getAgnostic('decks', idDeck)
      .then((res) => {
        setCards(res.info.data.cards);
      })
      .then(
        () =>
          cards &&
          getAgnostic('cards', cards[counter]._id).then((res) =>
            setCardDifficulties(res.info.data.difficulty),
          ),
      );
  }, [counter]);

  console.log(cards);

  const updateDifficulty = (level) => {
    const diff = cardDifficulties.filter((difficulty) => difficulty.idUser == user._id);

    if (diff.length) {
      const difficultyUpdated = {
        _id: diff[0]._id,
        idCard: diff[0].idCard,
        idUser: diff[0].idUser,
        level: level,
      };

      const token = localStorage.getItem(user.nickname);

      console.log('Array de dificultades : ', cardDifficulties);
      console.log('User._id : ', user._id);
      console.log('Dificultad filtrada : ', diff[0]);
      console.log('Nueva difficultad : ', difficultyUpdated);

      patchAgnostic(diff[0]._id, 'difficulties', token, difficultyUpdated).then((res) =>
        console.log(res),
      );
    } else {
      console.log(cards[counter]);
      console.log(
        `Difficultad a crear -> 

       idCard: ${cards[counter]._id}, idUser: ${user._id}, level: ${level} `,
      );

     postDifficulty({

        idCard: cards[counter]._id,
        idUser: user._id,
        level: level,
      }).then((res) => console.log(res));
    }
  };

  //sorter(cards, user);

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
                    updateDifficulty('Very Easy');
                  }}
                  text="Very Easy"
                />
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
                    updateDifficulty('Hard');
                  }}
                  text="Hard"
                />
                <AgnosticButton
                  variant="outline"
                  callBack={() => {
                    setNext(!next);
                    setCounter(++counter);
                    updateDifficulty('Very Hard');
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
