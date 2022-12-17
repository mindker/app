import { Flex } from '@chakra-ui/react';

import DecksContainer from '../../components/DecksContainer/DecksContainer';
import TextComponet from '../TextComponent/TextComponent';

const DecksSuperContainer = ({ array, text }) => {
  return (
    <Flex
      gap="3rem"
      flexWrap="no-wrap"
      flexDirection="column"
      h="100vh"
      w="85vw"
      bg="inherit"
      alignItems="center"
      px="2rem"
      overflowY="scroll"
      sx={{
        '::-webkit-scrollbar': {
          backgroundColor: '#5F1592',
        },
      }}
    >
      <Flex justifyContent="center" alignItems="center" p="1.5rem">
        <TextComponet text={text} fontSize="2rem" color="black" as="b" />
      </Flex>
      <DecksContainer array={array} />
    </Flex>
  );
};

export default DecksSuperContainer;
