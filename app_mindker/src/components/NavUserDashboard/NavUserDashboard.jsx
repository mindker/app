import { Avatar, Box, Flex, Input, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import {
  FaBolt,
  FaGlobeAfrica,
  FaSearchPlus,
  FaSignOutAlt,
  FaTools,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../../context/GlobalContext';
import AgnosticButton from '../AgnosticButton/AgnosticButton';
import EditProfileModal from '../Modals/EditProfileModal';

const NavUserDashboard = ({ user }) => {
  const {
    setHomeContent,
    setDashboardContent,
    switcher,
    setSwitcher,
    setParam,
    setParamReforce,
  } = useContext(GlobalContext);

  const navigate = useNavigate();
  const [deployer, setDeployer] = useState(false);
  const logout = () => {
    window.localStorage.clear();
    setHomeContent('content');
    navigate('/');
  };

  return (
    <Box
      bg="#5F1592"
      w="20rem"
      h="100vh"
      p="1rem"
      display="flex"
      flexWrap="wrap"
      flexDir="column"
      justifyContent="space-between"
    >
      <Box>
        <Flex
          justifyContent="space-around"
          flexDirection="column"
          bg="white"
          borderRadius="10px"
        >
          <Flex justifyContent="space-between" mb="2rem">
            <EditProfileModal />
            <AgnosticButton
              color="black"
              leftIcon={<FaSignOutAlt />}
              callBack={() => logout()}
              variant="outline"
              border="1px white"
            />
          </Flex>
          <Flex
            bg="white"
            p="1rem"
            flexWrap="wrap"
            flexDirection="column"
            alignItems="center"
            borderRadius="10px"
          >
            <Avatar
              name={user.nickname}
              src={user.avatar}
              size="xl"
              mt="-3.5rem"
              bg="#AF63DD"
              color="white"
            />
            <Text fontWeight="bold">{user.name}</Text>
          </Flex>
        </Flex>
        <Flex
          bg="white"
          mt="1rem"
          p="1rem"
          flexWrap="wrap"
          flexDirection="column"
          alignItems="center"
          gap="1rem"
          borderRadius="10px"
        >
          <AgnosticButton
            border="1px white"
            variant="outline"
            width="13rem"
            text="My Decks"
            callBack={() => {
              setDashboardContent(false);
              setParam('');
              setDeployer(false);
              setSwitcher(!switcher);
            }}
            _hover={{ bg: '#AF63DD', color: ' white' }}
            leftIcon={<FaBolt />}
          />
          <AgnosticButton
            width="100%"
            border="1px white"
            variant="outline"
            text="Popular decks"
            callBack={() => {
              setDashboardContent('decks');
              setParam('');
              setSwitcher(!switcher);
              setDeployer(true);
            }}
            _hover={{ bg: '#AF63DD', color: ' white' }}
            leftIcon={<FaGlobeAfrica />}
          />
          {deployer ? (
            <>
              <AgnosticButton
                border="1px white"
                width="13rem"
                variant="outline"
                text="Search"
                callBack={() => {
                  setDashboardContent('decks/deck');
                  setSwitcher(!switcher);
                }}
                _hover={{ bg: '#AF63DD', color: ' white' }}
                leftIcon={<FaSearchPlus />}
              />
              <Input
                border="1px white"
                textAlign="center"
                w="13rem"
                onInput={(e) => {
                  setParam(e.target.value);
                  setParamReforce(e.target.value);
                }}
                _hover={{ bg: '#AF63DD', color: ' white' }}
                leftIcon={<FaSignOutAlt />}
              />
            </>
          ) : null}
          <AgnosticButton
            border="1px white"
            width="13rem"
            variant="outline"
            text="Create Deck"
            callBack={() => navigate('/createDeck')}
            _hover={{ bg: '#AF63DD', color: ' white' }}
            leftIcon={<FaTools />}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default React.memo(NavUserDashboard);
