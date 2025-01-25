import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const CredContext = createContext();

// Custom hook for accessing the context
export const useCredContext = () => useContext(CredContext);

// Provider component
export const CredProvider = ({ children }) => {
  const [credentials, setCredentials] = useState(() => {
    // Retrieve credentials from local storage on initialization
    const storedCredentials = localStorage.getItem('credentials');
    return storedCredentials ? JSON.parse(storedCredentials) : { username: '', password: '' };
  });

  useEffect(() => {
    // Update local storage whenever credentials change
    if (credentials.username && credentials.password) {
      localStorage.setItem('credentials', JSON.stringify(credentials));
    }
  }, [credentials]);

  return (
    <CredContext.Provider value={{ credentials, setCredentials }}>
      {children}
    </CredContext.Provider>
  );
};
