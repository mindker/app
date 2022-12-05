import './App.css';

import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
};

export default App;
