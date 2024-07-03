import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';
import SelfIntroduction from '../../../components/profile/SelfIntroduction';
import axios from 'axios';

const Top = () => {
  const { profileData, setProfileData } = useOutletContext();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSaveProfile = async (updatedProfileData) => {
    try {
      const response = await axios.put(`/api/students/${profileData.id}`, updatedProfileData);
      setProfileData(response.data);
    } catch (error) {
      console.error('Error updating profile data:', error);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="Top Tabs">
        <Tab label="自己PR" />
        <Tab label="成果物" />
      </Tabs>
      {value === 0 && (
        <SelfIntroduction
          selfIntroduction={profileData.self_introduction}
          hobbies={profileData.hobbies}
          otherInformation={profileData.other_information}
          itSkills={profileData.it_skills}
          skills={profileData.skills}
          onSave={handleSaveProfile}
        />
      )}
      {value === 1 && (
        <Box>
          <h2>成果物</h2>
          <p>Content for 成果物 will go here.</p>
        </Box>
      )}
    </Box>
  );
};

export default Top;
