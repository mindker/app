import { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import DecksSuperContainer from '../../components/DecksContainer/DecksSuperContainer';
import NavUserDashboard from '../../components/NavUserDashboard/NavUserDashboard';
import GlobalContext from '../../context/GlobalContext';
import DashboardLayout from '../../layouts/DasboardLayout/DashboardLayout';
import { getAgnostic } from '../../services/APIservice';
import { filterDecks } from '../../utils/filterDecks';

const Dashboard = () => {
  const { local, dashboardContent, switcher, param, setParam, paramReforce } =
    useContext(GlobalContext);
  let arr = [];
  const [arrayDecks, setArrayDecks] = useState([]);
  const [textDecks, setTextDecks] = useState('My Decks');
  const [isLargerThan610] = useMediaQuery('(min-width: 610px)');

  let userParsed;
  if (typeof local == 'string') {
    userParsed = JSON.parse(local);
  } else {
    userParsed = local;
  }

  useEffect(() => {
    if (dashboardContent == 'decks') {
      setTextDecks('Popular Decks');
    } else if (dashboardContent === false) {
      setArrayDecks(userParsed.user.decks), setTextDecks('My Decks');
    } else if (param == '') {
      setTextDecks('');
      setParam(paramReforce);
    }
    if (dashboardContent) {
      getAgnostic(dashboardContent, param)
        .then((res) => {
          arr = filterDecks(userParsed.user.decks, res.info.data);
        })
        .then(() => setArrayDecks(arr));
    }
  }, [switcher]);

  return isLargerThan610 ? (
    <DashboardLayout direction="row">
      <NavUserDashboard user={local} />
      <DecksSuperContainer array={arrayDecks} text={textDecks} />
    </DashboardLayout>
  ) : (
    <DashboardLayout direction="column">
      <NavUserDashboard user={local} />
      <DecksSuperContainer array={arrayDecks} text={textDecks} />
    </DashboardLayout>
  );
};

export default Dashboard;
