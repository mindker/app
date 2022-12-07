import { Box, Button, ChakraProvider, GridItem, Heading, Stack } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';

import GlobalContext from '../../context/GlobalContext';
import { getDecks } from '../../services/getServices';

const DecksContainer = ({ direction = ['row', 'column'], spacing, data }) => {
  const { user } = useContext(GlobalContext);
  let downloadedDecksID;
  let createdDecks;

  useEffect(() => {
    //createdDecks = userCreatedDecks.map((deck) => getDecks(deck));
    downloadedDecksID = user.downloadedDecks.map((deck) => getDecks(deck));
    console.log(downloadedDecksID);
  }, [createdDecks, downloadedDecksID]);

//dejar solo el stack en caso de no lograr obtener los desk de esta forma
const api = () => {
  return (
    <section>
    <Stack direction={direction} spacing={spacing}>
    </Stack>

    <ChakraProvider>
      {getDecks.map(i => (
        <Box key={i.id}>
          <Heading as="h1">{i.title}</Heading>
          <Text as="p">{i.description}</Text>
        </Box>
      ))}
    </ChakraProvider>


    </section>
  );}
};

export default DecksContainer;
