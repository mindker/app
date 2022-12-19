import { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import DecksSuperContainer from '../../components/DecksContainer/DecksSuperContainer';
import NavUserDashboard from '../../components/NavUserDashboard/NavUserDashboard';
import GlobalContext from '../../context/GlobalContext';
import DashboardLayout from '../../layouts/DasboardLayout/DashboardLayout';
import { getAgnostic } from '../../services/APIservice';
import { filterDecks } from '../../utils/filterDecks';

const Dashboard = () => {
  const { user, dashboardContent, switcher, param, setParam, paramReforce } =
    useContext(GlobalContext);
  let arr = [];
  const [arrayDecks, setArrayDecks] = useState([]);
  const [textDecks, setTextDecks] = useState('My Decks');
  const [isLargerThan610] = useMediaQuery('(min-width: 610px)');
  useEffect(() => {
    if (dashboardContent == 'decks') {
      setTextDecks('Popular Decks');
    } else if (dashboardContent === false) {
      setArrayDecks(user.decks), setTextDecks('My Decks');
    } else if (param == '') {
      setTextDecks('');
      setParam(paramReforce);
    }
    if (dashboardContent) {
      getAgnostic(dashboardContent, param)
        .then((res) => {
          arr = filterDecks(user.decks, res.info.data);
        })
        .then(() => setArrayDecks(arr));
    }
  }, [switcher]);

  return isLargerThan610 ? (
    <DashboardLayout direction="row">
      <NavUserDashboard user={user} />
      <DecksSuperContainer array={arrayDecks} text={textDecks} />
    </DashboardLayout>
  ) : (
    <DashboardLayout direction="column">
      <NavUserDashboard user={user} />
      <DecksSuperContainer array={arrayDecks} text={textDecks} />
    </DashboardLayout>
  );
};

export default Dashboard;
