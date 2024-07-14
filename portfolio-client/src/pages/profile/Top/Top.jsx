import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import axios from "../../../utils/axiosUtils";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Gallery from "../../../components/Gallery";
import TextField from "../../../components/TextField/TextField";
import SkillSelector from "../../../components/SkillSelector/SkillSelector";
import styles from "./Top.module.css";

const Top = () => {
  const { studentId } = useParams();

  const [student, setStudent] = useState(null);
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/api/students/${studentId}`);
        await setStudent(response.data);
        setEditData(response.data);
      } catch (error) {
        showAlert("Error fetching student data", "error");
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleUpdateEditData = (key, value) => {
    setEditData((prevEditData) => ({
      ...prevEditData,
      [key]: value,
    }));
  };

  const toggleEditMode = () => {
    console.log();
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/students/${studentId}`, editData);
      setStudent(editData);
      setEditMode(false);
      showAlert('Changes saved successfully!', 'success');
    } catch (error) {
      console.error('Error saving student data:', error);
      showAlert('Error saving changes.', 'error');
    }
  };

  const handleCancel = () => {
    console.log();
    setEditData(student)
    setEditMode(!editMode);
  };

  const [subTabIndex, setSubTabIndex] = useState(0);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryUrls, setGalleryUrls] = useState([]);

  const handleSubTabChange = (event, newIndex) => {
    setSubTabIndex(newIndex);
  };

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlert({ open: false, message: "", severity: "" });
  };

  const handleGalleryOpen = () => {
    setGalleryOpen(true);
  };

  const handleGalleryClose = () => {
    setGalleryOpen(false);
  };

  const generateGalleryUrls = (numImages) => {
    return Array.from(
      { length: numImages },
      (_, index) => `https://picsum.photos/300/200?random=${index + 1}`
    );
  };

  useEffect(() => {
    setGalleryUrls(generateGalleryUrls(8));
  }, []);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <Box my={2}>
      <Box mt={2} className={styles.buttonsContainer}>
            {editMode ? (
              <>
                <Button
                  onClick={handleSave}
                  variant="contained"
                  color="primary"
                >
                  保存
                </Button>

                <Button
                  onClick={handleCancel}
                  variant="outlined"
                  color="error"
                >
                  キャンセル
                </Button>
              </>
            ) : (
              <Button
                onClick={toggleEditMode}
                variant="contained"
                color="primary"
              >
                プロフィールを編集
              </Button>
            )}
          </Box>
      <Tabs className={styles.Tabs} value={subTabIndex} onChange={handleSubTabChange}>
        <Tab label="自己PR" />
        <Tab label="成果物" />
      </Tabs>
      {subTabIndex === 0 && (
        <Box my={2}>
          <TextField
            title="自己紹介"
            data={student.self_introduction}
            editData={editData}
            editMode={editMode}
            updateEditData={handleUpdateEditData}
            keyName="self_introduction"
          />
          <Gallery
            galleryUrls={galleryUrls.slice(0, 2)}
            onClick={handleGalleryOpen}
          />
          <TextField
            title="趣味"
            data={student.hobbies}
            editData={editData}
            editMode={editMode}
            updateEditData={handleUpdateEditData}
            keyName="hobbies"
          />
          <TextField
            title="特技"
            data={student.other_information}
            editData={editData}
            editMode={editMode}
            updateEditData={handleUpdateEditData}
            keyName="other_information"
          />
          <Box mt={2}>
            <SkillSelector
              title="ITスキル"
              headers={{上級: "3年間以上", 中級: "1年間〜1年間半", 初級: "基礎"}}
              data={student}
              editData={editData}
              editMode={editMode}
              updateEditData={handleUpdateEditData}
              showAutocomplete={true}
              showHeaders={true}
              keyName="it_skills"
            />
            <SkillSelector
              title="その他"
              headers={{上級: "3年間以上", 中級: "1年間〜1年間半",初級: "基礎"}}
              data={student}
              editMode={editMode}
              editData={editData}
              updateEditData={handleUpdateEditData}
              showAutocomplete={false}
              showHeaders={false}
              keyName="skills"
            />
          </Box>
        </Box>
      )}
      {/* 成果物 starts from here */}
      {subTabIndex === 1 && (
        <Box my={2}>
          <Typography>成果物 content goes here.</Typography>
        </Box>
      )}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <Dialog
        open={galleryOpen}
        onClose={handleGalleryClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Gallery
          <IconButton
            aria-label="close"
            onClick={handleGalleryClose}
            sx={{
              position: "absolute",
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
              <img
                key={index}
                src={url}
                alt={`Gallery ${index}`}
                className={styles.fullGalleryImage}
              />
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Top;
