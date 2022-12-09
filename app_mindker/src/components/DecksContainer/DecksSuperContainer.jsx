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
    >
      <Flex justifyContent="flex-start">
        <TextComponet text={text} fontSize="4x1" color="black" as="b" />
      </Flex>
      <DecksContainer array={array} />
    </Flex>
  );
};

export default DecksSuperContainer;
