import { Flex, Text } from '@chakra-ui/react';

import ImageComponent from '../ImageComponents/Image';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { useMediaQuery } from '@chakra-ui/react';

const HeaderHome = ({ text, image }) => {
  const [isLargerThan650] = useMediaQuery('(min-width: 650px)');

  return isLargerThan650 ? (
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
  ) : (
    <header>
      <Flex
        as="header"
        bg="#5f1590"
        color="white"
        justifyContent="space-around"
        width="100vw"
        flexWrap="wrap"
      >
        <Flex alignItems="center" gap="1rem" w="100%" justifyContent="center">
          <ImageComponent
            src="https://res.cloudinary.com/drprserzu/image/upload/v1671392221/image_1_2_1_mgafao.png"
            alt={text}
            boxSize="50px"
            objectFit="cover"
            title="imagen de mindker"
          />
          <Text fontSize="40px" textAlign="center" as="b">
            {text}
          </Text>
        </Flex>
        <Flex justifyContent="space-around" gap="1rem" alignItems="center" p="0.5rem">
          <Register />
          <Login />
        </Flex>
      </Flex>
    </header>
  );
};
export default HeaderHome;
