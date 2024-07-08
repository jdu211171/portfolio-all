import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, Button, TextField, Snackbar, Alert, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Gallery from '../../../components/Gallery';
import SkillSelector from '../../../components/SkillSelector';
import styles from './Top.module.css';

const Top = ({ student, editMode, editedData, handleChange, handleEditClick, handleCancelClick, handleSaveClick }) => {
  const [subTabIndex, setSubTabIndex] = useState(0);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryUrls, setGalleryUrls] = useState([]);

  const handleSubTabChange = (event, newIndex) => {
    setSubTabIndex(newIndex);
  };

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlert({ open: false, message: '', severity: '' });
  };

  const handleGalleryOpen = () => {
    setGalleryOpen(true);
  };

  const handleGalleryClose = () => {
    setGalleryOpen(false);
  };

  const generateGalleryUrls = (numImages) => {
    return Array.from({ length: numImages }, (_, index) => `https://picsum.photos/300/200?random=${index + 1}`);
  };

  useEffect(() => {
    setGalleryUrls(generateGalleryUrls(8));
  }, []);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Tabs value={subTabIndex} onChange={handleSubTabChange}>
        <Tab label="自己PR" />
        <Tab label="成果物" />
      </Tabs>
      {subTabIndex === 0 && (
        <Box>
          <Box mt={2}>
            {!editMode && (
              <Button onClick={handleEditClick} variant="contained" color="primary">
                プロフィールを編集
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
                <TextField
                  label="自己紹介"
                  name="self_introduction"
                  value={editedData.self_introduction || ''}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                />
                <Gallery galleryUrls={galleryUrls.slice(0, 2)} onClick={handleGalleryOpen} />
                <TextField
                  label="趣味"
                  name="hobbies"
                  value={editedData.hobbies || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="特技"
                  name="other_information"
                  value={editedData.other_information || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <SkillSelector
                  selectedSkills={editedData.it_skills}
                  setSelectedSkills={(skills) => setEditedData((prevData) => ({
                    ...prevData,
                    it_skills: skills,
                  }))}
                  editMode={editMode}
                  showAutocomplete={true}
                  showInfoText={true}
                  title="ITスキル"
                />
                <SkillSelector
                  selectedSkills={editedData.skills}
                  setSelectedSkills={(skills) => setEditedData((prevData) => ({
                    ...prevData,
                    skills: skills,
                  }))}
                  editMode={editMode}
                  showAutocomplete={false}
                  showInfoText={false}
                  title="その他"
                />
              </>
            ) : (
              <>
                <Typography variant="h6" className={styles.title}>自己紹介</Typography>
                <Typography variant="body1" className={styles.sectionContent}>{student.self_introduction || ''}</Typography>
                <Gallery galleryUrls={galleryUrls.slice(0, 2)} onClick={handleGalleryOpen} />
                <Typography variant="h6" className={styles.title}>趣味</Typography>
                <Typography variant="body1" className={styles.sectionContent}>{student.hobbies || ''}</Typography>
                <Typography variant="h6" className={styles.title}>特技</Typography>
                <Typography variant="body1" className={styles.sectionContent}>{student.other_information || ''}</Typography>
                <SkillSelector
                  selectedSkills={student.it_skills}
                  setSelectedSkills={() => {}}
                  editMode={editMode}
                  showAutocomplete={true}
                  showInfoText={true}
                  title="ITスキル"
                />
                <SkillSelector
                  selectedSkills={student.skills}
                  setSelectedSkills={() => {}}
                  editMode={editMode}
                  showAutocomplete={false}
                  showInfoText={false}
                  title="その他"
                />
              </>
            )}
          </Box>
        </Box>
      )}
      {subTabIndex === 1 && (
        <Box>
          <Typography>成果物 content goes here.</Typography>
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
      <Dialog open={galleryOpen} onClose={handleGalleryClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          Gallery
          <IconButton
            aria-label="close"
            onClick={handleGalleryClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box className={styles.fullGalleryContainer}>
            {galleryUrls.map((url, index) => (
              <img key={index} src={url} alt={`Gallery ${index}`} className={styles.fullGalleryImage} />
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Top;
