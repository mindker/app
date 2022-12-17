import { createContext, useState } from 'react';

import { useLocalStorage } from '../custom/useLocalStorage';

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [homeContent, setHomeContent] = useState('content');
  const [user, setUser] = useState();
  const [local, setLocal] = useLocalStorage('user');
  const [dashboardContent, setDashboardContent] = useState('decks');
  const [switcher, setSwitcher] = useState(false);
  const [param, setParam] = useState('');
  const [deck, setDeck] = useState({});
  const [paramReforce, setParamReforce] = useState('');

  const value = {
    homeContent,
    setHomeContent,
    user,
    setUser,
    local,
    setLocal,
    dashboardContent,
    setDashboardContent,
    switcher,
    setSwitcher,
    param,
    setParam,
    paramReforce,
    setParamReforce,
    deck,
    setDeck,
  };
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export { GlobalContextProvider };

export default GlobalContext;
