import { Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import ImageComponent from '../ImageComponents/Image';

import ImageComponent from '../ImageComponents/Image';

const Content = () => {
  const bg = useColorModeValue('');
  const color = useColorModeValue('');
  return (
    <Flex id="sectionContentHome" w="100vw" py="1rem" px="5rem">
      <Flex
        direction="row"
        color={color}
        align="center"
        flexWrap="wrap"
        justifyContent="space-around"
        w="100vw"
      >
        <Flex direction="column" w="60%">
          <Heading w="100%">
            <Text fontSize="30px" width="100%" textAlign="left" as="b" p="0.5rem">
              What is Mindker?
            </Text>
          </Heading>
          <Flex direction="column" bg={bg} color={color} align="left">
            <Text fontSize="16px" width="100%" textAlign="left" p="0.5rem">
              Mindker is a collaborative learning application that generates a community
              of users immersed in learning processes. All users of our application have
              at least one interest in common: learning.
            </Text>
            <Text fontSize="16px" width="100%" textAlign="left" p="0.5rem">
              This app consists of a set of cards that are grouped into decks according to
              the topic. Thanks to them, we work on the curve of oblivion.
            </Text>
            <Text fontSize="16px" width="100%" textAlign="left" p="0.5rem">
              Each card asks a question offering an answer that the user must remember. In
              relation to the difficulty that the user encounters when remembering the
              answer, the cards are repeated more or less frequently.
            </Text>
            <Text fontSize="16px" width="100%" textAlign="left" p="0.5rem">
              This methodology is based on the subjectivity of the user about his own
              learning, since he himself is the one who determines the degree of
              difficulty he has experienced when remembering the answer.
            </Text>
            <Text fontSize="16px" width="100%" textAlign="left" p="0.5rem">
              The forgetting curve was first established in the late 19th century by the
              German psychologist Hermann Ebbinghaus. According to Hermann, the forgetting
              curve models the exponential rate at which humans forget information they
              have learned.
            </Text>
          </Flex>
        </Flex>

        <Flex w="30rem" alignItems="center" justifyContent="center">
          <ImageComponent
            boxSize="25rem"
            w="25rem"
            src="https://cdn.discordapp.com/attachments/1022121860479066113/1053339135374536814/Curva-del-olvido.png"
          ></ImageComponent>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Content;
