import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import ITSkillsTableWithActions from './ITSkillsTableWithActions';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import styles from './SelfIntroduction.module.css';

const SelfIntroduction = ({ onSave }) => {
  const { profileData } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(profileData);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

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
      setAlertMessage('Changes saved successfully');
      setAlertSeverity('success');
      setAlertOpen(true);
    } catch (error) {
      setAlertMessage('Error updating profile data');
      setAlertSeverity('error');
      setAlertOpen(true);
      console.error('Error updating profile data:', error);
    }
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div className={styles.container}>
      <Typography variant="h6">自己PR</Typography>
      <Box className={styles.buttons}>
        {isEditing ? (
          <>
            <Button onClick={handleCancel}>キャンセル</Button>
            <Button onClick={handleSave} color="primary" variant="contained">
              保存
            </Button>
          </>
        ) : (
          <Button onClick={handleEditToggle} color="primary">
            プロフィールを編集
          </Button>
        )}
      </Box>
      {isEditing ? (
        <Box component="form" className={styles.form}>
          <TextField
            label="自己紹介"
            name="self_introduction"
            value={editedData.self_introduction}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="趣味"
            name="hobbies"
            value={editedData.hobbies}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="その他の情報"
            name="other_information"
            value={editedData.other_information}
            onChange={handleInputChange}
            fullWidth
          />
          <Box className={styles.skillTable}>
            <Typography variant="h6" className={styles.skillTableHeader}>ITスキル</Typography>
            <ITSkillsTableWithActions
              initialSkills={editedData.it_skills}
              onSave={(skills) => setEditedData({ ...editedData, it_skills: skills })}
              isEditing={isEditing}
              usePredefinedSkills={true}
              showLevelDescriptions={true}
              showHeader={false}
            />
          </Box>
          <Typography variant="h6" className={styles.skillSectionHeader}>その他</Typography>
          <Box className={styles.skillTable}>
            <ITSkillsTableWithActions
              initialSkills={editedData.skills}  // используем skills для дополнительных навыков
              onSave={(skills) => setEditedData({ ...editedData, skills })}
              isEditing={isEditing}
              usePredefinedSkills={false}  // старый метод добавления для второй таблицы
              showLevelDescriptions={false}  // не показывать описание уровней для второй таблицы
              showHeader={false}  // не показывать заголовок для второй таблицы
            />
          </Box>
        </Box>
      ) : (
        <>
          <Typography variant="body1" className={styles.selfIntroduction}>{profileData.self_introduction}</Typography>
          <Typography variant="subtitle1" className={styles.sectionTitle}>趣味</Typography>
          <Typography variant="body1" className={styles.hobbies}>{profileData.hobbies}</Typography>
          <Typography variant="subtitle1" className={styles.sectionTitle}>その他の情報</Typography>
          <Typography variant="body1" className={styles.otherInformation}>{profileData.other_information}</Typography>
          <Box className={styles.skillTable}>
            <Typography variant="h6" className={styles.skillTableHeader}>ITスキル</Typography>
            <ITSkillsTableWithActions
              initialSkills={profileData.it_skills}
              onSave={onSave}
              isEditing={isEditing}
              usePredefinedSkills={true}
              showLevelDescriptions={true}
              showHeader={false}
            />
          </Box>
          <Typography variant="h6" className={styles.skillSectionHeader}>その他</Typography>
          <Box className={styles.skillTable}>
            <ITSkillsTableWithActions
              initialSkills={profileData.skills}
              onSave={onSave}
              isEditing={isEditing}
              usePredefinedSkills={false}
              showLevelDescriptions={false}
              showHeader={false}
            />
          </Box>
        </>
      )}
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleAlertClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

SelfIntroduction.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default SelfIntroduction;
