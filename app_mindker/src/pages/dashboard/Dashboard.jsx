import { useContext } from 'react';

import DecksSuperContainer from '../../components/DecksContainer/DecksSuperContainer';
import GlobalContext from '../../context/GlobalContext';
import DashboardLayout from '../../layouts/DasboardLayout/DashboardLayout';

const Dashboard = () => {
  const { user } = useContext(GlobalContext);
  console.log(user);
  return (
    <DashboardLayout direction="column">
      <DecksSuperContainer
        array={user.downloadedDecks}
        callBack={() => {}}
        callBack2={() => {}}
        text="User Decks"
      />
    </DashboardLayout>
  );
};

export default Dashboard;
