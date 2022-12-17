import { Flex } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import Content from '../../components/ContentHome/Content';
import Footer from '../../components/Footer/Footer';
import HeaderHome from '../../components/Headers/HeaderHome';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import GlobalContext from '../../context/GlobalContext';
import HomeLayout from '../../layouts/HomeLayout/HomeLayout';

const Home = () => {
  const { homeContent } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <HomeLayout direction="column">
      <HeaderHome
        justifyContent="left"
        text="Mindker Game"
        image="https://res.cloudinary.com/dpq2gujpb/image/upload/v1671195487/logo2_b9vouy.png"
      />

      {homeContent == 'content' ? <Content /> : null}
      <Flex gap="1rem">
        <Register />
        <Login />

        <AgnosticButton
          text="MindKer"
          type="button"
          variant="outline"
          leftIcon={<AiFillHome />}
          colorScheme="twitter"
          size="lg"
          callBack={() => navigate('demo')}
        />
      </Flex>
      <Footer />
    </HomeLayout>
  );
};

export default Home;
