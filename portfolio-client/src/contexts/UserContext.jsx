import React, { createContext, useState, useEffect } from 'react';

// Create a Context for the user
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userRole = sessionStorage.getItem('role');
    const loginUser = sessionStorage.getItem('loginUser');
    const userId = loginUser ? JSON.parse(loginUser).id : null;

    setRole(userRole);
    setUserId(userId);
  }, []);

  const updateUser = () => {
    const userRole = sessionStorage.getItem('role');
    const loginUser = sessionStorage.getItem('loginUser');
    const userId = loginUser ? JSON.parse(loginUser).id : null;

    setRole(userRole);
    setUserId(userId);
  };

  return (
    <UserContext.Provider value={{ role, userId, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
