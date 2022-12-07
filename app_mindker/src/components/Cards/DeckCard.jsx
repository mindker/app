import { Card, CardBody, Flex } from '@chakra-ui/react';
import { FaArchive, FaDraftingCompass } from 'react-icons/fa';

import AgnosticButton from '../AgnosticButton/AgnosticButton';
import TextComponent from '../TextComponent/TextComponent';

const DeckCard = ({ object, callBack, callBack2 }) => {
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
              text="Play"
              type="button"
              variant="outline"
              leftIcon={<FaArchive />}
              colorScheme="twitter"
              size="xs"
              callBack={callBack}
            />
            {!object.isOpen && (
              <AgnosticButton
                text="Edit"
                type="button"
                variant="outline"
                leftIcon={<FaDraftingCompass />}
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
