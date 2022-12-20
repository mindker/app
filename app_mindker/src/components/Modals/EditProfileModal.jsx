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
  Avatar,
} from '@chakra-ui/react';
import { FormLabel } from '@chakra-ui/react';
import { Input, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from '@chakra-ui/react';
import GlobalContext from '../../context/GlobalContext';
import { loginUser, patchAgnostic } from '../../services/APIService';
import AgnosticButton from '../AgnosticButton/AgnosticButton';

const EditProfileModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [avatar, setAvatar] = useState('');
  const { user, switcher, setSwitcher, setUser, setLocal } = useContext(GlobalContext);
  const [show, setShow] = React.useState(false);
  const [isLargerThan610] = useMediaQuery('(min-width: 610px)');
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
          setShow(false);
          toast({
            title: 'Changes saved',
            description: 'Profile successfully updated',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
        });
      }, 2000);
    })();
  };

  return (
    <>
      {isLargerThan610 ? (
        <AgnosticButton
          leftIcon="⚙"
          callBack={onOpen}
          variant="outline"
          color="black"
          border="1px white"
          _hover={{ bg: 'white', color: '#5f1590' }}
          borderRadius="1rem"
        />
      ) : (
        <AgnosticButton
          callBack={onOpen}
          bgImage={user.avatar}
          bgSize="cover"
          size="lg"
          borderRadius="1.5rem"
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <FormLabel fontWeight="bold" color="#5f1590">
                Name
              </FormLabel>
              <Input
                {...register('name', {
                  required: true,
                })}
                name="name"
                type="text"
                defaultValue={user.name}
                color="#5f1590"
              />
              {errors.name ? (
                <Text color="black" fontSize="sm">
                  This field is required
                </Text>
              ) : null}
              <FormLabel fontWeight="bold" color="#5f1590">
                Nickname
              </FormLabel>
              <Input
                {...register('nickname', {
                  required: true,
                })}
                name="nickname"
                type="text"
                defaultValue={user.nickname}
                color="#5f1590"
              />
              {errors.nickname ? (
                <Text color="black" fontSize="sm">
                  This field is required
                </Text>
              ) : null}
              <FormLabel fontWeight="bold" color="#5f1590">
                Email
              </FormLabel>
              <Input
                {...register('email', {
                  required: true,
                  minLength: 2,
                  pattern: /^\S+@\S+$/i,
                })}
                name="email"
                type="text"
                defaultValue={user.email}
                color="#5f1590"
              />
              {errors.email ? (
                <Text color="black" fontSize="sm">
                  This field is required
                </Text>
              ) : null}
              <FormLabel fontWeight="bold" color="#5f1590">
                Password
              </FormLabel>
              <InputGroup mb="1rem">
                <Input
                  {...register('password', {
                    required: true,
                  })}
                  name="password"
                  type={show ? 'text' : 'password'}
                  color="#5f1590"
                  placeholder="********"
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
                <Text color="black" fontSize="sm">
                  This field is required
                </Text>
              ) : null}
              <FormLabel fontWeight="bold" color="#5f1590">
                Avatar
              </FormLabel>
              <Flex display="flex" justifyContent="center">
                <label htmlFor="images" className={'drop-container newDeckFile'}>
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
              </Flex>
              <Flex justifyContent="space-around" margin=".5rem">
                <AgnosticButton
                  type="submit"
                  text="Edit"
                  bg="#5f1590"
                  color="white"
                  size="md"
                  borderRadius="1.5rem"
                  width="4.5rem"
                  _hover={{ bg: '#af63dd', color: 'ehite' }}
                />
                <AgnosticButton
                  callBack={onClose}
                  text="Close"
                  bg="#5f1590"
                  color="white"
                  size="md"
                  borderRadius="1.5rem"
                  width="4.5rem"
                  _hover={{ bg: '#af63dd', color: 'white' }}
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
