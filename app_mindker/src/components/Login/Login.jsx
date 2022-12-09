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
import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillContacts } from 'react-icons/ai';
import { AiFillApi } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../../context/GlobalContext';
import { loginUser } from '../../services/postsFunctionsApiUser';
import AgnosticButton from '../AgnosticButton/AgnosticButton';

const Login = () => {
  const navigate = useNavigate();
  const { setNickname, setUser, setLocal } = useContext(GlobalContext);
  const [passwordError, setPasswordError] = useState(false);
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
        if (error.response.data.info.message == 'Incorrect password') {
          setPasswordError(true);
        }
      }
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
                  minLength: 2,
                })}
                onChange={(e) => setNickname(e.target.value)}
                type="text"
              />

              {errors.nickname ? <Text color="red">This field is required</Text> : null}

              <FormLabel>Password</FormLabel>

              <InputGroup>
                <Input
                  {...register('password', {
                    required: true,

                    validate: {
                      format: (password) => {
                        return /[a-z]/g.test(password) && /[0-9]/g.test(password);
                      },
                    },
                  })}
                  type={show ? 'text' : 'password'}
                  mb="1rem"
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
                callBack={() => setPasswordError(false)}
              />
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default Login;
