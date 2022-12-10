import React, { useContext, useState } from 'react';
import {
  Button,
  Modal,
  FormControl,
  FormLabel,
  Textarea,
  Flex,
  FormHelperText,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import { CreateNewDeck } from '../../services/APIservice';
import GlobalContext from '../../context/GlobalContext';
const CreateDeck = () => {
  const [show, setShow] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const { user } = useContext(GlobalContext);
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
    async () => {
      try {
        values = { ...values, image: image, author: user._id };
        const res = await CreateNewDeck(values);
       console.log(res)
      } catch (error) {}
    };
  };

  return (
    <>
      <Flex>
        <FormControl onSubmit={handleSubmit}>
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
          <Input name="tags" type="text"
          {...register('tags', {
            required: false,
          })}
          />
          <FormLabel>State</FormLabel>
          <Input
            {...register('state', {
              required: true,
            })}
            name="state"
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
          <Button mt={4} variantColor="teal" type="submit">
            Guardar
          </Button>
        </FormControl>
      </Modal>
    </>
  );
};

export default CreateDeck;
