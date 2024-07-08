import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const Profile = () => {
  return (
    <Box>
      <Typography variant="h4">Profile</Typography>
      <Outlet />
    </Box>
  );
};

export default Profile;
