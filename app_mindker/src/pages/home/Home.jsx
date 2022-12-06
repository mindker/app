import { useContext } from 'react';

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
      <button onClick={() => setHomeContent('register')}>Register</button>
      <button onClick={() => setHomeContent('login')}>Login</button>
      <button onClick={() => setHomeContent('content')}>MindKer Game</button>
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
