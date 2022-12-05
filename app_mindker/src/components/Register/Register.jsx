import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import { Input, Text } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { RegisterUser } from '../../services/postsFunctionsApiUser.js';

const Register = () => {
  const [newUser, setNewUser] = useState('');

  //const handleInputChange = (e) => setInput(e.target.value);
  //const isError = input === '';

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (values) => {
    (async () => {
      await RegisterUser('', values);
    })();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <FormLabel>Name</FormLabel>
      <Input
        {...register('name', {
          required: true,
          minLength: 2,
        })}
        name="name"
        type="text"
      />
      {errors.name ? (
        <FormErrorMessage>
          Este campo es obligatorio y debe tener al menos 2 caracteres
        </FormErrorMessage>
      ) : null}
      <FormLabel>Nickname</FormLabel>
      <Input
        {...register('nickname', {
          required: true,
          minLength: 2,
        })}
        name="nickname"
        type="text"
      />
      {errors.nickname ? (
        <Text>Este campo es obligatorio y debe tener al menos 2 caracteres</Text>
      ) : null}
      <FormLabel>Email</FormLabel>
      <Input
        {...register('email', {
          required: true,
          minLength: 2,
          pattern: /^\S+@\S+$/i,
        })}
        name="email"
        type="text"
      />
      {errors.email ? (
        <Text>Este campo es obligatorio y debe tener al menos 2 caracteres</Text>
      ) : null}
      <FormLabel>Password</FormLabel>
      <Input
        {...register('password', {
          required: true,
          minLength: 2,
        })}
        name="password"
        type="text"
      />
      {errors.password ? (
        <Text>Este campo es obligatorio y debe tener al menos 2 caracteres</Text>
      ) : null}
      <FormLabel>Avatar</FormLabel>
      <Input
        {...register('avatar', {
          required: false,
        })}
        name="avatar"
        type="file"
      />
      {errors.avatar ? (
        <Text>Este campo es obligatorio y debe tener al menos 2 caracteres</Text>
      ) : null}

      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Register;
