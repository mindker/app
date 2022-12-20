import {
  Card,
  CardBody,
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
import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import GlobalContext from '../../context/GlobalContext';
import { patchAgnostic } from '../../services/APIservice.js';
import { useMediaQuery } from '@chakra-ui/react';

const DetailDeckCard = () => {
  const [deckDetail, setDeckDetail] = useState('');
  const navigate = useNavigate();
  const { user, deck, setDashboardContent } = useContext(GlobalContext);
  const toast = useToast();
  const [isLargerThan700] = useMediaQuery('(min-width: 700px)');

  useEffect(() => {
    const getDeckDetail = async () => {
      const data = await fetch(`http://localhost:8080/api/v1/decks/${deck._id}`);
      const res = await data.json();
      setDeckDetail(res);
    };
    getDeckDetail();
  }, []);
  const adoptDeck = async () => {
    const token = window.localStorage.getItem('user');
    user.decks.push(deckDetail.info.data);
    patchAgnostic(user._id, 'users', token, user);
    setDashboardContent(false);
    navigate('/dashboard');
  };

  return deckDetail != '' ? (
    isLargerThan700 ? (
      <Flex
        height="100vh"
        flexWrap="wrap"
        justifyContent="center"
        alignContent="center"
        bg="#5f1590"
      >
        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow="hidden"
          height="500px"
          bg="white"
          p="3rem"
          mx="1rem"
          borderRadius="20px"
        >
          <Image
            objectFit="contain"
            maxW={{ base: '100%', sm: '700px' }}
            src={deckDetail.info.data.image}
            alt="deck image"
            w="20rem"
            h="20rem"
          />
          <Stack>
            <CardBody w="100%">
              <Heading size="xl" p="1rem">
                {deckDetail.info.data.title}
              </Heading>
              <Text px="1rem" fontSize="md">
                <strong>Description: </strong>
                {deckDetail.info.data.description}
              </Text>
              <Text px="1rem" fontSize="md">
                <strong>Number of cards:</strong> {deckDetail.info.data.cards.length}
              </Text>
            </CardBody>
            <Flex gap="2rem" p="1rem" justifyContent="space-around" w="100%">
              <AgnosticButton
                text="Adopt"
                color="white"
                type="button"
                variant="solid"
                borderRadius="20px"
                bg="#5f1590"
                size="md"
                width="4.5rem"
                _hover={{ bg: '#af63dd', color: 'white' }}
                callBack={async () => {
                  await adoptDeck(deckDetail.info.data._id);
                  toast({
                    title: 'Deck adopted',
                    description: 'You can start playing it',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                  });
                }}
              />
              <AgnosticButton
                text="Back"
                color="white"
                type="button"
                variant="solid"
                bg="#5f1590"
                size="md"
                borderRadius="20px"
                width="4.5rem"
                _hover={{ bg: '#af63dd', color: 'white' }}
                callBack={() => navigate('/dashboard')}
              />
            </Flex>
          </Stack>
        </Card>
      </Flex>
    ) : (
      <Flex
        height="100vh"
        flexWrap="wrap"
        justifyContent="center"
        alignContent="center"
        bg="#5f1590"
      >
        <Card
          direction={{ base: 'column', sm: 'column' }}
          overflow="hidden"
          height="500px"
          bg="white"
          p="1rem"
          mx="1rem"
          borderRadius="20px"
          alignItems="center"
        >
          <Image
            objectFit="contain"
            maxW={{ base: '100%', sm: '700px' }}
            src={deckDetail.info.data.image}
            alt="deck image"
            w="12rem"
            h="12rem"
          />
          <Flex direction="column">
            <CardBody w="100%">
              <Heading size="xl" p="0.5rem">
                {deckDetail.info.data.title}
              </Heading>
              <Text px="1rem" fontSize="md">
                <strong>Description: </strong>
                {deckDetail.info.data.description}
              </Text>
              <Text px="1rem" fontSize="md">
                <strong>Number of cards:</strong> {deckDetail.info.data.cards.length}
              </Text>
            </CardBody>
            <Flex gap="2rem" p="1rem" justifyContent="space-around" w="100%">
              <AgnosticButton
                text="Adopt"
                color="white"
                type="button"
                variant="solid"
                borderRadius="20px"
                bg="#5f1590"
                size="md"
                width="4.5rem"
                _hover={{ bg: '#af63dd', color: 'white' }}
                callBack={async () => {
                  await adoptDeck(deckDetail.info.data._id);
                  toast({
                    title: 'Deck adopted',
                    description: 'You can start playing it',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                  });
                }}
              />
              <AgnosticButton
                text="Back"
                color="white"
                type="button"
                variant="solid"
                bg="#5f1590"
                size="md"
                borderRadius="20px"
                width="4.5rem"
                _hover={{ bg: '#af63dd', color: 'white' }}
                callBack={() => navigate('/dashboard')}
              />
            </Flex>
          </Flex>
        </Card>
      </Flex>
    )
  ) : (
    <p>no way</p>
  );
};

export default DetailDeckCard;
