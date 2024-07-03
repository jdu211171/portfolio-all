import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

const Qa = () => {
  const profileData = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(profileData);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put('/api/students/1', editedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile data:', error);
    }
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button onClick={handleEditToggle}>
          {isEditing ? 'キャンセル' : 'プロフィールを編集'}
        </Button>
        {isEditing && (
          <Button onClick={handleSave} color="primary" variant="contained">
            保存
          </Button>
        )}
      </Box>
      <h2>Q&A Page</h2>
      {isEditing && (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Q&A */}
          <TextField
            label="Q&A Field"
            name="qa_field"
            value={editedData.qa_field || ''}
            onChange={handleInputChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default Qa;
