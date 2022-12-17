import { Button } from '@chakra-ui/react';

const AgnosticButton = ({
  variant,
  type,
  text,
  callBack,
  size,
  colorScheme,
  leftIcon,
  width,
  bg,
  borderRadius,
  color,
  _hover,
  border,
  mt,
}) => {
  return (
    <Button
      onClick={callBack}
      type={type}
      variant={variant}
      size={size}
      colorScheme={colorScheme}
      leftIcon={leftIcon}
      w={width}
      bg={bg}
      borderRadius={borderRadius}
      color={color}
      _hover={_hover}
      border={border}
      mt={mt}
    >
      {text}
    </Button>
  );
};

export default AgnosticButton;
