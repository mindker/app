import { createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [triggerBoolean, setTriggerBoolean] = useState(false);
    const value = {
        triggerBoolean, 
        setTriggerBoolean,
    }
 return <GlobalContext.Provider value={ value }>{ children }</GlobalContext.Provider>   
};

export { GlobalContextProvider };

export default GlobalContext;