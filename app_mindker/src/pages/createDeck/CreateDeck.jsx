import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import GlobalContext from '../../context/GlobalContext';
import { CreateNewDeck } from '../../services/APIservice';

const CreateDeck = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const { user, local } = useContext(GlobalContext);
  const [image, setDeckImage] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAnswer = (e) => {
    e.preventDefault();
    setAnswer(e.target.value);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (values) => {
    (async () => {
      try {
        values = { ...values, image: image, author: user._id };
        const newDeck = await CreateNewDeck(values, local);
        console.log(newDeck);
        onOpen();
        return newDeck;
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <>
      <Flex>
        <FormControl>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <FormLabel>Title</FormLabel>
            <Input
              {...register('title', {
                required: true,
              })}
              name="title"
              type="text"
            ></Input>
            {errors.title ? <Text color="red">This field is required</Text> : null}
            <FormLabel>Description</FormLabel>
            <Input
              {...register('description', {
                required: true,
              })}
              name="description"
              type="text"
            ></Input>
            {errors.description ? <Text color="red">This field is required</Text> : null}
            <FormLabel>image</FormLabel>
            <Input
              {...register('image', {
                required: false,
              })}
              name="image"
              type="file"
              onChange={(e) => setDeckImage(e.target.files[0])}
              accept="image/*"
            />
            <FormLabel>tags</FormLabel>
            <Input
              name="tags"
              type="text"
              {...register('tags', {
                required: false,
              })}
            />
            <FormLabel>State</FormLabel>
            <Input
              {...register('isOpen', {
                required: true,
              })}
              name="isOpen"
              type="text"
            ></Input>
            {errors.isOpen ? <Text color="red">This field is required</Text> : null}
            <FormHelperText>
              advertencia: se tiene que escoger entre publico o privado
            </FormHelperText>
            <AgnosticButton text="Save deck" />
            <AgnosticButton type="submit" text="Add cards" />
          </form>
        </FormControl>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl onSubmit={handleSubmit}>
              <FormLabel>Insert the question *</FormLabel>
              <Textarea
                placeholder="Type the question in here"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <FormLabel>You can add a picture for this question if you wish</FormLabel>
              <Input type="file" />
              <FormLabel>Type the answer *</FormLabel>
              <Textarea
                placeholder="Type the answer in here"
                value={answer}
                onChange={handleAnswer}
              />
              <Button mt={4} type="submit">
                Save & Next
              </Button>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateDeck;
