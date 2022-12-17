import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

import ImageComponent from '../ImageComponents/Image';
import Login from '../Login/Login';
import Register from '../Register/Register';

const HeaderHome = ({ text, image }) => {
  const bg = useColorModeValue('#FFF', '#000');
  const color = useColorModeValue('#000', '#FFF');

  return (
    <header>
      <Flex
        as="header"
        bg="#5f1590"
        color="white"
        justifyContent="space-around"
        width="100vw"
        flexWrap="wrap"
      >
        <Flex alignItems="center" gap="1rem" padding="0.5rem">
          <ImageComponent
            src={image}
            alt={text}
            boxSize="50px"
            objectFit="cover"
            title="imagen de mindker"
          />
          <Text fontSize="40px" width="100%" textAlign="center" as="b">
            {text}
          </Text>
        </Flex>
        <Flex justifyContent="space-around" gap="1rem" alignItems="center">
          <Register />
          <Login />
        </Flex>
      </Flex>
    </header>
  );
};
export default HeaderHome;
