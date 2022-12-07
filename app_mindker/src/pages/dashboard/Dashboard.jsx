import DecksContainer from '../../components/DecksContainer/DecksContainer';
import HeaderDashboard from '../../components/Headers/HeaderDashboard';
import DashboardLayout from '../../layouts/DasboardLayout/DashboardLayout';

const Dashboard = () => {
  //también se puede hacer con useEffect --> probar

  return (
    <DashboardLayout direction="column">
     <HeaderDashboard
        text="Mindker"
        image="https://res.cloudinary.com/di5oqdvwa/image/upload/v1670257782/imagenes/Logo-hecho-porIris-que-es-una-crack_u48ufi.png"
      ></HeaderDashboard>
      <DecksContainer spacing="30px" />
    </DashboardLayout>
  );
};

export default Dashboard;
