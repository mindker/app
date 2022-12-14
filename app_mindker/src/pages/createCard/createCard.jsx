import React, { useContext, useState } from 'react';

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import { CreateAgnosticItem, patchAgnostic } from '../../services/APIservice';
import GlobalContext from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

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
      <FormControl>
        <form>
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
            text="Save card & exit"
            type="button"
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
          <AgnosticButton
            text="Save & continue"
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
        </form>
      </FormControl>
    </div>
  );
};

export default CreateCard;
