import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const tokenFromCookies = await Cookies.get('token');
        setToken(tokenFromCookies);
        if (!token) {
          return <Navigate to="/login" />;
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      } 
    };

    fetchToken();
  }, []);
  
  return children;
};

export default ProtectedRoute;
