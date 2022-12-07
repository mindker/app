import { Avatar, Box, Input, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../../context/GlobalContext';
import AgnosticButton from '../AgnosticButton/AgnosticButton';

const NavUserDashboard = () => {
  const {
    user,
    setHomeContent,
    setDashboardContent,
    switcher,
    setSwitcher,
    setParam,
    setParamReforce,
    paramReforce,
    param,
  } = useContext(GlobalContext);

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
      gap="2.5rem"
    >
      <Box>
        <Box justifyItems="right" display="flex">
          <AgnosticButton
            leftIcon="⚙"
            callBack={() => {
              navigate('/updateProfile');
            }}
          />
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
            callBack={() => {
              setDashboardContent(false);
              setParam('');
              setSwitcher(!switcher);
            }}
          />
          <AgnosticButton
            width="13rem"
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
            text="Search"
            callBack={() => {
              setDashboardContent('decks/deck');
              param == null && setParam(paramReforce);
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
            text="Create Deck"
            callBack={() => navigate('/createDeck')}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <AgnosticButton colorScheme="gray" text="Log out" callBack={() => logout()} />
      </Box>
    </Box>
  );
};

export default React.memo(NavUserDashboard);
