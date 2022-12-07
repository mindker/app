import { Box } from '@chakra-ui/react';

import DecksContainer from '../../components/DecksContainer/DecksContainer';
import TextComponet from '../TextComponent/TextComponent';

const DecksSuperContainer = ({ array, callBack, callBack2, text }) => {
  return (
    <Box>
      <TextComponet text={text} fontSize="4x1" color="black" as="b" />
      <DecksContainer
        array={array}
        callBack={callBack}
        callBack2={callBack2}
        spacing="30px"
      />
    </Box>
  );
};

export default DecksSuperContainer;
