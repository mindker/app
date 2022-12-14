import { FormLabel, Input, Text } from '@chakra-ui/react';
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
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillContacts } from 'react-icons/ai';
import { AiFillApi } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../../context/GlobalContext';
import { loginUser } from '../../services/APIservice';
import AgnosticButton from '../AgnosticButton/AgnosticButton';

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setLocal } = useContext(GlobalContext);
  const [passwordError, setPasswordError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (values) => {
    (async () => {
      try {
        const res = await loginUser('login', values);
        await setUser(res.info.data.user);
        await setLocal(res.info.data.token);
        navigate('dashboard');
      } catch (error) {
        console.log(error);
        if (error.response.data.info.message == 'Incorrect Password') {
          setPasswordError(true);
        }
        if (error.response.data.info.message == 'Incorrect Nickname') {
          setNicknameError(true);
        }
      }
    })();
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const setErrorsInFalse = () => {
    setPasswordError(false);
    setNicknameError(false);
  };

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        text="Login"
        type="button"
        variant="outline"
        leftIcon={<AiFillContacts />}
        colorScheme="facebook"
        size="lg"
      >
        Login
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Login</DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <FormLabel>Nickname</FormLabel>
              <Input
                {...register('nickname', {
                  required: true,
                })}
                type="text"
              />
              {/*  {errors.nickname ? <Text color="red">This field is required</Text> : null} */}
              {nicknameError ? (
                <Text color="red">This nickname does not exist</Text>
              ) : errors.nickname ? (
                <Text color="red">This field is required</Text>
              ) : null}
              <FormLabel>Password</FormLabel>
              <InputGroup mb="1rem">
                <Input
                  {...register('password', {
                    required: true,
                    validate: {
                      format: (password) => {
                        return /[a-zA-Z]/g.test(password);
                      },
                    },
                  })}
                  type={show ? 'text' : 'password'}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {passwordError ? (
                <Text color="red">Incorrect password</Text>
              ) : errors.password ? (
                <Text color="red">This field is required</Text>
              ) : null}
              <AgnosticButton
                text="Login"
                type="submit"
                variant="outline"
                leftIcon={<AiFillApi />}
                colorScheme="facebook"
                callBack={() => setErrorsInFalse()}
              />
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default Login;
