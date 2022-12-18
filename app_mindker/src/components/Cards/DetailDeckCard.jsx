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
import { useMediaQuery } from '@chakra-ui/react';
import GlobalContext from '../../context/GlobalContext';
import { patchAgnostic } from '../../services/APIservice.js';

const DetailDeckCard = () => {
  const [deckDetail, setDeckDetail] = useState('');
  const navigate = useNavigate();
  const { deck } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);
  const toast = useToast();
  const [responsive] = useMediaQuery('(max-width: 768px)');
  useEffect(() => {
    const getDeckDetail = async () => {
      const data = await fetch(`http://localhost:8080/api/v1/decks/${deck._id}`);
      const res = await data.json();
      setDeckDetail(res);
    };
    getDeckDetail();
  }, []);
  const adoptDeck = async () => {
    const token = window.localStorage.getItem(user.nickname);
    user.decks.push(deckDetail.info.data);
    patchAgnostic(user._id, 'users', token, user);
  };

  return deckDetail != '' ? (
    <Flex
      flex="4"
      height="100vh"
      flexWrap="wrap"
      justifyContent="center"
      alignContent="center"
      bg="#5f1590"
    >
      {responsive}
      <Card
        border="1px"
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
        height="500px"
        width="70vw"
        bg="white"
        p="3rem"
      >
        <Image
          objectFit="cover"
          maxW={{ base: '100%', sm: '700px' }}
          src={deckDetail.info.data.image}
          alt="deck image"
          w="50%"
        />

        <Stack>
          <CardBody w="100%">
            <Heading size="xl" p="1rem">
              {deckDetail.info.data.title}
            </Heading>

            <Text px="1rem" fontSize={['sm', 'md', 'lg', 'xl']}>
              <strong>Description: </strong>
              {deckDetail.info.data.description}
            </Text>
            <Text px="1rem" fontSize={['sm', 'md', 'lg', 'xl']}>
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
              //leftIcon={<AiFillHome />}
              //colorScheme="purple"
              bg="#5f1590"
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
            <AgnosticButton
              text="Back"
              color="white"
              type="button"
              variant="solid"
              //colorScheme="purple"
              bg="#5f1590"
              size="md"
              //leftIcon={<AiFillHome />}
              borderRadius="20px"
              callBack={() => navigate('/dashboard')}
            />
          </Flex>
        </Stack>
      </Card>
    </Flex>
  ) : (
    <p>no way</p>
  );
};

export default DetailDeckCard;
