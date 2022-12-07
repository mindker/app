import { Avatar, Box, Input, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../../context/GlobalContext';
import AgnosticButton from '../AgnosticButton/AgnosticButton';

const NavUserDashboard = () => {
  const { user, setHomeContent } = useContext(GlobalContext);
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    setHomeContent('content');
    navigate('/');
  };

  return (
    <Box
      bg="gray"
      w="20rem"
      h="100vh"
      p="1rem"
      display="flex"
      flexWrap="wrap"
      flexDir="column"
      justifyContent="space-between"
      gap="3rem"
    >
      <Box>
        <Box justifyItems="right" display="flex">
          <AgnosticButton leftIcon="⚙"></AgnosticButton>
        </Box>
        <Box
          bg="white"
          p="1rem"
          display="flex"
          flexWrap="wrap"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar name={user.nickname} src={user.avatar} size="xl" />
          <Text>{user.name}</Text>
        </Box>
        <Box
          bg="white"
          mt="1rem"
          p="1rem"
          display="flex"
          flexWrap="wrap"
          flexDirection="column"
          alignItems="center"
          gap="1rem"
        >
          <AgnosticButton
            colorScheme="gray"
            width="13rem"
            text="My Decks"
          ></AgnosticButton>
          <AgnosticButton width="13rem" text="Popular decks"></AgnosticButton>

          <AgnosticButton colorScheme="gray" width="13rem" text="Search" />
          <Input placeholder="categoty or title"></Input>
          <AgnosticButton colorScheme="gray" width="13rem" text="Create Deck" />
        </Box>
      </Box>
      <Box display="flex" flexWrap="wrap" justifyItems="flex-end">
        <AgnosticButton
          colorScheme="gray"
          text="Log out"
          callBack={() => logout()}
        ></AgnosticButton>
      </Box>
    </Box>
  );
};

export default NavUserDashboard;
