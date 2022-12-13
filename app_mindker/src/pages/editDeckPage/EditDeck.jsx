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
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import GlobalContext from '../../context/GlobalContext';
import { getAgnostic } from '../../services/APIservice.js';

const EditDeck = () => {
  const { idDeck, user } = useContext(GlobalContext);
  const [deckInEdition, setDeckInEdition] = useState();
  const [deckImage, setDeckImage] = useState();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getDeck = async () => {
      const data = await fetch(`http://localhost:8080/api/v1/decks/${idDeck}`);
      const res = await data.json();
      setDeckInEdition(res.info.data);
    };
    getDeck();
  }, []);

  console.log('deckinedition: ', deckInEdition);

  const onFormSubmit = (values) => {
    (async () => {
      try {
        values = { ...values, image: deckImage, author: user._id };
        console.log('Los values nuevos a enviar en el patcheo: ', values);
      } catch (error) {
        console.log(error);
      }
    })();
  };

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
              value={deckInEdition ? deckInEdition.title : ''}
            ></Input>
            {errors.title ? <Text color="red">This field is required</Text> : null}
            <FormLabel>Description</FormLabel>
            <Input
              {...register('description', {
                required: true,
              })}
              name="description"
              type="text"
              value={deckInEdition ? deckInEdition.description : ''}
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
              value={deckInEdition ? deckInEdition.isOpen : ''}
            >
              <option value="true">Public</option>
              <option value="false">Private</option>
            </Select>
            {errors.isOpen ? <Text color="red">This field is required</Text> : null}
            <FormHelperText>
              Warning! If you choose Public you cannot edit the deck later as it belongs
              to the community
            </FormHelperText>
            <AgnosticButton type="submit" text="Save changes" />
            <AgnosticButton text="Edit cards" />
          </form>
        </FormControl>
      </Flex>
    </>
  );
};

export default EditDeck;
