import { Card, CardBody, Flex } from '@chakra-ui/react';
import { useContext } from 'react';

import GlobalContext from '../../context/GlobalContext';
import AgnosticButton from '../AgnosticButton/AgnosticButton';
import TextComponent from '../TextComponent/TextComponent';

const DeckCard = ({
  object,
  callBack,
  callBack2,
  textUp,
  textBottom,
  leftIconUp,
  leftIconDown,
}) => {
  const { dashboardContent } = useContext(GlobalContext);
  return (
    <Card height="200" width="200" borderRadius="4px" bg="#E9B5F7">
      <CardBody overflowX="hidden">
        <Flex
          flexDirection="column"
          justifyContent="space-around"
          background="9271ac"
          w="180px"
        >
          <Flex flexDirection="row" justifyContent="space-between">
            <AgnosticButton
              text={textUp}
              type="button"
              variant="outline"
              leftIcon={leftIconUp}
              color="white"
              borderRadius="20px"
              size="xs"
              callBack={callBack}
              bg="#AC67D6"
              border="1px #AC67D6"
              _hover={{ bg: '#5b168d' }}
            />
            {dashboardContent == false && (
              <AgnosticButton
                text={textBottom}
                type="button"
                variant="outline"
                leftIcon={leftIconDown}
                color="white"
                borderRadius="20px"
                size="xs"
                callBack={callBack2}
                bg="#5b168d"
                border="1px #5b168d"
                _hover={{ bg: '#AC67D6' }}
              />
            )}
            {dashboardContent && (
              <AgnosticButton
                text={textBottom}
                type="button"
                variant="outline"
                leftIcon={leftIconDown}
                color="white"
                borderRadius="20px"
                size="xs"
                callBack={callBack2}
                bg="#5b168d"
                border="1px #5b168d"
                _hover={{ bg: '#AC67D6' }}
              />
            )}
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="2rem"
            mt="3rem"
            fontWeight="bold"
          >
            <TextComponent text={object.title} fontSize="1rem" color="black" />
            <TextComponent
              //text={`Numero de preguntas ${object.cards.length}`}
              fontSize="sm"
              color="black"
              as="sub"
            />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default DeckCard;
