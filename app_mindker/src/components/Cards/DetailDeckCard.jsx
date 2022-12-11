import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailDeckCard = () => {
  const [deckDetail, setDeckDetail] = useState('');

  const params = useParams();

  const { id } = params;

  useEffect(() => {
    const getDeckDetail = async () => {
      const data = await fetch(`http://localhost:8080/api/v1/decks/${id}`);
      const res = await data.json();
      setDeckDetail(res);
    };
    getDeckDetail();
  }, []);

  return deckDetail != '' ? (
    <Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={deckDetail.info.data.image}
        alt="noseke"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{deckDetail.info.data.title}</Heading>

          <Text py="2">{deckDetail.info.data.description}</Text>
          <Text py="2">Number of cards: {deckDetail.info.data.cards.length}</Text>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="blue">
            Play
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  ) : (
    <p>no way</p>
  );
};

export default DetailDeckCard;
