/* import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';

const ModalRegister = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <section>
      <Button variantColor="orange" onClick={onOpen}>
        Register
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder="tu nombre" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Nickname</FormLabel>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>password</FormLabel>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>email</FormLabel>
            </FormControl>
            <FormControl mt={4}>
              <Button variantColor="orange">Avatar</Button>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default ModalRegister; */
