import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, TextField, Snackbar, Alert, Tabs, Tab, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from '../../../utils/axiosUtils';
import styles from './Qa.module.css';

const Qa = ({ student }) => {
  const { studentId } = useParams();
  const [expanded, setExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [qaData, setQaData] = useState([]);
  const [editedQaData, setEditedQaData] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const fetchQaData = async () => {
      try {
        const response = await axios.get(`/api/qa`);
        const studentQaData = response.data.filter(qa => qa.studentId === parseInt(studentId, 10));
        setQaData(studentQaData);
        setEditedQaData(studentQaData);
      } catch (error) {
        showAlert('Error fetching QA data.', 'error');
      }
    };

    fetchQaData();
  }, [studentId]);

  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedQaData(qaData);
  };

  const handleSaveClick = async () => {
    try {
      const updatedQaData = await Promise.all(
        editedQaData.map(async (qa) => {
          const response = await axios.put(`/api/qa/${qa.id}`, qa);
          return response.data;
        })
      );
      setQaData(updatedQaData);
      setEditedQaData(updatedQaData);
      setEditMode(false);
      showAlert('Changes saved successfully!', 'success');
    } catch (error) {
      showAlert('Error saving changes.', 'error');
    }
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedQaData = [...editedQaData];
    updatedQaData[index] = { ...updatedQaData[index], [name]: value };
    setEditedQaData(updatedQaData);
  };

  const handleAddNewQa = () => {
    if (!newQuestion || !newAnswer) {
      showAlert('Please fill in both the question and the answer.', 'warning');
      return;
    }

    const newQa = {
      id: Date.now(), // Temporary ID
      question: newQuestion,
      answer: newAnswer,
      studentId: parseInt(studentId, 10)
    };

    showAlert(`New QA added!\nQuestion: ${newQuestion}\nAnswer: ${newAnswer}`, 'success');
    setQaData([...qaData, newQa]);
    setEditedQaData([...editedQaData, newQa]);
    setNewQuestion('');
    setNewAnswer('');
  };

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlert({ open: false, message: '', severity: '' });
  };

  return (
    <Box>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="学生成績" />
        <Tab label="専門知識" />
        <Tab label="個性" />
        <Tab label="実務経験" />
        <Tab label="キャリア目標" />
      </Tabs>
      {tabIndex === 0 && (
        <Box>
          <Box mt={2}>
            {!editMode && (
              <Button onClick={handleEditClick} variant="contained" color="primary">
                編集
              </Button>
            )}
          </Box>
          <Box mt={2}>
            {editMode ? (
              <>
                <Box mb={2}>
                  <Button onClick={handleSaveClick} variant="contained" color="primary">
                    保存
                  </Button>
                  <Button onClick={handleCancelClick} variant="outlined" sx={{ ml: 2 }}>
                    キャンセル
                  </Button>
                </Box>
                {editedQaData.map((qa, index) => (
                  <Accordion key={qa.id} expanded={expanded === qa.id} onChange={handleExpandChange(qa.id)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{qa.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TextField
                        label="Question"
                        name="question"
                        value={qa.question}
                        onChange={(event) => handleChange(index, event)}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Answer"
                        name="answer"
                        value={qa.answer}
                        onChange={(event) => handleChange(index, event)}
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                      />
                    </AccordionDetails>
                  </Accordion>
                ))}
                <Box mt={2}>
                  <Typography variant="h6">Add New QA</Typography>
                  <TextField
                    label="New Question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="New Answer"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                  />
                  <Button onClick={handleAddNewQa} variant="contained" color="primary">
                    Add QA
                  </Button>
                </Box>
              </>
            ) : (
              <>
                {qaData.map((qa) => (
                  <Accordion key={qa.id} expanded={expanded === qa.id} onChange={handleExpandChange(qa.id)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{qa.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{qa.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </>
            )}
          </Box>
        </Box>
      )}
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

export default Qa;
