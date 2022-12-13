import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import GlobalContext from '../../context/GlobalContext';
import { CreateAgnosticItem } from '../../services/APIservice';

const CreateDeck = () => {
  const [question, setQuestion] = useState('');
  const [imageQuestion, setImageQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [newDeckID, setNewDeckID] = useState('');

  const { user, local } = useContext(GlobalContext);
  const [image, setDeckImage] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (values) => {
    (async () => {
      try {
        values = { ...values, image: image, author: user._id };
        const newDeck = await CreateAgnosticItem('decks', values, local);
        console.log(newDeck);
        setNewDeckID(newDeck._id);
        onOpen();
        return newDeck;
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const clearDeckForm = () => {
    document.getElementById('deckForm').reset();
  };

  const onFormSubmitCard = () => {
    const newCardToPost = {
      question: question,
      questionFile: imageQuestion,
      answer: answer,
      idDeck: newDeckID,
    };
    (async () => {
      try {
        const newCardCreated = await CreateAgnosticItem('cards', newCardToPost, local);

        console.log(newCardCreated);
        setAnswer('');
        setQuestion('');
        return newCardCreated;
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const isErrorQ = question === '';
  const isErrorA = answer === '';
  const toast = useToast();
  return (
    <>
      <Flex>
        <FormControl>
          <form onSubmit={handleSubmit(onFormSubmit)} id="deckForm">
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
            <FormLabel>Image</FormLabel>
            <Input
              {...register('image', {
                required: false,
              })}
              name="image"
              type="file"
              onChange={(e) => setDeckImage(e.target.files[0])}
              accept="image/*"
            />
            <FormLabel>State</FormLabel>
            <Select
              {...register('isOpen', {
                required: true,
              })}
              name="isOpen"
              type="text"
            >
              <option value="true">Public</option>
              <option value="false">Private</option>
            </Select>
            {errors.isOpen ? <Text color="red">This field is required</Text> : null}
            <FormHelperText>
              Warning! If you choose Public you cannot edit the deck later as it belongs
              to the community
            </FormHelperText>
            <AgnosticButton type="submit" text="Add cards" />
          </form>
        </FormControl>
      </Flex>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new card</ModalHeader>
          <ModalBody>
            <FormControl>
              <form id="cardForm" onSubmit={handleSubmit(onFormSubmitCard)}>
                <FormLabel>Insert the question *</FormLabel>
                <Textarea
                  placeholder="Type the question in here"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  isRequired={true}
                />
                {isErrorQ ? <Text color="red">This field is required</Text> : null}
                <FormLabel>You can add a picture for this question if you wish</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageQuestion(e.target.files[0])}
                />
                <FormLabel>Type the answer *</FormLabel>
                <Textarea
                  placeholder="Type the answer in here"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                {isErrorA ? <Text color="red">This field is required</Text> : null}
                <AgnosticButton
                  text="Save and Next"
                  type="submit"
                  callBack={() => {
                    toast({
                      title: 'Card created.',
                      description: "We've created your card for you.",
                      status: 'success',
                      duration: 9000,
                      isClosable: true,
                    });
                  }}
                />
                <AgnosticButton
                  text="Finish deck"
                  callBack={() => {
                    onClose();
                    clearDeckForm();
                    toast({
                      title: 'Deck created.',
                      description: "We've created your deck for you.",
                      status: 'success',
                      duration: 9000,
                      isClosable: true,
                    });
                  }}
                />
              </form>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateDeck;
