// AppContext.js
import { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

export function useAuth() {
    let { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
    return { isAuthenticated, setIsAuthenticated };
}

export const AppContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node
};
