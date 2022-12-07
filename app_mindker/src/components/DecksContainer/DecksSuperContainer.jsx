import { Flex } from '@chakra-ui/react';

import DecksContainer from '../../components/DecksContainer/DecksContainer';
import TextComponet from '../TextComponent/TextComponent';

const DecksSuperContainer = ({ array, callBack, callBack2, text }) => {
  return (
    <Flex gap="3rem" flexWrap="no-wrap" flexDirection="column" h="100vh" bg="pink">
      <Flex justifyContent="flex-start">
        <TextComponet text={text} fontSize="4x1" color="black" as="b" />
      </Flex>
      <DecksContainer array={array} callBack={callBack} callBack2={callBack2} />
    </Flex>
  );
};

export default DecksSuperContainer;
