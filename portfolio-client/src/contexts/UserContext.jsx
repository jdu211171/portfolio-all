import React, { createContext, useState, useEffect } from "react";

// Create a Context for the user
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    const loginUser = sessionStorage.getItem("loginUser");
    const userId = loginUser ? JSON.parse(loginUser).id : null;
    const user = JSON.parse(loginUser);
    setActiveUser(user);
    setRole(userRole);
    setUserId(userId);
  }, []);

  const updateUser = () => {
    const userRole = sessionStorage.getItem("role");
    const loginUser = sessionStorage.getItem("loginUser");
    const userId = loginUser ? JSON.parse(loginUser).id : null;
    const user = JSON.parse(loginUser);
    setActiveUser(user);
    setRole(userRole);
    setUserId(userId);
    return user;
  };

  return (
    <UserContext.Provider value={{ role, userId, activeUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
