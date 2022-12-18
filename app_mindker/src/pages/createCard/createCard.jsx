import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import { Flex, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import GlobalContext from '../../context/GlobalContext';
import { CreateAgnosticItem, patchAgnostic } from '../../services/APIservice';

const CreateCard = () => {
  const [question, setQuestion] = useState('');
  const [imageQuestion, setImageQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  let boolean = true;
  const navigate = useNavigate();

  const { deck, setDashboardContent, user } = useContext(GlobalContext);

  const token = window.localStorage.getItem('user');

  const onFormSubmitCard = (e) => {
    e.preventDefault();
    const newCardToPost = {
      question: question,
      questionFile: imageQuestion,
      answer: answer,
    };
    (async () => {
      try {
        const newCardCreated = await CreateAgnosticItem('cards', newCardToPost, token);
        deck.cards.push(newCardCreated);
        if (boolean) {
          setAnswer('');
          setQuestion('');
          toast({
            title: 'Card added to your deck',
            description: 'Keep adding some cards',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
        } else if (boolean == false && deck.cards.length == 1) {
          patchAgnostic(user._id, 'users', token, user);
          patchAgnostic(deck._id, 'decks', token, deck);
          toast({
            title: 'Card saved',
            description: 'You can start playing your deck',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
          setDashboardContent(false);
          navigate('/dashboard');
        } else if (boolean == false && deck.cards.length > 1) {
          deck.cards.push(newCardCreated);
          deck.cards.pop();
          patchAgnostic(user._id, 'users', token, user);
          patchAgnostic(deck._id, 'decks', token, deck);
          toast({
            title: 'Card saved',
            description: 'You can start playing your deck',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
          setDashboardContent(false);
          navigate('/dashboard');
        }
        return newCardCreated;
      } catch (error) {
        toast({
          title: 'Fill in the required fields',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    })();
  };

  const isErrorQ = question === '';
  const isErrorA = answer === '';
  const toast = useToast();

  return (
    <div>
      <Flex bg="#5f1590" w="100vw" h="100vh" alignItems="center" justifyContent="center">
        <Flex justifyContent="center" display="flex">
          <FormControl bg="white" padding="25px" borderRadius="20px">
            <form>
              <Text fontSize="4xl" as="b" lineHeight="1.8rem">
                New card
              </Text>
              <FormLabel fontWeight="bold" color="#5f1590" marginTop="25px">
                Insert the question *
              </FormLabel>
              <Input
                bg="white"
                textColor="black"
                placeholder="Type the question in here"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                isRequired={true}
                borderRadius="10px"
                type="text"
                h="50px"
              ></Input>
              {isErrorQ ? (
                <Text color="black" fontSize="sm">
                  This field is required
                </Text>
              ) : null}
              <FormLabel fontWeight="bold" color="#5f1590" marginTop="25px">
                You can add a picture for this question if you wish
              </FormLabel>
              <Input
                bg="white"
                textColor="black"
                type="file"
                accept="image/*"
                onChange={(e) => setImageQuestion(e.target.files[0])}
                borderRadius="10px"
              />
              <FormLabel fontWeight="bold" color="#5f1590" marginTop="25px">
                Type the answer *
              </FormLabel>
              <Input
                bg="white"
                textColor="black"
                placeholder="Type the answer in here"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                isRequired={true}
                borderRadius="10px"
                type="text"
                h="50px"
              ></Input>
              {isErrorA ? (
                <Text color="black" fontSize="sm">
                  This field is required
                </Text>
              ) : null}

              <Flex gap="2rem" mt="3rem" justifyContent="center" marginBottom="10px">
                <AgnosticButton
                  text="Save & next"
                  _hover={{ bg: '#5f1590', color: 'white' }}
                  type="button"
                  color="white"
                  borderRadius="20px"
                  bg="#af63dd"
                  leftIcon={<AddIcon />}
                  callBack={(e) => {
                    onFormSubmitCard(e);
                  }}
                />
                <AgnosticButton
                  text="Save & exit"
                  type="button"
                  _hover={{ bg: '#5f1590', color: 'white' }}
                  color="white"
                  borderRadius="20px"
                  bg="#af63dd"
                  leftIcon={<CheckIcon />}
                  callBack={(e) => {
                    boolean = false;
                    onFormSubmitCard(e);
                  }}
                />
              </Flex>
            </form>
          </FormControl>
        </Flex>
      </Flex>
    </div>
  );
};

export default CreateCard;
