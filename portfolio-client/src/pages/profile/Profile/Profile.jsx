import React, { useEffect, useState } from 'react'; //useState эрор
import { Outlet, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import ProfileOverview from '../../../components/profile/ProfileOverview';
import { Box, Tabs, Tab } from '@mui/material';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const location = useLocation();
  const [tabValue, setTabValue] = useState(
    location.pathname.includes('/profile/qa') ? 1 :
      location.pathname.includes('/profile/stats') ? 2 : 0
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/students/1');
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSaveSkills = async (updatedSkills) => {
    try {
      const updatedData = { ...profileData, it_skills: updatedSkills };
      const response = await axios.put('/api/students/1', updatedData);
      setProfileData(updatedData);
    } catch (error) {
      console.error('Error updating skills:', error);
    }
  };

  if (!profileData) return <div>Loading...</div>;

  return (
    <div>
      <ProfileOverview
        firstName={profileData.first_name}
        lastName={profileData.last_name}
        email={profileData.email}
      />
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="Profile Tabs">
        <Tab label="トップ" component={Link} to="top" />
        <Tab label="Q&A" component={Link} to="qa" />
        <Tab label="単位数とスキル" component={Link} to="stats" />
      </Tabs>
      <Outlet context={{ profileData, setProfileData, handleSaveSkills }} />
    </div>
  );
};

export default Profile;
