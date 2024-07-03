import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, TextField, Button } from '@mui/material';
import ITSkillsTableWithActions from './ITSkillsTableWithActions';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

const SelfIntroduction = ({ onSave }) => {
  const { profileData } = useOutletContext();
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
      await axios.put(`/api/students/${profileData.id}`, editedData);
      onSave(editedData);
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
    <div>
      <Typography variant="h6">自己PR</Typography>
      {isEditing ? (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="自己紹介"
            name="self_introduction"
            value={editedData.self_introduction}
            onChange={handleInputChange}
          />
          <TextField
            label="趣味"
            name="hobbies"
            value={editedData.hobbies}
            onChange={handleInputChange}
          />
          <TextField
            label="その他の情報"
            name="other_information"
            value={editedData.other_information}
            onChange={handleInputChange}
          />
          <ITSkillsTableWithActions
            initialSkills={editedData.it_skills}
            onSave={(skills) => setEditedData({ ...editedData, it_skills: skills })}
            isEditing={isEditing}
          />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button onClick={handleCancel}>キャンセル</Button>
            <Button onClick={handleSave} color="primary" variant="contained">
              保存
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <Button onClick={handleEditToggle} color="primary">
            プロフィールを編集
          </Button>
          <Typography variant="body1">{profileData.self_introduction}</Typography>
          <Typography variant="subtitle1">Hobbies</Typography>
          <Typography variant="body1">{profileData.hobbies}</Typography>
          <Typography variant="subtitle1">Other Information</Typography>
          <Typography variant="body1">{profileData.other_information}</Typography>
          <ITSkillsTableWithActions initialSkills={profileData.it_skills} onSave={onSave} isEditing={isEditing} />
        </>
      )}
    </div>
  );
};

SelfIntroduction.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default SelfIntroduction;
