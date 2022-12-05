import { createContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [triggerBoolean, setTriggerBoolean] = useState(false);
  const [homeContent, setHomeContent] = useState('content');
  const value = {
    triggerBoolean,
    setTriggerBoolean,
    homeContent,
    setHomeContent,
  };
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export { GlobalContextProvider };

export default GlobalContext;
