import { Box, Flex, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import TextComponent from '../../components/TextComponent/TextComponent';
import GlobalContext from '../../context/GlobalContext';
import { patchAgnostic } from '../../services/APIservice';
import { sorted } from '../../utils/difficultySorted';

const PlayPage = () => {
  const navigate = useNavigate();
  const { deck, user } = useContext(GlobalContext);

  const [Cards, setCards] = useState([]);
  let [counter, setCounter] = useState(0);
  const [next, setNext] = useState(true);
  const token = window.localStorage.getItem('user');
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const playDeck = user.decks.filter((deckUser) => deckUser._id == deck._id);
    setCards(playDeck[0].cards);
    setPosition(user.decks.indexOf(playDeck[0]));
  }, [counter]);

  const updateDifficulty = (level) => {
    user.decks[position].cards[counter].difficulty = level;
  };

  return (
    <Flex
      display="flex"
      flexDirection="column"
      width="100vw"
      height="100vh"
      bg="#5f1590"
      justifyContent="center"
      alignItems="center"
    >
      <Box bg="white" p="25px" borderRadius="20px" w="30rem" h="29rem">
        {Cards[counter] ? (
          <Flex
            key={Cards[counter]._id}
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            gap="2rem"
            color="#af63dd"
          >
            <TextComponent
              text={Cards[counter].question}
              fontSize="lg"
              as="b"
              color="#5f1590"
              align="center"
            />
            {Cards[counter].questionFile ? (
              <img
                src={Cards[counter].questionFile}
                alt={Cards[counter].question}
                width="250px"
              />
            ) : null}
            {next ? (
              <AgnosticButton
                variant="outline"
                text="See Answer"
                callBack={() => setNext(!next)}
                bg="#5f1590"
                color="white"
                size="md"
                borderRadius="1.5rem"
                w="6rem"
                _hover={{ bg: '#af63dd', color: 'white' }}
              />
            ) : (
              <Flex
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                gap="2rem"
              >
                <TextComponent
                  text={Cards[counter].answer}
                  color="#5f1590"
                  as="b"
                  align="center"
                />
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
                    bg="#5f1590"
                    color="white"
                    size="md"
                    borderRadius="1.5rem"
                    w="6rem"
                    _hover={{ bg: '#af63dd', color: 'white' }}
                    text="Easy"
                  />
                  <AgnosticButton
                    variant="outline"
                    callBack={() => {
                      setNext(!next);
                      updateDifficulty('Medium');
                      setCounter(++counter);
                    }}
                    bg="#5f1590"
                    color="white"
                    size="md"
                    borderRadius="1.5rem"
                    w="6rem"
                    _hover={{ bg: '#af63dd', color: 'white' }}
                    text="Medium"
                  />
                  <AgnosticButton
                    variant="outline"
                    callBack={() => {
                      setNext(!next);
                      updateDifficulty('Hard');
                      setCounter(++counter);
                    }}
                    bg="#5f1590"
                    color="white"
                    size="md"
                    borderRadius="1.5rem"
                    w="6rem"
                    _hover={{ bg: '#af63dd', color: 'white' }}
                    text="Hard"
                  />
                </Flex>
              </Flex>
            )}
          </Flex>
        ) : (
          <Flex justifyContent="center" flexDir="column" alignItems="center" h="100%">
            <Text color="black" as="b" fontSize="lg">
              You completed the study of this deck
            </Text>
            <AgnosticButton
              text="Retake"
              color="white"
              type="button"
              bg="#5f1590"
              size="md"
              borderRadius="20px"
              callBack={() => {
                setCounter(0);
                setPosition(0);
              }}
              mt="1.5rem"
              _hover={{ bg: '#af63dd', color: 'white' }}
              width="6rem"
            />
          </Flex>
        )}
      </Box>
      <AgnosticButton
        mt="2rem"
        text="Back"
        callBack={() => {
          sorted(Cards, user, position);
          patchAgnostic(user._id, 'users', token, user).then((res) => console.log(res));
          navigate('/dashboard');
        }}
        bg="white"
        color="#5f1590"
        size="md"
        borderRadius="1.5rem"
        w="6rem"
        _hover={{ bg: '#af63dd', color: 'white' }}
      />
    </Flex>
  );
};

export default PlayPage;
