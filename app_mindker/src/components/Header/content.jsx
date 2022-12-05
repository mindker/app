import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Divider,
  useColorModeValue,
  Image,
  Text,
} from '@chakra-ui/react';

const Content = () => {
  //bg es background
  //noOfLines oculta lineas
  const bg = useColorModeValue('');
  const color = useColorModeValue('');
  return (
    <>
      <Flex
        as="content"
        bg={bg}
        color={color}
        px={350}
        py={4}
        
      >
        <Flex align="center">
          <Heading as="cite"  ml={100} w="100%">
            <Text>
              Se trata de una aplicación de aprendizaje colaborativo que genera una
              comunidad de usuarios inmersos en procesos de aprendizaje. ¿Qué es una
              comunidad? Un conjunto de personas con unos **intereses comunes**. Todos los
              usuarios de nuestra aplicación tienen como mínimo un interés en
              común: aprender**.** Esta app consiste en un juego de tarjetas que se
              agrupan en mazos según la temática. Gracias a ellas se trabaja sobre la
              curva del olvido, detallada más abajo. Hay dos tipos de usuarios. Por un
              lado el invitado, que podrá disfrutar de una pequeña demo en la cuál probar
              la aplicación de forma limitada, es decir, jugar con los mazos de tarjetas
              que ya existen por defecto. Por otro lado, tenemos al usuario registrado,
              quien disfrutará de todos los beneficios del juego: crear mazos que
              contengan tarjetas personalizadas o compartirlos con otros usuarios, entre
              otras ventajas. Aclarar que cada tarjeta formula una pregunta ofreciendo una
              respuesta que el usuario deberá recordar. En relación a la dificultad que
              encuentra el usuario al recordar la respuesta, las tarjetas se repiten con
              mayor o menor frecuencia. Esta metodología está basada en la subjetividad
              del usuario sobre su propio aprendizaje, pues es él mismo el que determina
              el grado de dificultad que ha experimentado al recordar la respuesta. La
              curva del olvido fue establecida por primera vez a finales del siglo XIX por
              el psicólogo alemán Hermann Ebbinghaus. Según Hermann, la curva del olvido
              modela el ritmo exponencial con el que los humanos olvidamos la información
              que hemos «aprendido».
            </Text>
          </Heading>
        </Flex>
        <Box ml="auto">
          {/* <Link mr={4}>About</Link>
          <Link>Contact</Link> */}
        </Box>
      </Flex>
      <Divider />
    </>
  );
};
export default Content;
