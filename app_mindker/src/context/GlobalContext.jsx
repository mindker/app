import { createContext, useState } from 'react';

import { useLocalStorage } from '../custom/useLocalStorage';

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [triggerBoolean, setTriggerBoolean] = useState(false);
  const [homeContent, setHomeContent] = useState('content');
  const [user, setUser] = useState('user');
  const [local, setLocal] = useLocalStorage(user);
  const value = {
    triggerBoolean,
    setTriggerBoolean,
    homeContent,
    setHomeContent,
    user,
    setUser,
    local,
    setLocal,
  };
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export { GlobalContextProvider };

export default GlobalContext;
