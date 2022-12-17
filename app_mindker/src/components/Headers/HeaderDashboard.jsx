import { Avatar, Flex, Image, Text, useColorModeValue, WrapItem } from '@chakra-ui/react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../../context/GlobalContext';
import AgnosticButton from '../AgnosticButton/AgnosticButton';

const HeaderDashboard = ({ text, image }) => {
  const bg = useColorModeValue('#FFF', '#000');
  const color = useColorModeValue('#000', '#FFF');
  const navigate = useNavigate();
  const { setHomeContent, user } = useContext(GlobalContext);

  const logout = () => {
    window.localStorage.clear();
    setHomeContent('content');
    navigate('/');
  };

  return (
    <header>
      <Flex as="header" bg={bg} color={color} justifyContent="space-between" width="100%">
        <Image
          src={image}
          alt={text}
          boxSize="100px"
          ml="4rem"
          title="imagen de mindker"
        />
        <Text fontSize="50px" width="100%" textAlign="center">
          {text}
        </Text>
        <AgnosticButton
          text="LogOut"
          type="text"
          variant="outline"
          borderRadius="1rem"
          callBack={() => logout()}
        />
        <WrapItem>
          <Avatar name={user.nickname} src={user.avatar} />
        </WrapItem>
      </Flex>
    </header>
  );
};
export default HeaderDashboard;
