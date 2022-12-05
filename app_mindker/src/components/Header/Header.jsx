import React from 'react';
import {Box, Flex, Heading, Link, Text, Divider, useColorModeValue, Image,Center} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

// Note: This code could be better,
// so I'd recommend you to understand how I solved and you could write yours better 🙂
// Good luck! 🍀

// Update: Check these awesome headers from Choc UI 👇
// https://choc-ui.tech/docs/elements/headers


const Header = () => {
  //bg es background
  const bg = useColorModeValue('#FFF', '#000');
  const color = useColorModeValue('#000', '#FFF');
  return (
    <>
      <Flex as="header" bg={bg} color={color} px={600} py={0} borderBottom="1px solid #DDD" >
      
        <Flex align="center">
        <Image src="https://res.cloudinary.com/di5oqdvwa/image/upload/v1670257782/imagenes/Logo-hecho-porIris-que-es-una-crack_u48ufi.png" alt="Logo" boxSize="90px"  />
          <Heading as="h1" size="4x1" alignSelf="center">
          {/* <Heading as="h1" Size='md' fontWeight="normal" lineHeight={1.5} textAlign={["center", "center", "right", "right"]}> */}
          <Text  fontSize="50px" ><Center>Mindker</Center></Text>
            
          </Heading>
        </Flex>
        
      </Flex>
      <Divider />
    </>
  );
};
export default Header;
