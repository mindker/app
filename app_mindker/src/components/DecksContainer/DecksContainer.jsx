import { Stack } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';

import GlobalContext from '../../context/GlobalContext';
import { getDecks } from '../../services/getServices';

const DecksContainer = ({ direction = ['row', 'column'], spacing }) => {
  const { user } = useContext(GlobalContext);
  let downloadedDecksID;
  let createdDecks;

  useEffect(() => {
    //createdDecks = userCreatedDecks.map((deck) => getDecks(deck));
    downloadedDecksID = user.data.user.downloadedDecks.map((deck) => getDecks(deck));
    console.log(downloadedDecksID);
  }, [createdDecks, downloadedDecksID]);

  return (
    <Stack direction={direction} spacing={spacing}>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
    </Stack>
  );
};

export default DecksContainer;
