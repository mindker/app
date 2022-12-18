import { Flex, Spinner, useToast } from '@chakra-ui/react';
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
              //leftIconDown={<FaWrench />}
              //leftIconUp={<FaStudiovinari />}
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
          <Spinner />
        )}
      </Flex>
    );
  } else {
    return (
      <Flex justifyContent="center" flexWrap="wrap" gap="2rem">
        {array.length ? (
          array.map((deck) => (
            <DeckCard
              //leftIconUp={<FaSearchengin />}
              //leftIconDown={<FaSith />}
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
                  title: 'Deck adopted.',
                  description: 'You can go to My dekcs to start playing',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                });
              }}
            />
          ))
        ) : (
          <Spinner />
        )}
      </Flex>
    );
  }
};

export default DecksContainer;
