import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import { Flex, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import GlobalContext from '../../context/GlobalContext';
import { CreateAgnosticItem, patchAgnostic } from '../../services/APIservice';

const CreateDeck = () => {
  const { user, setDeck } = useContext(GlobalContext);
  const [image, setDeckImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const token = window.localStorage.getItem('user');

  const toast = useToast();

  const isErrorTitle = title === '';
  const isErrorDescription = description === '';

  const onFormSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const values = { title: title, description: description, image: image };
        if (values.title !== '' && values.description !== '') {
          CreateAgnosticItem('decks', values, token).then((res) => {
            user.decks.push(res);
            setDeck(res);
            patchAgnostic(user._id, 'users', token, user);
            navigate('/createCard');
            toast({
              title: 'Deck created.',
              description: 'Now you can add some cards',
              status: 'success',
              duration: 4000,
              isClosable: true,
            });
          });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <Flex bg="#5f1590" w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Flex alignItems="center" justifyContent="center" display="flex">
        <FormControl bg="white" padding="25px" borderRadius="20px">
          <form>
            <Text fontSize="4xl" as="b">
              New deck
            </Text>
            <FormLabel as="b" marginTop="30px">
              Deck title*
            </FormLabel>
            <Input
              bg="white"
              textColor="black"
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              type="text"
              placeholder="Add a title for your deck"
              borderRadius="10px"
            ></Input>
            {isErrorTitle ? <Text color="black">This field is required</Text> : null}
            <FormLabel as="b" marginTop="25px">
              Description
            </FormLabel>
            <Input
              bg="white"
              textColor="black"
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              type="text"
              placeholder="Include a description"
              h="120px"
              borderRadius="10px"
            ></Input>
            {isErrorDescription ? (
              <Text color="black">This field is required</Text>
            ) : null}
            <FormLabel as="b" marginTop="20px">
              Add a background photo
            </FormLabel>
            <Input
              textColor="black"
              name="image"
              type="file"
              onChange={(e) => setDeckImage(e.target.files[0])}
              accept="image/*"
              placeholder="Upload background image"
              borderRadius="15px"
            />
            <Flex gap="2rem" mt="3rem" justifyContent="center">
              <AgnosticButton
                _hover={{ bg: '#5f1590', color: 'white' }}
                text="Add cards"
                type="button"
                color="white"
                borderRadius="20px"
                bg="#af63dd"
                callBack={(e) => {
                  onFormSubmit(e);
                }}
                variant="outline"
                colorScheme="twitter"
              />
            </Flex>
          </form>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default CreateDeck;
