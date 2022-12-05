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
import { loginUser } from '../../services/postsFunctionsApiUser.js';

import { RegisterUser } from '../../services/postsFunctionsApiUser.js';
import { useLocalStorage } from '../../custom/useLocalStorage';

const Register = () => {
  /* const [newUser, setNewUser] = useState({}); */
  //const handleInputChange = (e) => setInput(e.target.value);
  //const isError = input === '';
  const [user, setUser] = useState('user');
  const [local, setLocal] = useLocalStorage(user);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (values) => {
    (async () => {
      await RegisterUser(values);
      const res = await loginUser('login', {
        nickname: values.nickname,
        password: values.password,
      });
      await setLocal(res);
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
        <Text>This field is required and should have at least 2 characters</Text>
      ) : null}
      <FormLabel>Nickname</FormLabel>
      <Input
        {...register('nickname', {
          required: true,
          minLength: 2,
        })}
        onChange={(e) => setUser(e.target.value)}
        name="nickname"
        type="text"
      />
      {errors.nickname ? <Text>This field is required</Text> : null}
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
      {errors.email ? <Text>This field is required</Text> : null}
      <FormLabel>Password</FormLabel>
      <Input
        {...register('password', {
          required: true,
          minLength: 2,
        })}
        name="password"
        type="text"
      />
      {errors.password ? <Text>This field is required</Text> : null}
      <FormLabel>Avatar</FormLabel>
      <Input
        {...register('avatar', {
          required: false,
        })}
        name="avatar"
        type="file"
      />
      {errors.avatar ? <Text>Este campo es obligatorio</Text> : null}
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Register;
