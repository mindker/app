import Login from '../../components/Login/Login';
import HomeLayout from '../../layouts/HomeLayout/HomeLayout';

const Home = () => {
  // eslint-disable-next-line react/no-children-prop
  return <HomeLayout direction="column" children={<Login />} />;
};

export default Home;
