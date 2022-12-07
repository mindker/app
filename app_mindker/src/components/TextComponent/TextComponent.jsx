import { Text } from '@chakra-ui/react';

const TextComponent = ({ text, fontSize, color, as }) => {
  return (
    <Text fontSize={fontSize} color={color} as={as}>
      {text}
    </Text>
  );
};

export default TextComponent;
