import { useContext } from 'react';

import Content from '../../components/ContentHome/Content';
import Footer from '../../components/Footer/Footer';
import HeaderHome from '../../components/Headers/HeaderHome';
import GlobalContext from '../../context/GlobalContext';
import HomeLayout from '../../layouts/HomeLayout/HomeLayout';

const Home = () => {
  const { homeContent } = useContext(GlobalContext);

  return (
    <HomeLayout direction="column" flexWrap="no-wrap">
      <HeaderHome
        text="mindker"
        image="https://res.cloudinary.com/drprserzu/image/upload/v1671204804/image_loxdyy.png"
      />
      {homeContent == 'content' ? <Content /> : null}
      <Footer />
    </HomeLayout>
  );
};

export default Home;
