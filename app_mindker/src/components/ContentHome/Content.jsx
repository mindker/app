import { Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';

const Content = () => {
  //bg es background
  //noOfLines oculta lineas
  const bg = useColorModeValue('');
  const color = useColorModeValue('');
  return (
    <section id="sectionContentHome">
      <Flex bg={bg} color={color} px={350} py={4} align="center">
        <Heading ml={90} w="100%">
          <Text fontSize="40px" width="100%" textAlign="center">
            Introduction
          </Text>
          <Text fontSize="18px" width="100%" textAlign="center">
            Mindker is a collaborative learning application that generates a community of
            users immersed in learning processes. All users of our application have at
            least one interest in common: learning. This app consists of a set of cards
            that are grouped into decks according to the theme. Thanks to them, we work on
            the curve of oblivion. Each card asks a question offering an answer that the
            user must remember. In relation to the difficulty that the user encounters
            when remembering the answer, the cards are repeated more or less frequently.
            This methodology is based on the subjectivity of the user about his own
            learning, since he himself is the one who determines the degree of difficulty
            he has experienced when remembering the answer. The forgetting curve was first
            established in the late 19th century by the German psychologist Hermann
            Ebbinghaus. According to Hermann, the forgetting curve models the exponential
            rate at which humans forget information they have learned.
          </Text>
        </Heading>
      </Flex>
    </section>
  );
};
export default Content;
