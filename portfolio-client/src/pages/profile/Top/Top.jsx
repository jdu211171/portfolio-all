import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReactDOM from "react-dom";

import axios from "../../../utils/axiosUtils";
import { Box, Tabs, Tab, Button } from "@mui/material";
import Gallery from "../../../components/Gallery";
import TextField from "../../../components/TextField/TextField";
import SkillSelector from "../../../components/SkillSelector/SkillSelector";
import Deliverables from "../../../components/Deliverables/Deliverables";
import { useAlert } from "../../../contexts/AlertContext";

import styles from "./Top.module.css";

const Top = () => {
  let id;
  const role = sessionStorage.getItem("role");
  const { studentId } = useParams();
  const location = useLocation();
  const { userId } = location.state || {};

  if (userId != 0 && userId) {
    id = userId;
  } else {
    id = studentId;
  }
  const showAlert = useAlert();

  const [student, setStudent] = useState(null);
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [deletedUrls, setDeletedUrls] = useState();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/api/students/${id}`);
        await setStudent(response.data);
        setEditData(response.data);
      } catch (error) {
        showAlert("Error fetching student data", "error");
      }
    };

    fetchStudent();
  }, [id]);

  const handleUpdateEditData = (key, value) => {
    setEditData((prevEditData) => ({
      ...prevEditData,
      [key]: value,
    }));
  };

  const handleGalleryUpdate = (files) => {
    // Convert FileList to an array of files
    const newFiles = Array.from(files);

    // Update the state with new files
    setNewImages((prevImages) => {
      // Create a new array with the existing images and the new files
      return [...prevImages, ...newFiles];
    });
  };
  const handleUpdateEditMode = () => {
    setEditMode(true);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/students/${id}`, editData);
      setStudent(editData);
      setEditMode(false);
      showAlert("Changes saved successfully!", "success");
    } catch (error) {
      console.error("Error saving student data:", error);
      showAlert("Error saving changes.", "error");
    }
  };

  const handleCancel = () => {
    setEditData(student);
    setEditMode(!editMode);
  };

  const [subTabIndex, setSubTabIndex] = useState(0);

  const handleSubTabChange = (event, newIndex) => {
    setSubTabIndex(newIndex);
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  const portalContent = (
    <Box my={2} className={styles.buttonsContainer}>
      {role == "Student" && (
        <>
          {editMode ? (
            <>
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                size="small"
              >
                保存
              </Button>

              <Button
                onClick={handleCancel}
                variant="outlined"
                color="error"
                size="small"
              >
                キャンセル
              </Button>
            </>
          ) : (
            <Button
              onClick={toggleEditMode}
              variant="contained"
              color="primary"
              size="small"
            >
              プロフィールを編集
            </Button>
          )}
        </>
      )}
    </Box>
  );

  return (
    <Box my={2}>
      <>
        {ReactDOM.createPortal(
          portalContent,
          document.getElementById("saveButton")
        )}
      </>

      <Tabs
        className={styles.Tabs}
        value={subTabIndex}
        onChange={handleSubTabChange}
      >
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
            galleryUrls={student.gallery}
            newImages={newImages}
            deletedUrls={deletedUrls}
            editMode={editMode}
            updateEditData={handleGalleryUpdate}
            keyName="gallery"
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
          <SkillSelector
            title="ITスキル"
            headers={{
              上級: "3年間以上",
              中級: "1年間〜1年間半",
              初級: "基礎",
            }}
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
            headers={{
              上級: "3年間以上",
              中級: "1年間〜1年間半",
              初級: "基礎",
            }}
            data={student}
            editMode={editMode}
            editData={editData}
            updateEditData={handleUpdateEditData}
            showAutocomplete={false}
            showHeaders={false}
            keyName="skills"
          />
        </Box>
      )}
      {/* 成果物 starts from here */}
      {subTabIndex === 1 && (
        <Box my={2}>
          <Deliverables
            data={student.deliverables}
            editMode={editMode}
            editData={editData.deliverables}
            updateEditData={handleUpdateEditData}
            showAutocomplete={false}
            showHeaders={false}
            keyName="deliverables"
            updateEditMode={handleUpdateEditMode}
          />
        </Box>
      )}
    </Box>
  );
};

export default Top;
