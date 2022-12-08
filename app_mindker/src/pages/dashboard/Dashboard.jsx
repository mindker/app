import { useContext, useEffect, useState } from 'react';

import DecksSuperContainer from '../../components/DecksContainer/DecksSuperContainer';
import NavUserDashboard from '../../components/NavUserDashboard/NavUserDashboard';
import GlobalContext from '../../context/GlobalContext';
import DashboardLayout from '../../layouts/DasboardLayout/DashboardLayout';
import { getAgnostic } from '../../services/getServices';

const Dashboard = () => {
  const { user, dashboardContent, switcher, param, setParam, paramReforce } =
    useContext(GlobalContext);
  const allUserDecks = [...user.downloadedDecks, ...user.createdDecks];
  const [arrayDecks, setArrayDecks] = useState(allUserDecks);
  const [textDecks, setTextDecks] = useState('My Decks');

  useEffect(() => {
    dashboardContent === 'decks'
      ? setTextDecks('Popular Decks')
      : dashboardContent === false
      ? (setArrayDecks(allUserDecks), setTextDecks('My Decks'))
      : param == '' && setParam(paramReforce),
      setTextDecks(param);
    dashboardContent &&
      getAgnostic(dashboardContent, param).then((res) => setArrayDecks(res.info.data));
  }, [switcher]);

  return (
    <DashboardLayout direction="row">
      <NavUserDashboard />
      <DecksSuperContainer array={arrayDecks} text={textDecks} />
    </DashboardLayout>
  );
};

export default Dashboard;
