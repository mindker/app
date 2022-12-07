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
    >
      {text}
    </Button>
  );
};

export default AgnosticButton;
