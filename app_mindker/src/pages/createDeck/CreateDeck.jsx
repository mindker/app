import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import GlobalContext from '../../context/GlobalContext';
import { CreateNewDeck } from '../../services/APIservice';

const CreateDeck = () => {
  const [show, setShow] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const { user, local } = useContext(GlobalContext);
  const [image, setDeckImage] = useState('');
  /* const handleSubmit = (e) => {
    e.preventDefault();
  }; */

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
        console.log('submitting');
        values = { ...values, image: image, author: user._id };
        const newDeck = await CreateNewDeck(values, local);
        console.log(newDeck._id);
        return newDeck;
      } catch (error) {
        console.log('el hipotetico error');
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
            ></Input>

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
            {errors.state ? <Text color="red">This field is required</Text> : null}
            <FormHelperText>
              advertencia: se tiene que escoger entre publico o privado
            </FormHelperText>
            <AgnosticButton text="Guardar" />
            <Button onClick={() => setShow(true)} type="submit">
              Crear pregunta
            </Button>
          </form>
        </FormControl>
      </Flex>

      <Modal isOpen={show} onClose={() => setShow(false)}>
        <FormControl onSubmit={handleSubmit}>
          <FormLabel>Crea tu pregunta</FormLabel>
          <Textarea
            placeholder="Escribe tu pregunta aqui"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <FormLabel>Escribe la respuesta</FormLabel>
          <Textarea
            placeholder="Escribe tu respuesta aqui"
            value={answer}
            onChange={handleAnswer}
          />
          <Button mt={4} type="submit">
            Guardar
          </Button>
        </FormControl>
      </Modal>
    </>
  );
};

export default CreateDeck;
