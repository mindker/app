import { useContext } from 'react';
import { AiFillApi, AiFillContacts, AiFillHome } from 'react-icons/ai';

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
        text="Mindker"
        image="https://res.cloudinary.com/di5oqdvwa/image/upload/v1670257782/imagenes/Logo-hecho-porIris-que-es-una-crack_u48ufi.png"
      />
      <AgnosticButton
        text="Register"
        type="button"
        variant="outline"
        leftIcon={<AiFillContacts />}
        colorScheme="yellow"
        size="xs"
        callBack={() => setHomeContent('register')}
      />
      <AgnosticButton
        text="Login"
        type="button"
        variant="outline"
        leftIcon={<AiFillApi />}
        colorScheme="facebook"
        size="xs"
        callBack={() => setHomeContent('login')}
      />
      <AgnosticButton
        text="MindKer"
        type="button"
        variant="outline"
        leftIcon={<AiFillHome />}
        colorScheme="twitter"
        size="xs"
        callBack={() => setHomeContent('content')}
      />
      {homeContent == 'content' ? (
        <Content />
      ) : homeContent == 'register' ? (
        <Register />
      ) : homeContent == 'login' ? (
        <Login />
      ) : null}
      <Footer />
    </HomeLayout>
  );
};

export default Home;
