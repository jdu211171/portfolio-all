import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useOutletContext } from 'react-router-dom';

const QATabs = () => {
  const profileData = useOutletContext();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="QA Tabs">
        <Tab label="自己PR" />
        <Tab label="成果物" />
      </Tabs>
      {value === 0 && (
        <Box>
          <h2>自己PR</h2>
          <p>{profileData.self_introduction}</p>
          <p>{profileData.hobbies}</p>
          <p>{profileData.other_information}</p>
        </Box>
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

export default QATabs;
