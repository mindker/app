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

/* import { useNavigate } from 'react-router-dom'; */
import GlobalContext from '../../context/GlobalContext';
import { loginUser, patchUser } from '../../services/APIService';
import AgnosticButton from '../AgnosticButton/AgnosticButton';

const EditProfileModal = () => {
  /* const navigate = useNavigate(); */
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [avatar, setAvatar] = useState('');
  const { user, switcher, setSwitcher, setUser, setLocal } = useContext(GlobalContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (values) => {
    (async () => {
      const token = localStorage.getItem(user.nickname);
      values = {
        ...values,
        avatar: avatar,
      };
      console.log(values);
      await patchUser(user._id, token, values);
      setTimeout(() => {
        loginUser('login', {
          nickname: values.nickname,
          password: values.password,
        }).then((res) => {
          setUser(res.info.data.user);
          setLocal(res.info.data.token);
          setSwitcher(!switcher);
        });
      }, 1000);
    })();
  };

  return (
    <>
      <AgnosticButton leftIcon="⚙" callBack={onOpen} variant="outline" />

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
                defaultValue={user.name}
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
                defaultValue={user.nickname}
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
                defaultValue={user.email}
              />
              {errors.email ? <Text>This field is required</Text> : null}
              <FormLabel>Password</FormLabel>
              <Input
                {...register('password', {
                  minLength: 2,
                  required: true,
                })}
                name="password"
                type="password"
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
