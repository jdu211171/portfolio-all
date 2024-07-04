import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Chip, Box, Typography, IconButton, TextField, Grid, Autocomplete, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import skillsList from '../../assets/skills'; // Импортируем список навыков

const getRandomColor = () => {
  const colors = skillsList.map(skill => skill.color);
  return colors[Math.floor(Math.random() * colors.length)];
};

const parseSkills = (skillsString) => {
  return skillsString.split(', ').map(skill => {
    const [name, level, color] = skill.split(':');
    return { name, level, color: color || getRandomColor() };
  });
};

const ITSkillsTableWithActions = ({ initialSkills, onSave, isEditing, usePredefinedSkills, showLevelDescriptions = true, showHeader = true }) => {
  const [skills, setSkills] = useState(parseSkills(initialSkills));
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('上級');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  useEffect(() => {
    setSkills(parseSkills(initialSkills));
  }, [initialSkills]);

  const handleAddSkill = () => {
    const selectedSkill = skillsList.find(skill => skill.name === newSkill);
    const color = selectedSkill ? selectedSkill.color : getRandomColor();

    if (skills.find(skill => skill.name === newSkill && skill.level === newSkillLevel)) {
      setAlertMessage('Skill already added');
      setAlertSeverity('warning');
      setAlertOpen(true);
      return;
    } else if (newSkill.trim()) {
      setSkills([...skills, { name: newSkill.trim(), level: newSkillLevel, color }]);
      setNewSkill('');
      setNewSkillLevel('上級');
    }
  };

  const handleAddSkillFreeform = () => {
    if (skills.find(skill => skill.name === newSkill && skill.level === newSkillLevel)) {
      setAlertMessage('Skill already added');
      setAlertSeverity('warning');
      setAlertOpen(true);
      return;
    } else if (newSkill.trim()) {
      setSkills([...skills, { name: newSkill.trim(), level: newSkillLevel, color: getRandomColor() }]);
      setNewSkill('');
      setNewSkillLevel('上級');
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSkills(skills.filter(skill => skill.name !== skillToDelete.name || skill.level !== skillToDelete.level));
    setAlertMessage('Skill deleted successfully');
    setAlertSeverity('success');
    setAlertOpen(true);
  };

  const renderSkills = (level) => {
    return skills
      .filter(skill => skill.level === level)
      .map(skill => (
        <Chip
          key={`${skill.name}-${skill.level}`}
          label={skill.name}
          onDelete={isEditing ? () => handleDeleteSkill(skill) : undefined}
          variant="outlined"
          style={{
            margin: '2px',
            borderColor: skill.color,
            color: skill.color,
            backgroundColor: `${skill.color}33`, // полупрозрачный фон
          }}
          deleteIcon={isEditing ? <CloseIcon /> : null}
        />
      ));
  };

  useEffect(() => {
    const skillsString = skills.map(skill => `${skill.name}:${skill.level}:${skill.color}`).join(', ');
    onSave(skillsString);
  }, [skills, onSave]);

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Box>
      {showHeader && (
        <Typography variant="h6">ITスキル</Typography>
      )}
      {showLevelDescriptions && (
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">上級: 3年間以上</Typography>
          <Typography variant="body2">中級: 1年間〜1年半</Typography>
          <Typography variant="body2">初級: 基礎</Typography>
        </Box>
      )}
      <Box mt={2}>
        <Typography variant="subtitle1">上級</Typography>
        <Grid container spacing={1}>
          {renderSkills('上級')}
        </Grid>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1">中級</Typography>
        <Grid container spacing={1}>
          {renderSkills('中級')}
        </Grid>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1">初級</Typography>
        <Grid container spacing={1}>
          {renderSkills('初級')}
        </Grid>
      </Box>
      {isEditing && (
        <Box display="flex" alignItems="center" marginTop={2}>
          {usePredefinedSkills ? (
            <>
              <Autocomplete
                options={skillsList.map(skill => skill.name)}
                value={newSkill}
                onChange={(event, newValue) => setNewSkill(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Skill"
                    style={{ marginRight: '10px' }}
                  />
                )}
              />
              <TextField
                label="Level"
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value)}
                select
                SelectProps={{ native: true }}
                style={{ marginRight: '10px' }}
              >
                <option value="上級">上級</option>
                <option value="中級">中級</option>
                <option value="初級">初級</option>
              </TextField>
              <IconButton onClick={handleAddSkill} color="primary">
                <AddIcon />
              </IconButton>
            </>
          ) : (
            <>
              <TextField
                label="New Skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                style={{ marginRight: '10px' }}
              />
              <TextField
                label="Level"
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value)}
                select
                SelectProps={{ native: true }}
                style={{ marginRight: '10px' }}
              >
                <option value="上級">上級</option>
                <option value="中級">中級</option>
                <option value="初級">初級</option>
              </TextField>
              <IconButton onClick={handleAddSkillFreeform} color="primary">
                <AddIcon />
              </IconButton>
            </>
          )}
        </Box>
      )}
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleAlertClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

ITSkillsTableWithActions.propTypes = {
  initialSkills: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  usePredefinedSkills: PropTypes.bool.isRequired,
  showLevelDescriptions: PropTypes.bool,
  showHeader: PropTypes.bool
};

export default ITSkillsTableWithActions;
