import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import GlobalContext from '../../context/GlobalContext';
import { CreateAgnosticItem, patchAgnostic } from '../../services/APIservice';

const CreateDeck = () => {
  const { user, setDashboardContent, setDeck } = useContext(GlobalContext);
  const [image, setDeckImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const toast = useToast();

  const isErrorTitle = title === '';
  const isErrorDescription = description === '';

  const onFormSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const values = { title: title, description: description, image: image };
        const token = window.localStorage.getItem('user');
        CreateAgnosticItem('decks', values, token).then((res) => {
          user.decks.push(res);
          setDeck(res);
          patchAgnostic(user._id, 'users', token, user);
        });
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <>
      <Flex>
        <FormControl>
          <form>
            <FormLabel>Title</FormLabel>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              type="text"
            ></Input>
            {isErrorTitle ? <Text color="red">This field is required</Text> : null}
            <FormLabel>Description</FormLabel>
            <Input
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              type="text"
            ></Input>
            {isErrorDescription ? <Text color="red">This field is required</Text> : null}
            <FormLabel>Image</FormLabel>
            <Input
              name="image"
              type="file"
              onChange={(e) => setDeckImage(e.target.files[0])}
              accept="image/*"
            />
            <Flex justifyContent="space-around" mt="3rem">
              <AgnosticButton
                text="Add cards"
                type="button"
                callBack={(e) => {
                  onFormSubmit(e);
                  toast({
                    title: 'Deck created.',
                    description: 'Now you can add some cards to it',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                  });
                  navigate('/createCard');
                }}
                variant="outline"
                colorScheme="twitter"
              />
              <AgnosticButton
                text="Save deck"
                type="button"
                callBack={(e) => {
                  onFormSubmit(e);
                  toast({
                    title: 'Deck created.',
                    description: 'FUCKOFFFF BITCH, SUCK MY DICK',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                  });
                  setDashboardContent(false);
                  navigate('/dashboard');
                }}
                variant="outline"
                colorScheme="twitter"
              />
            </Flex>
          </form>
        </FormControl>
      </Flex>
    </>
  );
};

export default CreateDeck;
