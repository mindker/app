import { Divider, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';

const Header = () => {
  const bg = useColorModeValue('#FFF', '#000');
  const color = useColorModeValue('#000', '#FFF');
  return (
    <>
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
          src="https://res.cloudinary.com/di5oqdvwa/image/upload/v1670257782/imagenes/Logo-hecho-porIris-que-es-una-crack_u48ufi.png"
          alt="Logo"
          boxSize="100px"
          ml="4rem"
        />
        <Text fontSize="50px" width="100%" textAlign="center">
          Mindker
        </Text>
      </Flex>
      <Divider />
    </>
  );
};
export default Header;
