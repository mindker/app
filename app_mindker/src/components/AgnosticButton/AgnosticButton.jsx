import { Button } from '@chakra-ui/react';

const AgnosticButton = ({
  variant,
  type,
  text,
  callBack,
  size,
  colorScheme,
  leftIcon,
}) => {
  return (
    <Button
      onClick={callBack}
      type={type}
      variant={variant}
      size={size}
      colorScheme={colorScheme}
      leftIcon={leftIcon}
    >
      {text}
    </Button>
  );
};

export default AgnosticButton;
