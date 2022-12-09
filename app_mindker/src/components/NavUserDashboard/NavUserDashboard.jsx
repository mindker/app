import { Avatar, Box, Input, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../../context/GlobalContext';
import AgnosticButton from '../AgnosticButton/AgnosticButton';
import EditProfileModal from '../Modals/EditProfileModal';

const NavUserDashboard = () => {
  const {
    user,
    setHomeContent,
    setDashboardContent,
    switcher,
    setSwitcher,
    setParam,
    setParamReforce,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    setHomeContent('content');
    navigate('/');
  };

  return (
    <Box
      bg="#DDD"
      w="20rem"
      h="100vh"
      p="1rem"
      display="flex"
      flexWrap="wrap"
      flexDir="column"
      justifyContent="space-between"
      gap="2.5rem"
    >
      <Box>
        <Box display="flex" justifyContent="space-between" mb="2rem">
          <Box bg="white" borderRadius="10px">
            <EditProfileModal />
          </Box>
          <Box bg="white" borderRadius="10px">
            <AgnosticButton
              colorScheme="gray"
              leftIcon={<FaSignOutAlt />}
              text=""
              callBack={() => logout()}
              variant="outline"
            />
          </Box>
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
            variant="outline"
            width="13rem"
            text="My Decks"
            callBack={() => {
              setDashboardContent(false);
              setParam('');
              setSwitcher(!switcher);
            }}
          />
          <AgnosticButton
            width="13rem"
            colorScheme="gray"
            variant="outline"
            text="Popular decks"
            callBack={() => {
              setDashboardContent('decks');
              setParam('');
              setSwitcher(!switcher);
            }}
          />

          <AgnosticButton
            colorScheme="gray"
            width="13rem"
            variant="outline"
            text="Search"
            callBack={() => {
              setDashboardContent('decks/deck');
              setSwitcher(!switcher);
            }}
          />
          <Input
            placeholder="categoty or title"
            textAlign="center"
            w="13rem"
            onInput={(e) => {
              setParam(e.target.value);
              setParamReforce(e.target.value);
            }}
          />
          <AgnosticButton
            colorScheme="gray"
            width="13rem"
            variant="outline"
            text="Create Deck"
            callBack={() => navigate('/createDeck')}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(NavUserDashboard);
