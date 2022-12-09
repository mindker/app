import { Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';

const Content = () => {
  //bg es background
  //noOfLines oculta lineas
  const bg = useColorModeValue('');
  const color = useColorModeValue('');
  return (
    <section id="sectionContentHome">
      <Flex direction="column" bg={bg} color={color} align="center">
        <Heading w="100%" as="cite">
          <Text fontSize="30px" width="100%" textAlign="center">
            What is Mindker?
          </Text>
        </Heading>
        <Flex direction="column" bg={bg} color={color} px={350} py={4} align="center">
          <Text fontSize="16px" width="100%" textAlign="center" p="0.5rem">
            Mindker is a collaborative learning application that generates a community of
            users immersed in learning processes. All users of our application have at
            least one interest in common: learning.
          </Text>
          <Text fontSize="16px" width="100%" textAlign="center" p="0.5rem">
            This app consists of a set of cards that are grouped into decks according to
            the topic. Thanks to them, we work on the curve of oblivion.
          </Text>
          <Text fontSize="16px" width="100%" textAlign="center" p="0.5rem">
            Each card asks a question offering an answer that the user must remember. In
            relation to the difficulty that the user encounters when remembering the
            answer, the cards are repeated more or less frequently.
          </Text>
          <Text fontSize="16px" width="100%" textAlign="center" p="0.5rem">
            This methodology is based on the subjectivity of the user about his own
            learning, since he himself is the one who determines the degree of difficulty
            he has experienced when remembering the answer.
          </Text>
          <Text fontSize="16px" width="100%" textAlign="center" p="0.5rem">
            The forgetting curve was first established in the late 19th century by the
            German psychologist Hermann Ebbinghaus. According to Hermann, the forgetting
            curve models the exponential rate at which humans forget information they have
            learned.
          </Text>
        </Flex>
      </Flex>
    </section>
  );
};
export default Content;
