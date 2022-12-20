import { Text } from '@chakra-ui/react';

const TextComponent = ({ text, fontSize, color, as, align }) => {
  return (
    <Text fontSize={fontSize} color={color} as={as} align={align}>
      {text}
    </Text>
  );
};

export default TextComponent;
