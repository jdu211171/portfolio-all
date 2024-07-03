import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Chip, Box, Typography, IconButton, TextField, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const ITSkillsTableWithActions = ({ initialSkills, onSave, isEditing }) => {
  const predefinedColors = {
    HTML: '#c8e6c9',
    CSS: '#bbdefb',
    JS: '#fff9c4',
    Bootstrap: '#ffcdd2',
    Next: '#ffccbc',
    TypeScript: '#fff59d',
    Python: '#ffecb3',
    JAVA: '#c5e1a5',
    SQL: '#b2dfdb',
  };

  const colors = ['#c8e6c9', '#bbdefb', '#fff9c4', '#ffcdd2', '#ffccbc', '#fff59d', '#ffecb3', '#c5e1a5', '#b2dfdb'];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const parseSkills = (skills) => {
    return skills.split(', ').map(skill => {
      const [name, level, color] = skill.split(':');
      return { name, level, color: color || getRandomColor() };
    });
  };

  const [skills, setSkills] = useState(parseSkills(initialSkills));
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('上級');

  useEffect(() => {
    setSkills(parseSkills(initialSkills));
  }, [initialSkills]);

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, { name: newSkill.trim(), level: newSkillLevel, color: getRandomColor() }]);
      setNewSkill('');
      setNewSkillLevel('上級');
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSkills(skills.filter(skill => skill.name !== skillToDelete.name || skill.level !== skillToDelete.level));
  };

  const renderSkills = (level) => {
    return skills
      .filter(skill => skill.level === level)
      .map(skill => (
        <Chip
          key={`${skill.name}-${skill.level}`}
          label={skill.name}
          onDelete={isEditing ? () => handleDeleteSkill(skill) : undefined}
          style={{ margin: '2px', backgroundColor: predefinedColors[skill.name] || skill.color }}
          deleteIcon={isEditing ? <DeleteIcon /> : null}
        />
      ));
  };

  useEffect(() => {
    const skillsString = skills.map(skill => `${skill.name}:${skill.level}:${skill.color}`).join(', ');
    onSave(skillsString);
  }, [skills, onSave]);

  return (
    <Box>
      <Typography variant="h6">ITスキル</Typography>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2">上級: 3年間以上</Typography>
        <Typography variant="body2">中級: 1年間〜1年半</Typography>
        <Typography variant="body2">初級: 基礎</Typography>
      </Box>
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
          <IconButton onClick={handleAddSkill} color="primary">
            <AddIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

ITSkillsTableWithActions.propTypes = {
  initialSkills: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default ITSkillsTableWithActions;
