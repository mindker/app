import { FormLabel } from '@chakra-ui/react';
import { Input, Text, Flex } from '@chakra-ui/react';
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
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../../context/GlobalContext';
import { RegisterUser } from '../../services/APIservice.js';
import AgnosticButton from '../AgnosticButton/AgnosticButton';

const Register = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState('');
  const { setLocal } = useContext(GlobalContext);
  const [nicknameDuplicatedError, setNicknameDuplicatedError] = useState(false);
  const [emailDuplicatedError, setEmailDuplicatedError] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (values) => {
    try {
      values = { ...values, avatar: avatar };
      RegisterUser(values).then((res) => {
        setLocal(JSON.stringify(res.data.info.data));
        res && navigate('/dashboard');
      });
    } catch (error) {
      console.log(error);
      if (error.response.data.info.message == 'nickname already exist') {
        setNicknameDuplicatedError(true);
      }
      if (error.response.data.info.message == 'email already exist') {
        setEmailDuplicatedError(true);
      }
      if (error.response.data.info.message == 'nickname and email already exist') {
        setErrorsInTrue();
      }
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const setErrorsInFalse = () => {
    setNicknameDuplicatedError(false);
    setEmailDuplicatedError(false);
  };

  const setErrorsInTrue = () => {
    setNicknameDuplicatedError(true);
    setEmailDuplicatedError(true);
  };

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        text="Register"
        type="button"
        color="#5f1590"
        bg="white"
        size="sm"
        borderRadius="1.5rem"
        w="5rem"
        _hover={{ bg: '#af63dd', color: 'white' }}
      >
        Register
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent bg="#5f1590" color="white">
          <DrawerCloseButton />
          <DrawerHeader fontSize="2xl">Create your account</DrawerHeader>
          <DrawerBody>
            <Stack spacing="40px">
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <FormLabel fontSize="lg">Name</FormLabel>
                <Input
                  {...register('name', {
                    required: true,
                  })}
                  name="name"
                  type="text"
                  bg="white"
                  color="#5f1590"
                />
                {errors.name ? (
                  <Text color="white" fontSize="xs" letterSpacing="1.1px">
                    This field is required
                  </Text>
                ) : null}
                <FormLabel paddingTop="0.6rem">Nickname</FormLabel>
                <Input
                  {...register('nickname', {
                    required: true,
                  })}
                  name="nickname"
                  type="text"
                  bg="white"
                  color="#5f1590"
                />
                {nicknameDuplicatedError ? (
                  <Text color="white" fontSize="xs" letterSpacing="1.1px">
                    This nickname already exist
                  </Text>
                ) : errors.nickname ? (
                  <Text color="white" fontSize="xs" letterSpacing="1.1px">
                    This field is required
                  </Text>
                ) : null}
                <FormLabel paddingTop="0.6rem">Email</FormLabel>
                <Input
                  {...register('email', {
                    required: true,
                    minLength: 2,
                    pattern: /^\S+@\S+$/i,
                  })}
                  name="email"
                  type="text"
                  bg="white"
                  color="#5f1590"
                />
                {emailDuplicatedError ? (
                  <Text color="white" fontSize="xs" letterSpacing="1.1px">
                    This email already exist
                  </Text>
                ) : errors.email ? (
                  <Text color="white" fontSize="xs" letterSpacing="1.1px">
                    This field is required
                  </Text>
                ) : null}
                <FormLabel paddingTop="0.6rem">Password</FormLabel>
                <InputGroup>
                  <Input
                    {...register('password', {
                      required: true,
                    })}
                    name="password"
                    type={show ? 'text' : 'password'}
                    bg="white"
                    color="#5f1590"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      color="white"
                      borderRadius="1rem"
                      onClick={handleClick}
                      bg="#af63dd"
                      _hover={{ bg: '#5f1590', color: 'white' }}
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password ? (
                  <Text color="white" fontSize="xs" letterSpacing="1.1px">
                    This field is required
                  </Text>
                ) : null}
                <FormLabel paddingTop="0.6rem">Avatar</FormLabel>
                <label htmlFor="images" className="drop-container">
                  <span className="drop-title">Drop files here or</span>
                  <input
                    {...register('avatar', {
                      required: false,
                    })}
                    name="avatar"
                    type="file"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    accept="image/*"
                    className="input"
                  />
                </label>
                <AgnosticButton
                  text="Register"
                  type="submit"
                  bg="#af63dd"
                  color="white"
                  size="md"
                  borderRadius="1.5rem"
                  w="6rem"
                  _hover={{ bg: 'white', color: '#5f1590' }}
                  callBack={() => setErrorsInFalse()}
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
