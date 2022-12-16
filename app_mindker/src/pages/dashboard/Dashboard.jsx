import { useContext, useEffect, useState } from 'react';

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

  useEffect(() => {
    dashboardContent == 'decks'
      ? setTextDecks('Popular Decks')
      : dashboardContent === false
      ? (setArrayDecks(user.decks), setTextDecks('My Decks'))
      : param == '' && setParam(paramReforce),
      setTextDecks(param);
    if (dashboardContent) {
      getAgnostic(dashboardContent, param)
        .then((res) => {
          arr = filterDecks(user.decks, res.info.data);
        })
        .then(() => setArrayDecks(arr));
    }
  }, [switcher]);

  return (
    <DashboardLayout direction="row">
      <NavUserDashboard user={user} />
      <DecksSuperContainer array={arrayDecks} text={textDecks} />
    </DashboardLayout>
  );
};

export default Dashboard;
