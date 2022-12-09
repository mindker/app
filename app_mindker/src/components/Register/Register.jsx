import { FormLabel } from '@chakra-ui/react';
import { Input, Text } from '@chakra-ui/react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  InputGroup,
  InputRightElement,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillContacts } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../../context/GlobalContext';
import { loginUser, RegisterUser } from '../../services/postsFunctionsApiUser.js';
import AgnosticButton from '../AgnosticButton/AgnosticButton';

const Register = () => {
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        text="Register"
        type="button"
        variant="outline"
        leftIcon={<AiFillContacts />}
        colorScheme="yellow"
        size="lg"
      >
        Register
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>
          <DrawerBody>
            <Stack spacing="40px">
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <FormLabel>Name</FormLabel>
                <Input
                  {...register('name', {
                    required: true,
                  })}
                  name="name"
                  type="text"
                />
                {errors.name ? <Text color="red">This field is required</Text> : null}
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
                {errors.nickname ? <Text color="red">This field is required</Text> : null}
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
                  <Text color="red">Please enter a correct email</Text>
                ) : null}
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    {...register('password', {
                      required: true,
                      minLength: 2,
                    })}
                    name="password"
                    type={show ? 'text' : 'password'}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password ? <Text color="red">This field is required</Text> : null}
                <FormLabel>Avatar</FormLabel>
                <Input
                  {...register('avatar', {
                    required: false,
                  })}
                  name="avatar"
                  type="file"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  accept="image/*"
                  mb="1rem"
                />

                <AgnosticButton
                  text="Register"
                  type="submit"
                  variant="outline"
                  colorScheme="facebook"
                  leftIcon={<AiFillContacts />}
                />
              </form>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Register;
