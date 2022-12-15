import { Box, Flex, position } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import TextComponent from '../../components/TextComponent/TextComponent';
import GlobalContext from '../../context/GlobalContext';
import { getAgnostic, patchAgnostic } from '../../services/APIservice';

const PlayPage = () => {
  const navigate = useNavigate();
  const { deck, user } = useContext(GlobalContext);
  const [Cards, setCards] = useState([]);
  let [counter, setCounter] = useState(0);
  const [next, setNext] = useState(true);
  const token = window.localStorage.getItem('user');
  const [position, setPosition] = useState(0);
 /*  console.log(user) */
  
  useEffect(() => {
    
   const playDeck = user.decks.filter((deckUser) => deckUser._id == deck._id);
    
   setCards(playDeck[0].cards);
    setPosition(user.decks.indexOf(playDeck[0]));
    /* console.log(position) */
    /* console.log(playDeck[0]); */
    /*  getAgnostic('decks', deck._id).then((res) => {
      setCards(res.info.data.cards);
    });  */
  }, [counter]);

  const updateDifficulty = (level) => {
    /* console.log(Cards[counter]); */
    /* cards[counter].difficulty = level; */
    console.log(position);
    user.decks[position].cards[counter].difficulty = level;
     patchAgnostic(user._id, 'users', token, user).then((res) =>
      console.log(res),
     ); 
  };

  return (
    <Box>
      {Cards[counter] ? (
        <Flex
          key={Cards[counter]._id}
          mt="2rem"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          gap="2rem"
        >
          <TextComponent text={Cards[counter].question} />
          {Cards[counter].questionFile ? (
            <img
              src={Cards[counter].questionFile}
              alt={Cards[counter].question}
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
              <TextComponent text={Cards[counter].answer} />
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
                    updateDifficulty('Easy');
                    setCounter(++counter);
                  }}
                  text="Easy"
                />
                <AgnosticButton
                  variant="outline"
                  callBack={() => {
                    setNext(!next);                    
                    updateDifficulty('Medium');
                    setCounter(++counter);
                  }}
                  text="Medium"
                />
                <AgnosticButton
                  variant="outline"
                  callBack={() => {
                    setNext(!next);                    
                    updateDifficulty('Hard');
                    setCounter(++counter);
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
