import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../../context/GlobalContext';
import { patchAgnostic } from '../../services/APIservice.js';
import AgnosticButton from '../AgnosticButton/AgnosticButton';

const DetailDeckCard = () => {
  const [deckDetail, setDeckDetail] = useState('');
  const navigate = useNavigate();
  const { idDeck } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);
  const toast = useToast();

  useEffect(() => {
    const getDeckDetail = async () => {
      const data = await fetch(`http://localhost:8080/api/v1/decks/${idDeck}`);
      const res = await data.json();
      setDeckDetail(res);
    };
    getDeckDetail();
  }, []);
  console.log(deckDetail);
  const adoptDeck = async () => {
    const token = window.localStorage.getItem(user.nickname);
    user.downloadedDecks.push(deckDetail.info.data);
    patchAgnostic(user._id, 'users', token, user);
  };

  return deckDetail != '' ? (
    <Flex
      height="100vh"
      flexWrap="wrap"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
    >
      <Card
        border="1px"
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
        height="290px"
        width="650px"
      >
        <Image
          objectFit="cover"
          maxW={{ base: '100%', sm: '200px' }}
          src={deckDetail.info.data.image}
          alt="deck image"
        />

        <Stack>
          <CardBody>
            <Heading size="md" p="1rem">
              {deckDetail.info.data.title}
            </Heading>

            <Text py="2">
              <strong>Description: </strong>
              {deckDetail.info.data.description}
            </Text>
            <Text py="2">
              <strong>Number of cards:</strong> {deckDetail.info.data.cards.length}
            </Text>
            <Text py="2">
              <strong>Author: </strong>
              {!deckDetail.info.data.author
                ? 'Anónimo'
                : deckDetail.info.data.author.nickname}
            </Text>
          </CardBody>

          <CardFooter gap="2rem">
            <AgnosticButton
              text="Back"
              type="button"
              variant="outline"
              //leftIcon={<AiFillHome />}
              colorScheme="twitter"
              size="md"
              callBack={() => navigate('/dashboard')}
            />
            <AgnosticButton
              text="Adopt"
              type="button"
              variant="outline"
              //leftIcon={<AiFillHome />}
              colorScheme="twitter"
              size="md"
              callBack={async () => {
                await adoptDeck(deckDetail.info.data._id);

                toast({
                  title: 'Deck adopted.',
                  description: 'you adopted the deck.',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                });
              }}
            />
          </CardFooter>
        </Stack>
      </Card>
    </Flex>
  ) : (
    <p>no way</p>
  );
};

export default DetailDeckCard;
