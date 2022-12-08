import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { FormLabel } from '@chakra-ui/react';
import { Input, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import GlobalContext from '../../context/GlobalContext';
import { patchUser } from '../../services/patchService';
import AgnosticButton from '../AgnosticButton/AgnosticButton';

const EditProfileModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [avatar, setAvatar] = useState('');
  const { setUser, user, setSwitcher, switcher } = useContext(GlobalContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (values) => {
    (async () => {
      const token = localStorage.getItem(user.nickname);
      values = { ...values, avatar: avatar };
      await patchUser(user._id, token, values);
      await setSwitcher(!switcher);
    })();
  };
  return (
    <>
      <AgnosticButton leftIcon="⚙" callBack={onOpen} />

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
                  required: false,
                  minLength: 2,
                })}
                name="name"
                type="text"
              />
              {errors.name ? (
                <Text>This field should have at least 2 characters</Text>
              ) : null}
              <FormLabel>Nickname</FormLabel>
              <Input
                {...register('nickname', {
                  required: false,
                  minLength: 2,
                })}
                name="nickname"
                type="text"
              />
              {errors.nickname ? (
                <Text>This field should have at least 2 characters</Text>
              ) : null}
              <FormLabel>Email</FormLabel>
              <Input
                {...register('email', {
                  required: false,
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
              <Flex justifyContent="space-around" margin=".5rem">
                <AgnosticButton
                  colorScheme="facebook"
                  variant="outline"
                  callBack={onClose}
                  text="Close"
                />
                <AgnosticButton
                  colorScheme="facebook"
                  variant="outline"
                  type="submit"
                  callBack={onClose}
                  text="Edit"
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
