import { Stack } from '@chakra-ui/react';

import DeckCard from '../Cards/DeckCard';
const DecksContainer = ({
  array,
  callBack,
  callBack2,
  direction = ['row', 'column'],
  spacing,
}) => {
  return (
    <Stack direction={direction} spacing={spacing}>
      {array.length ? (
        array.map((deck) => (
          <DeckCard
            key={deck.title}
            object={deck}
            callBack={callBack}
            callBack2={callBack2}
          />
        ))
      ) : (
        <p>NO WAY</p>
      )}
    </Stack>
  );
};

export default DecksContainer;
