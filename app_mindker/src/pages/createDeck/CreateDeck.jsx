/* import { AddIcon, CheckIcon } from '@chakra-ui/icons'; */
import { Flex, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import GlobalContext from '../../context/GlobalContext';
import { CreateAgnosticItem, patchAgnostic } from '../../services/APIservice';

const CreateDeck = () => {
  const { local, setLocal, setDeck } = useContext(GlobalContext);
  const [deckImage, setDeckImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const toast = useToast();

  const isErrorTitle = title === '';
  const isErrorDescription = description === '';

  let userParsed;
  if (typeof local == 'string') {
    userParsed = JSON.parse(local);
  } else {
    userParsed = local;
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    const values = { title: title, description: description, image: deckImage };
    (async () => {
      try {
        if (values.title !== '' && values.description !== '') {
          CreateAgnosticItem(
            'decks',
            values,
            JSON.parse(JSON.stringify(userParsed.token)),
          ).then((res) => {
            localStorage.setItem('deck', res);
            userParsed.user.decks.push(res);
            setDeck(res);
            patchAgnostic(
              userParsed.user._id,
              'users',
              userParsed.token,
              userParsed.user,
            );
            setLocal(JSON.stringify({ ...userParsed }));
            navigate('/createCard');
            toast({
              title: 'Deck created',
              description: 'Now you can add some cards',
              status: 'success',
              duration: 4000,
              isClosable: true,
            });
          });
        } else {
          toast({
            title: 'Fill in the required fields',
            status: 'error',
            duration: 4000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <Flex
      bg="#5f1590"
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <Flex alignItems="center" justifyContent="center" display="flex">
        <FormControl
          bg="white"
          padding="1.5rem"
          borderRadius="20px"
          mx="1rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <form>
            <Text fontSize="4xl" as="b" lineHeight="1.8rem">
              New deck
            </Text>
            <FormLabel fontWeight="bold" color="#5f1590" marginTop="25px">
              Deck title *
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
            {isErrorTitle ? (
              <Text color="black" fontSize="sm">
                This field is required
              </Text>
            ) : null}
            <FormLabel fontWeight="bold" color="#5f1590" marginTop="25px">
              Description *
            </FormLabel>
            <Input
              bg="white"
              textColor="black"
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              type="text"
              placeholder="Include a description"
              h="80px"
              borderRadius="10px"
            ></Input>
            {isErrorDescription ? (
              <Text color="black" fontSize="sm">
                This field is required
              </Text>
            ) : null}
            <FormLabel fontWeight="bold" color="#5f1590" marginTop="20px">
              Add a photo
            </FormLabel>
            <Flex display="flex" justifyContent="center">
              <label htmlFor="images" className={'drop-container newDeckFile'}>
                <span className="drop-title">Drop files here or</span>
                <input
                  type="file"
                  onChange={(e) => setDeckImage(e.target.files[0])}
                  accept="image/*"
                  className="input"
                />
              </label>
            </Flex>
            <Flex gap="2rem" mt="2rem" justifyContent="center">
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
      <AgnosticButton
        text="Back"
        color="#5f1590"
        type="button"
        bg="white"
        size="md"
        borderRadius="20px"
        callBack={() => navigate('/dashboard')}
        mt="1.5rem"
        _hover={{ bg: '#af63dd', color: 'white' }}
      />
    </Flex>
  );
};

export default CreateDeck;
