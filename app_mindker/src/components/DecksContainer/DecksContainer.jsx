import { Stack } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import GlobalContext from '../../context/GlobalContext';
import { getDecks } from '../../services/getServices';

const DecksContainer = ({ direction = ['row', 'column'], spacing }) => {
  const { user } = useContext(GlobalContext);
  const [downloadedDecks, setdownloadedDecks] = useState([]);

  useEffect(() => {
    console.log(user.downloadedDecks);
    user.downloadedDecks.forEach((idDeck) =>
      getDecks(idDeck).then((res) =>
        setdownloadedDecks(downloadedDecks.concat(res.info.data)),
      ),
    );
  }, []);

  return (
    <Stack direction={direction} spacing={spacing}>
      {downloadedDecks ? (
        downloadedDecks.map((deck) => <p key={deck.title}>{deck.title}</p>)
      ) : (
        <p>NO WAY</p>
      )}
    </Stack>
  );
};

export default DecksContainer;
