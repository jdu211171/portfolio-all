import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, TextField, Chip, Box, MenuItem, Select, FormControl, InputLabel, Typography, IconButton, Snackbar, Alert, Divider } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import skills from '../assets/skills';

const levels = ['初級', '中級', '上級'];

const SkillSelector = ({
  selectedSkills = [],
  setSelectedSkills = () => {},
  editMode = false,
  showAutocomplete = true,
  showInfoText = true,
  title = '',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [parsedSkills, setParsedSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(showAutocomplete ? null : '');
  const [selectedLevel, setSelectedLevel] = useState(levels[0]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  const handleAddSkill = () => {
    if (selectedSkill) {
      const isDuplicate = parsedSkills.some(skill => skill.name === selectedSkill.name || skill.name === selectedSkill);
      if (isDuplicate) {
        showAlert('Skill already exists at any level!', 'error');
      } else {
        const skillData = showAutocomplete 
          ? skills.find(skill => skill.name === selectedSkill.name) || { name: selectedSkill.name, color: '#000' }
          : skills.find(skill => skill.name === selectedSkill) || { name: selectedSkill, color: '#000' };
        const newSkills = [...parsedSkills, { ...skillData, level: selectedLevel }];
        setParsedSkills(newSkills);
        setSelectedSkills(formatSkills(newSkills));
        setSelectedSkill(showAutocomplete ? null : '');
        setSelectedLevel(levels[0]);
        showAlert('Skill added successfully!', 'success');
      }
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    const newSkills = parsedSkills.filter((skill) => skill.name !== skillToDelete.name);
    setParsedSkills(newSkills);
    setSelectedSkills(formatSkills(newSkills));
    showAlert('Skill deleted successfully!', 'warning');
  };

  const handleLevelChange = (event, skillName) => {
    const newSkills = parsedSkills.map((skill) =>
      skill.name === skillName ? { ...skill, level: event.target.value } : skill
    );
    setParsedSkills(newSkills);
    setSelectedSkills(formatSkills(newSkills));
  };

  const transformSkills = (skillsString) => {
    if (!skillsString) return [];
    return skillsString.split(',').map((skill) => {
      const [name, level] = skill.split(':');
      const skillData = skills.find((s) => s.name === name.trim());
      return { name: name.trim(), level: level ? level.trim() : '初級', color: skillData ? skillData.color : '#000' };
    });
  };

  const formatSkills = (skillsArray) => {
    return skillsArray.map((skill) => `${skill.name}:${skill.level}`).join(',');
  };

  useEffect(() => {
    if (typeof selectedSkills === 'string') {
      setParsedSkills(transformSkills(selectedSkills));
    }
  }, [selectedSkills]);

  const getTransparentColor = (color, opacity) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlert({ open: false, message: '', severity: '' });
  };

  return (
    <Box mt={2}>
      {title && (
        <>
          <Typography variant="h6">{title}</Typography>
          <Divider sx={{ my: 2 }} />
        </>
      )}
      {showInfoText && (
        <>
          <Typography>上級：3年間以上　　　　中級：1年間〜1年間半　　　　初級：基礎</Typography>
          <Divider sx={{ my: 2 }} />
        </>
      )}
      {editMode && (
        <Box display="flex" alignItems="center" mb={2} mt={2}>
          {showAutocomplete ? (
            <Autocomplete
              options={skills}
              getOptionLabel={(option) => option.name}
              value={selectedSkill}
              onChange={(event, newValue) => setSelectedSkill(newValue)}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
              renderInput={(params) => <TextField {...params} label="Select Skill" variant="outlined" />}
            />
          ) : (
            <TextField
              value={selectedSkill}
              onChange={(event) => setSelectedSkill(event.target.value)}
              label="Skill"
              variant="outlined"
            />
          )}
          <FormControl variant="outlined" size="small" sx={{ ml: 2 }}>
            <InputLabel>Level</InputLabel>
            <Select
              value={selectedLevel}
              onChange={(event) => setSelectedLevel(event.target.value)}
              label="Level"
            >
              {levels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={handleAddSkill} color="primary" sx={{ ml: 2 }}>
            <AddIcon />
          </IconButton>
        </Box>
      )}
      <Box display="flex" flexDirection="column" mt={2}>
        {levels.map((level) => (
          <Box key={level} mb={2}>
            <Typography variant="subtitle1">{level}</Typography>
            <Box display="flex" flexWrap="wrap">
              {parsedSkills
                .filter((skill) => skill.level === level)
                .map((skill) => (
                  <Chip
                    key={`${skill.name}-${skill.level}`}
                    label={skill.name}
                    onDelete={editMode ? () => handleDeleteSkill(skill) : undefined}
                    variant="outlined"
                    style={{
                      borderColor: skill.color,
                      color: skill.color,
                      margin: '0 4px 4px 0',
                      backgroundColor: getTransparentColor(skill.color, 0.1),
                    }}
                  />
                ))}
            </Box>
          </Box>
        ))}
      </Box>
      <Snackbar 
        open={alert.open} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

SkillSelector.propTypes = {
  selectedSkills: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  setSelectedSkills: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  showAutocomplete: PropTypes.bool,
  showInfoText: PropTypes.bool,
  title: PropTypes.string,
};

export default SkillSelector;
