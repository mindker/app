import Login from '../../components/Login/Login';
import HomeLayout from '../../layouts/HomeLayout/HomeLayout';
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import Content from '../../components/ContentHome/Content';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Register from '../../components/Register/Register';

const Home = () => {
  const { homeContent, setHomeContent } = useContext(GlobalContext);

  //también se puede hacer con useEffect --> probar

  return (
    <HomeLayout direction="column">
      <Header />
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
