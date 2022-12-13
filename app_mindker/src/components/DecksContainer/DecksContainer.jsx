import { Flex, useToast } from '@chakra-ui/react';
import { useContext } from 'react';
import { FaSearchengin, FaSith, FaStudiovinari, FaWrench } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../../context/GlobalContext';
import { getAgnostic, patchAgnostic } from '../../services/APIservice.js';
import DeckCard from '../Cards/DeckCard';

const DecksContainer = ({ array }) => {
  const { setIdDeck, dashboardContent, user } = useContext(GlobalContext);
  const navigate = useNavigate();
  const toast = useToast();
  const downloadedDeckUser = async (id) => {
    const token = window.localStorage.getItem(user.nickname);
    getAgnostic('decks', id).then((res) => {
      user.downloadedDecks.push(res.info.data);
      patchAgnostic(user._id, 'users', token, user);
    });
  };

  if (dashboardContent === false) {
    return (
      <Flex justifyContent="center" flexWrap="wrap" gap="2rem">
        {array.length ? (
          array.map((deck) => (
            <DeckCard
              leftIconDown={<FaWrench />}
              leftIconUp={<FaStudiovinari />}
              textUp="Play"
              textBottom="Edit"
              key={deck._id}
              object={deck}
              callBack={() => {
                setIdDeck(deck._id);
                navigate('/playPage');
              }}
              callBack2={() => {
                setIdDeck(deck._id);
                navigate('/editDeckPage');
              }}
            />
          ))
        ) : (
          <p>NO WAY</p>
        )}
      </Flex>
    );
  } else {
    return (
      <Flex justifyContent="center" flexWrap="wrap" gap="2rem">
        {array.length ? (
          array.map((deck) => (
            <DeckCard
              leftIconUp={<FaSearchengin />}
              leftIconDown={<FaSith />}
              textUp="Detail"
              textBottom="Adopt"
              key={deck._id}
              object={deck}
              callBack={() => {
                setIdDeck(deck._id);
                navigate('/detailDeck');
                
              }}
              callBack2={async () => {
                await downloadedDeckUser(deck._id);
                await array.splice(array.indexOf(deck), 1);
                toast({
                      title: 'Deck adopted.',
                      description: "you adopted the deck.",
                      status: 'success',
                      duration: 9000,
                      isClosable: true,
                    });
              }}
            />
          ))
        ) : (
          <p>NO WAY</p>
        )}
      </Flex>
    );
  }
};

export default DecksContainer;
