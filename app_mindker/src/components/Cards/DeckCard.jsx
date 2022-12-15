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
    <Card height="130">
      <CardBody>
        <Flex flexDirection="row" justifyContent="space-around" gap="1rem">
          <Flex flexDirection="column" justifyContent="center" gap="2rem">
            <TextComponent text={object.title} fontSize="4x1" color="black" />
            <TextComponent
              text={`Numero de preguntas ${object.cards.length}`}
              fontSize="sm"
              color="black"
              as="sub"
            />
          </Flex>
          <Flex flexDirection="column" justifyContent="center" gap="2rem">
            <AgnosticButton
              text={textUp}
              type="button"
              variant="outline"
              leftIcon={leftIconUp}
              colorScheme="twitter"
              size="xs"
              callBack={callBack}
            />
            {dashboardContent == false && (
              <AgnosticButton
                text={textBottom}
                type="button"
                variant="outline"
                leftIcon={leftIconDown}
                colorScheme="twitter"
                size="xs"
                callBack={callBack2}
              />
            )}
            {dashboardContent && (
              <AgnosticButton
                text={textBottom}
                type="button"
                variant="outline"
                leftIcon={leftIconDown}
                colorScheme="twitter"
                size="xs"
                callBack={callBack2}
              />
            )}
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default DeckCard;
