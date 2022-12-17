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
        console.log(newCardCreated);
        deck.cards.push(newCardCreated);
        console.log('el boolean: ', boolean);
        if (boolean) {
          setAnswer('');
          setQuestion('');
        } else {
          /*  user.decks.push(deck); */
          patchAgnostic(user._id, 'users', token, user);
          console.log('el deck: ', deck);
          patchAgnostic(deck._id, 'decks', token, deck).then((res) =>
            console.log('la res del patchagnos deck: ', res),
          );
        }
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
    <div>
      <Flex bg="#5f1590" w="100vw" h="100vh" alignItems="center" justifyContent="center">
        <Flex m="485px" justifyContent="center" marginBlockStart="475px" display="flex">
          <FormControl bg="white" padding="25px" borderRadius="20px">
            <form>
              <Text fontSize="4xl" as="b">
                New card
              </Text>
              <FormLabel as="b" marginTop="30px">
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
              ></Input>
              {isErrorQ ? <Text color="black">This field is required</Text> : null}
              <FormLabel as="b" marginTop="25px">
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
              <FormLabel as="b" marginTop="20px">
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
                h="90px"
              ></Input>
              {isErrorA ? <Text color="black">This field is required</Text> : null}

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
                    toast({
                      title: 'Deck created.',
                      description: "We've created your deck for you.",
                      status: 'success',
                      duration: 9000,
                      isClosable: true,
                    });
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
                  // leftIcon={<AddIcon />}
                  callBack={(e) => {
                    boolean = false;
                    onFormSubmitCard(e);
                    toast({
                      title: 'Card created.',
                      description: "We've created your card for you.",
                      status: 'success',
                      duration: 9000,
                      isClosable: true,
                    });
                    setDashboardContent(false);
                    navigate('/dashboard');
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
