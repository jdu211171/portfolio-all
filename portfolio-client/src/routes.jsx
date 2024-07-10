import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import ProtectedLayout from "./components/ProtectedLayout";

import Home from './pages/home/Home';
import Setting from "./pages/setting/Setting";
import Student from "./pages/student/Student";
import Recruiter from "./pages/recruiter/Recruiter";
import Staff from "./pages/staff/Staff";
import Login from "./pages/login/Login";
import FAQ from "./pages/faq/Faq";

import LogOut from "./components/LogOut";
import NotFound from "./pages/NotFound";
import FirstLoginPage from "./pages/FirstLoginPage/FirstLoginPage";
import StudentProfile from "./pages/profile/StudentProfile/StudentProfile";
import Top from "./pages/profile/Top/Top";
import Qa from "./pages/profile/Qa/Qa";
import Stats from "./pages/profile/Stats/Stats";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedLayout />}>
            <Route index element={<Home />} />
            <Route path="/student" element={<Student />} />
            <Route path="/recruiter" element={<Recruiter />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/help" element={<FAQ />} />
            <Route path="/profile/:studentId/*" element={<StudentProfile />}>
              <Route path="top" element={<Top />} />
              <Route path="qa" element={<Qa />} />
              <Route path="stats" element={<Stats />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/FirstloginPage" element={<FirstLoginPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
