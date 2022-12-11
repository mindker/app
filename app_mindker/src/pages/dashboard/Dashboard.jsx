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
  // eslint-disable-next-line no-unsafe-optional-chaining
  const allUserDecks = [...user?.downloadedDecks, ...user?.createdDecks];
  const [arrayDecks, setArrayDecks] = useState(allUserDecks);
  const [textDecks, setTextDecks] = useState('My Decks');
  useEffect(() => {
    dashboardContent == 'decks'
      ? setTextDecks('Popular Decks')
      : dashboardContent === false
      ? (setArrayDecks(allUserDecks), setTextDecks('My Decks'))
      : param == '' && setParam(paramReforce),
      setTextDecks(param);
    if (dashboardContent) {
      getAgnostic(dashboardContent, param)
        .then((res) => {
          arr = filterDecks(allUserDecks, res.info.data);
        })
        .then(() => setArrayDecks(arr));
    }
  }, [switcher]);

  return (
    <DashboardLayout direction="row">
      <NavUserDashboard />
      <DecksSuperContainer array={arrayDecks} text={textDecks} />
    </DashboardLayout>
  );
};

export default Dashboard;
