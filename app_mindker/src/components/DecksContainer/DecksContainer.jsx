import { Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../../context/GlobalContext';
import DeckCard from '../Cards/DeckCard';
const DecksContainer = ({ array }) => {
  const { setIdDeck } = useContext(GlobalContext);
  const navigate = useNavigate();
  return (
    <Flex justifyContent="center" flexWrap="wrap" gap="2rem">
      {array.length ? (
        array.map((deck) => (
          <DeckCard
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
};

export default DecksContainer;
