import { DrawerBody, FormControl, FormLabel } from '@chakra-ui/react';
import { Input, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillContacts } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../../context/GlobalContext';
import { loginUser, RegisterUser } from '../../services/postsFunctionsApiUser.js';
import AgnosticButton from '../AgnosticButton/AgnosticButton';
import {
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Drawer } from '@chakra-ui/react';

const Register2 = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState('');
  const { setLocal, setUser } = useContext(GlobalContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (values) => {
    (async () => {
      values = { ...values, avatar: avatar };
      await RegisterUser(values);
      setTimeout(() => {
        loginUser('login', {
          nickname: values.nickname,
          password: values.password,
        }).then((res) => {
          setUser(res.info.data.user);
          setLocal(res.info.data.token);
          res && navigate('dashboard');
        });
      }, 1500);
    })();
  };

  const { isOpen, onClose } = useDisclosure();
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Drawer isOpen={isOpen} on onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <FormControl>
              <FormLabel>name</FormLabel>

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
            </FormControl>

            <FormControl>
              <FormLabel>nickname</FormLabel>

              <Input
                {...register('nickname', {
                  required: true,
                  minLength: 2,
                })}
                onChange={(e) => setUser(e.target.value)}
                name="nickname"
                type="text"
              />
            </FormControl>
            {errors.nickname ? <Text>This field is required</Text> : null}

            <FormControl>
              <FormLabel>email</FormLabel>
              <Input
                {...register('email', {
                  required: true,
                  minLength: 2,
                  pattern: /^\S+@\S+$/i,
                })}
                name="email"
                type="text"
              />
            </FormControl>
            {errors.email ? <Text>This field is required</Text> : null}
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                {...register('password', {
                  required: true,
                  minLength: 2,
                })}
                name="password"
                type="text"
              />
            </FormControl>
            {errors.password ? <Text>This field is required</Text> : null}
            <FormControl>
              <FormLabel>Avatar</FormLabel>
              <Input
                {...register('avatar', {
                  required: false,
                })}
                name="avatar"
                type="file"
                onChange={(e) => setAvatar(e.target.files[0])}
                accept="image/*"
              />
            </FormControl>
            {errors.avatar ? <Text>Este campo es obligatorio</Text> : null}

            <AgnosticButton
              text="Register"
              type="submit"
              variant="outline"
              colorScheme="facebook"
              leftIcon={<AiFillContacts />}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </form>
  );
};

export default Register2;
