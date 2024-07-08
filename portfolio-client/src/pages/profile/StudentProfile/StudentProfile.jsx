import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Tabs, Tab, Typography, Button, TextField, Snackbar, Alert, IconButton, Chip, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import UserAvatar from '../../../components/table/avatar/UserAvatar'; // Импорт компонента UserAvatar
import styles from './StudentProfile.module.css';
import Top from '../Top/Top';
import Qa from '../Qa/Qa';
import Stats from '../Stats/Stats';

const StudentProfile = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [student, setStudent] = useState(null);
  const [qaData, setQaData] = useState([]); // State for QA data
  const [tabIndex, setTabIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/api/students/${studentId}`);
        setStudent(response.data);
        setEditedData(response.data);
      } catch (error) {
        showAlert('Error fetching student data', 'error');
      }
    };

    const fetchQaData = async () => {
      try {
        const response = await axios.get(`/api/qa?studentId=${studentId}`);
        setQaData(response.data);
      } catch (error) {
        showAlert('Error fetching QA data', 'error');
      }
    };

    fetchStudent();
    fetchQaData();

    if (location.pathname.endsWith('/qa')) {
      setTabIndex(1);
    } else if (location.pathname.endsWith('/stats')) {
      setTabIndex(2);
    } else {
      setTabIndex(0);
    }
  }, [studentId, location.pathname]);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
    if (newIndex === 0) {
      navigate(`/profile/${studentId}/top`);
    } else if (newIndex === 1) {
      navigate(`/profile/${studentId}/qa`);
    } else if (newIndex === 2) {
      navigate(`/profile/${studentId}/stats`);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedData(student);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`/api/students/${studentId}`, editedData);
      setStudent(editedData);
      setEditMode(false);
      showAlert('Changes saved successfully!', 'success');
    } catch (error) {
      console.error('Error saving student data:', error);
      showAlert('Error saving changes.', 'error');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlert({ open: false, message: '', severity: '' });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <IconButton onClick={handleBackClick} color="primary">
        <ArrowBackIcon />
      </IconButton>
      <Box className={styles.container}>
        <Box className={styles.avatarContainer}>
          <UserAvatar 
            photo={student.photo} 
            // name={`${student.first_name} ${student.last_name}`} 
            // studentId={student.student_id}
          />
          <Box className={styles.infoContainer}>
            <Box display="flex" alignItems="center">
              <Typography variant="h4" component="div" className={styles.mainTitle}>
                {student.first_name} {student.last_name}
              </Typography>
              <a href={`mailto:${student.email}`} className={styles.email}>
                <EmailIcon className={styles.emailIcon} />
                {student.email}
              </a>
            </Box>
            <Box className={styles.chipContainer}>
              <Chip
                label={`学籍番号: ${student.student_id}`}
                variant="outlined"
                sx={{ fontSize: '12px', padding: '2px 6px', height: 'auto', lineHeight: 1 }}
              />
              <Chip
                label={`生年月日: ${new Date(student.date_of_birth).toLocaleDateString()}`}
                variant="outlined"
                sx={{ fontSize: '12px', padding: '2px 6px', height: 'auto', lineHeight: 1 }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Top" />
        <Tab label="Q&A" />
        <Tab label="Units and Skills" />
      </Tabs>
      <Box>
        {tabIndex === 0 && <Top student={student} editMode={editMode} editedData={editedData} handleChange={handleChange} handleEditClick={handleEditClick} handleCancelClick={handleCancelClick} handleSaveClick={handleSaveClick} />}
        {tabIndex === 1 && <Qa student={student} qaData={qaData} />} {/* Pass qaData as prop */}
        {tabIndex === 2 && <Stats student={student} />}
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

export default StudentProfile;
