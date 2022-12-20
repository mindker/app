import { Flex, Spinner, useToast, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { FaSearchengin, FaSith, FaStudiovinari, FaWrench } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../../context/GlobalContext';
import { getAgnostic, patchAgnostic } from '../../services/APIservice.js';
import DeckCard from '../Cards/DeckCard';

const DecksContainer = ({ array }) => {
  const { setDeck, dashboardContent, user, setUser } = useContext(GlobalContext);
  const navigate = useNavigate();
  const toast = useToast();
  const token = window.localStorage.getItem('user');

  const adoptDeckUser = async (deck) => {
    getAgnostic('decks', deck._id).then((res) => {
      user.decks.push(res.info.data);
      setUser({ ...user });
      patchAgnostic(user._id, 'users', token, user);
    });
  };
  

  if (dashboardContent === false) {
    return (
      <Flex justifyContent="center" flexWrap="wrap" gap="2rem">
        {array.length ? (
          array.map((deck) => (
            <DeckCard
              textUp="Play"
              textBottom="Edit"
              key={deck._id}
              object={deck}
              callBack={() => {
                setDeck(deck);
                navigate('/playPage');
              }}
              callBack2={() => {
                setDeck(deck);
                navigate('/editDeckPage');
              }}
            />
          ))
        ) : (
          <>
            <Spinner />
            <Text>No decks to show, add some decks from Popular Decks</Text>
          </>
        )}
      </Flex>
    );
  } else {
    return (
      <Flex justifyContent="center" flexWrap="wrap" gap="2rem">
        {array.length ? (
          array.map((deck) => (
            <DeckCard
              textUp="Detail"
              textBottom="Adopt"
              key={deck._id}
              object={deck}
              callBack={() => {
                setDeck(deck);
                navigate('/detailDeck');
              }}
              callBack2={async () => {
                await adoptDeckUser(deck);
                toast({
                  title: 'Deck adopted',
                  description: 'You can go to My Decks to start playing',
                  status: 'success',
                  duration: 4000,
                  isClosable: true,
                });
              }}
            />
          ))
        ) : (
          <>
            <Spinner />
            <Text>No decks to show, you already added all the available decks</Text>
          </>
        )}
      </Flex>
    );
  }
};

export default DecksContainer;
