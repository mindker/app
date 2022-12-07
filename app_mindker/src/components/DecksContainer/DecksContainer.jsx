import { Flex } from '@chakra-ui/react';

import DeckCard from '../Cards/DeckCard';
const DecksContainer = ({ array, callBack, callBack2 }) => {
  return (
    <Flex justifyContent="center" flexWrap="wrap" gap="2rem">
      {array.length ? (
        array.map((deck) => (
          <DeckCard
            key={deck._id}
            object={deck}
            callBack={callBack}
            callBack2={callBack2}
          />
        ))
      ) : (
        <p>NO WAY</p>
      )}
    </Flex>
  );
};

export default DecksContainer;
