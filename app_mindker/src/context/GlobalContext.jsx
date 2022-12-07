import { createContext, useState } from 'react';

import { useLocalStorage } from '../custom/useLocalStorage';

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [homeContent, setHomeContent] = useState('content');
  const [user, setUser] = useState();
  const [nickname, setNickname] = useState();
  const [local, setLocal] = useLocalStorage(nickname);
  const [dashboardContent, setDashboardContent] = useState(false);
  const [switcher, setSwitcher] = useState(false);

  const value = {
    homeContent,
    setHomeContent,
    user,
    setUser,
    local,
    setLocal,
    setNickname,
    dashboardContent,
    setDashboardContent,
    switcher,
    setSwitcher,
  };
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export { GlobalContextProvider };

export default GlobalContext;
