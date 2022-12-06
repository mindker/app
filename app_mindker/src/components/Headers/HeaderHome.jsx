import { Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';

const HeaderHome = ({ text, image }) => {
  const bg = useColorModeValue('#FFF', '#000');
  const color = useColorModeValue('#000', '#FFF');

  return (
    <header>
      <Flex
        as="header"
        bg={bg}
        color={color}
        py={0}
        borderBottom="1px solid #DDD"
        justifyContent="space-between"
        width="100%"
      >
        <Image
          src={image}
          alt={text}
          boxSize="100px"
          ml="4rem"
          title="imagen de mindker"
        />
        <Text fontSize="50px" width="100%" textAlign="center">
          {text}
        </Text>
      </Flex>
    </header>
  );
};
export default HeaderHome;
