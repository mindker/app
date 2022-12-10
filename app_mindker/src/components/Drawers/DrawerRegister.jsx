import { FormLabel } from '@chakra-ui/react';
import { Input, Text } from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AiFillContacts } from 'react-icons/ai';

import AgnosticButton from '../AgnosticButton/AgnosticButton';
const DrawerRegister = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <section>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>
          <DrawerBody>
            
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
                onChange={(e) => setAvatar(e.target.files[0])}
                accept="image/*"
              />
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
    </section>
  );
};

export default DrawerRegister;
