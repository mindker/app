import { Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { FaArchive, FaSearchengin, FaSith, FaStudiovinari } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../../context/GlobalContext';
import DeckCard from '../Cards/DeckCard';
const DecksContainer = ({ array }) => {
  const { setIdDeck, dashboardContent } = useContext(GlobalContext);
  const navigate = useNavigate();
  if (dashboardContent === false) {
    return (
      <Flex justifyContent="center" flexWrap="wrap" gap="2rem">
        {array.length ? (
          array.map((deck) => (
            <DeckCard
              leftIconDown={<FaStudiovinari />}
              leftIconUp={<FaArchive />}
              textUp="Play"
              textBottom="Edit"
              key={deck._id}
              object={deck}
              callBack={() => {
                navigate('/playPage');
                setIdDeck(deck._id);
              }}
              callBack2={() => {
                navigate('/editDeckPage');
                setIdDeck(deck._id);
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
                navigate(`/dashboard/${deck._id}`);
                setIdDeck(deck._id);
              }}
              callBack2={() => {
                navigate('/editDeckPage');
                setIdDeck(deck._id);
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
