import { Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import AgnosticButton from '../../components/AgnosticButton/AgnosticButton';
import Content from '../../components/ContentHome/Content';
import Footer from '../../components/Footer/Footer';
import HeaderHome from '../../components/Headers/HeaderHome';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import GlobalContext from '../../context/GlobalContext';
import HomeLayout from '../../layouts/HomeLayout/HomeLayout';

const Home = () => {
  const { homeContent, setHomeContent } = useContext(GlobalContext);

  //también se puede hacer con useEffect --> probar

  return (
    <HomeLayout direction="column">
      <HeaderHome
        text="Mindker Game"
        image="https://res.cloudinary.com/di5oqdvwa/image/upload/v1670257782/imagenes/Logo-hecho-porIris-que-es-una-crack_u48ufi.png"
      />

      {homeContent == 'content' ? <Content /> : null}
      <Flex gap="1rem">
        <Register />
        <Login />
        <Link to="/demo">
          <AgnosticButton
            text="MindKer"
            type="button"
            variant="outline"
            leftIcon={<AiFillHome />}
            colorScheme="twitter"
            size="lg"
            //callBack={() => setHomeContent('content')}
          />
        </Link>
      </Flex>
      <Footer />
    </HomeLayout>
  );
};

export default Home;
