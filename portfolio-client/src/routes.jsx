// src/routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
import ProtectedLayout from './components/ProtectedLayout';

import Home from './pages/home/Home';
import Student from './pages/student/Student';
import Login from './pages/login/Login';
import NotFound from './pages/NotFound';
import FirstLoginPage from './pages/FirstLoginPage/FirstLoginPage'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedLayout />}>
            <Route index element={<Home />} />
            <Route path="student" element={<Student />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/FirstloginPage" element={<FirstLoginPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
