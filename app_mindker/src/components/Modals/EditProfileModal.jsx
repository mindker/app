import {
  Button,
  Flex,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FormLabel } from '@chakra-ui/react';
import { Input, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import GlobalContext from '../../context/GlobalContext';
import { loginUser, patchAgnostic } from '../../services/APIService';
import AgnosticButton from '../AgnosticButton/AgnosticButton';

const EditProfileModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [avatar, setAvatar] = useState('');
  const { user, switcher, setSwitcher, setUser, setLocal } = useContext(GlobalContext);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (values) => {
    (async () => {
      const token = localStorage.getItem('user');
      values = {
        ...user,
        ...values,
        avatar: avatar,
      };
      await patchAgnostic(user._id, 'users', token, values);
      setTimeout(() => {
        loginUser('login', {
          nickname: values.nickname,
          password: values.password,
        }).then((res) => {
          setUser(res.info.data.user);
          setLocal(res.info.data.token);
          setSwitcher(!switcher);
          onClose();
          toast({
            title: 'profile updated.',
            description: 'updated succesfull.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        });
      }, 2000);
    })();
  };

  return (
    <>
      <AgnosticButton
        leftIcon="⚙"
        callBack={onOpen}
        variant="outline"
        color="black"
        border="1px white"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <FormLabel>Name</FormLabel>
              <Input
                {...register('name', {
                  required: true,
                })}
                name="name"
                type="text"
                defaultValue={user.name}
              />
              {errors.name ? (
                <Text>This field should have at least 2 characters</Text>
              ) : null}
              <FormLabel>Nickname</FormLabel>
              <Input
                {...register('nickname', {
                  required: true,
                })}
                name="nickname"
                type="text"
                defaultValue={user.nickname}
              />
              {errors.nickname ? (
                <Text>This field should have at least 2 characters</Text>
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
                defaultValue={user.email}
              />
              {errors.email ? <Text>This field is required</Text> : null}
              <FormLabel>Password</FormLabel>
              <InputGroup mb="1rem">
                <Input
                  {...register('password', {
                    required: true,
                  })}
                  name="password"
                  type={show ? 'text' : 'password'}
                  color="#5f1590"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
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
              <Flex justifyContent="space-around" margin=".5rem">
                <AgnosticButton
                  colorScheme="facebook"
                  variant="outline"
                  type="submit"
                  text="Edit"
                />
                <AgnosticButton
                  colorScheme="facebook"
                  variant="outline"
                  callBack={onClose}
                  text="Close"
                />
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
