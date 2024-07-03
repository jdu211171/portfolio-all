import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import SkillsTable from '../../../components/profile/SkillsTable';

const StatsTabs = () => {
  const profileData = useOutletContext();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="Stats Tabs">
        <Tab label="自己PR" />
        <Tab label="成果物" />
      </Tabs>
      {value === 0 && (
        <SkillsTable
          itSkills={profileData.it_skills}
          otherSkills={profileData.skills}
        />
      )}
      {value === 1 && (
        <Box>
          <h2>成果物</h2>
          <p>Coming soon</p>
        </Box>
      )}
    </Box>
  );
};

export default StatsTabs;
