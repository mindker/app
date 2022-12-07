import { Stack } from '@chakra-ui/react';
import { useContext } from 'react';

import GlobalContext from '../../context/GlobalContext';

const DecksContainer = ({ direction = ['row', 'column'], spacing }) => {
  const { user } = useContext(GlobalContext);
  return (
    <Stack direction={direction} spacing={spacing}>
      {user.downloadedDecks.length ? (
        user.downloadedDecks.map((deck) => <p key={deck.title}>{deck.title}</p>)
      ) : (
        <p>NO WAY</p>
      )}
    </Stack>
  );
};

export default DecksContainer;
