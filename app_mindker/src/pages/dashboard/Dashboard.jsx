import { useContext, useEffect, useState } from 'react';

import DecksSuperContainer from '../../components/DecksContainer/DecksSuperContainer';
import NavUserDashboard from '../../components/NavUserDashboard/NavUserDashboard';
import GlobalContext from '../../context/GlobalContext';
import DashboardLayout from '../../layouts/DasboardLayout/DashboardLayout';
import { getAgnostic } from '../../services/getServices';

const Dashboard = () => {
  const { user, dashboardContent, switcher } = useContext(GlobalContext);
  const allUserDecks = [...user.downloadedDecks, ...user.createdDecks];
  const [arrayDecks, setArrayDecks] = useState(allUserDecks);
  const [textDecks, setTextDecks] = useState('My Decks');

  dashboardContent == 'decks'
    ? setTextDecks('Popular Decks')
    : dashboardContent == 'decks/deck/'
    ? setTextDecks('Popular decks')
    : false;

  useEffect(() => {
    /* dashboardContent && */
    switcher && getAgnostic('decks', '').then((res) => console.log(res.info.data));
    console.log(switcher);
  }, [switcher]);

  return (
    <DashboardLayout direction="row">
      <NavUserDashboard />
      <DecksSuperContainer
        array={arrayDecks}
        callBack={() => {}}
        callBack2={() => {}}
        text={textDecks}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
