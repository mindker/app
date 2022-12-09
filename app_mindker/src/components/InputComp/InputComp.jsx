import { Input } from '@chakra-ui/react';
import React from 'react';

const InputComp = (name, type, placeholder, defaultValue, callBack) => {
  return (
    <Input
      name={name}
      type={type}
      onChange={callBack}
      placeholder={name}
      defaultValue={defaultValue}
    />
  );
};

export default InputComp;
