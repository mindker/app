import DecksContainer from '../../components/DecksContainer/DecksContainer';
import DashboardLayout from '../../layouts/DasboardLayout/DashboardLayout';

const Dashboard = () => {
  //también se puede hacer con useEffect --> probar

  return (
    <DashboardLayout direction="column">
      <p>dashboard</p>
      <DecksContainer spacing="30px" />
    </DashboardLayout>
  );
};

export default Dashboard;
